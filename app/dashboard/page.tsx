"use client";

import { useState } from "react";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardTabs from "./components/DashboardTabs";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function onGenerate(payload: any) {
    try {
      setLoading(true);
      setResult(null);

      const res = await fetch("/api/generate-sop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setResult(data);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-6 p-6">
      <div className="w-[320px]">
        <DashboardSidebar loading={loading} onGenerate={onGenerate} />
      </div>

      <div className="flex-1">
        <DashboardTabs result={result} loading={loading} />
      </div>
    </div>
  );
}