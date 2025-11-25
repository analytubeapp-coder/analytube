// app/dashboard/[channelId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import TopHeaderCard, { Channel } from "@/components/dashboard/TopHeaderCard";
import ChannelOverview from "@/components/dashboard/ChannelOverview";
import Last30Row from "@/components/dashboard/Last30Row";
import TopVideosTable from "@/components/dashboard/TopVideosTable";
import DailyMetrics from "@/components/dashboard/DailyMetrics";
import MonthlySubscribersChart from "@/components/dashboard/MonthlySubscribersChart";
import MonthlyViewsChart from "@/components/dashboard/MonthlyViewsChart";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const params = useParams();
  const rawId = params?.channelId;
  const channelId: string = Array.isArray(rawId) ? rawId[0] : rawId || "";

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!channelId) return;
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/api/youtube/channel?id=${encodeURIComponent(channelId)}`);
        const text = await res.text();
        if (!res.ok) throw new Error("Channel API failed");

        const json = JSON.parse(text);
        if (!mounted) return;
        setData(json);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load channel data");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => { mounted = false };
  }, [channelId]);

  if (loading)
    return <div className="flex h-screen items-center justify-center text-gray-500">Loading...</div>;

  if (error)
    return <div className="flex h-screen items-center justify-center text-red-500">❌ {error}</div>;

  if (!data?.channel)
    return <div className="flex h-screen items-center justify-center text-gray-500">Channel not found</div>;

  const channel: Channel = data.channel;
  const snapshots = data.snapshots || [];
  const metrics = data.metrics || {};

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#eef2ff] via-[#f7f3ff] to-white">

      <DashboardNavbar />

      <div className="max-w-6xl mx-auto pt-32 pb-20 px-4 md:px-6 flex-1">

        {/* Header Card */}
        <div className="mb-10">
          <TopHeaderCard channel={channel} snapshots={snapshots} />
        </div>

        {/* Section: Overview */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Channel Overview</h2>
        <div className="mb-10">
          <ChannelOverview channel={channel} keywords={data.keywords ?? []} />
        </div>

        {/* Section: Performance */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Performance Insights</h2>
        <div className="mb-10">
          <Last30Row snapshots={snapshots} metrics={metrics} />
        </div>

        {/* Section: Top Videos */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Top 5 Videos (Last 30 Days)</h2>
        <div className="mb-10">
          <TopVideosTable channelId={channel.channel_id ?? ""} limit={5} />
        </div>

        {/* Section: Daily Metrics */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Daily Metrics</h2>
        <div className="mb-10">
          <DailyMetrics snapshots={snapshots} />
        </div>

        {/* Section: Monthly Views */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Views in the Last 30 Days</h2>
        <div className="mb-10">
          <MonthlyViewsChart snapshots={snapshots} />
        </div>

        {/* Section: Monthly Subscribers */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Subscribers in the Last 30 Days</h2>
        <div className="mb-10">
          <MonthlySubscribersChart snapshots={snapshots} />
        </div>

      </div>
      <Footer />
    </div>
  );
}