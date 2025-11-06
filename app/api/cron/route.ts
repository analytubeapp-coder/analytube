// app/api/cron/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { takeSnapshot } from "@/lib/youtube";

export async function POST() {
  try {
    const { data: channels, error } = await supabaseServer.from("channels").select("channel_id");
    if (error) {
      console.error("cron: select channels error", error);
      return NextResponse.json({ error: "db error" }, { status: 500 });
    }
    if (!channels || channels.length === 0) {
      return NextResponse.json({ message: "No channels to update" });
    }

    for (const ch of channels) {
      if (!ch?.channel_id) continue;
      try {
        await takeSnapshot(ch.channel_id);
      } catch (e) {
        console.error("cron: takeSnapshot failed for", ch.channel_id, e);
      }
      // small delay to be gentle with YouTube quotas
      await new Promise((r) => setTimeout(r, 400));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("cron error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}