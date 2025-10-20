import { NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY!;

function extract(input: string): { type:"id"|"handle"|"raw", value:string } {
  const q = input.trim();

  if (q.startsWith("UC")) return { type:"id", value:q };

  if (q.startsWith("@")) return { type:"handle", value:q.substring(1) };

  try {
    const u = new URL(q);
    const path = u.pathname;

    if (path.startsWith("/channel/UC")) {
      return { type:"id", value: path.replace("/channel/","") };
    }
    if (path.startsWith("/@")) {
      return { type:"handle", value: path.replace("/@","") };
    }
  } catch {}

  return { type:"raw", value:q };
}

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const parsed = extract(query);

    // حالت 1: مستقیم ID
    if (parsed.type === "id") {
      return NextResponse.json({ channelId: parsed.value });
    }

    // حالت 2+3: handle یا raw → باید سرچ کنیم
    const searchUrl =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet&type=channel&maxResults=1&q=${parsed.value}&key=${API_KEY}`;

    const r = await fetch(searchUrl);
    const data = await r.json();

    const first = data?.items?.[0];
    if (!first) {
      return NextResponse.json({ error:"not found" }, { status:404 });
    }

    const id = first.snippet.channelId;
    return NextResponse.json({ channelId: id });

  } catch (err) {
    return NextResponse.json({ error:"server error" }, { status:500 });
  }
}
