"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import SearchBar from "@/components/dashboard/SearchBar";
import TopHeaderCard from "@/components/dashboard/TopHeaderCard";

export default function DashboardPage() {
  const { channelId } = useParams();
  const pathname = usePathname();

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

  // -------------------------------------
  // FIX: Extract channel + snapshots
  // -------------------------------------
  const channel = data.channel;
  const snapshots = data.snapshots ?? [];

  // -------------------------------------
  // PAGE TITLE LOGIC
  // -------------------------------------
  const segments = pathname.split("/").filter(Boolean);

  let page = segments[2] ? segments[2] : "dashboard";

  page = page.charAt(0).toUpperCase() + page.slice(1);

  if (page.includes("?")) page = page.split("?")[0];

  // -------------------------------------

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex">
      <Sidebar />

      <div className="flex-1 ml-100 p-8">
        
        {/* ---------- TOP BAR ---------- */}
        <div className="flex items-center justify-between mb-8">

          {/* LEFT — PAGE TITLE */}
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            {page}
          </h1>

          {/* RIGHT — SEARCH BAR */}
          <SearchBar />
        </div>

        {/* ---------- PAGE CONTENT ---------- */}
        <div className="space-y-8">
          <TopHeaderCard channel={channel} snapshots={snapshots} />
        </div>

      </div>
    </div>
  );
}