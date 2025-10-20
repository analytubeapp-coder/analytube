// app/api/snapshot/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { channelId } = await req.json();
    if (!channelId) {
      return NextResponse.json({ error: "channelId is required" }, { status: 400 });
    }

    // 1) Fetch realtime info via our own internal API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/channel-info?channelId=${channelId}`);
    const info = await res.json();

    if (!info || !info.channelId) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    // 2) Insert snapshot row
    const { error } = await supabase.from("channel_snapshots").insert({
      channel_id: info.channelId,
      title: info.title,
      country: info.country,
      subscribers: info.subscribers,
      views: info.views,
      videos: info.videos,
    });

    if (error) {
      console.error("insert snapshot error:", error);
      return NextResponse.json({ error: "Insert failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, saved: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
