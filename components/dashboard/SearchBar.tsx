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

    setQuery(""); // مثل Homepage
  };

  return (
    <div className="relative w-full max-w-xl">

      <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-sm border">

        {/* Left search icon */}
        <div className="px-2">
          <Search size={18} className="text-gray-400" />
        </div>

        {/* INPUT */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && goTo()}
          placeholder="Search channel or paste URL"
          className="flex-grow outline-none text-sm px-2 py-2"
        />

        {/* Clear button */}
        {query.length > 0 && (
          <button
            onClick={() => setQuery("")}
            aria-label="clear"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}

        {/* SEARCH BUTTON */}
        <button
          onClick={goTo}
          className="ml-3 bg-[#E94C88] text-white px-4 py-2 rounded-full hover:bg-[#d53c74] transition text-sm flex items-center gap-2"
        >
          <span className="hidden sm:inline">Search</span>
          <Search size={16} />
        </button>

      </div>
    </div>
  );
}