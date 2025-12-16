import { NextResponse } from "next/server";
import { openai, robustJSONParse } from "@/lib/openai";
import { getUserChannelSettings } from "@/lib/supabase";

/* =======================
   Types
======================= */
interface RequestBody {
  prompt: string;
  duration_minutes: number;
  user_id: string;
}

const REQUIRED_KEYS = [
  "title",
  "description",
  "hooks",
  "tags",
  "keywords",

  "seo_analysis",
  "difficulty_analysis",

  "next_video_ideas",
  "thumbnail_text",
  "cta_suggestions",
  "chapters",
  "editor_notes",
  "trending_keywords",
  "description_templates",
  "social_snippets",
  "engagement_questions",

  "market_analysis",
  "suggested_youtube_searches",
  "differentiation_strategy",
  "why_this_video_can_win"
] as const;

/* =======================
   Helpers
======================= */
const isNonEmptyString = (v: any) =>
  typeof v === "string" && v.trim().length > 0;

const isNonEmptyArray = (v: any) =>
  Array.isArray(v) && v.length > 0;

const inRange = (n: any, min: number, max: number) =>
  typeof n === "number" && n >= min && n <= max;

/* =======================
   Ultra-Strict Validation
======================= */
function validateGPTOutput(output: any) {
  if (!output || typeof output !== "object" || Array.isArray(output)) {
    throw new Error("INVALID_OUTPUT_OBJECT");
  }

  for (const key of REQUIRED_KEYS) {
    if (!(key in output)) {
      throw new Error(`MISSING_KEY:${key}`);
    }
  }

  // Basic fields
  if (!isNonEmptyString(output.title)) throw new Error("INVALID_TITLE");
  if (!isNonEmptyString(output.description)) throw new Error("INVALID_DESCRIPTION");
  if (!isNonEmptyArray(output.hooks)) throw new Error("INVALID_HOOKS");
  if (!isNonEmptyArray(output.tags)) throw new Error("INVALID_TAGS");
  if (!isNonEmptyArray(output.keywords)) throw new Error("INVALID_KEYWORDS");

  // SEO Analysis
  const seo = output.seo_analysis;
  if (
    !seo ||
    !inRange(seo.overall_score, 0, 100) ||
    !["Low", "Medium", "High"].includes(seo.intent_match) ||
    !["Informational", "Entertainment", "Transactional"].includes(seo.search_intent_type) ||
    !inRange(seo.title_optimization, 0, 100) ||
    !inRange(seo.keyword_relevance, 0, 100) ||
    !inRange(seo.click_potential, 0, 100) ||
    !isNonEmptyArray(seo.improvement_tips)
  ) {
    throw new Error("INVALID_SEO_ANALYSIS");
  }

  // Difficulty Analysis
  const diff = output.difficulty_analysis;
  if (
    !diff ||
    !inRange(diff.difficulty_score, 0, 100) ||
    !["Low", "Medium", "High"].includes(diff.level) ||
    !isNonEmptyString(diff.reason) ||
    !["New", "Mid-sized", "Large channels"].includes(diff.recommended_for) ||
    !isNonEmptyArray(diff.strategy_to_win)
  ) {
    throw new Error("INVALID_DIFFICULTY_ANALYSIS");
  }

  // Market Analysis
  const market = output.market_analysis;
  if (
    !market ||
    !["Low", "Medium", "High"].includes(market.competition_level) ||
    !isNonEmptyString(market.reason) ||
    !isNonEmptyString(market.opportunity_angle)
  ) {
    throw new Error("INVALID_MARKET_ANALYSIS");
  }

  if (!isNonEmptyArray(output.suggested_youtube_searches)) {
    throw new Error("INVALID_SUGGESTED_SEARCHES");
  }

  return output;
}

/* =======================
   API Handler
======================= */
export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();

    if (!isNonEmptyString(body.prompt)) {
      throw new Error("INVALID_PROMPT");
    }
    if (!inRange(body.duration_minutes, 1, 600)) {
      throw new Error("INVALID_DURATION");
    }
    if (!isNonEmptyString(body.user_id)) {
      throw new Error("INVALID_USER");
    }

    const { channel_category, channel_language } =
      await getUserChannelSettings(body.user_id);

    const approxWords = Math.round(body.duration_minutes * 130);

    const prompt = `
You are a top-tier AI for YouTube growth strategy.

RULES:
- Output ONLY valid JSON
- No markdown, no explanations
- Language MUST be exactly: ${channel_language}
- Be realistic, strategic, and brutally honest

STRUCTURE:
${JSON.stringify(REQUIRED_KEYS, null, 2)}

SEO and difficulty analysis must be intent-based and realistic.

USER INPUT:
Prompt: "${body.prompt}"
Category: ${channel_category}
Language: ${channel_language}
Estimated length: ${approxWords} words
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.55,
      max_tokens: 4500
    });

    const raw = completion.choices?.[0]?.message?.content ?? "";
    const parsed = await robustJSONParse(raw);
    const validated = validateGPTOutput(parsed);

    return NextResponse.json(validated);

  } catch (err: any) {
    console.error("GENERATION_ERROR", err);

    return NextResponse.json(
      {
        error_code: err.message || "UNKNOWN_ERROR",
        error_type: "GENERATION_FAILED",
        user_safe_message:
          "Unable to generate content. Please adjust your prompt and try again."
      },
      { status: 500 }
    );
  }
}