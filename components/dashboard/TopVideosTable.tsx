//components/dashboard/TopVideosTable.tsx
"use client";
import React, { useEffect, useState } from "react";

interface Props {
  channelId: string;
  limit?: number;
}

export default function TopVideosTable({ channelId, limit = 5 }: Props) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!channelId) return;
    fetchTop();
  }, [channelId, limit]);

  async function fetchTop() {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/youtube/video?channelId=${encodeURIComponent(channelId)}&days=30&sort=views&limit=${limit}`
      );
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

  const shortFmt = (n: number) => {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toLocaleString();
  };

  const getRevenue = (v: any) => {
    if (v.isShort) return "$0.01 - $0.03";
    return v.revenue_range ?? "-";
  };

  return (
    <div className="bg-white rounded-2xl border border-[#eee] p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-600 border-b border-gray-200">
            <tr>
              <th className="p-3">Thumbnail</th>
              <th className="p-3">Title</th>
              <th className="p-3 text-center">Views</th>
              <th className="p-3 text-center">Likes</th>
              <th className="p-3 text-center">Comments</th>
              <th className="p-3 text-center">Published</th>
              <th className="p-3 text-center">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : videos.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No videos
                </td>
              </tr>
            ) : (
              videos.map((v: any, idx: number) => (
                <tr
                  key={v.video_id}
                  className={`hover:bg-gray-50 transition ${
                    idx !== videos.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <td className="p-3">
                    <img
                      src={v.thumbnail_url}
                      alt={v.title}
                      className="w-24 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 max-w-xs">
                    <a
                      href={`https://youtube.com/watch?v=${v.video_id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {v.title}
                    </a>
                  </td>
                  <td className="p-3 text-center">{shortFmt(Number(v.views || 0))}</td>
                  <td className="p-3 text-center">{shortFmt(Number(v.likes || 0))}</td>
                  <td className="p-3 text-center">{shortFmt(Number(v.comments || 0))}</td>
                  <td className="p-3 text-center">
                    {v.published_at ? new Date(v.published_at).toLocaleDateString() : "-"}
                  </td>
                  <td className="p-3 text-center">{getRevenue(v)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}