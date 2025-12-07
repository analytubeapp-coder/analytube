// app/api/generate-sop/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import OpenAI from "openai";
import crypto from "crypto";
import { z } from "zod";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Redis } from "@upstash/redis";

/**
* Ultra-Clean Final: Generate SOP API
* - Adaptive pipeline per plan (Free/Starter/Pro/Business)
* - Reduced calls for non-Business plans to save cost
* - Robust timeouts, retries, and safe JSON extraction
* - Runtime Supabase client (no build-time secret usage)
* - Optional Upstash Redis for caching & rate limiting
*/

// ---------------------- CONFIG ----------------------
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1";
const OPENAI_TIMEOUT_MS = Number(process.env.OPENAI_TIMEOUT_MS || 45_000);
const OPENAI_MAX_TOKENS = Number(process.env.OPENAI_MAX_TOKENS || 3000);
const CACHE_TTL_SEC = Number(process.env.CACHE_TTL_SEC || 60 * 60 * 24);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

// Upstash Redis (optional)
let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
try {
redis = new Redis({
url: process.env.UPSTASH_REDIS_REST_URL,
token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
} catch (e) {
console.warn("Upstash init failed:", e);
redis = null;
}
}

// ---------------------- SCHEMA ----------------------
const BodySchema = z.object({
companyName: z.string().min(1),
companySize: z.enum(["1-10", "10-50", "50-250", "250+"]),
companyStage: z.enum(["startup", "growth", "enterprise"]),
industry: z.string().min(2),
businessType: z.string().min(2),
sopTitle: z.string().min(2),
mainGoal: z.string().min(5),
teamStructure: z
.object({
hasCSM: z.boolean().optional(),
hasSupport: z.boolean().optional(),
hasOnboardingManager: z.boolean().optional(),
hasSales: z.boolean().optional(),
otherRoles: z.array(z.string()).optional(),
})
.optional()
.default({}),
currentChallenges: z.string().optional().default(""),
depth: z.number().int().min(1).max(5).optional().default(3),
planOverride: z.enum(["Free", "Starter", "Pro", "Business"]).optional(),
});
type BodyType = z.infer<typeof BodySchema>;

// ---------------------- HELPERS ----------------------
function hashInput(obj: any) {
return crypto.createHash("sha256").update(JSON.stringify(obj)).digest("hex");
}
function esc(s?: string) {
return (s ?? "").replace(/\n/g, " ").replace(/"/g, '\\"').trim();
}
function now() {
return Date.now();
}

/** Robust extractor for Responses API output */
function extractTextFromResponse(resp: any): string {
try {
if (!resp) return "";
if (Array.isArray(resp.output)) {
let out = "";
for (const item of resp.output) {
if (Array.isArray(item?.content)) {
for (const c of item.content) {
if (typeof c?.text === "string") out += c.text;
else if (typeof c?.html === "string") out += c.html;
else if (typeof c === "string") out += c;
}
} else if (typeof item?.text === "string") {
out += item.text;
} else if (typeof item === "string") {
out += item;
} else if (item?.message?.content) {
const c = item.message.content;
if (Array.isArray(c)) {
for (const p of c) if (typeof p?.text === "string") out += p.text;
} else if (typeof c?.text === "string") out += c.text;
}
}
if (out.trim()) return out;
}
if (typeof resp.output_text === "string" && resp.output_text.trim()) return resp.output_text;
if (typeof resp.text === "string") return resp.text;
} catch (e) {
console.warn("extractTextFromResponse err:", e);
}
try {
return JSON.stringify(resp);
} catch {
return "";
}
}

/** Safely parse JSON; fallback to first {...} block */
function safeParseJSON(txt: string) {
try {
return JSON.parse(txt);
} catch {
const s = txt.indexOf("{");
const e = txt.lastIndexOf("}");
if (s !== -1 && e !== -1) {
try {
return JSON.parse(txt.slice(s, e + 1));
} catch {
// fall through
}
}
throw new Error("Invalid JSON from model");
}
}

/** Call OpenAI with timeout + simple retry */
async function openaiCall(prompt: string, model = OPENAI_MODEL, tries = 2) {
let attempt = 0;
let lastErr: any = null;
while (attempt <= tries) {
const ac = new AbortController();
const timer = setTimeout(() => ac.abort(), OPENAI_TIMEOUT_MS);
try {
const res = await openai.responses.create({
model,
input: prompt,
temperature: 0.12,
max_output_tokens: OPENAI_MAX_TOKENS,
// @ts-ignore - some SDKs accept signal
signal: (ac as any).signal,
} as any);
clearTimeout(timer);
return extractTextFromResponse(res);
} catch (err: any) {
clearTimeout(timer);
lastErr = err;
// quick backoff
await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
attempt++;
// if aborted, try again quickly
}
}
throw lastErr;
}

// ---------------------- SUPABASE PLAN LOOKUP (runtime) ----------------------
async function getPlanFromSupabase(authHeader: string | null): Promise<"Free" | "Starter" | "Pro" | "Business"> {
try {
if (!authHeader?.startsWith("Bearer ")) return "Free";
const token = authHeader.split(" ")[1];

// create client at runtime (server-side) using service key env
const supabase = createSupabaseClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!, {
auth: { persistSession: false },
});

// fetch user
const { data: userData, error: userErr } = await supabase.auth.getUser(token);
if (userErr || !userData?.user) return "Free";
const userId = userData.user.id;

// query profiles.plan
const { data, error } = await supabase.from("profiles").select("plan").eq("id", userId).single();
if (error || !data) return "Free";
const plan = (data.plan ?? "Free") as string;
if (["Starter", "Pro", "Business"].includes(plan)) return plan as any;
return "Free";
} catch (e) {
console.warn("getPlanFromSupabase error:", e);
return "Free";
}
}

// ---------------------- RATE LIMIT (optional Redis) ----------------------
async function checkRateLimit(key: string, limit: number, windowSec = 60) {
if (!redis) return true;
try {
const k = `rl:${key}`;
const v = await redis.incr(k);
if (v === 1) await redis.expire(k, windowSec);
return v <= limit;
} catch (e) {
console.warn("rate limit check error:", e);
return true;
}
}

// ---------------------- PROMPTS (concise & strict) ----------------------
function structurePrompt(payload: BodyType) {
return `
You are an enterprise operations architect. Produce ONE valid JSON object strictly matching this schema (no commentary).
SCHEMA: { "meta": {"title": string,"company_name": string,"business_type": string,"company_size": string,"company_stage": string,"industry": string,"generated_at": string},"overview": string,"objectives":[string],"scope": string,"roles":[{role:string,responsibilities:[string],raci:string}],"inputs_outputs":[{step:number,title:string,inputs:[string],outputs:[string]}],"procedure":[{step:number,title:string,description:string,owner_role:string,estimated_time:string,checklist:[string],exceptions:[{condition:string,action:string}]}],"kpis":[{name:string,definition:string,target:string,frequency:string}],"tools":[{name:string,purpose:string,integration_hint:string}],"risks":[{risk:string,impact:string,likelihood:string,mitigation:string}],"training":[{role:string,training_title:string,duration:string,resources:[string]}],"raci_matrix":[{activity:string,R:[string],A:[string],C:[string],I:[string]}],"flowchart_nodes":[{id:string,label:string,type:string}],"flowchart_edges":[{from:string,to:string,label:string}],"document_control":{version:string,author:string,last_reviewed:string},"notes":string }
Rules: arrays >=2 items where applicable; at least 3 exception scenarios across procedure steps; generated_at must be ISO8601.

INPUT: ${JSON.stringify(payload)}
`;
}

function enhancerPrompt(skelJson: string, depth: number, light = false) {
return `
You are a senior enterprise technical writer & ops consultant.
Enhance the input SOP JSON (same schema). Improve:
- auditable precision, KPI measurability (add formulas), detailed tickable checklists, concrete exceptions with owner+action, integration hints.
Depth: ${depth}. Light: ${light}.
Return ONLY the enhanced JSON (same schema).

INPUT:\n${skelJson}
`;
}

function validatorPrompt(enhancedJson: string) {
return `
You are an enterprise validator. Validate & repair SOP JSON.
Rules: required keys present & types correct, generated_at ISO8601, every procedure step must have matching inputs_outputs, KPI entries include definition & target, RACI references roles, >=3 exceptions across steps.
Return: { "sop": <repaired>, "validation": { errors:[string], warnings:[string], fixed:[string] } }
Return ONLY JSON. INPUT:\n${enhancedJson}
`;
}

function auditorPrompt(json: string) {
return `
You are an enterprise auditor. Evaluate SOP for ISO9001/ITIL/SOC2-like expectations. Strengthen language where needed, and add audit notes.
Return: { "sop": <possibly_improved_sop>, "audit_notes": [string] }
Return ONLY JSON. INPUT:\n${json}
`;
}

function polisherPrompt(json: string) {
return `
You are a world-class documentation writer. Polish the SOP for executive-readiness and clarity. Do NOT remove structural keys. Return ONLY JSON (same schema).
INPUT:\n${json}
`;
}

function recommendationsPrompt(json: string, depth = 2) {
return `
You are an enterprise ops advisor. From the SOP JSON produce ONLY JSON:
{ "improvements": [...], "risks":[{risk,score,mitigation}], "tips":[...], "suggested_roles":[{role,reason}] }
Max suggestions: ${5 * depth}
INPUT:\n${json}
`;
}

// ---------------------- PIPELINE RUNNER (adaptive, cheaper for non-Business) ----------------------
async function runPipeline(payload: BodyType, plan: "Free" | "Starter" | "Pro" | "Business") {
// mapping: keep calls low for lower plans
const planPasses: Record<string, string[]> = {
Free: ["structure", "enhancer_light"],
Starter: ["structure", "enhancer"],
Pro: ["structure", "enhancer", "validator"],
Business: ["structure", "enhancer", "validator", "auditor", "polisher"],
};
const passes = planPasses[plan] ?? planPasses["Free"];

const timings: Record<string, number> = {};
const startAll = now();

// PASS 1: structure
timings["structure_start"] = now();
const structTxt = await openaiCall(structurePrompt(payload));
timings["structure_end"] = now();
timings["structure_ms"] = timings["structure_end"] - timings["structure_start"];
const structJson = safeParseJSON(structTxt);

let current = structJson;

// PASS 2: enhancer (light/full)
if (passes.includes("enhancer_light")) {
timings["enhancer_light_start"] = now();
const t = await openaiCall(enhancerPrompt(JSON.stringify(current), payload.depth, true));
timings["enhancer_light_end"] = now();
timings["enhancer_light_ms"] = timings["enhancer_light_end"] - timings["enhancer_light_start"];
current = safeParseJSON(t);
} else if (passes.includes("enhancer")) {
timings["enhancer_start"] = now();
const t = await openaiCall(enhancerPrompt(JSON.stringify(current), payload.depth, false));
timings["enhancer_end"] = now();
timings["enhancer_ms"] = timings["enhancer_end"] - timings["enhancer_start"];
current = safeParseJSON(t);
}

// PASS 3: validator
let validation = { errors: [], warnings: [], fixed: [] } as any;
if (passes.includes("validator")) {
timings["validator_start"] = now();
const t = await openaiCall(validatorPrompt(JSON.stringify(current)));
timings["validator_end"] = now();
timings["validator_ms"] = timings["validator_end"] - timings["validator_start"];
const pkg = safeParseJSON(t);
current = pkg.sop ?? current;
validation = pkg.validation ?? validation;
}

// PASS 4: auditor (business only)
let auditNotes: string[] = [];
if (passes.includes("auditor")) {
timings["auditor_start"] = now();
const t = await openaiCall(auditorPrompt(JSON.stringify(current)));
timings["auditor_end"] = now();
timings["auditor_ms"] = timings["auditor_end"] - timings["auditor_start"];
const pkg = safeParseJSON(t);
current = pkg.sop ?? current;
auditNotes = pkg.audit_notes ?? [];
}

// PASS 5: polisher (business only)
if (passes.includes("polisher")) {
timings["polisher_start"] = now();
const t = await openaiCall(polisherPrompt(JSON.stringify(current)));
timings["polisher_end"] = now();
timings["polisher_ms"] = timings["polisher_end"] - timings["polisher_start"];
current = safeParseJSON(t);
}

// recommendations (light)
timings["recs_start"] = now();
let recommendations = { improvements: [], risks: [], tips: [], suggested_roles: [] } as any;
try {
const rtxt = await openaiCall(recommendationsPrompt(JSON.stringify(current), payload.depth));
recommendations = safeParseJSON(rtxt);
} catch (e) {
// keep empty recommendations on error
console.warn("recommendations failed:", e);
}
timings["recs_end"] = now();
timings["recs_ms"] = timings["recs_end"] - timings["recs_start"];

// flowchart
const nodes = Array.isArray(current.flowchart_nodes) ? current.flowchart_nodes : [];
const edges = Array.isArray(current.flowchart_edges) ? current.flowchart_edges : [];
const flowchart_svg = buildFlowchartSVG(nodes, edges);

timings["total_ms"] = now() - startAll;

return {
sop: current,
flowchart_svg,
recommendations,
validation,
auditNotes,
timings,
};
}

// ---------------------- FLOWCHART SVG ----------------------
function buildFlowchartSVG(nodes: any[], edges: any[]) {
const boxW = 260;
const boxH = 60;
const gap = 32;
const width = Math.max(600, nodes.length * (boxW + gap) + 40);
const height = 220;
const y = 50;
const esc = (s: string) =>
(s ?? "").replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c] as string));
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
svg += `<style>.card{fill:#0f1724;stroke:#49557a;stroke-opacity:0.14;}.label{fill:#e6eef8;font-family:Inter,Arial,sans-serif;font-size:13px;}</style>`;
nodes.forEach((n: any, i: number) => {
const x = 20 + i * (boxW + gap);
svg += `<rect class="card" x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="10"/>`;
svg += `<text class="label" x="${x + 14}" y="${y + boxH / 2 + 6}">${esc(String(n.label || ""))}</text>`;
});
edges.forEach((e: any) => {
const fromIdx = nodes.findIndex((n: any) => n.id === e.from);
const toIdx = nodes.findIndex((n: any) => n.id === e.to);
if (fromIdx === -1 || toIdx === -1) return;
const x1 = 20 + fromIdx * (boxW + gap) + boxW;
const x2 = 20 + toIdx * (boxW + gap);
const y1 = y + boxH / 2;
svg += `<path d="M ${x1} ${y1} L ${x2} ${y1}" stroke="#9ca3af" stroke-opacity="0.35" stroke-width="2" fill="none" marker-end="url(#arr)"/>`;
});
svg += `<defs><marker id="arr" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#9ca3af"/></marker></defs>`;
svg += `</svg>`;
return svg;
}

// ---------------------- MAIN HANDLER ----------------------
export async function POST(req: Request) {
try {
const body = await req.json();
const parsed = BodySchema.safeParse(body);
if (!parsed.success) {
return NextResponse.json({ error: "Invalid input", details: parsed.error.format() }, { status: 400 });
}
const payload = parsed.data as BodyType;

// determine plan
let plan: "Free" | "Starter" | "Pro" | "Business" = "Free";
if (payload.planOverride) {
plan = payload.planOverride;
} else {
const authHeader = req.headers.get("authorization");
plan = await getPlanFromSupabase(authHeader);
}

// rate-limit key: prefer bearer fingerprint else IP
const authHeader = req.headers.get("authorization");
const userKey = authHeader?.startsWith("Bearer ") ? `u:${authHeader.split(" ")[1].slice(0, 20)}` : `ip:${req.headers.get("x-forwarded-for") || "anon"}`;

// rate limits per plan (per minute)
const limits = { Free: 20, Starter: 60, Pro: 200, Business: 600 };
const allowed = await checkRateLimit(userKey, limits[plan], 60);
if (!allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

// cache key
const cacheKey = `sop_adaptive:${hashInput({ payload, plan })}`;
if (redis) {
try {
const cached = await redis.get(cacheKey);
if (cached && typeof cached === "string") {
const parsedCached = JSON.parse(cached);
parsedCached.generated_from_cache = true;
return NextResponse.json(parsedCached);
}
} catch (e) {
console.warn("redis read err", e);
}
}

// run pipeline
const runStart = now();
const result = await runPipeline(payload, plan);
const runMs = now() - runStart;

const out = {
sop: result.sop,
flowchart_svg: result.flowchart_svg,
recommendations: result.recommendations,
validation: result.validation,
audit_notes: result.auditNotes,
timings: result.timings,
run_ms: runMs,
plan_used: plan,
docx_endpoint: "/api/export-docx",
pdf_endpoint: "/api/export-pdf",
generated_from_cache: false,
};

// store cache
if (redis) {
try {
await redis.set(cacheKey, JSON.stringify(out), { ex: CACHE_TTL_SEC });
} catch (e) {
console.warn("redis write err", e);
}
}

return NextResponse.json(out);
} catch (err: any) {
console.error("generate-sop error:", err);
return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
}
}