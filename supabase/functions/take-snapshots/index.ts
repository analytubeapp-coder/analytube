// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js";
import { fetchChannelInfo } from "../_shared/youtube/channel-info.ts";

Deno.serve(async (_req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    // 1) گرفتن کانال‌هایی که نیاز به snapshot دارند
    const { data: channels, error } = await supabase
      .from("channels")
      .select("id, external_id")
      .eq("needs_snapshot", true);

    if (error) {
      console.error("DB read error:", error);
      return new Response(JSON.stringify({ error: "db_read" }), { status: 500 });
    }

    if (!channels || channels.length === 0) {
      console.log("no channels need snapshot");
      return new Response(JSON.stringify({ ok: true, message: "no channels" }), { status: 200 });
    }

    let inserted = 0;

    for (const row of channels) {
      const channelUuid = row.id;
      const externalId = row.external_id;

      if (!externalId) {
        console.warn("channel missing external_id --> ", channelUuid);
        await supabase.from("channels").update({ needs_snapshot: false }).eq("id", channelUuid);
        continue;
      }

      try {
        // 2) گرفتن realtime info با externalId
        const info = await fetchChannelInfo(externalId);
        if (!info) {
          console.warn("no info from youtube for:", externalId);
          await supabase.from("channels").update({ needs_snapshot: false }).eq("id", channelUuid);
          continue;
        }

        // 3) UPSERT snapshot
        await supabase
          .from("snapshots")
          .upsert(
            {
              channel_id: channelUuid,                      // UUID داخلی
              observed_at: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
              subs: info.subscribers,
              views: info.views,
              uploads: info.videos,
              meta: {
                source: "youtube_api",
                external_id: externalId,                    // یوتیوب ID
              },
            },
            { onConflict: "channel_id, observed_at" }
          );

        inserted++;

        // 4) خاموش کردن نیاز به snapshot
        await supabase.from("channels").update({ needs_snapshot: false }).eq("id", channelUuid);

      } catch (err) {
        console.error("err snapshot loop:", err);
        await supabase.from("channels").update({ needs_snapshot: false }).eq("id", channelUuid);
      }
    }

    return new Response(JSON.stringify({ ok: true, inserted }), { status: 200 });

  } catch (outerErr) {
    console.error("fatal error:", outerErr);
    return new Response(JSON.stringify({ error: "fatal" }), { status: 500 });
  }
});
