// app/api/youtube/video/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get("channelId");
    const days = Number(searchParams.get("days") ?? "0"); // 0 => lifetime
    const sort = (searchParams.get("sort") ?? "views") as string;
    const limit = Number(searchParams.get("limit") ?? "5");

    if (!channelId) return NextResponse.json({ error: "Missing channelId" }, { status: 400 });

    // if days > 0 we might filter by published_at; else lifetime (no published filter)
    const query = supabaseServer
      .from("channel_videos")
      .select("video_id,title,thumbnail_url,views,likes,comments,ctr,published_at,estimated_revenue_low,estimated_revenue_high");

    let builder = query.eq("channel_id", channelId);

    if (days > 0) {
      const ago = new Date();
      ago.setDate(ago.getDate() - days);
      builder = builder.gte("published_at", ago.toISOString());
    }

    const sortCol =
      sort === "likes" ? "likes" :
      sort === "comments" ? "comments" :
      sort === "revenue" ? "estimated_revenue_low" : "views";

    const { data, error } = await builder.order(sortCol, { ascending: false }).limit(limit);

    if (error) throw error;

    const list = (data || []).map((r: any) => {
      const views = Number(r.views || 0);
      const low = Math.round((views / 1000) * 2);
      const high = Math.round((views / 1000) * 4);
      const revLabel = `$${low >= 1000 ? Math.round(low / 1000) + "k" : low} - $${high >= 1000 ? Math.round(high / 1000) + "k" : high}`;
      return {
        ...r,
        revenue_range: revLabel,
      };
    });

    return NextResponse.json({ success: true, videos: list });
  } catch (err) {
    console.error("videos route error", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}