// components/dashboard/TopVideosTable.tsx
"use client";
import React, { useEffect, useState } from "react";

export default function TopVideosTable({ channelId, limit = 5 }: { channelId: string; limit?: number }) {
  const [sort, setSort] = useState<"views" | "likes" | "comments" | "ctr" | "revenue">("views");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!channelId) return;
    fetchTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId, sort, limit]);

  async function fetchTop() {
    try {
      setLoading(true);
      const res = await fetch(`/api/youtube/video?channelId=${encodeURIComponent(channelId)}&days=0&sort=${sort}&limit=${limit}`);
      if (!res.ok) {
        console.error("TopVideos: API error", await res.text());
        setVideos([]);
        return;
      }
      const json = await res.json();
      setVideos(json.videos || []);
    } catch (e) {
      console.error(e);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Top 5 by:</h3>
        <select className="border rounded px-3 py-1 text-sm" value={sort} onChange={(e) => setSort(e.target.value as any)}>
          <option value="views">Views</option>
          <option value="likes">Likes</option>
          <option value="comments">Comments</option>
          <option value="ctr">CTR</option>
          <option value="revenue">Revenue</option>
        </select>
      </div>

      <table className="min-w-full text-sm">
        <thead className="text-left text-gray-600">
          <tr>
            <th className="p-3">Thumbnail</th>
            <th className="p-3">Title</th>
            <th className="p-3">Views</th>
            <th className="p-3">Likes</th>
            <th className="p-3">Comments</th>
            <th className="p-3">CTR</th>
            <th className="p-3">Published</th>
            <th className="p-3">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={8} className="p-6 text-center">Loading...</td></tr>
          ) : videos.length === 0 ? (
            <tr><td colSpan={8} className="p-6 text-center">No videos</td></tr>
          ) : videos.map((v: any) => (
            <tr key={v.video_id} className="border-t hover:bg-gray-50">
              <td className="p-3">
                <img src={v.thumbnail_url} alt={v.title} className="w-24 h-14 object-cover rounded" />
              </td>
              <td className="p-3 max-w-xs">
                <a className="text-blue-600 hover:underline" href={`https://youtube.com/watch?v=${v.video_id}`} target="_blank" rel="noreferrer">{v.title}</a>
              </td>
              <td className="p-3">{Number(v.views || 0).toLocaleString()}</td>
              <td className="p-3">{Number(v.likes || 0).toLocaleString()}</td>
              <td className="p-3">{Number(v.comments || 0).toLocaleString()}</td>
              <td className="p-3">{v.ctr ?? "-"}</td>
              <td className="p-3">{v.published_at ? new Date(v.published_at).toLocaleDateString() : "-"}</td>
              <td className="p-3">{v.revenue_range ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}