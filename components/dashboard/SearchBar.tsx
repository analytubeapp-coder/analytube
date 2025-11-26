"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const goTo = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/dashboard/${encodeURIComponent(trimmed)}`);
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-xl">

      {/* --- FULLY ROUNDED LIKE HOMEPAGE --- */}
      <div className="flex items-center w-full bg-white border shadow-sm rounded-full h-11 overflow-hidden">

        {/* INPUT */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && goTo()}
          placeholder="Search Channel or paste URL"
          className="
            flex-grow bg-transparent
            px-4
            text-sm
            focus:outline-none
            h-full
          "
        />

        {/* CLEAR BUTTON */}
        {query.length > 0 && (
          <button
            onClick={() => setQuery("")}
            className="p-2 rounded-full hover:bg-gray-100 mr-1"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}

        {/* SEARCH BUTTON — PERFECTLY INSIDE THE ROUNDED BOX */}
        <button
          onClick={goTo}
          className="
            bg-[#E94C88]
            w-10 h-10
            rounded-full
            flex items-center justify-center
            hover:bg-[#d53c74]
            transition
            mr-1
          "
        >
          <Search size={16} className="text-white" />
        </button>

      </div>
    </div>
  );
}