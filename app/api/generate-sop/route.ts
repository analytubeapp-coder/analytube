// app/api/generate-sop/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Redis } from "@upstash/redis";
import crypto from "crypto";
import { z } from "zod";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// optional Redis (Upstash) — only if env provided
let redis: Redis | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

const BodySchema = z.object({
  businessType: z.string().min(2),
  sopTitle: z.string().min(2),
  extraInfo: z.string().optional(),
  // optional flags for more recommendations depth
  recommendationsDepth: z.number().int().min(1).max(5).optional(),
});

function hashInput(obj: any) {
  return crypto.createHash("sha256").update(JSON.stringify(obj)).digest("hex");
}

function extractTextFromResponse(resp: any): string {
  // simple direct text
  if (typeof resp?.output_text === "string" && resp.output_text.trim()) {
    return resp.output_text;
  }

  // check output array
  if (Array.isArray(resp?.output)) {
    let out = "";

    for (const item of resp.output) {
      // If item has content[] array
      if (Array.isArray(item?.content)) {
        for (const c of item.content) {
          if (typeof c?.text === "string") out += c.text;
          else if (typeof c?.plain_text === "string") out += c.plain_text;
          else if (typeof c === "string") out += c;
        }
      }

      // If item itself is a string
      if (typeof item === "string") {
        out += item;
      }

      // If item.message.content exists
      if (item?.message?.content) {
        const c = item.message.content;

        if (Array.isArray(c)) {
          for (const part of c) {
            if (typeof part?.text === "string") out += part.text;
            else if (typeof part === "string") out += part;
          }
        } else if (typeof c?.text === "string") {
          out += c.text;
        }
      }

      // If item.text exists AND item isn't an array
      if (!Array.isArray(item) && typeof item?.text === "string") {
        out += item.text;
      }
    }

    if (out.trim()) return out;
  }

  // fallback
  try {
    return JSON.stringify(resp);
  } catch {
    return "";
  }
}

/** Template B SOP skeleton generator (guides the model to produce the final JSON) */
function mainPrompt(businessType: string, sopTitle: string, extraInfo?: string) {
  return `
You are an expert operations consultant for SaaS startups. Produce a final SOP document in STRICT valid JSON only,
formatted to fit a dashboard UI made of glass-style cards. Use concise but actionable language. Do NOT output any extra text.

Inputs:
- business_type: ${businessType}
- title: ${sopTitle}
- extra_info: ${extraInfo || "None"}

JSON SCHEMA (produce these exact keys):
{
  "meta": {
    "title": "${sopTitle}",
    "business_type": "${businessType}",
    "generated_at": ""
  },
  "overview": "",                  // 1-2 sentences summary for dashboard card
  "objectives": ["", ""],          // short bullets
  "scope": "",                     // short text
  "roles": [                       // suggested roles array
    { "role": "", "responsibilities": [""], "time_commitment": "" }
  ],
  "tools": [ { "name":"", "purpose":"" } ],
  "procedure": [
    { "step": 1, "title":"", "description":"", "owner":"", "estimated_time": "", "checklist": [""] }
  ],
  "kpis": [ { "name":"", "formula":"", "target":"", "frequency":"" } ],
  "risks": [ { "risk":"", "impact":"", "likelihood":"", "mitigation":"" } ],
  "training": [ { "role":"", "training_title":"", "duration":"", "resources": [""] } ],
  "templates": [ { "name":"", "content":"", "format":"plain" } ],
  "notes": ""
}

Important:
- Ensure generated_at is ISO 8601 datetime string.
- Fill arrays with at least 2 sensible entries if applicable.
- Make the JSON compact but valid (no comments).
`;
}

async function callOpenAI(prompt: string, model = "gpt-4.1", temperature = 0.2, maxTokens = 2500) {
  const res = await client.responses.create({ model, input: prompt, temperature, max_output_tokens: maxTokens });
  const text = extractTextFromResponse(res as any);
  return text;
}

/** Make simple flowchart SVG from procedure steps */
function makeFlowchartSVG(procedure: any[]) {
  // Very simple horizontal boxes SVG (keeps it compact)
  const nodes = procedure.map((p: any, i: number) => ({
    id: `n${i + 1}`,
    label: `${i + 1}. ${p.title}`
  }));
  const boxWidth = 180;
  const boxHeight = 48;
  const gap = 30;
  const svgWidth = nodes.length * (boxWidth + gap) + 40;
  const svgHeight = 120;

  let x = 20;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">`;
  svg += `<style> .card{fill:rgba(255,255,255,0.06); stroke: rgba(255,255,255,0.12); rx:12; } .label{fill:#fff; font-family:Inter, Arial, sans-serif; font-size:12px;} </style>`;
  nodes.forEach((n, idx) => {
    svg += `<rect class="card" x="${x}" y="${(svgHeight - boxHeight) / 2}" width="${boxWidth}" height="${boxHeight}" rx="10" />`;
    svg += `<text class="label" x="${x + 12}" y="${(svgHeight / 2) + 5}">${escapeXml(n.label)}</text>`;
    if (idx < nodes.length - 1) {
      const x1 = x + boxWidth;
      const y1 = svgHeight / 2;
      const x2 = x + boxWidth + gap;
      svg += `<path d="M ${x1 + 6} ${y1} L ${x2 - 6} ${y1}" stroke="rgba(255,255,255,0.35)" stroke-width="2" fill="none" marker-end="url(#arrow)"/>`;
    }
    x += boxWidth + gap;
  });
  svg += `<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.35)" /></marker></defs>`;
  svg += `</svg>`;
  return svg;
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => ({ '<':'&lt;','>':'&gt;','&':'&amp;',"'" : '&apos;','"' : '&quot;' }[c] as string));
}

/** Recommendations generator: improvements, risks, tips, suggested roles */
async function generateRecommendations(sopJson: any, depth = 2) {
  const prompt = `
You are an expert operations & risk consultant for SaaS startups.
Given the following SOP JSON (dashboard style), produce a JSON object with keys:
{ "improvements": [ ... up to ${5 * depth} short suggestions ... ],
  "risks": [ { "risk":"", "score": "", "mitigation": "" } ... up to ${5 * depth} ],
  "tips": [ ... training/implementation tips ... ],
  "suggested_roles": [ { "role":"", "reason":"" } ]
}
SOP JSON:
${JSON.stringify(sopJson)}
Return ONLY valid JSON.
`;
  const txt = await callOpenAI(prompt, "gpt-4.1", 0.2, 1000);
  try {
    return JSON.parse(txt);
  } catch {
    // graceful fallback: return basic structure
    return { improvements: [], risks: [], tips: [], suggested_roles: [] };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.format() }, { status: 400 });
    }
    const { businessType, sopTitle, extraInfo, recommendationsDepth } = parsed.data;

    // caching key (optional)
    const key = `sop_pkg:${hashInput({ businessType, sopTitle, extraInfo })}`;
    if (redis) {
      const cached = await redis.get(key);
      if (typeof cached === "string") {
        try {
          const parsedCached = JSON.parse(cached);
          return NextResponse.json({ ...parsedCached, cached: true });
        } catch { /* ignore bad cache */ }
      }
    }

    // 1) Generate main SOP JSON via OpenAI
    const prompt = mainPrompt(businessType, sopTitle, extraInfo);
    const mainText = await callOpenAI(prompt);
    if (!mainText || !mainText.trim()) return NextResponse.json({ error: "Empty response from OpenAI" }, { status: 500 });

    let sopJson: any;
    try {
      sopJson = JSON.parse(mainText);
    } catch {
      // try to extract {...}
      const s = mainText.indexOf("{");
      const e = mainText.lastIndexOf("}");
      if (s !== -1 && e !== -1) {
        const sub = mainText.slice(s, e + 1);
        try { sopJson = JSON.parse(String(sub)); }
        catch { return NextResponse.json({ error: "OpenAI returned invalid JSON for SOP", raw: mainText.slice(0, 2000) }, { status: 500 }); }
      } else {
        return NextResponse.json({ error: "OpenAI returned invalid SOP", raw: mainText.slice(0, 2000) }, { status: 500 });
      }
    }

    // ensure generated_at
    sopJson.meta = sopJson.meta || {};
    sopJson.meta.generated_at = sopJson.meta.generated_at || new Date().toISOString();

    // 2) Flowchart SVG
    const proc = Array.isArray(sopJson.procedure) ? sopJson.procedure : [];
    const flowchart_svg = makeFlowchartSVG(proc);

    // 3) Recommendations
    const recommendations = await generateRecommendations(sopJson, recommendationsDepth || 2);

    // 4) doc/pdf endpoints to be called by frontend
    const docx_endpoint = "/api/export-docx";
    const pdf_endpoint = "/api/export-pdf";

    const packageResult = { sop: sopJson, flowchart_svg, recommendations, docx_endpoint, pdf_endpoint };

    // cache for 24h if redis configured
    if (redis) {
      try { await redis.set(key, JSON.stringify(packageResult), { ex: 60 * 60 * 24 }); } catch { /* ignore */ }
    }

    return NextResponse.json(packageResult);
  } catch (err: any) {
    console.error("generate-sop error:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}