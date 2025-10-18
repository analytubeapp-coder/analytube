// app/api/youtube/snapshot/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

const KEY = process.env.YOUTUBE_API_KEY!;

async function fetchChannelInfoById(channelId: string) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${KEY}`
  );
  return res.json();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const channelId = body?.channelId;
    if (!channelId)
      return NextResponse.json({ error: "missing channelId" }, { status: 400 });

    const json = await fetchChannelInfoById(channelId);
    const info = json.items?.[0];
    if (!info)
      return NextResponse.json({ error: "channel not found" }, { status: 404 });

    const stats = info.statistics || {};
    const today = new Date().toISOString().slice(0, 10);

    // upsert channel row (update metadata)
    await supabaseServer.from("channels").upsert(
      {
        channel_id: info.id,
        title: info.snippet?.title || null,
        thumbnail_url: info.snippet?.thumbnails?.high?.url || null,
        subscribers: Number(stats.subscriberCount || 0),
        views: Number(stats.viewCount || 0),
        videos: Number(stats.videoCount || 0),
        last_updated: new Date().toISOString(),
      },
      { onConflict: "channel_id" }
    );

    // insert snapshot (avoid duplicates via unique constraint)
    const { error } = await supabaseServer
      .from("channel_snapshots")
      .insert([
        {
          channel_id: info.id,
          snapshot_date: today,
          subscribers: Number(stats.subscriberCount || 0),
          views: Number(stats.viewCount || 0),
          videos: Number(stats.videoCount || 0),
        },
      ]); // 🔥 returning حذف شد چون پشتیبانی نمی‌شه

    if (error) {
      if (error.code === "23505") {
        // duplicate key -> ignore
        return NextResponse.json({ success: true, message: "snapshot exists" });
      }
      console.error("snapshot insert error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("snapshot error", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
