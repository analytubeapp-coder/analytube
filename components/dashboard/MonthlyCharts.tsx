// components/dashboard/MonthlyCharts.tsx
"use client";
import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function toMonthKey(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function MonthlyCharts({ snapshots }: { snapshots: any[] }) {
  const monthly = useMemo(() => {
    const map: Record<string, { month: string; subs: number; views: number }> = {};
    for (const s of snapshots || []) {
      if (!s.snapshot_date) continue;
      const key = toMonthKey(s.snapshot_date);
      if (!map[key]) map[key] = { month: key, subs: 0, views: 0 };
      // keep last value in that month
      map[key].subs = Number(s.subscribers || 0);
      map[key].views = Number(s.views || 0);
    }
    const arr = Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
    // keep last 3 months
    return arr.slice(-3);
  }, [snapshots]);

  return (
    <div className="grid gap-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h4 className="font-semibold mb-4">Monthly Gained Subscribers</h4>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line dataKey="subs" stroke="#4caf50" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h4 className="font-semibold mb-4">Monthly Gained Views</h4>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line dataKey="views" stroke="#1f6feb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}