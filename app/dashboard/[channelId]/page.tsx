"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import SearchBar from "@/components/dashboard/SearchBar";

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

  return (
    <div className="min-h-screen bg-[#Fcfcfc] flex">
      <Sidebar />
      <div className="flex-1 ml-72 p-8">
        <div className="flex items-center justify-between mb-8">
          <SearchBar />
          <button className="ml-4 bg-[#E94C88] text-white px-6 py-3 rounded-[10px] hover:bg-[#d53c74] transition">
            Export
          </button>
        </div>

        <div className="space-y-8">
          {/* TODO: HeaderV2, MetricCards, ... */}
        </div>
      </div>
    </div>
  );
}