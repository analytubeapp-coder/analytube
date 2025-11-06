// components/dashboard/LifetimeViewsCard.tsx
"use client";
import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Snapshot { snapshot_date: string; views?: number; }

export default function LifetimeViewsCard({ channel, snapshots }: { channel: any; snapshots: Snapshot[] }) {
  const last7 = useMemo(() => {
    const arr = (snapshots || []).slice(-7).map((s) => ({ date: s.snapshot_date, views: Number(s.views || 0) }));
    return arr.length ? arr : [{ date: new Date().toISOString(), views: Number(channel?.views || 0) }];
  }, [snapshots, channel]);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500">Lifetime trend (last 7 snapshots)</div>
          <div className="text-xl font-bold mt-2">{channel?.views ? Number(channel.views).toLocaleString() + " views" : "-"}</div>
        </div>
        <div style={{ width: 240, height: 60 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={last7}>
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip />
              <Line dataKey="views" stroke="#1f6feb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}