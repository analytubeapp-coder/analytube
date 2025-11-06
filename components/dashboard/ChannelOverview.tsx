//components/dashboard/ChannelOverview.tsx

"use client";

import { ClipboardCopy } from "lucide-react";

interface Props {
  channel: {
    views: number;
  };
  keywords: string[]; // ✅ اضافه شد
}

export default function ChannelOverview({ channel, keywords }: Props) {
  // ✅ Clipboard copy واقعی
  const copyAll = () => {
    navigator.clipboard.writeText(keywords.join(", "));
  };

  const shortFmt = (n: number) => {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toLocaleString();
  };

  const minCPM = 2;
  const maxCPM = 4;

  const revenueMin = (channel.views / 1000) * minCPM;
  const revenueMax = (channel.views / 1000) * maxCPM;
  const revenueAvg = (revenueMin + revenueMax) / 2;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      
      {/* LEFT — Top Keywords */}
      <div className="bg-white rounded-2xl p-6 shadow-sm lg:col-span-2">
        <div className="flex justify-between">
          <h4 className="font-semibold mb-4 text-gray-800">Top Keywords</h4>
          {keywords.length > 0 && (
            <button
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition"
              onClick={copyAll}
            >
              Copy All
              <ClipboardCopy size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {keywords.length > 0 ? (
            keywords.map((k, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm shadow-sm">
                {k}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-400">No keywords found</p>
          )}
        </div>
      </div>

      {/* RIGHT — Stats Cards */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <p className="text-xs text-gray-600 mb-1">Total Lifetime Views</p>
          <p className="text-3xl font-bold text-gray-900">{shortFmt(channel.views)}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <p className="text-xs text-gray-600 mb-1">Estimated Revenue (Lifetime)</p>
          <p className="text-xl font-bold">
            ${shortFmt(revenueMin)} - ${shortFmt(revenueMax)}
          </p>
          <p className="text-xs text-gray-500 mt-1">≈ ${shortFmt(revenueAvg)} average</p>
        </div>
      </div>
    </div>
  );
}