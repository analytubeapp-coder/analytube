//app/dashboard/page.tsx

"use client";

import DashboardSidebar from "./components/DashboardSidebar";
import DashboardTabs from "./components/DashboardTabs";
import { useState } from "react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleGenerate(payload: any) {
    try {
      setLoading(true);
      setResult(null);

      const res = await fetch("/api/generate-sop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      setResult(json);
    } catch (e) {
      console.error(e);
      alert("Error generating SOP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen text-white px-6 pt-28 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">

        {/* LEFT — Sidebar */}
        <DashboardSidebar onGenerate={handleGenerate} loading={loading} />

        {/* RIGHT — Preview Tabs */}
        <DashboardTabs result={result} loading={loading} />
      </div>
    </div>
  );
}