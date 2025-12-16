import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// گرفتن category و language از جدول profiles
export async function getUserChannelSettings(userId: string) {
  if (!userId) throw new Error("User ID is required");

  const { data, error } = await supabase
    .from("profiles")
    .select("channel_category, channel_language")
    .eq("id", userId)
    .single();

  if (error || !data) throw new Error("Cannot find user settings in profiles table");
  if (!data.channel_category || !data.channel_language)
    throw new Error("User profile missing category or language");

  return data;
}