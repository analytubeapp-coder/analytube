"use client";
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { subDays, format } from "date-fns";

function shortFmt(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export default function DailySubscribersChart({ snapshots }: { snapshots: any[] }) {
  const dailyData = useMemo(() => {
    const today = new Date();
    const days: string[] = Array.from({ length: 30 }).map((_, i) =>
      format(subDays(today, 29 - i), "yyyy-MM-dd")
    );

    const snapshotMap: Record<string, number> = {};
    snapshots.forEach((s) => {
      if (!s.snapshot_date) return;
      snapshotMap[format(new Date(s.snapshot_date), "yyyy-MM-dd")] =
        s.subscribers ?? 0;
    });

    const filled: { day: string; subs: number }[] = [];

    for (let i = 0; i < days.length; i++) {
      const key = days[i];
      if (snapshotMap[key] !== undefined) {
        filled.push({ day: format(new Date(key), "MMM d"), subs: snapshotMap[key] });
      } else {
        let prevIndex = i - 1;
        while (prevIndex >= 0 && snapshotMap[days[prevIndex]] === undefined) prevIndex--;
        let nextIndex = i + 1;
        while (nextIndex < days.length && snapshotMap[days[nextIndex]] === undefined) nextIndex++;

        const prevVal = prevIndex >= 0 ? snapshotMap[days[prevIndex]] : null;
        const nextVal = nextIndex < days.length ? snapshotMap[days[nextIndex]] : null;

        let approx = 0;
        if (prevVal !== null && nextVal !== null) {
          approx = (prevVal + nextVal) / 2;
        } else if (prevVal !== null) {
          approx = prevVal;
        } else if (nextVal !== null) {
          approx = nextVal;
        }

        filled.push({ day: format(new Date(key), "MMM d"), subs: approx });
      }
    }

    return filled;
  }, [snapshots]);

  const minSubs = Math.min(...dailyData.map((d) => d.subs));
  const maxSubs = Math.max(...dailyData.map((d) => d.subs));
  const padding = (maxSubs - minSubs) * 0.2 || 5;

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#eee] mb-6">

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyData}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} interval={1} />
            <YAxis
              tickFormatter={shortFmt}
              domain={[minSubs - padding, maxSubs + padding]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(v: number) => `${shortFmt(v)} subs`}
              labelStyle={{ color: "#555" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Line
              type="monotone"
              dataKey="subs"
              stroke="#4caf50"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}