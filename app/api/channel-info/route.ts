import { NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY!;

export async function POST(req: Request) {
  try {
    const { channelId } = await req.json();

    if (!channelId) {
      return NextResponse.json({ error: "Missing channelId" }, { status: 400 });
    }

    const url = `https://www.googleapis.com/youtube/v3/channels` +
                `?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;

    const r = await fetch(url);
    const data = await r.json();

    if (!data?.items?.length) {
      return NextResponse.json({ error:"Not found" }, { status:404 });
    }

    const c = data.items[0];

    return NextResponse.json({
      channelId,
      title: c.snippet.title,
      customUrl: c.snippet.customUrl,
      description: c.snippet.description,
      country: c.snippet.country,
      thumbnails: c.snippet.thumbnails,
      subscribers: Number(c.statistics.subscriberCount || 0),
      views: Number(c.statistics.viewCount || 0),
      videos: Number(c.statistics.videoCount || 0),
    });

  } catch (err) {
    return NextResponse.json({ error:"Server error" }, { status:500 });
  }
}
