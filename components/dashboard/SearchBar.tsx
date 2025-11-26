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

      <div className="
        flex items-center 
        bg-white 
        rounded-full 
        shadow-sm 
        border 
        px-4 py-2
      ">

        {/* INPUT */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && goTo()}
          placeholder="Search Channel or paste URL"
          className="
            flex-grow
            bg-transparent
            text-sm
            px-4
            py-2
            focus:outline-none
          "
        />

        {/* Clear button */}
        {query.length > 0 && (
          <button
            onClick={() => setQuery("")}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}

        {/* SEARCH BUTTON (circle + icon only) */}
        <button
          onClick={goTo}
          className="
            bg-[#E94C88] 
            w-11 h-11
            rounded-full
            flex items-center justify-center
            hover:bg-[#d53c74]
            transition
            ml-2
          "
        >
          <Search size={18} className="text-white" />
        </button>

      </div>
    </div>
  );
}