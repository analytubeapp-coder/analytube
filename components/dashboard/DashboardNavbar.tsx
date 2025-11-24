//components/dashboard/DashboardNavbar.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function DashboardNavbar() {
  const [q, setQ] = useState("");
  const [compare1, setCompare1] = useState("");
  const [compare2, setCompare2] = useState("");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  // جستجوی اصلی
  const handleSearch = () => {
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/dashboard/${encodeURIComponent(trimmed)}`);
  };

  // جستجوی مقایسه
  const handleCompare = async () => {
    const c1 = compare1.trim();
    const c2 = compare2.trim();
    if (!c1 || !c2) {
      alert("لطفا هر دو کانال را وارد کنید!");
      return;
    }

    // بررسی لاگین بودن کاربر
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setShowUpgradeModal(true);
      return;
    }

    // گرفتن پلن کاربر
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error(error);
      alert("خطا در بررسی حساب کاربری.");
      return;
    }

    if (profile.plan === "free") {
      setShowUpgradeModal(true);
      return;
    }

    // اگر پرو بود، هدایت به صفحه compare
    router.push(`/compare?c1=${encodeURIComponent(c1)}&c2=${encodeURIComponent(c2)}`);
  };

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50">
      <div className="w-full px-6 md:px-20 py-4 md:py-7 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">

        {/* ✅ Logo */}
        <Image
          src="/logoo.svg"
          alt="AnalyTube Logo"
          width={150}
          height={80}
          className="cursor-pointer translate-y-[-2px]"
          onClick={() => router.push("/")}
        />

        {/* 🔹 Middle section */}
        <div className="flex flex-col md:flex-row items-center w-full md:max-w-2xl gap-3 md:gap-4">

          {/* Compare Search Box */}
          <div className="flex items-center w-full md:w-60 bg-[#f5f5f5] rounded-full overflow-hidden">
            <input
              value={compare1}
              onChange={(e) => setCompare1(e.target.value)}
              type="text"
              placeholder="Compare Channel 1"
              className="flex-grow bg-transparent px-4 py-2 text-sm md:text-base focus:outline-none"
            />
            <input
              value={compare2}
              onChange={(e) => setCompare2(e.target.value)}
              type="text"
              placeholder="Compare Channel 2"
              className="flex-grow bg-transparent px-4 py-2 text-sm md:text-base focus:outline-none"
            />
            <button
              onClick={handleCompare}
              className="bg-[#E94C88] w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#DA3B72] transition"
              aria-label="compare"
            >
              <Search size={18} className="text-white" />
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

      {/* 🔹 Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center">
            <p className="mb-4 text-sm">
              این ویژگی فقط برای کاربران پرو فعال است. برای دسترسی، پلن خود را ارتقا دهید.
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="bg-[#E94C88] text-white px-4 py-2 rounded hover:bg-[#DA3B72]"
                onClick={() => router.push("/pricing")}
              >
                ارتقا به پرو
              </button>
              <button
                className="px-4 py-2 rounded border hover:bg-gray-100"
                onClick={() => setShowUpgradeModal(false)}
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
}