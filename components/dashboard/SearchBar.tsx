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
          shadow-sm
          border
          h-11
          rounded-full
          overflow-hidden
        "
      >

        {/* INPUT SECTION */}
        <div className="flex items-center flex-grow h-full pl-3 pr-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && goTo()}
            placeholder="Search Channel or paste URL"
            className="
              flex-grow
              bg-transparent
              text-sm
              focus:outline-none
              h-full
              px-2
            "
          />

          {query.length > 0 && (
            <button
              onClick={() => setQuery("")}
              className="p-1.5 rounded-full hover:bg-gray-100"
            >
              <X size={16} className="text-gray-500" />
            </button>
          )}
        </div>

        {/* SEARCH BUTTON — perfectly flush */}
        <button
          onClick={goTo}
          className="
            bg-[#E94C88]
            h-full
            px-4
            flex items-center justify-center
            hover:bg-[#d53c74]
            transition
            text-white
          "
          style={{
            borderRadius: "0 9999px 9999px 0", // چسباندن کامل
          }}
        >
          <Search size={18} />
        </button>

      </div>
    </div>
  );
}