// app/api/youtube/channel/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import {
  fetchSnapshots,
  takeSnapshot,
  resolveChannelId,
  viewsInLastNDays,
  subsInLastNDays,
  revenueInLastNDays,
  extractKeywordsFromTexts,
} from "@/lib/youtube";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawQuery = searchParams.get("id");
    if (!rawQuery)
      return NextResponse.json(
        { error: "Missing channel query" },
        { status: 400 }
      );

    // ✅ 1) Resolve channelId
    let channelId: string | null = null;
    if (rawQuery.startsWith("UC")) {
      channelId = rawQuery;
    } else {
      channelId = await resolveChannelId(rawQuery);
    }
    if (!channelId)
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });

    // ✅ 2) Fetch existing snapshots
    let snapshots = await fetchSnapshots(channelId);
    const todayIso = new Date().toISOString().slice(0, 10);
    const hasTodaySnapshot = snapshots.some(
      (s) => s.snapshot_date === todayIso
    );

    // ✅ 3) Create snapshot if missing
    if (!hasTodaySnapshot) {
      const snap = await takeSnapshot(channelId);
      if (!snap)
        return NextResponse.json(
          { error: "Channel not found (takeSnapshot failed)" },
          { status: 404 }
        );
      snapshots = await fetchSnapshots(channelId);
    }

    // ✅ 4) Fetch latest channel row (guaranteed to exist now)
    const { data: channel } = await supabaseServer
      .from("channels")
      .select("*")
      .eq("channel_id", channelId)
      .single();

    // ✅ 5) Keywords extraction — REAL VALUES
    const { data: videos } = await supabaseServer
      .from("channel_videos")
      .select("title, description")
      .eq("channel_id", channelId)
      .limit(30);

    const texts = (videos ?? []).flatMap(v => [
  v.title, v.title, v.title, // عنوان سه بار تکرار → وزن بیشتر
  v.description
]);
    const keywords = extractKeywordsFromTexts(texts, 40);

    // ✅ 6) Metrics (0-free logic)
    const views30d = await viewsInLastNDays(channelId, snapshots, 30);
    const subs30d = await subsInLastNDays(channelId, snapshots, 30);
    const revenue30 = await revenueInLastNDays(channelId, snapshots, 30);

    return NextResponse.json({
      success: true,
      channel,
      snapshots,
      keywords, // ✅ NEW
      metrics: {
        views30d,
        subs30d,
        revenue30_low: revenue30.low,
        revenue30_high: revenue30.high,
        revenue30_label: revenue30.label,
      },
    });
  } catch (err) {
    console.error("Error in channel route:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}