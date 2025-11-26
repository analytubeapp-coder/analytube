"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const go = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/dashboard/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="flex items-center w-full max-w-[400px] bg-[#fcfcfc] border border-gray-200 rounded-full overflow-hidden">

      {/* INPUT (same as homepage, just reduced padding) */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && go()}
        className="flex-grow bg-transparent px-6 py-2 text-sm focus:outline-none"
        placeholder="Search Channel or paste URL"
      />

      {/* BUTTON (same radius, same shape, just smaller) */}
      <button
        onClick={go}
        className="
          bg-[#E94C88]
          w-10 h-10
          flex items-center justify-center
          rounded-full
          hover:bg-[#DA3B72]
          transition
        "
      >
        <Search size={18} className="text-white" />
      </button>
    </div>
  );
}