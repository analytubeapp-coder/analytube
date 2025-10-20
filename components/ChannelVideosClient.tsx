// components/ChannelVideosClient.tsx
"use client";
import React, { useEffect, useState } from "react";

type VideoItem = {
  videoId?: string;
  title: string;
  publishedAt?: string;
  thumbnails?: any;
};

export default function ChannelVideosClient({ channelId }: { channelId: string }) {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = async (pageToken?: string) => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/channel-videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelId, pageToken }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "failed");
      setItems((p) => [...p, ...(json.items || [])]);
      setNextPage(json.nextPageToken || null);
    } catch (e: any) {
      setErr(e.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    setItems([]);
    setNextPage(null);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  return (
    <div>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((it, idx) => (
          <div key={idx} className="flex gap-3 bg-white rounded-xl p-3 shadow">
            <div className="w-40 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              {it.thumbnails?.medium?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.thumbnails.medium.url} alt={it.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{it.title}</div>
              <div className="text-xs text-gray-500 mt-1">{it.publishedAt ? new Date(it.publishedAt).toLocaleDateString() : ""}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center">
        {loading ? (
          <div className="px-4 py-2 bg-[#f5f5f5] rounded">Loading…</div>
        ) : nextPage ? (
          <button onClick={() => load(nextPage)} className="px-4 py-2 bg-[#bfd62e] text-white rounded">Load more</button>
        ) : (
          <div className="text-sm text-gray-500">No more videos</div>
        )}
      </div>
    </div>
  );
}
