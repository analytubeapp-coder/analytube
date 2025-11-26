"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // close dropdown on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  // debounce search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const t = setTimeout(() => fetchResults(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  async function fetchResults(q: string) {
    try {
      setLoading(true);
      const res = await fetch(`/api/search/youtube?q=${encodeURIComponent(q)}`);
      if (!res.ok) {
        setResults([]);
        setOpen(false);
        return;
      }
      const json = await res.json();
      setResults(json.items || []);
      setOpen((json.items || []).length > 0);
    } catch (e) {
      console.error(e);
      setResults([]);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  // navigate to dashboard; backend resolveChannelId will handle names / URLs
  const goTo = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    // If user pasted full YouTube URL, pass it through — server will resolve.
    router.push(`/dashboard/${encodeURIComponent(trimmed)}`);
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-sm border">
        <div className="px-2">
          <Search size={18} className="text-gray-400" />
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              goTo(query);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Search channel or paste URL"
          className="flex-grow outline-none text-sm px-2 py-2"
        />

        {query.length > 0 ? (
          <button
            onClick={() => setQuery("")}
            aria-label="clear"
            className="p-2 rounded-full hover:bg-gray-100"
            title="Clear"
          >
            <X size={16} className="text-gray-500" />
          </button>
        ) : null}

        <button
          onClick={() => goTo(query)}
          className="ml-3 bg-[#E94C88] text-white px-4 py-2 rounded-full hover:bg-[#d53c74] transition text-sm flex items-center gap-2"
        >
          <span className="hidden sm:inline">Search</span>
          <Search size={16} />
        </button>
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg border z-40 max-h-80 overflow-auto">
          {results.map((item: any) => (
            <div
              key={item.channelId || item.id || item.title}
              onClick={() => goTo(item.channelId ?? item.id ?? item.title)}
              className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-9 h-9 rounded-full mr-3 object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-gray-400 ml-2">{item.subscribers ?? ""}</p>
                </div>
                {item.description ? (
                  <p className="text-xs text-gray-500 truncate mt-1">{item.description}</p>
                ) : null}
              </div>
            </div>
          ))}

          {loading && (
            <div className="px-4 py-3 text-sm text-gray-500">Loading...</div>
          )}
        </div>
      )}
    </div>
  );
}