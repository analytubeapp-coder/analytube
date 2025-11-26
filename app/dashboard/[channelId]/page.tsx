"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import SearchBar from "@/components/dashboard/SearchBar";

export default function DashboardPage() {
  const { channelId } = useParams();
  const pathname = usePathname(); // ← اضافه شد

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

  /*  ------------ PAGE TITLE LOGIC ------------- */

  // pathname = "/dashboard/UCabc123/competitors"
  const segments = pathname.split("/").filter(Boolean);

  // اگر فقط channelId بود → Dashboard است
  let page = segments[2] ? segments[2] : "dashboard";

  // Capitalize first letter
  page = page.charAt(0).toUpperCase() + page.slice(1);

  // جلوگیری از حالت‌های عجیب
  if (page.includes("?")) page = page.split("?")[0];

  /* -------------------------------------------- */

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex">
      <Sidebar />

      <div className="flex-1 ml-84 p-8">

        {/* ---------- TOP BAR ---------- */}
        <div className="flex items-center justify-between mb-8">

          {/* LEFT — DYNAMIC PAGE TITLE */}
          <h1 className="text-xl font-semibold text-gray-800">
            {page}
          </h1>

          {/* RIGHT — SEARCH BAR */}
          <SearchBar />

        </div>

        {/* ---------- PAGE CONTENT ---------- */}
        <div className="space-y-8">
          {/* TODO: Content */}
        </div>
      </div>
    </div>
  );
}