// components/dashboard/DashboardNavbar.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function DashboardNavbar() {
  const [q, setQ] = useState("");
  const [compare, setCompare] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const supabase = createClientComponentClient();

  const currentChannel = Array.isArray(params?.channelId)
    ? params.channelId[0]
    : (params?.channelId as string | undefined);

  // گرفتن userId از Supabase Auth
  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);
      console.log("Fetched userId:", user?.id);
    }
    fetchUser();
  }, [supabase]);

  const handleSearch = () => {
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/dashboard/${encodeURIComponent(trimmed)}`);
  };

  const handleCompare = async () => {
    const trimmedCompare = compare.trim();
    if (!trimmedCompare) return;

    const mainChannel = q.trim() || currentChannel;
    if (!mainChannel) {
      console.log("No main channel specified.");
      setShowModal(true);
      return;
    }

    if (!userId) {
      console.log("No userId available yet.");
      setShowModal(true);
      return;
    }

    console.log("userId being used for Supabase query:", userId);

    const { data, error } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", userId)
      .single();

    console.log("Supabase response:", { data, error });

    if (error || !data?.plan) {
      console.error("Supabase error or plan not found:", error);
      setShowModal(true);
      return;
    }

    const plan = data.plan.trim().toLowerCase();
    console.log("User plan:", plan);

    if (plan === "free") {
      console.log("Plan is free → showing modal");
      setShowModal(true);
      return;
    }

    if (plan === "monthly" || plan === "yearly") {
      console.log("Plan is PRO → navigating to compare");
      router.push(
        `/compare?main=${encodeURIComponent(mainChannel)}&target=${encodeURIComponent(trimmedCompare)}`
      );
    } else {
      console.log("Plan not recognized → showing modal");
      setShowModal(true);
    }
  };

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-60">
      <div className="flex items-center px-4 md:px-20 py-2 md:py-5">

        {/* LOGO */}
        <Image
          src="/logoo.svg"
          alt="AnalyTube Logo"
          width={130}
          height={56}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />

        {/* SEARCHES */}
        <div className="flex items-center ml-auto space-x-4">

          {/* MAIN SEARCH */}
          <div className="flex items-center w-[450px] md:w-[520px] bg-[#f5f5f5] rounded-full overflow-hidden h-10">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Channel or paste URL"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-grow bg-transparent px-4 text-sm md:text-base focus:outline-none h-full"
            />
            <button
              onClick={handleSearch}
              className="bg-[#E94C88] w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#DA3B72] transition"
            >
              <Search size={18} className="text-white" />
            </button>
          </div>

          {/* COMPARE SEARCH */}
          <div className="flex items-center w-[260px] md:w-[300px] bg-[#f5f5f5] rounded-full overflow-hidden h-10">
            <input
              value={compare}
              onChange={(e) => setCompare(e.target.value)}
              placeholder="Compare Channel"
              onKeyDown={(e) => e.key === "Enter" && handleCompare()}
              className="flex-grow bg-transparent px-3 text-sm md:text-base focus:outline-none h-full"
            />
            <button
              onClick={handleCompare}
              className="bg-[#E94C88] w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#DA3B72] transition"
            >
              <Search size={16} className="text-white" />
            </button>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[999]">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full text-center">
            <h2 className="text-lg md:text-xl font-bold mb-3">Upgrade Required</h2>
            <p className="text-gray-600 mb-4">
              Comparing two channels is available only for PRO users.
            </p>

            <button
              onClick={() => router.push("/pricing")}
              className="bg-[#E94C88] text-white w-full py-2 md:py-3 rounded-xl hover:bg-[#DA3B72]"
            >
              Upgrade to PRO
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="mt-3 text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}