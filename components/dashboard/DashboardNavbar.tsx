// components/dashboard/DashboardNavbar.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export default function DashboardNavbar({ userId }: { userId?: string }) {
  const [q, setQ] = useState("");
  const [compare, setCompare] = useState("");
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

    if (!userId) {
      setShowModal(true);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", userId)
      .single();

    if (!data || !data.plan || data.plan === "free") {
      setShowModal(true);
      return;
    }

    if (data.plan === "monthly" || data.plan === "yearly") {
      router.push(
        `/app/compare?main=${encodeURIComponent(q)}&target=${encodeURIComponent(compare)}`
      );
    }
  };

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50">
      <div className="flex items-center px-4 md:px-20 py-3 md:py-5">
        {/* Logo */}
        <Image
          src="/logoo.svg"
          alt="AnalyTube Logo"
          width={130}
          height={56}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />

        {/* SEARCHES wrapper */}
<div className="flex items-center ml-auto space-x-4">

  {/* MAIN SEARCH — بزرگ‌تر — سمت چپ */}
  <div className="flex items-center w-[450px] md:w-[520px] bg-[#f5f5f5] rounded-full overflow-hidden h-12">
    <input
      value={q}
      onChange={(e) => setQ(e.target.value)}
      placeholder="Search Channel or paste URL"
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      className="flex-grow bg-transparent px-4 text-sm md:text-base focus:outline-none h-full"
    />
    <button
      type="button"
      onClick={handleSearch}
      className="bg-[#E94C88] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#DA3B72] transition"
    >
      <Search size={20} className="text-white" />
    </button>
  </div>

  {/* COMPARE SEARCH — کوچک‌تر — سمت راست */}
  <div className="flex items-center w-[260px] md:w-[300px] bg-[#f5f5f5] rounded-full overflow-hidden h-12">
    <input
      value={compare}
      onChange={(e) => setCompare(e.target.value)}
      placeholder="Compare Channel"
      onKeyDown={(e) => e.key === "Enter" && handleCompare()}
      className="flex-grow bg-transparent px-3 text-sm md:text-base focus:outline-none h-full"
    />
    <button
      type="button"
      onClick={handleCompare}
      className="bg-[#e94c88] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#da3b72] transition"
    >
      <Search size={18} className="text-white" />
    </button>
  </div>

</div>
      </div>

      {/* MODAL FOR UPGRADE */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full text-center">
            <h2 className="text-lg md:text-xl font-bold mb-3">Upgrade Required</h2>
            <p className="text-gray-600 mb-4 md:mb-6">
              Comparing two channels is available only for PRO users.
            </p>
            <button
              onClick={() => router.
                push("/pricing")}
              className="bg-[#E94C88] text-white w-full py-2 md:py-3 rounded-xl hover:bg-[#DA3B72] transition"
            >
              Upgrade to PRO
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="mt-3 md:mt-4 text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}