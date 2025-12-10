// app/api/generate-sop/route.ts

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import OpenAI from "openai";
import crypto from "crypto";
import { z } from "zod";
import cloneDeep from "lodash.clonedeep";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { SopSchema } from "@/lib/sopSchema";

// =============================================================
// BASIC CONFIG
// =============================================================

const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const OPENAI_TIMEOUT = Number(process.env.OPENAI_TIMEOUT || 120000);
const OPENAI_MAX_TOKENS = Number(process.env.OPENAI_MAX_TOKENS || 3200);

const EMPTY_SOP = {
meta: {
title: "",
company_name: "",
business_type: "",
company_size: "",
company_stage: "",
industry: "",
generated_at: new Date().toISOString(),
},
overview: "",
objectives: [],
scope: "",
roles: [],
inputs_outputs: [],
procedure: [],
kpis: [],
tools: [],
risks: [],
training: [],
raci_matrix: [],
flowchart_nodes: [],
flowchart_edges: [],
document_control: {
version: "1.0",
author: "",
last_reviewed: new Date().toISOString(),
},
notes: "",
};

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY || "",
});

// =============================================================
// REQUEST SCHEMA
// =============================================================
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
type PlanType = "Free" | "Starter" | "Pro" | "Business";

// =============================================================
// UTILS
// =============================================================
function hashInput(x: any) {
return crypto.createHash("sha256").update(JSON.stringify(x)).digest("hex");
}

function safeParseJSON(str: string) {
try {
return JSON.parse(str);
} catch {
const s = str.indexOf("{");
const e = str.lastIndexOf("}");
if (s !== -1 && e !== -1) {
try {
return JSON.parse(str.substring(s, e + 1));
} catch {}
}
throw new Error("Invalid JSON");
}
}

function extractText(resp: any): string {
if (!resp) return "";
if (typeof resp.output_text === "string") return resp.output_text;

if (Array.isArray(resp.output)) {
let out = "";
for (const item of resp.output) {
if (typeof item === "string") out += item;
if (typeof item?.text === "string") out += item.text;
if (item?.content && Array.isArray(item.content)) {
for (const c of item.content) {
if (typeof c?.text === "string") out += c.text;
}
}
}
return out;
}

return JSON.stringify(resp);
}

async function openaiCall(prompt: string) {
const ac = new AbortController();
const timer = setTimeout(() => ac.abort(), OPENAI_TIMEOUT);

try {
const res = await openai.responses.create({
model: OPENAI_MODEL,
input: prompt,
temperature: 0.14,
max_output_tokens: OPENAI_MAX_TOKENS,
signal: ac.signal,
} as any);

clearTimeout(timer);
return extractText(res);
} catch (err) {
clearTimeout(timer);
throw err;
}
}

// =============================================================
// STABILIZER
// =============================================================
async function validateAndRepair(json: any) {
const parsed = SopSchema.safeParse(json);
if (parsed.success) return parsed.data;

const repairPrompt = `
Fix this JSON to exactly match the SOP schema.
Return ONLY JSON.

INPUT:
${JSON.stringify(json)}
`;

try {
const fixedTxt = await openaiCall(repairPrompt);
const fixed = safeParseJSON(fixedTxt);
const check2 = SopSchema.safeParse(fixed);
if (check2.success) return check2.data;
} catch {}

console.warn("Unable to repair JSON. Returning original JSON.");
return json;
}

async function safePass(current: any, fn: () => Promise<string>) {
const clone = cloneDeep(current);
try {
const txt = await fn();
const parsed = safeParseJSON(txt);
const clean = await validateAndRepair(parsed);
return clean;
} catch (e) {
console.warn("Pass failed. Rolling back.", e);
return clone;
}
}

// =============================================================
// SUPABASE PLAN FETCH
// =============================================================
async function getPlan(req: Request): Promise<PlanType> {
const auth = req.headers.get("authorization");
if (!auth || !auth.startsWith("Bearer ")) return "Free";

const token = auth.split(" ")[1];

const supabase = createSupabaseClient(
process.env.SUPABASE_URL!,
process.env.SUPABASE_KEY!,
{ auth: { persistSession: false } }
);

const { data: userData } = await supabase.auth.getUser(token);
if (!userData?.user) return "Free";

const { data } = await supabase
.from("profiles")
.select("plan")
.eq("id", userData.user.id)
.single();

const p = data?.plan || "Free";
if (["Free", "Starter", "Pro", "Business"].includes(p)) return p;

return "Free";
}

// =============================================================
// PROMPTS
// =============================================================
function structurePrompt(p: BodyType) {
return `
Produce ONE strict JSON object following the SOP schema.
At least 3 exceptions, arrays >= 2 items.

INPUT:
${JSON.stringify(p)}
`;
}

function enhancerPrompt(json: string, depth: number, light = false) {
return `
Enhance this SOP JSON with KPIs, checklists, exceptions.
Depth=${depth}, light=${light}.
Return ONLY JSON.

${json}
`;
}

function validatorPrompt(json: string) {
return `
Validate and repair this SOP JSON.
Return { "sop": {...}, "validation": {...} } only.

${json}
`;
}

function auditorPrompt(json: string) {
return `
Audit this SOP professionally.
Return ONLY { "sop": {...}, "audit_notes": [...] }.

${json}
`;
}

function polisherPrompt(json: string) {
return `
Polish for clarity, do NOT alter structure.
Return ONLY JSON.

${json}
`;
}

function recsPrompt(json: string, depth = 2) {
return `
From this SOP JSON produce ONLY:
{ "improvements": [...], "risks":[{risk,score,mitigation}], "tips":[...], "suggested_roles":[{role,reason}] }

Max ${depth * 5} items.

${json}
`;
}

// =============================================================
// FLOWCHART
// =============================================================
function flowchart(nodes: any[], edges: any[]) {
const boxW = 260;
const boxH = 60;
const gap = 32;

const width = Math.max(600, nodes.length * (boxW + gap) + 40);
const height = 220;
const y = 50;

const esc = (s: string) =>
s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c] as string));

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;
svg += `<style>.c{fill:#0f1724;stroke:#49557a;}.t{fill:#e6eef8;font-size:13px;font-family:Inter}</style>`;

nodes.forEach((n, i) => {
const x = 20 + i * (boxW + gap);
svg += `<rect class="c" x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="10"/>`;
svg += `<text class="t" x="${x + 12}" y="${y + 36}">${esc(n.label || "")}</text>`;
});

edges.forEach((e) => {
const f = nodes.findIndex((n) => n.id === e.from);
const t = nodes.findIndex((n) => n.id === e.to);
if (f === -1 || t === -1) return;
const x1 = 20 + f * (boxW + gap) + boxW;
const x2 = 20 + t * (boxW + gap);
const Y = y + boxH / 2;
svg += `<line x1="${x1}" y1="${Y}" x2="${x2}" y2="${Y}" stroke="#9aa4b4" stroke-width="2"/>`;
});

return svg + "</svg>";
}

// =============================================================
// PIPELINE
// =============================================================
const pipelineMap = {
Free: ["structure", "enhancer_light"],
Starter: ["structure", "enhancer"],
Pro: ["structure", "enhancer", "validator"],
Business: ["structure", "enhancer", "validator", "auditor", "polisher"],
};

async function runPipeline(payload: BodyType, plan: PlanType) {
const passes = pipelineMap[plan] || pipelineMap.Free;

// STRUCTURE
let current = await safePass(EMPTY_SOP, () =>
openaiCall(structurePrompt(payload))
);

// ENHANCER
if (passes.includes("enhancer_light")) {
current = await safePass(current, () =>
openaiCall(enhancerPrompt(JSON.stringify(current), payload.depth, true))
);
} else if (passes.includes("enhancer")) {
current = await safePass(current, () =>
openaiCall(enhancerPrompt(JSON.stringify(current), payload.depth, false))
);
}

// VALIDATOR
let validation = { errors: [], warnings: [], fixed: [] };
if (passes.includes("validator")) {
const vTxt = await openaiCall(validatorPrompt(JSON.stringify(current)));
const v = safeParseJSON(vTxt);
current = v.sop || current;
validation = v.validation || validation;
}

// AUDITOR
let auditNotes: string[] = [];
if (passes.includes("auditor")) {
const aTxt = await openaiCall(auditorPrompt(JSON.stringify(current)));
const a = safeParseJSON(aTxt);
current = a.sop || current;
auditNotes = a.audit_notes || [];
}

// POLISHER
if (passes.includes("polisher")) {
current = await safePass(current, () =>
openaiCall(polisherPrompt(JSON.stringify(current)))
);
}

// RECOMMENDATIONS
let recommendations = { improvements: [], risks: [], tips: [], suggested_roles: [] };
try {
const rTxt = await openaiCall(recsPrompt(JSON.stringify(current), payload.depth));
recommendations = safeParseJSON(rTxt);
} catch (_) {}

const svg = flowchart(
current.flowchart_nodes || [],
current.flowchart_edges || []
);

return { current, svg, validation, auditNotes, recommendations };
}

// =============================================================
// MAIN HANDLER
// =============================================================
export async function POST(req: Request) {
try {
const body = await req.json();
const parsed = BodySchema.safeParse(body);
if (!parsed.success) {
return NextResponse.json(
{ error: "Invalid input", details: parsed.error.format() },
{ status: 400 }
);
}

const payload: BodyType = parsed.data;

// PLAN (no redis)
const plan = (payload.planOverride ?? await getPlan(req)) as PlanType;

// RUN PIPELINE — NO CACHE
const { current, svg, validation, auditNotes, recommendations } =
await runPipeline(payload, plan);

const out = {
sop: current,
flowchart_svg: svg,
recommendations,
validation,
audit_notes: auditNotes,
plan_used: plan,
from_cache: false,
docx_endpoint: "/api/export-docx",
pdf_endpoint: "/api/export-pdf",
};

return NextResponse.json(out);
} catch (err: any) {
console.error("ERROR SOP API:", err);
return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
}
}