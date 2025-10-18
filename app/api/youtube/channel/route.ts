// app/api/youtube/channel/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

const API_KEY = process.env.YOUTUBE_API_KEY;

function normalize(input?: string) {
  return input?.trim() ?? "";
}

async function resolveChannelId(input: string) {
  input = normalize(input);
  if (!input) return null;

  // اگر مستقیماً id (UC...) باشه
  if (input.startsWith("UC")) return input;

  // اگر URL باشه، تلاش برای استخراج
  try {
    const url = new URL(input);
    if (url.pathname.startsWith("/channel/")) {
      return url.pathname.split("/channel/")[1];
    }
    if (url.pathname.startsWith("/@")) {
      return `@${url.pathname.slice(1)}`; // handle
    }
  } catch {
    // not a URL
  }

  // اگر با @ شروع شده (handle)
  if (input.startsWith("@")) return input;

  // fallback: treat as search query (channel name)
  return input;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("channel");
  if (!q) return NextResponse.json({ error: "missing channel" }, { status: 400 });
  if (!API_KEY) return NextResponse.json({ error: "missing api key" }, { status: 500 });

  const resolved = await resolveChannelId(q);
  if (!resolved) {
    return NextResponse.json({ error: "invalid channel" }, { status: 400 });
  }

  try {
    const fetchChannelById = async (cid: string) => {
      const r = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${cid}&key=${API_KEY}`
      );
      return r.json();
    };

    let channelInfo: any = null;

    if (resolved.startsWith("UC")) {
      const json = await fetchChannelById(resolved);
      channelInfo = json.items?.[0];
    } else if (resolved.startsWith("@")) {
      const handle = resolved.slice(1);
      const s = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
          handle
        )}&key=${API_KEY}&maxResults=3`
      );
      const sjson = await s.json();
      const first = sjson.items?.[0];
      const cid = first?.snippet?.channelId ?? null;
      if (cid) {
        const j = await fetchChannelById(cid);
        channelInfo = j.items?.[0];
      }
    } else {
      let r = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forUsername=${encodeURIComponent(
          resolved
        )}&key=${API_KEY}`
      );
      let j = await r.json();
      if (j.items?.length) {
        channelInfo = j.items[0];
      } else {
        const s = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
            resolved
          )}&key=${API_KEY}&maxResults=5`
        );
        const sjson = await s.json();
        const first = sjson.items?.[0];
        const cid = first?.snippet?.channelId ?? null;
        if (cid) {
          const j2 = await fetchChannelById(cid);
          channelInfo = j2.items?.[0];
        }
      }
    }

    if (!channelInfo)
      return NextResponse.json({ error: "channel not found" }, { status: 404 });

    const snippet = channelInfo.snippet || {};
    const statistics = channelInfo.statistics || {};

    const channelRow = {
      channel_id: channelInfo.id as string,
      title: snippet.title || null,
      description: snippet.description || null,
      thumbnail_url:
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.default?.url ||
        null,
      country: snippet.country || null,
      subscribers: Number(statistics.subscriberCount || 0),
      views: Number(statistics.viewCount || 0),
      videos: Number(statistics.videoCount || 0),
      last_updated: new Date().toISOString(),
    };

    const { error } = await supabaseServer
      .from("channels")
      .upsert(channelRow, { onConflict: "channel_id" });

    if (error) console.error("supabase upsert channel error:", error);

    return NextResponse.json({ success: true, channel: channelRow });
  } catch (err) {
    console.error("channel route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
