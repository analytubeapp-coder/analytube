import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { channelId, pageToken } = body;

    if (!channelId) {
      return NextResponse.json({ error: "channelId is required" }, { status: 400 });
    }

    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("key", process.env.YOUTUBE_API_KEY!);
    url.searchParams.set("channelId", channelId);
    url.searchParams.set("part", "snippet");
    url.searchParams.set("order", "date");
    url.searchParams.set("maxResults", "20");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url.toString());
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json({
      nextPageToken: data.nextPageToken || null,
      items: data.items.map((it: any) => ({
        videoId: it.id.videoId,
        title: it.snippet.title,
        publishedAt: it.snippet.publishedAt,
        thumbnails: it.snippet.thumbnails,
      })),
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
