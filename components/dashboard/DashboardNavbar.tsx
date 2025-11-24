// components/dashboard/DashboardNavbar.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// ✔️ Supabase client (بهینه – خارج از کامپوننت ساخته می‌شود)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardNavbar({ userId }: { userId?: string }) {
  const [q, setQ] = useState("");
  const [compare, setCompare] = useState("");
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const params = useParams();

  // ✔️ کانال فعلی که داخل URL هست (اگر وجود داشته باشد)
  const currentChannel = params?.channelId as string | undefined;

  // ---------------------------
  // ▶️ SEARCH handler
  // ---------------------------
  const handleSearch = () => {
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/dashboard/${encodeURIComponent(trimmed)}`);
  };

  // ---------------------------
  // ▶️ COMPARE handler (اصلاح‌شده)
  // ---------------------------
  const handleCompare = async () => {
    const trimmed = compare.trim();
    if (!trimmed) return;

    // ✔️ اگر q خالی بود → main = کانال فعلی
    const mainChannel = q.trim() || currentChannel;

    // ❗ اگر هیچ کانال اصلی نداریم (مثلاً صفحه Home)
    if (!mainChannel) {
      setShowModal(true);
      return;
    }

    // ❗ اگر لاگین نیست
    if (!userId) {
      setShowModal(true);
      return;
    }

    // بررسی پلن کاربر
    const { data, error } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", userId)
      .single();

    if (error || !data || data.plan === "free") {
      setShowModal(true);
      return;
    }

    // ✔️ اشتراک Pro → رفتن به compare
    router.push(
      `/compare?main=${encodeURIComponent(mainChannel)}&target=${encodeURIComponent(trimmed)}`
    );
  };

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-[999] shadow-sm">
      <div className="flex items-center px-4 md:px-20 py-3 md:py-4">

        {/* Logo */}
        <Image
          src="/logoo.svg"
          alt="AnalyTube Logo"
          width={120}
          height={50}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />

        {/* SEARCH AREA */}
        <div className="flex items-center ml-auto space-x-3">

          {/* MAIN SEARCH (کوچیک شده و تمیز) */}
          <div className="flex items-center w-[280px] md:w-[360px] bg-[#f5f5f5] rounded-full overflow-hidden h-10 md:h-11">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Channel or paste URL"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-grow bg-transparent px-3 text-sm md:text-base focus:outline-none h-full"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="bg-[#E94C88] w-10 md:w-11 h-full flex items-center justify-center hover:bg-[#DA3B72] transition"
            >
              <Search size={18} className="text-white" />
            </button>
          </div>

          {/* COMPARE SEARCH (کوچیک‌تر) */}
          <div className="flex items-center w-[200px] md:w-[240px] bg-[#f5f5f5] rounded-full overflow-hidden h-10 md:h-11">
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
              className="bg-[#E94C88] w-10 md:w-11 h-full flex items-center justify-center hover:bg-[#DA3B72] transition"
            >
            <Search size={16} className="text-white" />
            </button>
          </div>

        </div>
      </div>

      {/* MODAL: Upgrade */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999]">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full text-center animate-fadeIn">
            <h2 className="text-lg md:text-xl font-bold mb-2">Upgrade Required</h2>
            <p className="text-gray-600 mb-5">
              Comparing channels is available only for PRO users.
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