// app/dashboard/[channelId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import TopHeaderCard, { Channel } from "@/components/dashboard/TopHeaderCard";
import LifetimeViewsCard from "@/components/dashboard/LifetimeViewsCard";
import LifetimeRevenueCard from "@/components/dashboard/LifetimeRevenueCard";
import Last30Row from "@/components/dashboard/Last30Row";
import TopVideosTable from "@/components/dashboard/TopVideosTable";
import DailyMetrics from "@/components/dashboard/DailyMetrics";
import MonthlyCharts from "@/components/dashboard/MonthlyCharts";
import ChannelOverview from "@/components/dashboard/ChannelOverview";

export default function DashboardPage() {
  const params = useParams();
  const rawId = params?.channelId;
  const channelId = Array.isArray(rawId) ? rawId[0] : rawId || "";

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
        if (!res.ok) {
          console.error("API ERROR RESPONSE:", text);
          throw new Error("Channel API failed");
        }
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
    return () => { mounted = false; };
  }, [channelId]);

  if (loading) return <div className="flex h-screen items-center justify-center text-gray-500">Loading channel data...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500">❌ {error}</div>;
  if (!data?.channel) return <div className="flex h-screen items-center justify-center text-gray-500">Channel not found</div>;

  const channel: Channel = data.channel;
  const snapshots = data.snapshots || [];
  const metrics = data.metrics || {};

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto py-8 px-6">
        {/* Header big card (full width) */}
        <div className="mb-8">
          <TopHeaderCard channel={channel} snapshots={snapshots} />
        </div>

        <ChannelOverview
  channel={channel}
  keywords={data.keywords ?? []}
/>

        {/* Row 3: Last 30 row (left big + right stacked) */}
        <div className="mb-8">
          <Last30Row snapshots={snapshots} metrics={metrics} />
        </div>

        {/* Row 4: Top videos table */}
        <div className="mb-8">
          <TopVideosTable channelId={channel.channel_id} limit={5} />
        </div>

        {/* Row 5: Daily metrics */}
        <div className="mb-8">
          <DailyMetrics snapshots={snapshots} />
        </div>

        {/* Row 6 & 7: Monthly charts */}
        <div className="mb-8">
          <MonthlyCharts snapshots={snapshots} />
        </div>
      </div>
    </div>
  );
}