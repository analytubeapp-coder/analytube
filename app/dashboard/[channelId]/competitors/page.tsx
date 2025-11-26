"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import SearchBar from "@/components/dashboard/SearchBar";

export default function CompetitorsPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex">
      <Sidebar />

      <div className="flex-1 ml-84 p-8">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold">Competitors</h1>
          <SearchBar />
        </div>

        <p className="text-gray-500">Competitors page loaded.</p>

      </div>
    </div>
  );
}