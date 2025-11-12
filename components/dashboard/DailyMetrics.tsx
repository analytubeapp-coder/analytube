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
      <div className="bg-white rounded-2xl p-6 border border-[#eee]">
        <p className="text-gray-500">No daily metrics available</p>
      </div>
    );
  }

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

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#eee] mb-10">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-600 border-b border-gray-200">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Subscribers</th>
              <th className="p-3 text-center">Views</th>
              <th className="p-3 text-center">Daily Views</th>
              <th className="p-3 text-center">Videos</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(-14).reverse().map((r: any) => (
              <tr key={r.date} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                <td className="p-3">{new Date(r.date).toLocaleDateString()}</td>
                <td className="p-3 text-center">{shortFmt(r.subscribers)}</td>
                <td className="p-3 text-center">{shortFmt(r.views)}</td>
                <td className="p-3 text-center">{shortFmt(r.dailyViews)}</td>
                <td className="p-3 text-center">{r.videos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}