// sop-pipeline-enterprise/route.ts
// Enterprise-grade SOP generation pipeline (server runtime)
// - Adaptive pipeline by plan
// - Robust retries/timeouts
// - Semantic validation rules
// - Section-parallel enhancer
// - Enhanced flowchart layout and SVG
// - Completeness scoring + audit metadata

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import OpenAI from "openai";
import crypto from "crypto";
import { z } from "zod";
import cloneDeep from "lodash.clonedeep";
import pino from "pino";
import pMap from "p-map";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SopSchema } from "@/lib/sopSchema";

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

const logger = pino({ level: process.env.LOG_LEVEL || "info" });

// -------------------- CONFIG --------------------
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const OPENAI_TIMEOUT = Number(process.env.OPENAI_TIMEOUT || 120000);
const OPENAI_MAX_TOKENS = Number(process.env.OPENAI_MAX_TOKENS || 3200);
const OPENAI_RETRIES = Number(process.env.OPENAI_RETRIES || 2);

// Optional runtime rate limiter (simple token bucket per IP/user)
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMITS: Record<string, number> = { Free: 20, Starter: 60, Pro: 200, Business: 600 };
const tokenBuckets = new Map<string, { tokens: number; lastRefill: number }>();

// -------------------- UTILS --------------------
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
  try {
    if (!resp) return "";

    if (typeof resp.output_text === "string") return resp.output_text;

    if (Array.isArray(resp.output)) {
      let out = "";
      for (const item of resp.output) {
        if (typeof item === "string") out += item;
        if (typeof item?.text === "string") out += item.text;
      }
      return out;
    }

    if (resp?.message?.content) {
      const items = resp.message.content;
      if (Array.isArray(items)) {
        let out = "";
        for (const it of items) {
          if (it.type === "output_text" && typeof it.text === "string") out += it.text;
          if (it.type === "text" && typeof it.text === "string") out += it.text;
        }
        return out;
      }
    }

    if (typeof resp === "string") return resp;

    return JSON.stringify(resp);
  } catch {
    return "";
  }
}

// OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

async function openaiCall(prompt: string, opts?: { temp?: number; maxTokens?: number }) {
const temperature = opts?.temp ?? 0.14;
const max_output_tokens = opts?.maxTokens ?? OPENAI_MAX_TOKENS;
for (let attempt = 0; attempt <= OPENAI_RETRIES; attempt++) {
const ac = new AbortController();
const timer = setTimeout(() => ac.abort(), OPENAI_TIMEOUT);
try {
logger.debug({ attempt }, "openai call start");
const res = await openai.responses.create({
model: OPENAI_MODEL,
input: prompt,
temperature,
max_output_tokens,
signal: ac.signal,
} as any);
clearTimeout(timer);
const txt = extractText(res);
logger.debug({ attempt, len: txt.length }, "openai call done");
return txt;
} catch (err: any) {
clearTimeout(timer);
logger.warn({ err: String(err), attempt }, "openai call failed");
if (attempt === OPENAI_RETRIES) throw err;
await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
}
}
throw new Error("openaiCall: exhausted retries");
}

// -------------------- SEMANTIC RULES + VALIDATION --------------------
async function validateAndRepair(json: any) {
const parsed = SopSchema.safeParse(json);
if (parsed.success) return parsed.data;

// Build a strict repair prompt with semantic checks
const repairPrompt = `You are a JSON repair assistant. The desired schema is an SOP with fields: meta, overview, objectives, scope, roles, inputs_outputs, procedure, kpis, tools, risks, training, raci_matrix, flowchart_nodes, flowchart_edges, document_control, notes.\n\nRULES:\n- 'roles' must have at least one entry and each role must list 'responsibilities'.\n- each procedure step must have a matching inputs_outputs entry (same step number).\n- KPIs must include 'frequency' and 'target'.\n- Exceptions in procedure must reference a condition and an action.\n- flowchart nodes referenced in flowchart_edges must exist.\nReturn ONLY the repaired JSON object.\n\nINPUT_JSON:${JSON.stringify(json)}`;

try {
const fixedTxt = await openaiCall(repairPrompt, { temp: 0.0, maxTokens: 1600 });
const fixed = safeParseJSON(fixedTxt);
const check2 = SopSchema.safeParse(fixed);
if (check2.success) return check2.data;
logger.warn("Repair attempt didn't validate against Zod schema");
} catch (e) {
logger.warn({ e }, "validateAndRepair openai repair failed");
}
// fallback: attempt local fixes
try {
const fallback = cloneDeep(json);
// ensure meta.generated_at
fallback.meta = fallback.meta || {};
fallback.meta.generated_at = fallback.meta.generated_at || new Date().toISOString();
fallback.document_control = fallback.document_control || { version: "1.0", author: "", last_reviewed: new Date().toISOString() };
fallback.roles = Array.isArray(fallback.roles) && fallback.roles.length ? fallback.roles : [{ role: "TBD", responsibilities: ["TBD"] }];
fallback.procedure = Array.isArray(fallback.procedure) && fallback.procedure.length ? fallback.procedure : [];
// link procedure <-> inputs_outputs if missing create stubs
fallback.inputs_outputs = fallback.inputs_outputs || [];
for (const step of fallback.procedure) {
if (!fallback.inputs_outputs.find((io: any) => io.step === step.step)) {
fallback.inputs_outputs.push({ step: step.step, title: step.title || `Step ${step.step}`, inputs: [], outputs: [] });
}
}
const check3 = SopSchema.safeParse(fallback);
if (check3.success) return check3.data;
} catch (e) {
logger.warn({ e }, "local fallback repair failed");
}
throw new Error("Unable to repair JSON to schema");
}

// -------------------- SCORING --------------------
function scoreCompleteness(sop: any) {
let score = 0;
const sections = [
{ key: "overview", weight: 10 },
{ key: "objectives", weight: 10 },
{ key: "scope", weight: 8 },
{ key: "roles", weight: 12 },
{ key: "procedure", weight: 20 },
{ key: "kpis", weight: 10 },
{ key: "risks", weight: 10 },
{ key: "training", weight: 5 },
{ key: "flowchart_nodes", weight: 5 },
];
for (const s of sections) {
const val = sop[s.key];
if (Array.isArray(val) ? val.length > 0 : (typeof val === "string" ? val.trim().length > 20 : !!val)) {
score += s.weight;
}
}
return Math.min(100, Math.round(score));
}

// -------------------- FLOWCHART --------------------
function wrapText(text: string, max = 26) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (const w of words) {
    if ((line + w).length > max) {
      lines.push(line.trim());
      line = w + " ";
    } else {
      line += w + " ";
    }
  }

  if (line.trim().length) lines.push(line.trim());
  return lines;
}

function flowchart(nodes: any[], edges: any[]) {
const count = nodes.length || 1;
const boxW = Math.min(320, Math.max(160, Math.floor(1000 / Math.max(1, Math.ceil(count / 3)))));
const boxH = 72;
const gapX = 28;
const gapY = 28;
const cols = Math.max(1, Math.ceil(Math.sqrt(count)));
const rows = Math.ceil(count / cols);
const width = Math.max(800, cols * (boxW + gapX) + 40);
const height = Math.max(220, rows * (boxH + gapY) + 120);
const esc = (s = "") => String(s).replace(/[<>&'"\\]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "\\": "\\\\" }[c] as string));
let svg = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"${width}\" height=\"${height}\">`;
svg += `<style>.box{fill:#0f1724;stroke:#49557a;}.t{fill:#e6eef8;font-size:13px;font-family:Inter}.arrow{stroke:#9aa4b4;stroke-width:2;fill:none}</style>`;
nodes.forEach((n: any, i: number) => {
const col = i % cols;
const row = Math.floor(i / cols);
const x = 20 + col * (boxW + gapX);
const y = 20 + row * (boxH + gapY);
svg += `<rect class=\"box\" x=\"${x}\" y=\"${y}\" width=\"${boxW}\" height=\"${boxH}\" rx=\"10\"/>`;
const label = esc(n.label || "");
const chunks = wrapText(label);
chunks.forEach((ln: string, idx: number) => {
svg += `<text class=\"t\" x=\"${x + 12}\" y=\"${y + 26 + idx * 16}\">${esc(ln)}</text>`;
});
n.__x = x;
n.__y = y;
n.__w = boxW;
n.__h = boxH;
});
edges.forEach((e: any) => {
const from = nodes.find((n: any) => n.id === e.from);
const to = nodes.find((n: any) => n.id === e.to);
if (!from || !to) return;
const x1 = from.__x + from.__w;
const y1 = from.__y + from.__h / 2;
const x2 = to.__x;
const y2 = to.__y + to.__h / 2;
const mx = (x1 + x2) / 2;
svg += `<path class=\"arrow\" d=\"M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}\" marker-end=\"url(#arrow)\"/>`;
});
svg += `<defs><marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"7\" refX=\"10\" refY=\"3.5\" orient=\"auto\"><polygon points=\"0 0, 10 3.5, 0 7\" fill=\"#9aa4b4\"/></marker></defs>`;
svg += `</svg>`;
return svg;
}

// -------------------- PROMPTS --------------------
function structurePrompt(payload: any) {
return `You are an enterprise SOP architect. Produce ONE strict JSON object that matches the SOP schema. Provide at least 2 roles and at least 2 procedure steps. Include flowchart_nodes & flowchart_edges mapping to steps. INPUT:\n${JSON.stringify(payload)}\nReturn ONLY JSON.`;
}

function enhancerPrompt(jsonStr: string, depth: number, light = false) {
return `Enhance this SOP JSON. Add SMART KPIs, concrete checklists, owner_role and estimated_time for steps, exceptions with owner/action, and RACI suggestions. Depth=${depth} Light=${light}\n${jsonStr}`;
}

function validatorPrompt(jsonStr: string) {
return `Validate this SOP JSON. If you fix issues, return { \"sop\": {...}, \"validation\": { errors:[], warnings:[], fixed:[] } }. Return ONLY JSON.\n${jsonStr}`;
}

function auditorPrompt(jsonStr: string) {
return `Audit the SOP for compliance and control. Return { \"sop\": {...}, \"audit_notes\": [ { issue, severity, recommendation } ] } ONLY JSON.\n${jsonStr}`;
}

function polisherPrompt(jsonStr: string) {
return `Polish for executive clarity. Preserve structure. Return ONLY JSON.\n${jsonStr}`;
}

function recsPrompt(jsonStr: string, depth = 2) {
return `From SOP JSON produce ONLY: { \"improvements\": [...], \"risks\":[{risk,score,mitigation}], \"tips\":[...], \"suggested_roles\":[{role,reason}] } Max ${depth * 5} items.\n${jsonStr}`;
}

// -------------------- PIPELINE MAP --------------------
const pipelineMap: Record<string, string[]> = {
Free: ["structure", "enhancer_light"],
Starter: ["structure", "enhancer"],
Pro: ["structure", "enhancer", "validator"],
Business: ["structure", "enhancer", "validator", "auditor", "polisher"],
};

async function runPipeline(payload: any, plan: string) {
const passes = pipelineMap[plan] || pipelineMap.Free;
logger.info({ plan, passes }, "pipeline start");

// STRUCTURE
let current: any = await (async () => {
try {
const txt = await openaiCall(structurePrompt(payload), { temp: 0.0, maxTokens: 1600 });
const parsed = safeParseJSON(txt);
const repaired = await validateAndRepair(parsed);
return repaired;
} catch (e) {
logger.warn({ e }, "structure pass failed, using EMPTY_SOP");
return cloneDeep(EMPTY_SOP);
}
})();

// ENHANCER: parallelize per major section to save token costs and speed up
if (passes.includes("enhancer_light")) {
current = await safePass(current, () => openaiCall(enhancerPrompt(JSON.stringify(current), payload.depth, true), { temp: 0.2 }));
} else if (passes.includes("enhancer")) {
// divide into chunked enhancements (roles, procedure, kpis, risks, training)
const sections = ["roles", "procedure", "kpis", "risks", "training"];
const sectionResults: Record<string, any> = {};
await pMap(sections, async (sec) => {
const secJson = { [sec]: current[sec] || [] };
try {
  const txt = await openaiCall(
    enhancerPrompt(JSON.stringify(secJson), payload.depth, false),
    { temp: 0.18, maxTokens: 1200 }
  );
const parsed = safeParseJSON(txt);
sectionResults[sec] = parsed[sec] ?? parsed;
} catch (e) {
logger.warn({ e, sec }, "section enhancer failed; falling back to original section");
sectionResults[sec] = current[sec];
}
}, { concurrency: 3 });
// merge back
current = { ...current, ...sectionResults };
// final full-pass enhancer (light) to harmonize
current = await safePass(current, () => openaiCall(enhancerPrompt(JSON.stringify(current), payload.depth, true), { temp: 0.12, maxTokens: 1000 }));
}

// VALIDATOR
let validation = { errors: [], warnings: [], fixed: [] } as any;
if (passes.includes("validator")) {
try {
const vTxt = await openaiCall(validatorPrompt(JSON.stringify(current)), { temp: 0.0, maxTokens: 1200 });
const v = safeParseJSON(vTxt);
current = v.sop || current;
validation = v.validation || validation;
} catch (e) {
logger.warn({ e }, "validator pass failed");
}
}

// AUDITOR
let auditNotes: any[] = [];
if (passes.includes("auditor")) {
try {
const aTxt = await openaiCall(auditorPrompt(JSON.stringify(current)), { temp: 0.0, maxTokens: 1200 });
const a = safeParseJSON(aTxt);
current = a.sop || current;
auditNotes = a.audit_notes || [];
} catch (e) {
logger.warn({ e }, "auditor pass failed");
}
}

// POLISHER
if (passes.includes("polisher")) {
current = await safePass(current, () => openaiCall(polisherPrompt(JSON.stringify(current)), { temp: 0.05, maxTokens: 1000 }));
}

// RECOMMENDATIONS
let recommendations = { improvements: [], risks: [], tips: [], suggested_roles: [] } as any;
try {
const rTxt = await openaiCall(recsPrompt(JSON.stringify(current), payload.depth), { temp: 0.1, maxTokens: 800 });
recommendations = safeParseJSON(rTxt);
} catch (e) {
logger.debug({ e }, "recommendations pass failed");
}

const svg = flowchart(current.flowchart_nodes || [], current.flowchart_edges || []);
const completeness = scoreCompleteness(current);

return { current, svg, validation, auditNotes, recommendations, completeness };
}

async function safePass(current: any, fn: () => Promise<string>) {
const clone = cloneDeep(current);
try {
const txt = await fn();
const parsed = safeParseJSON(txt);
const clean = await validateAndRepair(parsed);
return clean;
} catch (e) {
logger.warn({ e }, "safePass failed; rolling back");
return clone;
}
}

// -------------------- SUPABASE PLAN
async function getPlan(req: Request) {
const auth = req.headers.get("authorization");
if (!auth || !auth.startsWith("Bearer ")) return "Free";
try {
const token = auth.split(" ")[1];
const supabase = createSupabaseClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!, { auth: { persistSession: false } });
const { data: userData } = await supabase.auth.getUser(token);
if (!userData?.user) return "Free";
const { data } = await supabase.from("profiles").select("plan").eq("id", userData.user.id).single();
const p = data?.plan || "Free";
if (["Free", "Starter", "Pro", "Business"].includes(p)) return p;
} catch (e) {
logger.warn({ e }, "getPlan failed; defaulting to Free");
}
return "Free";
}

// -------------------- RATE LIMIT (simple in-memory token bucket)
function checkRateLimit(key: string, limit: number) {
const now = Date.now();
const bucket = tokenBuckets.get(key) || { tokens: limit, lastRefill: now };
// refill
const elapsed = now - bucket.lastRefill;
const refill = Math.floor((elapsed / RATE_LIMIT_WINDOW_MS) * limit);
if (refill > 0) {
bucket.tokens = Math.min(limit, bucket.tokens + refill);
bucket.lastRefill = now;
}
if (bucket.tokens <= 0) {
tokenBuckets.set(key, bucket);
return false;
}
bucket.tokens -= 1;
tokenBuckets.set(key, bucket);
return true;
}

// -------------------- MAIN HANDLER --------------------
export async function POST(req: Request) {
try {
const body = await req.json();
const BodySchema = z.object({
companyName: z.string().min(1),
companySize: z.enum(["1-10", "10-50", "50-250", "250+"]),
companyStage: z.enum(["startup", "growth", "enterprise"]),
industry: z.string().min(2),
businessType: z.string().min(2),
sopTitle: z.string().min(2),
mainGoal: z.string().min(5),
teamStructure: z.any().optional().default({}),
currentChallenges: z.string().optional().default(""),
depth: z.number().int().min(1).max(5).optional().default(3),
planOverride: z.enum(["Free", "Starter", "Pro", "Business"]).optional(),
});

const parsed = BodySchema.safeParse(body);
if (!parsed.success) {
return NextResponse.json({ error: "Invalid input", details: parsed.error.format() }, { status: 400 });
}
const payload = parsed.data;

const plan = (payload.planOverride ?? (await getPlan(req))) as string;

// rate limit key
const auth = req.headers.get("authorization");
const ip =
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  req.headers.get("cf-connecting-ip") ||
  req.headers.get("x-real-ip") ||
  "anon";

const userKey = auth?.startsWith("Bearer ")
  ? `u:${auth.split(" ")[1].slice(0, 24)}`
  : `ip:${ip}`;
const allowed = checkRateLimit(userKey, RATE_LIMITS[plan] || RATE_LIMITS.Free);
if (!allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

const { current, svg, validation, auditNotes, recommendations, completeness } = await runPipeline(payload, plan);

const out = {
sop: current,
flowchart_svg: svg,
recommendations,
validation,
audit_notes: auditNotes,
plan_used: plan,
from_cache: false,
completeness_score: completeness,
docx_endpoint: "/api/export-docx",
pdf_endpoint: "/api/export-pdf",
};

return NextResponse.json(out);
} catch (err: any) {
logger.error({ err: String(err) }, "ERROR SOP API");
return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
}
}

