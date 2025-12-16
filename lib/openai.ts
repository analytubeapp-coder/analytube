import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Robust JSON parser with multiple fallback steps
export async function robustJSONParse(raw: string) {
  if (!raw) return { error: "Empty content" };
  try {
    return JSON.parse(raw);
  } catch {
    try {
      let cleaned = raw
        .replace(/\n/g, " ")
        .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
        .replace(/,}/g, "}")
        .replace(/,]/g, "]");
      return JSON.parse(cleaned);
    } catch {
      console.warn("Failed JSON parse, returning raw output");
      return { error: "Failed to parse GPT output", raw };
    }
  }
}
