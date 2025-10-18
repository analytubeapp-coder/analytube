// app/api/youtube/videos/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

const KEY = process.env.YOUTUBE_API_KEY!;
const MAX_RESULTS_PER_PAGE = 50;

async function getChannelIdFromInput(input: string) {
  // simple helper: call channel route
  const res = await fetch(`http://localhost:3000/api/youtube/channel?channel=${encodeURIComponent(input)}`);
  const json = await res.json();
  return json?.channel?.channel_id || json?.channel?.channel_id || json?.channel_id || null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("channel") || searchParams.get("channelId");
  if (!input) return NextResponse.json({ error: "missing channel param" }, { status: 400 });

  // resolve channelId (if necessary)
  let channelId = input;
  if (!channelId.startsWith("UC")) {
    const maybe = await getChannelIdFromInput(input);
    if (maybe) channelId = maybe;
  }

  // publishedAfter: 30 days ago
  const thirty = new Date();
  thirty.setDate(thirty.getDate() - 30);
  const publishedAfter = thirty.toISOString();

  try {
    // 1) search list with pagination
    let nextPageToken: string | undefined = undefined;
    const videoIds: string[] = [];

    do {
      const url = new URL("https://www.googleapis.com/youtube/v3/search");
      url.searchParams.set("part", "id");
      url.searchParams.set("channelId", channelId);
      url.searchParams.set("type", "video");
      url.searchParams.set("order", "date");
      url.searchParams.set("publishedAfter", publishedAfter);
      url.searchParams.set("maxResults", String(MAX_RESULTS_PER_PAGE));
      if (nextPageToken) url.searchParams.set("pageToken", nextPageToken);
      url.searchParams.set("key", KEY);

      const r = await fetch(url.toString());
      const j = await r.json();
      if (j.items?.length) {
        for (const it of j.items) {
          if (it.id?.videoId) videoIds.push(it.id.videoId);
        }
      }
      nextPageToken = j.nextPageToken;
      if (!nextPageToken) break;
      // safety guard: avoid too many pages
      if (videoIds.length >= 500) break;
    } while (nextPageToken);

    if (videoIds.length === 0) {
      return NextResponse.json({ summary: { totalVideos: 0 }, videos: [] });
    }

    // 2) fetch video details in batches of 50
    const batches: string[][] = [];
    for (let i = 0; i < videoIds.length; i += 50) batches.push(videoIds.slice(i, i + 50));

    const videos: any[] = [];
    for (const batch of batches) {
      const ids = batch.join(",");
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids}&key=${KEY}&maxResults=50`;
      const res = await fetch(url);
      const j = await res.json();
      if (j.items?.length) {
        for (const v of j.items) {
          videos.push({
            video_id: v.id,
            channel_id: v.snippet?.channelId,
            title: v.snippet?.title || null,
            published_at: v.snippet?.publishedAt || null,
            views: Number(v.statistics?.viewCount || 0),
            likes: Number(v.statistics?.likeCount || 0),
            comments: Number(v.statistics?.commentCount || 0),
          });
        }
      }
    }

    // 3) upsert to supabase videos table
    const { error } = await supabaseServer.from("videos").upsert(videos, { onConflict: "video_id" });
    if (error) console.error("supabase upsert videos error", error);

    // response
    return NextResponse.json({ summary: { totalVideos: videos.length }, videos });
  } catch (err) {
    console.error("videos route error", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
