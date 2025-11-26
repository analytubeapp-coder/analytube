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
    <div className="w-full bg-[#fcfcfc] p-6 rounded-[8px] border border-gray-200">

      <div className="flex items-center gap-6">

        {/* PROFILE */}
        <Image
          src={channel.thumbnail_url || "/placeholder.png"}
          alt={channel.title}
          width={80}
          height={80}
          className="rounded-full border border-gray-100"
        />

        <div className="flex flex-col">
          <h2 className="text-[24px] font-bold text-gray-900 leading-none">
            {channel.title}
          </h2>

          <span className="text-sm text-gray-500 font-medium mt-1">
            @{channel.title.replace(/\s+/g, "").toLowerCase()}
          </span>
        </div>

        {/* STATS */}
        <div className="flex justify-end flex-1 gap-20">

          {[
            { label: "Subscribers", value: shortSubs(channel.subscribers) },
            { label: "Views", value: channel.views.toLocaleString() },
            { label: "Videos", value: channel.videos.toLocaleString() },
            { label: "Created", value: date },
          ].map((item) => (
            <div key={item.label} className="flex flex-col text-right">
              <span className="text-sm font-medium text-gray-500">
                {item.label}
              </span>
              <span className="text-xl font-semibold text-gray-900 tracking-tight">
                {item.value}
              </span>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}