// lib/supabaseServer.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase server env vars (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
}

export const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});
