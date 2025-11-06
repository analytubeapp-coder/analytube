//components/dashboard/DashboardNavbar.tsx

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/dashboard/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="bg-white border-b border-gray-100 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* ✅ Brand Logo */}
        <Image
          src="/logo.svg"
          alt="Analytube"
          width={135}
          height={40}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />

        {/* ✅ Search Box EXACT like Homepage */}
        <div className="flex items-center w-full max-w-lg bg-[#f5f5f5] rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Search Channel or paste URL"
            className="flex-grow bg-transparent px-6 py-3 text-sm md:text-base focus:outline-none"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <button
            onClick={handleSearch}
            className="bg-[#bfd62e] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#a7bd28] transition"
            aria-label="search"
          >
            <Search size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}