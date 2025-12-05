// app/api/admin/upload/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `blog/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-covers")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage
      .from("blog-covers")
      .getPublicUrl(filePath);

    return NextResponse.json({ url: publicData.publicUrl });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}