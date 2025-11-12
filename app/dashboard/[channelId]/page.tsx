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
  <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
    <DashboardNavbar />

    <div className="max-w-7xl mx-auto pt-28 md:pt-36 pb-12 px-6 flex-1">
      
      {/* ✅ Header */}
      <div className="mb-10">
        <TopHeaderCard channel={channel} snapshots={snapshots} />
      </div>

      {/* ✅ Channel Overview */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Channel Overview</h2>
      <div className="mb-10">
        <ChannelOverview channel={channel} keywords={data.keywords ?? []} />
      </div>

      {/* ✅ Last 30 Days Performance */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Last 30 Days Performance</h2>
      <div className="mb-10">
        <Last30Row snapshots={snapshots} metrics={metrics} />
      </div>

      {/* ✅ Top Videos */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Top 5 Videos (Last 30 Days)</h2>
      <div className="mb-10">
        <TopVideosTable channelId={channel.channel_id ?? ""} limit={5} />
      </div>

      {/* ✅ Daily Metrics */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Channel Metrics</h2>
      <div className="mb-10">
        <DailyMetrics snapshots={snapshots} />
      </div>

      {/* ✅ Monthly Views */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Views in the Last 30 Days</h2>
      <div className="mb-10">
        <MonthlyViewsChart snapshots={snapshots} />
      </div>

      {/* ✅ Monthly Subs */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscribers in the Last 30 Days</h2>
      <div className="mb-10">
        <MonthlySubscribersChart snapshots={snapshots} />
      </div>

    </div>

    <Footer />
  </div>
);
}