// components/dashboard/TopHeaderCard.tsx
"use client";

import Image from "next/image";

export interface Channel {
  channel_id: string;
  title: string;
  thumbnail_url: string | null;
  subscribers: number;
  views: number;
  videos: number;
  created_at: string | null;
}

interface Props {
  channel: Channel;
  snapshots: any[];
}

export default function TopHeaderCard({ channel }: Props) {
  const date = channel.created_at
    ? new Date(channel.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  const shortSubs = (subs: number) => {
    if (subs >= 1_000_000_000)
      return `${(subs / 1_000_000_000)
        .toFixed(1)
        .replace(/\.0$/, "")}B`;
    if (subs >= 1_000_000)
      return `${(subs / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
    if (subs >= 1_000)
      return `${(subs / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
    return subs.toLocaleString();
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pb-6">

      {/* LEFT CARD — Profile */}
      <div className="bg-white p-5 rounded-xl border border-[#e5e5e5] shadow-sm flex items-center gap-4">
        <Image
          src={channel.thumbnail_url || "/placeholder.png"}
          alt={channel.title}
          width={85}
          height={85}
          className="rounded-full"
        />

        <div className="flex flex-col gap-0.5">
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
            {channel.title}
          </h2>
          <span className="text-sm text-gray-500 font-medium">
            @{channel.title.replace(/\s+/g, "").toLowerCase()}
          </span>
        </div>
      </div>

      {/* RIGHT CARD — Stats */}
      <div className="bg-white p-5 rounded-xl border border-[#e5e5e5] shadow-sm md:col-span-2 flex justify-between gap-6 items-center">

        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-gray-600">Subscribers</span>
          <span className="text-2xl font-semibold text-gray-900 tracking-tight">
            {shortSubs(channel.subscribers)}
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-gray-600">Views</span>
          <span className="text-2xl font-semibold text-gray-900 tracking-tight">
            {channel.views.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-gray-600">Videos</span>
          <span className="text-2xl font-semibold text-gray-900 tracking-tight">
            {channel.videos.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-gray-600">Created On</span>
          <span className="text-2xl font-semibold text-gray-900 tracking-tight">
            {date}
          </span>
        </div>

      </div>

    </div>
  );
}