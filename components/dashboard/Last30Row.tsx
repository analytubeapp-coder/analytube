// components/dashboard/Last30Row.tsx

"use client";
import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Snapshot { snapshot_date: string; views?: number; subscribers?: number; }

export default function Last30Row({ snapshots, metrics }: { snapshots: Snapshot[]; metrics?: any }) {
  const last7 = useMemo(() => {
    const arr = (snapshots || []).slice(-7).map((s) => ({ date: s.snapshot_date, views: Number(s.views || 0) }));
    return arr.length ? arr : [{ date: new Date().toISOString(), views: Number(metrics?.views30d || 0) }];
  }, [snapshots, metrics]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left big card */}
      <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">Last 30 Days Views</div>
            <div className="text-xl font-bold mt-2">
              {metrics?.views30d ? Number(metrics.views30d).toLocaleString() : "-"}
            </div>
          </div>
          <div style={{ width: 260, height: 80 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={last7}>
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip />
                <Line dataKey="views" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Right stacked */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div>
            <div className="text-xs text-gray-500">Estimated Revenue (30 days)</div>
            <div className="text-lg font-extrabold mt-1">
              {metrics?.revenue30_label || "-"}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div>
            <div className="text-xs text-gray-500">Subscribers gained (30 days)</div>
            <div className="text-lg font-bold mt-1">
              {metrics?.subs30d ? Number(metrics.subs30d).toLocaleString() : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}