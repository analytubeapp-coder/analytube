// app/api/job-status/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const jobId = url.searchParams.get("jobId");

    if (!jobId)
      return NextResponse.json({ error: "missing jobId" }, { status: 400 });

    // Lazy init
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    const { data } = await supabase
      .from("thumbnails")
      .select("status, storage_path, error")
      .eq("job_id", jobId)
      .limit(1)
      .single();

    if (!data) {
      return NextResponse.json({ status: "processing" });
    }

    const { data: publicData } = supabase
      .storage
      .from("thumbnails")
      .getPublicUrl(data.storage_path);

    return NextResponse.json({
      status: data.status,
      publicUrl: publicData?.publicUrl || null,
      error: data.error || null
    });

  } catch (err: any) {
    console.error("job-status error:", err);
    return NextResponse.json({ error: err.message || "Unknown" }, { status: 500 });
  }
}