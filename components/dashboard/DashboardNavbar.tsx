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
    <nav className="w-full bg-white fixed top-0 left-0 z-50">
      <div className="w-full px-20 py-7 flex items-center justify-between">

        {/* ✅ Logo - Exactly like main navbar */}
        <Image
          src="/logoo.svg"
          alt="AnalyTube Logo"
          width={150}
          height={80}
          className="cursor-pointer translate-y-[-2px]"
          onClick={() => router.push("/")}
        />

        {/* ✅ Search Box - Same as homepage */}
        <div className="flex items-center w-full max-w-xl bg-[#f5f5f5] rounded-full overflow-hidden">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="text"
            placeholder="Search Channel or paste URL"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-grow bg-transparent px-6 py-3 text-sm md:text-base focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-[#E94C88] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#DA3B72] transition"
            aria-label="search"
          >
            <Search size={20} className="text-white" />
          </button>
        </div>

      </div>
    </nav>
  );
}