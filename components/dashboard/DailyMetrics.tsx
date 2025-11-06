// components/dashboard/DailyMetrics.tsx
"use client";
import React from "react";

function shortFmt(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

export default function DailyMetrics({ snapshots }: { snapshots: any[] }) {
  if (!snapshots || snapshots.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <p className="text-gray-500">No daily metrics available</p>
      </div>
    );
  }

  // compute daily diffs for views
  const rows = snapshots.map((s: any, i: number) => {
    const prev = snapshots[i - 1];
    const views = Number(s.views || 0);
    const prevViews = prev ? Number(prev.views || 0) : 0;
    const dailyViews = i === 0 ? 0 : Math.max(0, views - prevViews);
    return {
      date: s.snapshot_date,
      subscribers: Number(s.subscribers || 0),
      likes: Number(s.likes || 0),
      videos: Number(s.videos || 0),
      views,
      dailyViews,
    };
  });

  // daily average over available days (exclude first if it doesn't have a delta)
  const deltas = rows.slice(1).map((r) => r.dailyViews);
  const avg = deltas.length ? Math.round(deltas.reduce((a, b) => a + b, 0) / deltas.length) : 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Daily Channel Metrics</h3>
        <div className="text-sm text-gray-500">Daily average views: <span className="font-bold">{shortFmt(avg)}</span></div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-600">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Subscribers</th>
              <th className="p-2">Views</th>
              <th className="p-2">Daily Views</th>
              <th className="p-2">Videos</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(-14).reverse().map((r: any) => (
              <tr key={r.date} className="border-t hover:bg-gray-50">
                <td className="p-2">{new Date(r.date).toLocaleDateString()}</td>
                <td className="p-2">{shortFmt(r.subscribers)}</td>
                <td className="p-2">{shortFmt(r.views)}</td>
                <td className="p-2">{shortFmt(r.dailyViews)}</td>
                <td className="p-2">{r.videos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}