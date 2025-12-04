// app/api/job-status/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const jobId = url.searchParams.get("jobId");
    if (!jobId) return NextResponse.json({ error: "missing jobId" }, { status: 400 });

    const { data, error } = await supabase
      .from("thumbnails")
      .select("status, storage_path, error")
      .eq("job_id", jobId)
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      // Not found yields error code sometimes, handle generically
      console.warn("job-status supabase:", error);
    }

    if (!data) {
      return NextResponse.json({ status: "processing" });
    }

    // get public url
    let publicUrl = null;
    try {
      const { data: publicData } = supabase.storage.from("thumbnails").getPublicUrl(data.storage_path);
      publicUrl = publicData?.publicUrl || null;
    } catch (e) {
      publicUrl = null;
    }

    return NextResponse.json({ status: data.status, publicUrl, error: data.error || null });
  } catch (err: any) {
    console.error("job-status error:", err);
    return NextResponse.json({ error: err.message || "Unknown" }, { status: 500 });
  }
}