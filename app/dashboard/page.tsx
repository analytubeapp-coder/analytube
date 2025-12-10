//app/dashboard/page.tsx

"use client";

import DashboardSidebar from "./components/DashboardSidebar";
import DashboardTabs from "./components/DashboardTabs";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function DashboardPage() {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleGenerate(payload: any) {
    try {
      setLoading(true);
      setResult(null);

      // 🟢 گرفتن session
      const { data: { session } } = await supabase.auth.getSession();

      // 🟢 ارسال token به API
      const res = await fetch("/api/generate-sop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token ?? ""}`,
        },
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
        <DashboardSidebar onGenerate={handleGenerate} loading={loading} />
        <DashboardTabs result={result} loading={loading} />
      </div>
    </div>
  );
}