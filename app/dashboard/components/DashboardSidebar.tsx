//app/dashboard/components/DashboardSidebar.tsx

"use client";

import React, { useState } from "react";

type Props = {
  onGenerate: (payload: any) => Promise<void>;
  loading?: boolean;
};

export default function DashboardSidebar({ onGenerate, loading }: Props) {
  const [form, setForm] = useState({
    companyName: "",
    companySize: "10-50",
    companyStage: "startup",
    industry: "",
    businessType: "",
    sopTitle: "",
    mainGoal: "",
    depth: 3,
  });

  function update<K extends keyof typeof form>(key: K, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    if (!form.companyName || !form.sopTitle || !form.mainGoal) {
      alert("Please fill Company Name, SOP Title and Main Goal.");
      return;
    }

    const payload = {
      companyName: form.companyName,
      companySize: form.companySize,
      companyStage: form.companyStage,
      industry: form.industry,
      businessType: form.businessType,
      sopTitle: form.sopTitle,
      mainGoal: form.mainGoal,
      depth: form.depth,
      // ❌ planOverride removed
      // plan is fetched from Supabase internally (API side)
    };

    await onGenerate(payload);
  }

  return (
    <div className="sticky top-24 rounded-xl p-6 bg-white/5 border border-white/10 backdrop-blur-xl text-white shadow-[0_0_40px_rgba(0,0,0,0.45)]">
      <h2 className="text-xl font-semibold mb-2">Create SOP</h2>
      <p className="text-sm text-white/60 mb-6 leading-relaxed">
        Fill the details below and our AI will generate a complete SOP with workflow,
        KPIs, risks, tools, and training.
      </p>

      <div className="space-y-4">

        {/* Company Name */}
        <div>
          <label className="block text-sm mb-1">Company Name</label>
          <input
            value={form.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-md p-2 focus:border-white/30 outline-none"
          />
        </div>

        {/* Company Size + Stage */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm mb-1">Company Size</label>
            <select
              value={form.companySize}
              onChange={(e) => update("companySize", e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-md p-2"
            >
              <option value="1-10">1-10</option>
              <option value="10-50">10-50</option>
              <option value="50-250">50-250</option>
              <option value="250+">250+</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm mb-1">Company Stage</label>
            <select
              value={form.companyStage}
              onChange={(e) => update("companyStage", e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-md p-2"
            >
              <option value="startup">Startup</option>
              <option value="growth">Growth</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm mb-1">Industry</label>
          <input
            value={form.industry}
            onChange={(e) => update("industry", e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-md p-2"
          />
        </div>

        {/* Business Type */}
        <div>
          <label className="block text-sm mb-1">Business Type</label>
          <input
            value={form.businessType}
            onChange={(e) => update("businessType", e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-md p-2"
          />
        </div>

        {/* SOP Title */}
        <div>
          <label className="block text-sm mb-1">SOP Title</label>
          <input
            value={form.sopTitle}
            onChange={(e) => update("sopTitle", e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-md p-2"
          />
        </div>

        {/* Main Goal */}
        <div>
          <label className="block text-sm mb-1">Main Goal</label>
          <textarea
            rows={3}
            value={form.mainGoal}
            onChange={(e) => update("mainGoal", e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-md p-2"
          />
        </div>

        {/* Depth */}
        <div>
          <label className="block text-sm mb-1">
            Detail Depth: {form.depth}
          </label>
          <input
            type="range"
            min={1}
            max={5}
            value={form.depth}
            onChange={(e) => update("depth", Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full py-3 mt-2 rounded-lg font-semibold bg-gradient-to-r from-[#a78bfa] to-[#fbbf24] text-black hover:opacity-95 transition-all disabled:opacity-40"
        >
          {loading ? "Generating…" : "Generate SOP"}
        </button>

        <p className="text-xs text-white/50 text-center pt-1">
          Tip: short, clear goals → best structured SOPs.
        </p>
      </div>
    </div>
  );
}