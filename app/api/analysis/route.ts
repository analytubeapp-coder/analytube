// app/api/analysis/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!SUPABASE_SERVICE_ROLE || !SUPABASE_URL) {
  throw new Error("Missing Supabase service env vars");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  // server-side client - don't expose
  auth: { persistSession: false },
});

function safeNum(v: any) {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const channelId = body?.channelId;
    if (!channelId) return NextResponse.json({ error: "missing channelId" }, { status: 400 });

    // compute date range (last 30 days including today)
    const to = dayjs().utc().endOf("day");
    const from = to.subtract(29, "day").startOf("day");

    // fetch snapshots for the channel in range
    const { data: snaps, error } = await supabase
      .from("channel_snapshots")
      .select("snapshot_date, subscribers_count, views_count, uploads_count, created_at")
      .eq("channel_id", channelId)
      .gte("snapshot_date", from.format("YYYY-MM-DD"))
      .lte("snapshot_date", to.format("YYYY-MM-DD"))
      .order("snapshot_date", { ascending: true });

    if (error) {
      console.error("supabase fetch error", error);
      return NextResponse.json({ error: "db error" }, { status: 500 });
    }

    // build 30-day array with filling (use null if missing)
    const days: Array<{ date: string; subs: number | null; views: number | null; uploads: number | null }> = [];
    for (let i = 0; i < 30; i++) {
      const d = from.add(i, "day").format("YYYY-MM-DD");
      const s = snaps?.find((x: any) => dayjs(x.snapshot_date).format("YYYY-MM-DD") === d);
      days.push({
        date: d,
        subs: s ? safeNum(s.subscribers_count) : null,
        views: s ? safeNum(s.views_count) : null,
        uploads: s ? safeNum(s.uploads_count) : null,
      });
    }

    // compute metrics for subscribers
    const subsArr = days.map((d) => d.subs);
    const firstIdx = subsArr.findIndex((v) => v !== null);
    const lastIdx = subsArr.length - 1 - [...subsArr].reverse().findIndex((v) => v !== null);
    const startSubs = firstIdx >= 0 ? (subsArr[firstIdx] as number) : null;
    const endSubs = lastIdx >= 0 ? (subsArr[lastIdx] as number) : null;
    const absGrowth = (startSubs !== null && endSubs !== null) ? endSubs - startSubs : null;
    const pctGrowth = (startSubs !== null && startSubs > 0 && absGrowth !== null) ? (absGrowth / startSubs) * 100 : null;
    const daysWithData = (firstIdx >= 0 && lastIdx >= 0) ? (lastIdx - firstIdx + 1) : 0;
    const avgDailySubs = (absGrowth !== null && daysWithData > 0) ? Math.round(absGrowth / daysWithData) : null;

    // compute views 30-day total
    const totalViews30 = days.reduce((acc, d) => acc + (d.views ?? 0), 0);

    // Estimate earnings: three CPM scenarios (USD per 1000 views)
    const CPM_LOW = 0.5;
    const CPM_MID = 2.0;
    const CPM_HIGH = 5.0;
    const estLow = Math.round((totalViews30 / 1000) * CPM_LOW);
    const estMid = Math.round((totalViews30 / 1000) * CPM_MID);
    const estHigh = Math.round((totalViews30 / 1000) * CPM_HIGH);

    // daily deltas for subs
    const dailySubsDeltas = days.map((d, idx) => {
      const prev = idx > 0 ? days[idx - 1].subs : null;
      const delta = (d.subs !== null && prev !== null) ? (d.subs - prev) : null;
      return { date: d.date, subs: d.subs, delta };
    });

    return NextResponse.json({
      channelId,
      period: { from: from.format("YYYY-MM-DD"), to: to.format("YYYY-MM-DD") },
      days,
      metrics: {
        subscribers: { start: startSubs, end: endSubs, absolute: absGrowth, percent: pctGrowth, avgDaily: avgDailySubs },
        totalViews30,
        estimatedEarnings: { low: estLow, mid: estMid, high: estHigh, cpmUsed: { low: CPM_LOW, mid: CPM_MID, high: CPM_HIGH } }
      },
      dailySubsDeltas
    });
  } catch (err: any) {
    console.error("analysis route error", err);
    return NextResponse.json({ error: err.message || "server error" }, { status: 500 });
  }
}
