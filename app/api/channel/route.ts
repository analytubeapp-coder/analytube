// app/api/channel/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // simple proxy that forwards to /api/youtube/channel
  const url = new URL(req.url);
  const id = url.searchParams.get("id") || url.searchParams.get("channelId") || "";
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const base = (process.env.NEXT_PUBLIC_BASE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  try {
    const res = await fetch(`${base}/api/youtube/channel?id=${encodeURIComponent(id)}`);
    const text = await res.text();
    return new NextResponse(text, { status: res.status, headers: { "content-type": res.headers.get("content-type") || "application/json" } });
  } catch (err) {
    console.error("proxy /api/channel -> /api/youtube/channel error", err);
    return NextResponse.json({ error: "proxy failed" }, { status: 500 });
  }
}