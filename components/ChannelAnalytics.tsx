// components/ChannelAnalytics.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import dayjs from "dayjs";

type Day = { date: string; subs: number | null; views: number | null; uploads: number | null };

export default function ChannelAnalytics({ channelId }: { channelId: string }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!channelId) return;
    setLoading(true);
    setErr(null);
    fetch("/api/analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channelId }),
    })
      .then((r) => r.json())
      .then((json) => {
        if (json?.error) throw new Error(json.error);
        setData(json);
      })
      .catch((e) => setErr(e.message || "error"))
      .finally(() => setLoading(false));
  }, [channelId]);

  if (loading) return <div className="p-4">Loading analytics…</div>;
  if (err) return <div className="p-4 text-red-600">Error: {err}</div>;
  if (!data) return null;

  const days: Day[] = data.days;
  const labels = days.map((d) => dayjs(d.date).format("MM-DD"));
  const subsSeries = days.map((d) => (d.subs ?? null));
  const viewsSeries = days.map((d) => (d.views ?? null));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Subscribers",
        data: subsSeries,
        tension: 0.25,
        fill: false,
      },
      {
        label: "Views",
        data: viewsSeries,
        tension: 0.25,
        fill: false,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    interaction: { mode: "index" as const, intersect: false },
    scales: {
      y: { position: "left" },
      y1: { position: "right", grid: { drawOnChartArea: false } },
    },
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl shadow">
          <div className="text-xs text-gray-500">Subscribers (start → end)</div>
          <div className="text-lg font-semibold">
            {data.metrics.subscribers.start ?? "—"} → {data.metrics.subscribers.end ?? "—"}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Δ {data.metrics.subscribers.absolute ?? "—"} ({data.metrics.subscribers.percent ? data.metrics.subscribers.percent.toFixed(2) + "%" : "—"})
          </div>
          <div className="text-xs text-gray-400 mt-2">avg/day: {data.metrics.subscribers.avgDaily ?? "—"}</div>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <div className="text-xs text-gray-500">Total Views (30d)</div>
          <div className="text-lg font-semibold">{Number(data.metrics.totalViews30).toLocaleString()}</div>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <div className="text-xs text-gray-500">Estimated Earnings (30d)</div>
          <div className="text-lg font-semibold">
            ${data.metrics.estimatedEarnings.low.toLocaleString()} - ${data.metrics.estimatedEarnings.high.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400 mt-1">mid: ${data.metrics.estimatedEarnings.mid.toLocaleString()}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <Line data={chartData} options={options as any} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h4 className="font-semibold mb-2">Daily subscribers delta (last {data.days.length} days)</h4>
        <div className="space-y-2">
          {data.dailySubsDeltas.map((d: any) => (
            <div key={d.date} className="flex justify-between text-sm">
              <div>{dayjs(d.date).format("MMM DD")}</div>
              <div className={d.delta > 0 ? "text-green-600" : d.delta < 0 ? "text-red-600" : "text-gray-600"}>
                {d.subs ?? "—"} {d.delta !== null ? `(${d.delta >= 0 ? "+" : ""}${d.delta})` : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
