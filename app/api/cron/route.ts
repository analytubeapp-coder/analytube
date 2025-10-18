// app/api/cron/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST() {
  try {
    // get all channels to snapshot (or only tracked ones)
    const { data: channels } = await supabaseServer.from("channels").select("channel_id");
    if (!channels || channels.length === 0) return NextResponse.json({ message: "no channels" });

    for (const ch of channels) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/youtube/snapshot`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ channelId: ch.channel_id })
        });
        // small delay to avoid quota bursts
        await new Promise((r) => setTimeout(r, 300));
      } catch (e) {
        console.error("cron snapshot error for", ch.channel_id, e);
      }
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("cron error", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
