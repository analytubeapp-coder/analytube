// scripts/take_snapshots.js
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const YT_KEY = process.env.YOUTUBE_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || !YT_KEY) {
  console.error("❌ Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / YOUTUBE_API_KEY");
  process.exit(1);
}

const headersSupabase = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

async function fetchChannelsList() {
  const url = `${SUPABASE_URL}/rest/v1/channels?select=channel_id`;
  const res = await fetch(url, { headers: headersSupabase });
  if (!res.ok) throw new Error(`Failed to fetch channels list: ${res.status} ${await res.text()}`);
  return res.json();
}

async function fetchChannelStats(channelId) {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${encodeURIComponent(channelId)}&key=${YT_KEY}`;
  
  console.log("🔹 Fetching stats for:", channelId);
  const r = await fetch(url);

  // اگر پاسخ OK نیست یا خالیه، لاگ بگیر
  if (!r.ok) {
    const txt = await r.text();
    console.error(`❌ YouTube API error for ${channelId}:`, r.status, txt);
    return null;
  }

  // سعی کن خروجی JSON بگیری، اگر خالی بود لاگش کن
  let j;
  try {
    j = await r.json();
  } catch (err) {
    const text = await r.text();
    console.error(`❌ Failed to parse JSON for ${channelId}:`, err, "Raw response:", text);
    return null;
  }

  if (!j.items || j.items.length === 0) {
    console.error(`⚠️ No items found for ${channelId}. Response:`, j);
    return null;
  }

  const item = j.items[0];
  const stats = item.statistics || {};
  return {
    channel_id: channelId,
    subscribers: Number(stats.subscriberCount || 0),
    views: Number(stats.viewCount || 0),
    videos: Number(stats.videoCount || 0),
  };
}

async function insertSnapshot(snapshot) {
  const url = `${SUPABASE_URL}/rest/v1/channel_snapshots`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      ...headersSupabase,
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify([snapshot]),
  });
 if (!res.ok) {
  const body = await res.text();
  console.error("❌ Failed to insert snapshot response:", body);
  throw new Error(`Failed to insert snapshot: ${res.status}`);
}

// 👇 این قسمت رو اضافه کن
const text = await res.text();
if (!text) {
  console.warn("⚠️ Supabase returned empty response body");
  return {};
}

try {
  return JSON.parse(text);
} catch (err) {
  console.error("❌ Failed to parse Supabase JSON:", err, "Raw response:", text);
  return {};
}

}

(async () => {
  try {
    const channels = await fetchChannelsList();
    console.log(`📺 Found ${channels.length} channels`);
    const today = new Date().toISOString().slice(0, 10);

    for (const c of channels) {
      const channelId = c.channel_id;
      if (!channelId) continue;

      console.log(`\n📡 Processing ${channelId} ...`);
      const stats = await fetchChannelStats(channelId);
      if (!stats) {
        console.warn(`⚠️ Skipping ${channelId} (no stats)`);
        continue;
      }

      const snapshot = {
        channel_id: stats.channel_id,
        snapshot_date: today,
        subscribers: stats.subscribers,
        views: stats.views,
        videos: stats.videos,
      };

      try {
        try {
  await insertSnapshot(snapshot);
  console.log(`✅ Inserted snapshot for ${channelId}`);
} catch (err) {
  if (err.message.includes("409") || err.message.includes("duplicate")) {
    console.log(`⚠️ Snapshot already exists for ${channelId}, skipping`);
  } else {
    console.error(`❌ Error inserting ${channelId}:`, err.message || err);
  }
}

      } catch (err) {
        console.error(`❌ Error inserting ${channelId}:`, err.message || err);
      }

      await new Promise((r) => setTimeout(r, 1000)); // تاخیر ۱ ثانیه برای API limit
    }

    console.log("\n🎉 All done");
  } catch (err) {
    console.error("💥 Fatal error:", err);
    process.exit(1);
  }
})();
