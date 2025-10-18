// app/api/youtube/analytics/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get("channelId");

  if (!channelId)
    return NextResponse.json({ error: "missing channelId" }, { status: 400 });

  try {
    // 1️⃣ آخرین snapshot‌ها (۳۰ روز اخیر)
    const { data: snapshots, error: snapErr } = await supabaseServer
      .from("channel_snapshots")
      .select("*")
      .eq("channel_id", channelId)
      .order("snapshot_date", { ascending: false })
      .limit(30);

    if (snapErr) throw snapErr;

    // حداقل دو snapshot برای تحلیل رشد لازمه
    if (!snapshots || snapshots.length < 2) {
      return NextResponse.json({
        warning: "not enough snapshots for analysis",
      });
    }

    const latest = snapshots[0];
    const oldest = snapshots[snapshots.length - 1];

    // 2️⃣ تغییرات در بازه‌ی ۳۰ روز
    const subsChange = latest.subscribers - oldest.subscribers;
    const viewsChange = latest.views - oldest.views;
    const videosChange = latest.videos - oldest.videos;

    const days = snapshots.length;
    const avgSubsPerDay = subsChange / days;
    const avgViewsPerDay = viewsChange / days;

    // 3️⃣ آمار ویدیوها
    const { data: videos, error: vidErr } = await supabaseServer
      .from("videos")
      .select("id, title, published_at, views, likes, comments")
      .eq("channel_id", channelId)
      .order("published_at", { ascending: false })
      .limit(20);

    if (vidErr) throw vidErr;

    const topVideos = videos
      ? [...videos].sort((a, b) => b.views - a.views).slice(0, 5)
      : [];

    // 4️⃣ خلاصه کلی کانال
    const { data: channel, error: chErr } = await supabaseServer
      .from("channels")
      .select("title, subscribers, views, videos")
      .eq("channel_id", channelId)
      .single();

    if (chErr) throw chErr;

    // 5️⃣ خروجی نهایی
    const summary = {
      totalVideos: channel?.videos || 0,
      totalViews: channel?.views || 0,
      totalSubscribers: channel?.subscribers || 0,
    };

    const growth = {
      subscribersChange: subsChange,
      viewsChange,
      videosChange,
      dailyAvgViews: Math.round(avgViewsPerDay),
      dailyAvgSubs: Math.round(avgSubsPerDay),
    };

    return NextResponse.json({
      summary,
      growth,
      topVideos,
    });
  } catch (err) {
    console.error("analytics error:", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
