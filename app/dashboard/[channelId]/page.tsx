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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!channelId) return;
    load();
  }, [channelId]);

  async function load() {
    try {
      setLoading(true);
      const res = await fetch(`/api/youtube/channel?id=${channelId}`);
      const json = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!data || !data.channel) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Channel not found
      </div>
    );
  }

  // -------------------------------------
  // Extract channel + snapshots
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
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            {page}
          </h1>
          <SearchBar />
        </div>

        {/* ---------- PAGE CONTENT ---------- */}
        <div className="space-y-10">
          <TopHeaderCard channel={channel} snapshots={snapshots} />
        </div>

      </div>
    </div>
  );
}