//components/dashboard/MonthlyViewsChart.tsx
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

export default function DailyViewsChart({ snapshots }: { snapshots: any[] }) {
  const dailyData = useMemo(() => {
    const today = new Date();
    const days: string[] = Array.from({ length: 30 }).map((_, i) =>
      format(subDays(today, 29 - i), "yyyy-MM-dd")
    );

    // map تاریخ → views
    const snapshotMap: Record<string, number> = {};
    snapshots.forEach((s) => {
      if (!s.snapshot_date) return;
      snapshotMap[format(new Date(s.snapshot_date), "yyyy-MM-dd")] =
        s.dailyViews ?? s.views ?? 0;
    });

    const filled: { day: string; views: number }[] = [];

    for (let i = 0; i < days.length; i++) {
      const key = days[i];
      if (snapshotMap[key] !== undefined) {
        filled.push({ day: format(new Date(key), "MMM d"), views: snapshotMap[key] });
      } else {
        // پیدا کردن نزدیک‌ترین قبل و بعد
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

        filled.push({ day: format(new Date(key), "MMM d"), views: approx });
      }
    }

    return filled;
  }, [snapshots]);

  const minViews = Math.min(...dailyData.map((d) => d.views));
  const maxViews = Math.max(...dailyData.map((d) => d.views));
  const padding = (maxViews - minViews) * 0.2 || 10;

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#eee] mb-6">

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyData}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }} 
              interval={1} // ✅ هر دومین روز تیک زده می‌شود
            />
            <YAxis
              tickFormatter={shortFmt}
              domain={[minViews - padding, maxViews + padding]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(v: number) => `${shortFmt(v)} views`}
              labelStyle={{ color: "#555" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#E94C88"
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