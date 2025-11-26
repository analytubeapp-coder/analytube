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

      <div
        className="
          flex items-center 
          bg-white 
          rounded-full 
          shadow-sm 
          border 
          h-11
          px-3
        "
      >

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
            px-3
            focus:outline-none
            h-full
          "
        />

        {/* Clear button */}
        {query.length > 0 && (
          <button
            onClick={() => setQuery("")}
            className="p-1.5 rounded-full hover:bg-gray-100"
          >
            <X size={16} className="text-gray-500" />
          </button>
        )}

        {/* SEARCH BUTTON — fully attached */}
        <button
          onClick={goTo}
          className="
            bg-[#E94C88]
            w-11 h-11
            rounded-full
            flex items-center justify-center
            hover:bg-[#d53c74]
            transition
            -mr-1
          "
          style={{ marginLeft: "0" }}
        >
          <Search size={18} className="text-white" />
        </button>

      </div>
    </div>
  );
}