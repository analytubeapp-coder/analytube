// components/dashboard/LifetimeRevenueCard.tsx

"use client";
import React from "react";

export default function LifetimeRevenueCard({ metrics }: { metrics?: any }) {
  const revenueLabel =
    metrics?.revenue30_label ??
    (metrics?.revenue_range ? metrics.revenue_range : "-");

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div>
        <div className="text-xs text-gray-500">Last 30 Days Views</div>
        <div className="text-xl font-bold mt-2">
          {metrics?.views30d ? Number(metrics.views30d).toLocaleString() : "-"}
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Estimated Revenue (30 days)
        </div>
        <div className="text-lg font-extrabold mt-1">
          {revenueLabel || "-"}
        </div>
      </div>
    </div>
  );
}