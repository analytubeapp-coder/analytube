"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardPage() {
  const { channelId } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!channelId) return;
    load();
  }, [channelId]);

  async function load() {
    const res = await fetch(`/api/youtube/channel?id=${channelId}`);
    const json = await res.json();
    setData(json);
  }

  if (!data) return <div>Loading...</div>;

  const channel = data.channel;
  const snapshots = data.snapshots ?? [];

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex">

      {/* ---- LEFT SIDEBAR ---- */}
      <Sidebar />

      {/* ---- RIGHT CONTENT ---- */}
      <div className="flex-1 ml-64 p-8">

        {/* Search + Export */}
        <div className="flex items-center justify-between mb-8">
          
          {/* Search Box */}
          <div className="flex items-center w-full max-w-xl bg-white px-5 py-3 rounded-xl shadow-sm border">
            <input
              type="text"
              placeholder="Search channel…"
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Export Button */}
          <button className="ml-4 bg-[#E94C88] text-white px-6 py-3 rounded-xl hover:bg-[#d53c74] transition">
            Export
          </button>
        </div>

        {/* Dashboard Content (هنوز کامپوننت‌ها را اضافه می‌کنیم) */}
        <div className="space-y-8">

          {/* TODO: HeaderV2 */}
          {/* TODO: MetricCards */}
          {/* TODO: MainChart */}
          {/* TODO: TopVideos */}
          {/* TODO: Insights */}
          {/* TODO: Forecast */}

        </div>

      </div>

    </div>
  );
}