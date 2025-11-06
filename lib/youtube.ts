// lib/youtube.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseServer } from "@/lib/supabaseServer";

const API_KEY = process.env.YOUTUBE_API_KEY ?? "";
const CPM_MIN = 2;
const CPM_MAX = 4;

if (!API_KEY) {
  // در زمان اجرا اگر API_KEY نباشد اکثر فانکشن‌ها ارور می‌دهند،
  // ولی برای تایپ‌امن بودن، فقط لوگ می‌زنیم اینجا.
  console.warn("YOUTUBE_API_KEY not set - YouTube API calls will fail.");
}

/* -----------------------
   Types (strict-ish)
   ----------------------- */
export interface ChannelRow {
  channel_id: string;
  title?: string | null;
  thumbnail_url?: string | null;
  description?: string | null;
  subscribers: number;
  views: number;
  videos: number;
  created_at?: string | null; // channel publishedAt (ISO) - may be null
  last_updated?: string | null; // ISO
}

export interface SnapshotRow {
  channel_id: string;
  snapshot_date: string; // "YYYY-MM-DD"
  views: number;
  subscribers: number;
  videos: number;
}

export interface RevenueRange {
  low: number;
  high: number;
  label: string;
}

/* -----------------------
   Helpers
   ----------------------- */
function shortFmt(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

async function fetchJsonOrThrow(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Fetch error ${res.status}: ${txt}`);
  }
  return res.json();
}

function daysBetween(a: Date, b: Date) {
  return Math.max(1, Math.round((b.getTime() - a.getTime()) / 86400000));
}

/* -----------------------
   YouTube API helpers
   ----------------------- */
export async function fetchYouTubeChannel(channelId: string): Promise<any | null> {
  if (!API_KEY) throw new Error("Missing YOUTUBE_API_KEY");
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;
  const json = await fetchJsonOrThrow(url);
  return json.items?.[0] ?? null;
}

export async function fetchRecentVideoIds(channelId: string, days = 30): Promise<string[]> {
  if (!API_KEY) throw new Error("Missing YOUTUBE_API_KEY");
  const after = new Date();
  after.setDate(after.getDate() - days);

  const base = new URL("https://www.googleapis.com/youtube/v3/search");
  base.searchParams.set("part", "id");
  base.searchParams.set("channelId", channelId);
  base.searchParams.set("type", "video");
  base.searchParams.set("order", "date");
  base.searchParams.set("publishedAfter", after.toISOString());
  base.searchParams.set("maxResults", "50");
  base.searchParams.set("key", API_KEY);

  const ids: string[] = [];
  let nextToken: string | undefined;

  do {
    if (nextToken) base.searchParams.set("pageToken", nextToken);
    const json = await fetchJsonOrThrow(base.toString());
    json.items?.forEach((v: any) => {
      if (v.id?.videoId) ids.push(v.id.videoId);
    });
    nextToken = json.nextPageToken;
  } while (nextToken && ids.length < 500);

  return ids;
}

export async function fetchVideosDetails(videoIds: string[]): Promise<any[]> {
  if (!API_KEY) throw new Error("Missing YOUTUBE_API_KEY");
  const out: any[] = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    const chunk = videoIds.slice(i, i + 50);
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${chunk.join(",")}&key=${API_KEY}`;
    const json = await fetchJsonOrThrow(url);
    out.push(...(json.items ?? []));
  }
  return out;
}

/* -----------------------
   DB helpers (Supabase)
   ----------------------- */
export async function upsertChannelVideos(channelId: string, videos: any[]) {
  const rows = videos.map((v: any) => ({
    channel_id: channelId,
    video_id: v.id,
    title: v.snippet?.title ?? null,
    thumbnail_url: v.snippet?.thumbnails?.high?.url ?? v.snippet?.thumbnails?.default?.url ?? null,
    views: Number(v.statistics?.viewCount || 0),
    likes: Number(v.statistics?.likeCount || 0),
    comments: Number(v.statistics?.commentCount || 0),
    published_at: v.snippet?.publishedAt ? new Date(v.snippet.publishedAt).toISOString() : null,
  }));

  await supabaseServer.from("channel_videos").upsert(rows as any, { onConflict: "channel_id,video_id" });
}

/* -----------------------
   Snapshot logic
   ----------------------- */

/**
 * takeSnapshot:
 * - fetch channel info from YouTube API
 * - upsert channels table with latest info
 * - upsert today's snapshot into channel_snapshots
 * - upsert recent videos for convenience
 *
 * NOTE: This function always attempts to fetch & upsert.
 * The route will decide whether to call this function (i.e. only if today's snapshot missing).
 */
export async function takeSnapshot(channelId: string): Promise<ChannelRow | null> {
  const info = await fetchYouTubeChannel(channelId);
  if (!info) return null;

  const today = new Date().toISOString().slice(0, 10);
  const stats = info.statistics || {};
  const snippet = info.snippet || {};

  const channelRow: ChannelRow = {
    channel_id: info.id,
    title: snippet.title ?? null,
    thumbnail_url: snippet.thumbnails?.high?.url ?? null,
    description: snippet.description ?? null,
    subscribers: Number(stats.subscriberCount ?? 0),
    views: Number(stats.viewCount ?? 0),
    videos: Number(stats.videoCount ?? 0),
    created_at: snippet.publishedAt ?? null,
    last_updated: new Date().toISOString(),
  };

  // Upsert channel info
  await supabaseServer.from("channels").upsert([channelRow as any], { onConflict: "channel_id" });

  // Upsert today's snapshot (onConflict will prevent duplicate)
  await supabaseServer.from("channel_snapshots").upsert(
    [
      {
        channel_id: info.id,
        snapshot_date: today,
        views: channelRow.views,
        subscribers: channelRow.subscribers,
        videos: channelRow.videos,
      } as any,
    ],
    { onConflict: "channel_id,snapshot_date" }
  );

  // Upsert videos (async)
  try {
    const ids = await fetchRecentVideoIds(channelId, 30);
    if (ids.length) {
      const videos = await fetchVideosDetails(ids);
      await upsertChannelVideos(channelId, videos);
    }
  } catch (err) {
    console.warn("Could not fetch/upsert recent videos:", err);
  }

  return channelRow;
}

/* -----------------------
   Fetch snapshots
   ----------------------- */
export async function fetchSnapshots(channelId: string): Promise<SnapshotRow[]> {
  const { data } = await supabaseServer
    .from("channel_snapshots")
    .select("*")
    .eq("channel_id", channelId)
    .order("snapshot_date", { ascending: true })
    .limit(500);

  return (data ?? []) as SnapshotRow[];
}

/* -----------------------
   Resolve channelId (search)
   ----------------------- */
export async function resolveChannelId(query: string): Promise<string | null> {
  if (!API_KEY) throw new Error("Missing YOUTUBE_API_KEY");

  // if full youtube url, try to extract handle or channel id
  try {
    if (query.includes("youtube.com")) {
      // try channel/<id>
      const m = query.match(/channel\/(UC[0-9A-Za-z_-]+)/);
      if (m) return m[1];
      // try @handle
      const h = query.match(/@([A-Za-z0-9._-]+)/);
      if (h) query = h[1];
    }
  } catch (e) {
    // ignore
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}`;
  const json = await fetchJsonOrThrow(url);
  return json.items?.[0]?.id?.channelId ?? null;
}

/* -----------------------
   Metric computation logic (exact + fallback)
   ----------------------- */

/**
 * findSnapshotOnOrBefore(date) - returns latest snapshot with date <= target
 * findSnapshotsInWindow(startDate, endDate) - snapshots inside window
 */
function findSnapshotOnOrBefore(snapshots: SnapshotRow[], targetDate: Date): SnapshotRow | null {
  const cand = snapshots
    .filter((s) => new Date(s.snapshot_date) <= targetDate)
    .sort((a, b) => new Date(b.snapshot_date).getTime() - new Date(a.snapshot_date).getTime());
  return cand[0] ?? null;
}

function findSnapshotsInWindow(snapshots: SnapshotRow[], startDate: Date, endDate: Date): SnapshotRow[] {
  return snapshots
    .filter((s) => {
      const d = new Date(s.snapshot_date);
      return d >= startDate && d <= endDate;
    })
    .sort((a, b) => new Date(a.snapshot_date).getTime() - new Date(b.snapshot_date).getTime());
}

/**
 * computeMetric30:
 * Implements your exact logic:
 * - if there's snapshot for today, use it as 'last'
 * - try to find snapshot <= 30 days before -> if found compute exact delta
 * - if not found, look for snapshots inside last 30 days:
 *     - if >=2 snapshots -> compute delta between earliest in window and last; if span < 30 -> normalize to 30 days
 *     - if 1 snapshot in window -> treat like "only one snapshot" case (see below)
 * - if no snapshots in window:
 *     - if there are >=2 snapshots overall -> compute average daily growth across stored span and scale to 30
 *     - if exactly 1 snapshot overall:
 *         - if that snapshot.snapshot_date === today -> "brand new channel" -> estimate from that snapshot using channel.created_at if available OR a conservative rule
 *         - else (snapshot is from another day) -> estimate using that single snapshot as anchor and age of snapshot
 *
 * In all estimation branches we ensure result >= 1 (never zero).
 */
async function computeMetric30(
  channel: ChannelRow | null,
  snapshots: SnapshotRow[],
  key: "views" | "subscribers",
  days = 30
): Promise<number> {
  // ensure we have snapshots array (may be empty)
  if (!snapshots || snapshots.length === 0) {
    // No snapshots at all - shouldn't normally happen because route ensures snapshot today,
    // but as a last fallback return a conservative non-zero guess
    return 100;
  }

  // last snapshot = most recent
  const last = snapshots[snapshots.length - 1];
  const lastDate = new Date(last.snapshot_date);
  const today = new Date(new Date().toISOString().slice(0, 10)); // midnight today
  const cutoffDate = new Date(lastDate.getTime() - days * 86400000);

  // 1) Try exact 30-days-before snapshot (<= cutoff)
  const exactPast = findSnapshotOnOrBefore(snapshots, cutoffDate);
  if (exactPast) {
    const delta = Math.max(0, Number(last[key]) - Number(exactPast[key]));
    return Math.max(1, Math.round(delta)); // exact delta (could be 0 if channel decreased; keep >=1)
  }

  // 2) Snapshots inside last 30 days (between cutoffDate(exclusive) and lastDate)
  const windowSnaps = findSnapshotsInWindow(snapshots, cutoffDate, lastDate);

  if (windowSnaps.length >= 2) {
    // use earliest in window and last
    const firstInWindow = windowSnaps[0];
    const spanDays = daysBetween(new Date(firstInWindow.snapshot_date), lastDate);
    const delta = Math.max(0, Number(last[key]) - Number(firstInWindow[key]));
    // normalize to 30 days
    const scaled = Math.round((delta / Math.max(1, spanDays)) * days);
    return Math.max(1, scaled);
  }

  // 3) If windowSnaps length === 1 -> single snapshot in window
  if (windowSnaps.length === 1) {
    const only = windowSnaps[0];
    // if only.snapshot_date === last.snapshot_date then it's the same day -> falls through to single-snapshot logic
    if (only.snapshot_date !== last.snapshot_date) {
      const spanDays = daysBetween(new Date(only.snapshot_date), lastDate);
      const delta = Math.max(0, Number(last[key]) - Number(only[key]));
      const scaled = Math.round((delta / Math.max(1, spanDays)) * days);
      return Math.max(1, scaled);
    }
    // else continue to handle single-snapshot case below
  }

  // 4) No snapshots in last 30 days OR only 1 snapshot overall -> fallback to averages

  if (snapshots.length >= 2) {
    // compute average daily growth over entire available history
    const first = snapshots[0];
    const totalSpan = daysBetween(new Date(first.snapshot_date), lastDate);
    const delta = Math.max(0, Number(last[key]) - Number(first[key]));
    const avgPerDay = delta / Math.max(1, totalSpan);
    const scaled = Math.round(avgPerDay * days);
    return Math.max(1, scaled);
  }

  // 5) Exactly 1 snapshot available
  // If that snapshot is today's snapshot -> brand-new channel case
  const only = snapshots[0];
  const onlyDate = new Date(only.snapshot_date);

  if (onlyDate.getTime() === today.getTime()) {
    // brand-new: estimate using channel.created_at if available, otherwise conservative guess:
    if (channel?.created_at) {
      const created = new Date(channel.created_at);
      const totalDaysSinceCreated = daysBetween(created, today);
      const avgPerDay = Number(only[key]) / Math.max(1, totalDaysSinceCreated);
      const scaled = Math.round(avgPerDay * days);
      return Math.max(1, scaled);
    }

    // no created_at available -> estimate from a safe heuristic:
    // use the snapshot value as if it's total over e.g. 90 days (conservative) then scale
    const heuristicDays = 90;
    const avgPerDay = Number(only[key]) / Math.max(1, heuristicDays);
    const scaled = Math.round(avgPerDay * days);
    return Math.max(1, scaled);
  } else {
    // single snapshot but not today -> treat like anchor snapshot: estimate from that snapshot to now
    const totalDaysSinceSnapshot = daysBetween(onlyDate, today);
    const avgPerDay = Number(only[key]) / Math.max(1, totalDaysSinceSnapshot);
    const scaled = Math.round(avgPerDay * days);
    return Math.max(1, scaled);
  }
}

/* -----------------------
   Public metric functions
   ----------------------- */
export async function viewsInLastNDays(channelId: string, snapshots: SnapshotRow[], days = 30) {
  // we may fetch channel row to use created_at in brand-new case
  const { data: channel } = await supabaseServer.from("channels").select("*").eq("channel_id", channelId).maybeSingle();
  const channelRow = (channel ?? null) as ChannelRow | null;
  return computeMetric30(channelRow, snapshots, "views", days);
}

export async function subsInLastNDays(channelId: string, snapshots: SnapshotRow[], days = 30) {
  const { data: channel } = await supabaseServer.from("channels").select("*").eq("channel_id", channelId).maybeSingle();
  const channelRow = (channel ?? null) as ChannelRow | null;
  return computeMetric30(channelRow, snapshots, "subscribers", days);
}

export async function revenueInLastNDays(channelId: string, snapshots: SnapshotRow[], days = 30): Promise<RevenueRange> {
  const views = await viewsInLastNDays(channelId, snapshots, days);
  const low = Math.round((views / 1000) * CPM_MIN);
  const high = Math.round((views / 1000) * CPM_MAX);
  const label = `$${shortFmt(low)} - $${shortFmt(high)}`;
  return { low, high, label };
}

export function extractKeywordsFromTexts(texts: string[], limit = 30): string[] {
  const joined = texts
    .filter(Boolean)
    .map((t) => String(t).toLowerCase())
    .join(" ");

  // فقط کلمات حروف/عدد بین 3 تا 30 کاراکتر
  const words = joined.match(/\b[\p{L}\p{N}]{2,30}\b/gu) || [];

  const stopWords = new Set([
    "the","and","you","for","with","that","this","from","your","are","was","but",
    "not","have","just","like","out","can","get","all","one","how","who","why",
    "when","what","they","them","then","our","his","her","its","has","will",
    "about","more","new","video","make","made","watch","shot","shorts","feat",
    "ft","vs","official","channel","youtube","to","in","over","on","every","too"
  ]);

  const freq: Record<string, number> = {};
  for (const w of words) {
    if (stopWords.has(w)) continue;
    // drop pure numbers longer than 4 digits (likely ids) — optional
    if (/^\d+$/.test(w) && w.length > 4) continue;
    freq[w] = (freq[w] || 0) + 1;
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([w]) => w);
}