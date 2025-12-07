"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SopGenerator() {
  const [businessType, setBusinessType] = useState("");
  const [sopTitle, setSopTitle] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [sopJson, setSopJson] = useState<any>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSopJson(null);
    toast.loading("Generating SOP...");
    try {
      const res = await fetch("/api/generate-sop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessType, sopTitle, extraInfo }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to generate SOP");
        setLoading(false);
        return;
      }
      setSopJson(data.sop);
      toast.success("SOP generated");
    } catch (err: any) {
      toast.error(err.message || "Unexpected error");
    } finally {
      toast.dismiss();
      setLoading(false);
    }
  }

  async function download(endpoint: string) {
    if (!sopJson) return toast.error("Generate SOP first");
    setLoading(true);
    const t = toast.loading("Preparing file...");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sop: sopJson }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Export failed");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const ext = endpoint.includes("docx") ? "docx" : "pdf";
      const safeTitle = (sopJson.meta?.title || "sop").replace(/\s+/g, "_");
      a.download = `${safeTitle}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("Download ready");
    } catch (err: any) {
      toast.error(err.message || String(err));
    } finally {
      toast.dismiss(t);
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <Toaster />
      <h2>AI SOP Generator</h2>
      <form onSubmit={handleGenerate}>
        <input value={businessType} onChange={e => setBusinessType(e.target.value)} placeholder="Business Type" required />
        <input value={sopTitle} onChange={e => setSopTitle(e.target.value)} placeholder="SOP Title" required />
        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} placeholder="Extra info" />
        <button disabled={loading} type="submit">{loading ? "Working..." : "Generate SOP"}</button>
      </form>

      {sopJson && (
        <>
          <pre style={{ maxHeight: 300, overflow: "auto" }}>{JSON.stringify(sopJson, null, 2)}</pre>
          <button onClick={() => download("/api/export-docx")} disabled={loading}>Download DOCX</button>
          <button onClick={() => download("/api/export-pdf")} disabled={loading}>Download PDF</button>
        </>
      )}
    </div>
  );
}