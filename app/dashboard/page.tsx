"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface VideoStats {
  id: string;
  title: string;
  publishedAt: string;
  views: number;
  likes: number;
  comments: number;
}

interface Summary {
  totalVideos: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  avgViews: number;
}

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const channel = searchParams.get("channel");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [videos, setVideos] = useState<VideoStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      if (!channel) return;
      setLoading(true);

      try {
        // مرحله ۱: گرفتن اطلاعات کانال برای Channel ID
        const channelRes = await fetch(`/api/youtube?channel=${channel}`);
        const channelData = await channelRes.json();
        const channelId = channelData?.id;

        // مرحله ۲: گرفتن آنالیز ۳۰ روزه
        const analyticsRes = await fetch(`/api/youtube/analytics?channelId=${channelId}`);
        const analyticsData = await analyticsRes.json();

        setSummary(analyticsData.summary);
        setVideos(analyticsData.videos);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [channel]);

  if (loading) {
    return <p className="text-center text-lg mt-20">Loading analytics...</p>;
  }

  if (!summary) {
    return <p className="text-center text-lg mt-20 text-red-500">No analytics data found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">YouTube Channel Analytics (Last 30 Days)</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader><CardTitle>Total Videos</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{summary.totalVideos}</CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Total Views</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{summary.totalViews.toLocaleString()}</CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Total Likes</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{summary.totalLikes.toLocaleString()}</CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Total Comments</CardTitle></CardHeader>
          <CardContent className="text-2xl font-bold">{summary.totalComments.toLocaleString()}</CardContent>
        </Card>
      </div>

      {/* Line Chart */}
      <Card className="p-4">
        <CardHeader><CardTitle>Views by Video (30 Days)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={videos} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="publishedAt" tickFormatter={(date) => date.slice(5, 10)} />
              <YAxis />
              <Tooltip formatter={(value: number) => value.toLocaleString()} labelFormatter={(label) => `📅 ${label}`} />
              <Line type="monotone" dataKey="views" stroke="#007BFF" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Video Table */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Recent Videos</h2>
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Published</th>
                <th className="px-4 py-2">Views</th>
                <th className="px-4 py-2">Likes</th>
                <th className="px-4 py-2">Comments</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((v) => (
                <tr key={v.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{v.title}</td>
                  <td className="px-4 py-2">{v.publishedAt.slice(0, 10)}</td>
                  <td className="px-4 py-2">{v.views.toLocaleString()}</td>
                  <td className="px-4 py-2">{v.likes.toLocaleString()}</td>
                  <td className="px-4 py-2">{v.comments.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
