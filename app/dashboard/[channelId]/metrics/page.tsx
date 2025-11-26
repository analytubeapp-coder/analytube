"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import SearchBar from "@/components/dashboard/SearchBar";

export default function MetricsPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex">
      <Sidebar />

      <div className="flex-1 ml-84 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Metrics</h1>
          <SearchBar />
        </div>

        <p className="text-gray-500">Metrics page loaded.</p>
      </div>
    </div>
  );
}