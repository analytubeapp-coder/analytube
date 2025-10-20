// app/channel/[channelId]/page.tsx
import React from "react";
import Image from "next/image";
import ChannelKpis from "@/components/ChannelKpis";
import ChannelVideosClient from "@/components/ChannelVideosClient";
import dayjs from "dayjs";
import ChannelAnalytics from "@/components/ChannelAnalytics";

type Props = { params: { channelId: string } };

async function fetchChannelInfo(channelId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/channel-info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // server route uses server-only key; calling from server component is fine
    body: JSON.stringify({ channelId }),
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`channel-info failed: ${res.status} ${txt}`);
  }
  return res.json();
}

export default async function ChannelPage({ params }: Props) {
  const channelId = params.channelId;
  let info: any = null;

  try {
    info = await fetchChannelInfo(channelId);
  } catch (err: any) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">خطا در دریافت اطلاعات کانال</h1>
        <p className="mt-4 text-red-600">{err.message}</p>
      </div>
    );
  }

  // info shape from /api/channel-info
  const { title, thumbnails, subscribers, views, videos, country } = info;

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            {thumbnails?.high?.url ? (
              <Image src={thumbnails.high.url} alt={title} width={96} height={96} />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">{title}</h1>
            <div className="text-sm text-gray-500">
              <span>{subscribers?.toLocaleString() ?? "—"} subscribers</span>
              <span className="mx-2">•</span>
              <span>{views?.toLocaleString() ?? "—"} views</span>
              <span className="mx-2">•</span>
              <span>{videos ?? "—"} videos</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">Country: {country ?? "—"}</div>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <button className="px-4 py-2 bg-[#bfd62e] text-white rounded-lg shadow">Follow</button>
          <div className="text-sm text-gray-500">Last updated: {dayjs().format("YYYY-MM-DD")}</div>
        </div>
      </div>

      {/* KPIs & Overview */}
      <section className="mt-8">
        <ChannelKpis
          channelId={channelId}
          subscribers={subscribers}
          views={views}
          videosCount={videos}
        />
        <section className="mt-6">
      <ChannelAnalytics channelId={channelId} />
    </section>
      </section>

      {/* TABS */}
      <section className="mt-8">
        <div className="border-b">
          <nav className="flex gap-6 text-sm">
            <a className="pb-3 border-b-2 border-transparent hover:border-gray-300">Overview</a>
            <a className="pb-3 border-b-2 border-transparent hover:border-gray-300">Videos</a>
            <a className="pb-3 border-b-2 border-transparent hover:border-gray-300">Shorts</a>
            <a className="pb-3 border-b-2 border-transparent hover:border-gray-300">About</a>
          </nav>
        </div>

        {/* TAB CONTENT: Overview + Videos (Videos client loaded) */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Overview cards (KPIs repeated or expanded) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl shadow">
                <div className="text-sm text-gray-500">Subscribers</div>
                <div className="text-xl font-semibold">{subscribers?.toLocaleString() ?? "—"}</div>
              </div>
              <div className="p-4 bg-white rounded-xl shadow">
                <div className="text-sm text-gray-500">Views</div>
                <div className="text-xl font-semibold">{views?.toLocaleString() ?? "—"}</div>
              </div>
              <div className="p-4 bg-white rounded-xl shadow">
                <div className="text-sm text-gray-500">Videos</div>
                <div className="text-xl font-semibold">{videos ?? "—"}</div>
              </div>
            </div>

            {/* Recent videos (client component handles list & pagination) */}
            <div className="bg-white rounded-xl shadow p-4">
              <h3 className="font-semibold mb-4">Recent videos</h3>
              <ChannelVideosClient channelId={channelId} />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="p-4 bg-white rounded-xl shadow">
              <div className="text-sm text-gray-500">Quick Actions</div>
              <div className="mt-3 flex flex-col gap-2">
                <button className="px-3 py-2 bg-[#f5f5f5] rounded">Compare</button>
                <button className="px-3 py-2 bg-[#f5f5f5] rounded">Export CSV</button>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl shadow">
              <div className="text-sm text-gray-500">Channel Info</div>
              <div className="mt-2 text-sm text-gray-700">{info.description?.slice(0, 200)}...</div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
