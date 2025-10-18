// app/api/youtube/route.ts
import { NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY;

function normalizeInput(input: string) {
  return input?.trim();
}

async function resolveChannelId(input: string): Promise<string | null> {
  if (!input) return null;
  input = normalizeInput(input);

  // 1) اگر کاربر مستقیماً channel id فرستاده (شروع با UC)
  if (input.startsWith("UC")) return input;

  // 2) اگر URL کامل داد (channel/ یا @handle)
  try {
    const url = new URL(input);
    // https://www.youtube.com/channel/UC...
    if (url.pathname.startsWith("/channel/")) {
      const id = url.pathname.split("/channel/")[1];
      if (id) return id;
    }
    // https://www.youtube.com/@handle
    if (url.pathname.startsWith("/@")) {
      return `@${url.pathname.slice(1)}`; // return handle marker
    }
    // other possible formats: /c/CustomName (we'll fallback to search)
  } catch (err) {
    // not a url -> continue
  }

  // 3) handle starting with @
  if (input.startsWith("@")) {
    return input; // let caller detect handle case
  }

  // 4) try forUsername (legacy) - only works for older custom usernames
  // We'll try to call channels?forUsername= if needed in caller

  // 5) fallback: treat as search query (channel name)
  return input;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("channel");
  if (!q) return NextResponse.json({ error: "Missing channel param" }, { status: 400 });
  if (!API_KEY) return NextResponse.json({ error: "Missing API key" }, { status: 500 });

  const resolved = await resolveChannelId(q);

  try {
    // If resolved is channel id
    if (resolved && resolved.startsWith("UC")) {
      const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${resolved}&key=${API_KEY}`);
      const json = await res.json();
      if (json.items?.length) return NextResponse.json(json.items[0]);
      return NextResponse.json({ error: "Channel not found by id" }, { status: 404 });
    }

    // If resolved is handle (starts with @), call search by forUsername not supported for @,
    // so use search endpoint for channels with q=@handle (search returns snippet.channelId)
    if (resolved && resolved.startsWith("@")) {
      const handle = resolved.slice(1);
      const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(handle)}&key=${API_KEY}&maxResults=5`);
      const json = await res.json();
      const item = json.items?.[0];
      if (item?.snippet?.channelId) {
        const channelId = item.snippet.channelId;
        const final = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`);
        const finalJson = await final.json();
        if (finalJson.items?.length) return NextResponse.json(finalJson.items[0]);
      }
      return NextResponse.json({ error: "Channel not found by handle" }, { status: 404 });
    }

    // Try forUsername (legacy) - attempt channels?forUsername=
    // Note: many channels don't have forUsername set; this is just a best-effort step.
    let res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forUsername=${encodeURIComponent(resolved!)}&key=${API_KEY}`);
    let json = await res.json();
    if (json.items?.length) return NextResponse.json(json.items[0]);

    // Final fallback: search by query (name)
    res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(resolved!)}&key=${API_KEY}&maxResults=5`);
    json = await res.json();
    const first = json.items?.[0];
    if (first?.snippet?.channelId) {
      const cid = first.snippet.channelId;
      const final = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${cid}&key=${API_KEY}`);
      const finalJson = await final.json();
      if (finalJson.items?.length) return NextResponse.json(finalJson.items[0]);
    }

    return NextResponse.json({ error: "Channel not found" }, { status: 404 });
  } catch (err) {
    console.error("resolve error", err);
    return NextResponse.json({ error: "YouTube API error" }, { status: 500 });
  }
}
