// app/api/generate-sop/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import OpenAI from "openai";
import crypto from "crypto";
import { z } from "zod";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Redis } from "@upstash/redis";

// ======================= CONFIG =======================
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1";
const OPENAI_TIMEOUT_MS = 45_000; // درخواست به مدل حداکثر اینقدر طول بکشه
const CACHE_TTL_SEC = 60 * 60 * 24; // 24h cache

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

// Supabase client (server-side; uses service role key if provided)
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";
const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

// optional Upstash Redis for caching & rate-limiting
let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
try {
redis = new Redis({
url: process.env.UPSTASH_REDIS_REST_URL,
token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
} catch (e) {
console.warn("Upstash init failed", e);
redis = null;
}
}

// ======================= INPUT SCHEMA =======================
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
// optional plan override (only admins should allow) — otherwise plan from Supabase used
planOverride: z.enum(["Free", "Starter", "Pro", "Business"]).optional(),
});

type BodyType = z.infer<typeof BodySchema>;

// ======================= HELPERS =======================
function hashInput(obj: any) {
return crypto.createHash("sha256").update(JSON.stringify(obj)).digest("hex");
}
function escapeForPrompt(s: string) {
return (s ?? "").replace(/\n/g, " ").replace(/"/g, '\\"').trim();
}
function safeString(v: any) {
if (v === null || v === undefined) return "";
if (typeof v === "string") return v;
try {
return String(v);
} catch {
return JSON.stringify(v);
}
}

/** extract text from Responses API result robustly */
function extractTextFromResponse(resp: any): string {
try {
if (!resp) return "";
if (resp.output && Array.isArray(resp.output)) {
let out = "";
for (const item of resp.output) {
if (Array.isArray(item?.content)) {
for (const c of item.content) {
if (typeof c?.text === "string") out += c.text;
else if (typeof c?.html === "string") out += c.html;
else if (typeof c === "string") out += c;
}
} else if (typeof item?.text === "string") out += item.text;
else if (typeof item === "string") out += item;
else if (item?.message?.content) {
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
console.warn("extractTextFromResponse err", e);
}
try {
return JSON.stringify(resp);
} catch {
return "";
}
}

/** call OpenAI with timeout + retries */
async function callOpenAIWithRetries(prompt: string, model = OPENAI_MODEL, tries = 2): Promise<string> {
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
max_output_tokens: 3000,
// @ts-ignore - pass signal if SDK supports it; ignore if not
signal: (ac as any).signal,
} as any);
clearTimeout(timer);
const text = extractTextFromResponse(res as any);
return text;
} catch (err: any) {
clearTimeout(timer);
lastErr = err;
// if abort, bubble quickly for retries
await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
attempt++;
}
}
throw lastErr;
}

/** safe parse JSON (first {...} block fallback) */
function extractJSON(txt: string) {
try {
return JSON.parse(txt);
} catch {
const s = txt.indexOf("{");
const e = txt.lastIndexOf("}");
if (s !== -1 && e !== -1) return JSON.parse(txt.slice(s, e + 1));
throw new Error("Invalid JSON from model");
}
}

// ======================= Plan lookup =======================
/**
* Attempts to find plan for requesting user:
* - reads Authorization header Bearer <token>
* - uses supabase.auth.getUser to get user id
* - queries 'profiles' table for plan column (expects column 'plan' with values: null/'Free', 'Starter','Pro','Business')
* If anything fails, returns 'Free'
*/
async function getPlanFromSupabase(authHeader: string | null): Promise<"Free" | "Starter" | "Pro" | "Business"> {
try {
if (!authHeader?.startsWith("Bearer ")) return "Free";
const token = authHeader.split(" ")[1];

// server-side: ask supabase auth to return user
const { data: userData, error: userErr } = await supabase.auth.getUser(token);
if (userErr || !userData?.user) {
// fallback: treat as Free
return "Free";
}
const userId = userData.user.id;

// read profiles table (you must have a 'profiles' table with 'id' = userId and 'plan' column)
const { data, error } = await supabase.from("profiles").select("plan").eq("id", userId).single();
if (error || !data) return "Free";
const plan = (data.plan ?? "Free") as string;
if (plan === null) return "Free";
if (["Starter", "Pro", "Business"].includes(plan)) return plan as any;
return "Free";
} catch (e) {
console.warn("getPlanFromSupabase err", e);
return "Free";
}
}

// ======================= Pipeline prompts (kept concise) =======================

function structurePrompt(payload: BodyType) {
return `
You are an enterprise operations architect. Produce ONE JSON object strictly matching the schema below (no commentary).
SCHEMA: { "meta": {"title": string, "company_name": string, "business_type": string, "company_size": string, "company_stage": string, "industry": string, "generated_at": string}, "overview": string, "objectives":[string], "scope": string, "roles":[{role:string,responsibilities:[string],raci:string}], "inputs_outputs":[{step:number,title:string,inputs:[string],outputs:[string]}], "procedure":[{step:number,title:string,description:string,owner_role:string,estimated_time:string,checklist:[string],exceptions:[{condition:string,action:string}]}], "kpis":[{name:string,definition:string,target:string,frequency:string}], "tools":[{name:string,purpose:string,integration_hint:string}], "risks":[{risk:string,impact:string,likelihood:string,mitigation:string}], "training":[{role:string,training_title:string,duration:string,resources:[string]}], "raci_matrix":[{activity:string,R:[string],A:[string],C:[string],I:[string]}], "flowchart_nodes":[{id:string,label:string,type:string}], "flowchart_edges":[{from:string,to:string,label:string}], "document_control":{version:string,author:string,last_reviewed:string}, "notes":string }
Rules: arrays >=2 items where applicable; at least 3 exception scenarios across procedure steps; generated_at ISO8601.

INPUT: ${JSON.stringify(payload)}
`;
}

function enhancerPrompt(skeletonJson: string, depth: number, light = false) {
return `
You are a senior enterprise technical writer & ops consultant.
Take the input SOP JSON (same schema) and ENHANCE it:
- Improve clarity, add auditable language
- Make KPIs measurable (add formulas)
- Expand checklists to tickable items
- Ensure exceptions have owner + concrete actions
- Add integration hints for tools
Depth: ${depth}. Light-mode: ${light}
Return only the enhanced JSON (same schema).
INPUT: ${skeletonJson}
`;
}

function validatorPrompt(enhancedJson: string) {
return `
You are an enterprise-grade validator. Validate & repair the SOP JSON.
Rules:
- required keys present, types correct
- generated_at ISO8601
- every procedure step must have matching inputs_outputs entry
- KPI entries include definition & target
- RACI matrix must reference roles
- >=3 exception scenarios across steps
Return: { "sop": <repaired_sop>, "validation": { "errors":[string], "warnings":[string], "fixed":[string] } }
Return only JSON.
INPUT: ${enhancedJson}
`;
}

function auditorPrompt(json: string) {
return `
You are an enterprise audit officer. Evaluate SOP for ISO9001/ITIL/SOC2 style compliance.
Return: { "sop": <possibly_improved_sop>, "audit_notes": [string] }
Only JSON. INPUT: ${json}
`;
}

function polisherPrompt(json: string) {
return `
You are a world-class technical writer. Polish the SOP for executive-readiness and precision. Do not remove any structural keys. Return only JSON (same schema).
INPUT: ${json}
`;
}

function recommendationsPrompt(json: string, depth = 2) {
return `
You are an enterprise operations advisor. Given the SOP JSON produce ONLY valid JSON:
{ "improvements": [...], "risks":[{risk,score,mitigation}], "tips":[...], "suggested_roles":[{role,reason}] }
SOP: ${json}
Max suggestions: ${5 * depth}
`;
}

// ======================= Flowchart SVG builder =======================
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

// ======================= Rate limit (optional: Redis) =======================
async function checkRateLimit(userKey: string, limit = 60, windowSec = 60) {
if (!redis) return true;
try {
const k = `rate:${userKey}`;
const v = await redis.incr(k);
if (v === 1) {
await redis.expire(k, windowSec);
}
return v <= limit;
} catch (e) {
console.warn("rate limit check error", e);
return true;
}
}

// ======================= Adaptive pipeline runner =======================
async function runPipeline(payload: BodyType, plan: string) {
// map plan -> passes
const mapping: Record<string, string[]> = {
Free: ["structure", "enhancer_light"],
Starter: ["structure", "enhancer"],
Pro: ["structure", "enhancer", "validator"],
Business: ["structure", "enhancer", "validator", "auditor", "polisher"],
};
const passes = mapping[plan] ?? mapping["Free"];

// PASS 1: structure
const prompt1 = structurePrompt(payload);
const structText = await callOpenAIWithRetries(prompt1);
const structJson = extractJSON(structText);

let current = structJson;

// PASS 2: enhancer (light or full)
if (passes.includes("enhancer_light")) {
const p = enhancerPrompt(JSON.stringify(current), payload.depth, true);
const t = await callOpenAIWithRetries(p);
current = extractJSON(t);
} else if (passes.includes("enhancer")) {
const p = enhancerPrompt(JSON.stringify(current), payload.depth, false);
const t = await callOpenAIWithRetries(p);
current = extractJSON(t);
}

// PASS 3: validator
let validationReport: any = { errors: [], warnings: [], fixed: [] };
if (passes.includes("validator")) {
const p = validatorPrompt(JSON.stringify(current));
const t = await callOpenAIWithRetries(p);
const pack = extractJSON(t);
current = pack.sop || current;
validationReport = pack.validation || validationReport;
}

// PASS 4: auditor
let auditNotes: string[] = [];
if (passes.includes("auditor")) {
const p = auditorPrompt(JSON.stringify(current));
const t = await callOpenAIWithRetries(p);
const pack = extractJSON(t);
current = pack.sop || current;
auditNotes = pack.audit_notes || [];
}

// PASS 5: polisher
if (passes.includes("polisher")) {
const p = polisherPrompt(JSON.stringify(current));
const t = await callOpenAIWithRetries(p);
current = extractJSON(t);
}

// recommendations (light)
const recTxt = await callOpenAIWithRetries(recommendationsPrompt(JSON.stringify(current), payload.depth));
let recommendations = { improvements: [], risks: [], tips: [], suggested_roles: [] };
try {
recommendations = extractJSON(recTxt);
} catch {
recommendations = { improvements: [], risks: [], tips: [], suggested_roles: [] };
}

// flowchart
const nodes = Array.isArray(current.flowchart_nodes) ? current.flowchart_nodes : [];
const edges = Array.isArray(current.flowchart_edges) ? current.flowchart_edges : [];
const flowchart_svg = buildFlowchartSVG(nodes, edges);

return { sop: current, flowchart_svg, recommendations, validationReport, auditNotes };
}

// ======================= MAIN HANDLER =======================
export async function POST(req: Request) {
try {
// parse input
const body = await req.json();
const parsed = BodySchema.safeParse(body);
if (!parsed.success) {
return NextResponse.json({ error: "Invalid input", details: parsed.error.format() }, { status: 400 });
}
const payload = parsed.data as BodyType;

// identify user plan from Supabase (Authorization header)
const authHeader = req.headers.get("authorization");
let plan: "Free" | "Starter" | "Pro" | "Business" = "Free";

if (payload.planOverride) {
// plan override (only for testing/admin); in prod you may remove this
plan = payload.planOverride;
} else {
plan = await getPlanFromSupabase(authHeader);
}

// simple rate-limit keyed by user (if authenticated) or IP
const userKey = (() => {
if (authHeader?.startsWith("Bearer ")) {
return `u:${authHeader.split(" ")[1].slice(0, 20)}`; // partial token fingerprint
}
const ip = req.headers.get("x-forwarded-for") || "anon";
return `ip:${ip}`;
})();

const allowed = await checkRateLimit(userKey, plan === "Business" ? 600 : plan === "Pro" ? 200 : plan === "Starter" ? 60 : 20, 60);
if (!allowed) {
return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
}

// caching: check Redis for identical payload
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

// run adaptive pipeline (select passes by plan)
const result = await runPipeline(payload, plan);

const out = {
sop: result.sop,
flowchart_svg: result.flowchart_svg,
recommendations: result.recommendations,
validation: result.validationReport,
audit_notes: result.auditNotes,
docx_endpoint: "/api/export-docx",
pdf_endpoint: "/api/export-pdf",
plan_used: plan,
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
console.error("generate-sop adaptive error:", err);
return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
}
}