"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // debounce search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    const delay = setTimeout(() => fetchResults(query), 300);
    return () => clearTimeout(delay);
  }, [query]);

  async function fetchResults(text: string) {
    try {
      setLoading(true);
      const res = await fetch(`/api/search/youtube?q=${encodeURIComponent(text)}`);
      const json = await res.json();
      setResults(json.items || []);
      setOpen(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const go = (value: string) => {
    if (!value.trim()) return;
    router.push(`/dashboard/${encodeURIComponent(value)}`);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="relative w-full max-w-xl">

      {/* Input Box */}
      <div className="flex items-center bg-white px-5 py-3 rounded-xl shadow-sm border">
        <Search size={18} className="text-gray-400 mr-2" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && go(query)}
          placeholder="Search channel or paste URL"
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Dropdown Results */}
      {open && results.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border z-20 max-h-80 overflow-auto">
          {results.map((item: any) => (
            <div
              key={item.channelId}
              onClick={() => go(item.channelId)}
              className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
            >
              <img
                src={item.thumbnail}
                className="w-8 h-8 rounded-full mr-3"
                alt=""
              />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">{item.subscribers} subscribers</p>
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