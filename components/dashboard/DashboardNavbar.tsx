"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function DashboardNavbar() {
  const [q, setQ] = useState(""); // کانال اول
  const [compare, setCompare] = useState(""); // کانال دوم
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  // کانال اول خودکار پر شود وقتی q تغییر کند
  const [compare1, setCompare1] = useState("");
  useEffect(() => {
    if (q) setCompare1(q);
  }, [q]);

  const handleSearch = () => {
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/dashboard/${encodeURIComponent(trimmed)}`);
  };

  const handleCompare = async () => {
    const c1 = compare1.trim();
    const c2 = compare.trim();

    if (!c1 || !c2) {
      alert("Please enter both channels to compare.");
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      setShowModal(true);
      return;
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error(error);
      alert("Error checking account.");
      return;
    }

    if (profile.plan === "free") {
      setShowModal(true);
      return;
    }

    router.push(`/compare?c1=${encodeURIComponent(c1)}&c2=${encodeURIComponent(c2)}`);
  };

  return (
    <>
      <nav className="w-full bg-white fixed top-0 left-0 z-50 shadow">
        <div className="w-full px-6 md:px-20 py-4 md:py-7 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">

          {/* Logo */}
          <Image
            src="/logoo.svg"
            alt="AnalyTube Logo"
            width={150}
            height={80}
            className="cursor-pointer translate-y-[-2px]"
            onClick={() => router.push("/")}
          />

          {/* Middle section */}
          <div className="flex flex-col md:flex-row items-center w-full md:max-w-2xl gap-3 md:gap-4">

            {/* Compare Search Box */}
            <div className="flex items-center w-full md:w-72 bg-[#f5f5f5] rounded-full overflow-hidden">
              <input
                value={compare1}
                onChange={(e) => setCompare1(e.target.value)}
                type="text"
                placeholder="Channel 1"
                className="flex-grow bg-transparent px-4 py-3 text-sm md:text-base focus:outline-none"
              />
              <input
                value={compare}
                onChange={(e) => setCompare(e.target.value)}
                type="text"
                placeholder="Channel 2"
                className="flex-grow bg-transparent px-4 py-3 text-sm md:text-base focus:outline-none"
              />
              <button
                onClick={handleCompare}
                className="bg-[#E94C88] w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#DA3B72] transition"
                aria-label="compare"
              >
                <Search size={20} className="text-white" />
              </button>
            </div>

            {/* Main Search Box */}
            <div className="flex items-center w-full bg-[#f5f5f5] rounded-full overflow-hidden">
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
        </div>
      </nav>

      {/* Modal for Free users */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Upgrade Required</h2>
            <p className="mb-6">This feature is only available for Pro users.</p>
            <button
              onClick={() => router.push("/pricing")}
              className="bg-[#E94C88] text-white px-4 py-2 rounded hover:bg-[#DA3B72] transition"
            >
              Go to Pricing
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="ml-2 px-4 py-2 rounded border hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}