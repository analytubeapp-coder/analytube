// components/ChannelKpis.tsx
"use client";
import React from "react";

export default function ChannelKpis({
  channelId,
  subscribers,
  views,
  videosCount,
}: {
  channelId: string;
  subscribers?: number;
  views?: number;
  videosCount?: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl p-4 shadow">
        <div className="text-xs text-gray-500">Subscribers</div>
        <div className="text-2xl font-semibold">{subscribers?.toLocaleString() ?? "—"}</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow">
        <div className="text-xs text-gray-500">Views</div>
        <div className="text-2xl font-semibold">{views?.toLocaleString() ?? "—"}</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow">
        <div className="text-xs text-gray-500">Videos</div>
        <div className="text-2xl font-semibold">{videosCount ?? "—"}</div>
      </div>
    </div>
  );
}
