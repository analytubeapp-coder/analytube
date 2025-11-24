//components/dashboard/Last30Row.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { subDays, format } from "date-fns";

interface Snapshot {
  snapshot_date: string;
  views?: number;
  subscribers?: number;
}

interface Props {
  snapshots: Snapshot[];
  metrics?: {
    views30d?: number;
    subs30d?: number;
    revenue30_label?: string;
  };
}

export default function Last30Row({ snapshots, metrics }: Props) {
  const shortFmt = (n: number) => {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toLocaleString();
  };

  const rightRef = useRef<HTMLDivElement>(null);
  const [rightHeight, setRightHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (rightRef.current) setRightHeight(rightRef.current.offsetHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [metrics]);

  // ✅ ساخت داده‌ی ۷ روز اخیر با تقریب منطقی
  const filledData = (() => {
    const today = new Date();
    const days: string[] = Array.from({ length: 7 }).map((_, i) =>
      format(subDays(today, 6 - i), "yyyy-MM-dd")
    );

    const snapshotMap: Record<string, number> = {};
    snapshots.forEach((s) => {
      if (!s.snapshot_date) return;
      snapshotMap[format(new Date(s.snapshot_date), "yyyy-MM-dd")] = Number(s.views ?? 0);
    });

    return days.map((key, i) => {
      if (snapshotMap[key] !== undefined) {
        return { day: format(new Date(key), "MMM d"), views: snapshotMap[key] };
      }

      // تقریب بین نزدیک‌ترین قبل و بعد
      let prevIndex = i - 1;
      while (prevIndex >= 0 && snapshotMap[days[prevIndex]] === undefined) prevIndex--;
      let nextIndex = i + 1;
      while (nextIndex < days.length && snapshotMap[days[nextIndex]] === undefined) nextIndex++;

      const prevVal = prevIndex >= 0 ? snapshotMap[days[prevIndex]] : null;
      const nextVal = nextIndex < days.length ? snapshotMap[days[nextIndex]] : null;

      let approx = 0;
      if (prevVal !== null && nextVal !== null)
        approx = prevVal + ((nextVal - prevVal) * (i - prevIndex)) / (nextIndex - prevIndex);
      else if (prevVal !== null) approx = prevVal;
      else if (nextVal !== null) approx = nextVal;

      return { day: format(new Date(key), "MMM d"), views: approx };
    });
  })();

  // ✅ محاسبه min/max از داده نهایی
  const minViews = Math.min(...filledData.map((d) => d.views));
  const maxViews = Math.max(...filledData.map((d) => d.views));
  const diff = maxViews - minViews;
  const padding = diff === 0 ? Math.max(10, Math.round(maxViews * 0.1 || 10)) : Math.max(10, diff * 0.25);
  const domain: [number, number] = [
    Math.max(0, Math.floor(minViews - padding)),
    Math.ceil(maxViews + padding),
  ];

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ✅ LEFT big card */}
        <div
          className="col-span-1 lg:col-span-2 bg-white rounded-2xl p-6 border border-[#eee] flex items-center justify-center"
          style={{ height: rightHeight }}
        >
          {/* ✅ نمودار رشد ویو ۷ روز اخیر */}
          <div className="w-full h-full flex items-center justify-center">
            <ResponsiveContainer width="95%" height="90%">
              <LineChart data={filledData}>
                <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} interval={0} />
                <YAxis
                  tickFormatter={(n) => shortFmt(n)}
                  domain={domain}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(v: number) => `${v.toLocaleString()} views`}
                  labelStyle={{ color: "#555" }}
                  contentStyle={{borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#E94C88"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div> {/* ← ✅ این div حالا درست بسته شده */}

        {/* ✅ RIGHT stacked cards */}
        <div className="space-y-4" ref={rightRef}>
          <div className="bg-white rounded-2xl p-5 border border-[#eee] text-center">
            <p className="text-sm font-medium text-gray-600 mb-1">Last 30 Days Views</p>
            <p className="text-3xl font-bold text-gray-900 tracking-tight">
              {metrics?.views30d ? shortFmt(metrics.views30d) : "-"}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#eee] text-center">
            <p className="text-sm font-medium text-gray-600 mb-1">Estimated Revenue (30 Days)</p>
            <p className="text-3xl font-bold text-gray-900 tracking-tight">
              {metrics?.revenue30_label || "-"}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#eee] text-center">
            <p className="text-sm font-medium text-gray-600 mb-1">Subscribers Gained (30 Days)</p>
            <p className="text-3xl font-bold text-gray-900 tracking-tight">
              {metrics?.subs30d ? shortFmt(metrics.subs30d) : "-"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}