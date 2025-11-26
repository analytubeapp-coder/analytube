"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const go = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/dashboard/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="w-full max-w-[420px] bg-[#ffffff] rounded-full overflow-hidden flex items-center px-2 py-1 shadow-sm">
      
      {/* Input */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && go()}
        placeholder="Search Channel or paste URL"
        className="flex-grow bg-transparent px-4 py-2 text-sm focus:outline-none"
      />

      {/* Clear icon */}
      {query.length > 0 && (
        <button
          onClick={() => setQuery("")}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          <X size={16} className="text-gray-500" />
        </button>
      )}

      {/* Search button */}
      <button
        onClick={go}
        className="bg-[#E94C88] w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#DA3B72] transition mr-1"
      >
        <Search size={18} className="text-white" />
      </button>
      
    </div>
  );
}