import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function estimateEarnings(views: number): number {
  const CPM = 3.5; // متوسط درآمد به ازای هر ۱۰۰۰ بازدید
  return (views / 1000) * CPM;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get("id");

  if (!channelId) {
    return NextResponse.json({ error: "Channel ID is required" }, { status: 400 });
  }

  try {
    // --- دریافت داده از YouTube API ---
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
    );
    const ytData = await ytRes.json();

    if (!ytData.items?.length) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    const info = ytData.items[0];
    const title = info.snippet.title;
    const subscribers = Number(info.statistics.subscriberCount);
    const views = Number(info.statistics.viewCount);
    const videos = Number(info.statistics.videoCount);
    const estimatedEarnings = estimateEarnings(views);

    const today = new Date();
    const recorded_date = today.toISOString().split("T")[0];

    // --- درج داده امروز ---
    const { error: insertError } = await supabase.from("channel_stats").upsert(
      [
        {
          channel_id: channelId,
          title,
          subscribers,
          views,
          videos,
          estimated_earnings: estimatedEarnings,
          recorded_at: today.toISOString(),
          recorded_date,
        },
      ],
      { onConflict: "channel_id,recorded_date" }
    );

    if (insertError) console.error("Error saving stats:", insertError);

    // --- دریافت داده‌های ۳۰ روز اخیر ---
    const { data: existingStats, error: selectError } = await supabase
      .from("channel_stats")
      .select("*")
      .eq("channel_id", channelId)
      .order("recorded_date", { ascending: true })
      .limit(30);

    if (selectError) throw selectError;

    let finalStats = existingStats || [];

    // --- اگر کمتر از ۳۰ روز داده داریم، داده‌های شبیه‌سازی شده تولید کن ---
    if (finalStats.length < 30) {
      const simulatedData = [];
      const latest = finalStats[finalStats.length - 1] || {
        title,
        subscribers,
        views,
        videos,
        estimated_earnings: estimatedEarnings,
      };

      for (let i = 1; i <= 30 - finalStats.length; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        simulatedData.push({
          channel_id: channelId,
          title: latest.title,
          subscribers: latest.subscribers - i * 500,
          views: latest.views - i * 1000000,
          videos: latest.videos - Math.floor(i / 2),
          estimated_earnings: estimateEarnings(latest.views - i * 1000000),
          recorded_date: date.toISOString().split("T")[0],
          recorded_at: date.toISOString(),
        });
      }

      await supabase
        .from("channel_stats")
        .upsert(simulatedData, { onConflict: "channel_id,recorded_date" });

      finalStats = [...finalStats, ...simulatedData.reverse()];
    }

    return NextResponse.json({
      success: true,
      data: {
        channelId,
        stats: finalStats.slice(-30),
      },
    });
  } catch (error) {
    console.error("Error fetching channel data:", error);
    return NextResponse.json({ error: "Failed to fetch channel data" }, { status: 500 });
  }
}
