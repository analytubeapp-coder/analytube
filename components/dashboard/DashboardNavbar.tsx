// components/dashboard/DashboardNavbar.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function DashboardNavbar({ userId }: { userId?: string }) {
  const [q, setQ] = useState(""); // main search
  const [compare, setCompare] = useState(""); // comparison search
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSearch = () => {
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/dashboard/${encodeURIComponent(trimmed)}`);
  };

  const handleCompare = async () => {
    const trimmed = compare.trim();
    if (!trimmed) return;

    // ⭐ Check if user is logged in
    if (!userId) {
      setShowModal(true);
      return;
    }

    // ⭐ Fetch user plan from Supabase
    const { data } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", userId)
      .single();

    // If no plan or FREE
    if (!data || !data.plan || data.plan === "free") {
      setShowModal(true);
      return;
    }

    // ⭐ If user is PRO → allow comparison
    if (data.plan === "monthly" || data.plan === "yearly") {
      router.push(
        `/app/compare?main=${encodeURIComponent(q)}&target=${encodeURIComponent(compare)}`
      );
    }
  };

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50">
      <div className="w-full px-20 py-7 flex items-center justify-between gap-6">
        <Image
          src="/logoo.svg"
          alt="AnalyTube Logo"
          width={150}
          height={80}
          className="cursor-pointer translate-y-[-2px]"
          onClick={() => router.push("/")}
        />

        {/* MAIN SEARCH */}
        <div className="flex items-center w-full max-w-xl bg-[#f5f5f5] rounded-full overflow-hidden">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Channel or paste URL"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-grow bg-transparent px-6 py-3 text-sm md:text-base focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-[#E94C88] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#DA3B72] transition"
          >
            <Search size={20} className="text-white" />
          </button>
        </div>

        {/* SECOND SEARCH FOR COMPARISON */}
        <div className="flex items-center w-full max-w-md bg-[#eef0f2] rounded-full overflow-hidden">
          <input
            value={compare}
            onChange={(e) => setCompare(e.target.value)}
            placeholder="Compare with another channel..."
            onKeyDown={(e) => e.key === "Enter" && handleCompare()}
            className="flex-grow bg-transparent px-6 py-3 text-sm md:text-base focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCompare}
            className="bg-[#0c7bce] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#065a99] transition"
          >
            <Search size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* MODAL FOR UPGRADE */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Upgrade Required</h2>
            <p className="text-gray-600 mb-6">
              Comparing two channels is available only for PRO users.
            </p>
            <button
              onClick={() => router.push("/pricing")}
              className="bg-[#E94C88] text-white w-full py-3 rounded-xl hover:bg-[#DA3B72] transition"
            >
              Upgrade to PRO
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}