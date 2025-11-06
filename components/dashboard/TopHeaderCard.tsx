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
    return `${(subs / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;

  if (subs >= 1_000_000)
    return `${(subs / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;

  if (subs >= 1_000)
    return `${(subs / 1_000).toFixed(1).replace(/\.0$/, "")}K`;

  return subs.toLocaleString();
};

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* LEFT CARD — Profile */}
      <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-5">
        <Image
          src={channel.thumbnail_url || "/placeholder.png"}
          alt={channel.title}
          width={90}
          height={90}
          className="rounded-full"
        />

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            {channel.title}
          </h2>
          <span className="text-base text-gray-500 font-medium">
            @{channel.title.replace(/\s+/g, "").toLowerCase()}
          </span>
        </div>
      </div>

      {/* RIGHT CARD — Stats */}
      <div className="bg-white p-8 rounded-2xl shadow-sm md:col-span-2 flex justify-between gap-10 items-center">

        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600 font-semibold">Subscribers</span>
          <span className="text-2xl font-bold text-gray-900">
            {shortSubs(channel.subscribers)}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600 font-semibold">Views</span>
          <span className="text-2xl font-bold text-gray-900">
            {channel.views.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600 font-semibold">Videos</span>
          <span className="text-2xl font-bold text-gray-900">
            {channel.videos.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-600 font-semibold">Created On</span>
          <span className="text-2xl font-bold text-gray-900">
            {date}
          </span>
        </div>

      </div>
    </div>
  );
}