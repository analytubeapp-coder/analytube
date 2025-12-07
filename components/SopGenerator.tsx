// components/SopGenerator.tsx
"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SopGenerator() {
  const [businessType, setBusinessType] = useState("");
  const [sopTitle, setSopTitle] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [pkg, setPkg] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setPkg(null);
    setErrorMsg(null);
    toast.loading("Generating SOP...");
    try {
      const res = await fetch("/api/generate-sop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessType, sopTitle, extraInfo }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to generate SOP");
        toast.error(data.error || "Failed to generate SOP");
        setLoading(false);
        return;
      }
      // store the whole package (sop + endpoints + svg + recommendations)
      setPkg(data);
      toast.success("SOP generated");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || String(err));
      toast.error(err?.message || "Unexpected error");
    } finally {
      toast.dismiss();
      setLoading(false);
    }
  }

  async function download(endpoint: string) {
    if (!pkg?.sop) return toast.error("Generate SOP first");
    setLoading(true);
    const t = toast.loading("Preparing file...");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sop: pkg.sop }),
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
      const safeTitle = (pkg.sop?.meta?.title || "sop").replace(/\s+/g, "_");
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

      <form onSubmit={handleGenerate} style={{ display: "grid", gap: 10 }}>
        <input value={businessType} onChange={(e) => setBusinessType(e.target.value)} placeholder="Business Type (e.g. SaaS onboarding)" required />
        <input value={sopTitle} onChange={(e) => setSopTitle(e.target.value)} placeholder="SOP Title (e.g. Customer Onboarding)" required />
        <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} placeholder="Extra info (optional)" rows={4} />
        <button disabled={loading} type="submit">{loading ? "Working..." : "Generate SOP"}</button>
      </form>

      {errorMsg && <p style={{ color: "salmon", marginTop: 12 }}>{errorMsg}</p>}

      {pkg && (
        <div style={{ marginTop: 20 }}>
          <h3>Generated SOP</h3>
          <pre style={{ maxHeight: 300, overflow: "auto", background: "#0b0b0b", color: "#e6e6e6", padding: 12, borderRadius: 8 }}>
            {JSON.stringify(pkg.sop, null, 2)}
          </pre>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button onClick={() => download(pkg.docx_endpoint)} disabled={loading}>Download DOCX</button>
            <button onClick={() => download(pkg.pdf_endpoint)} disabled={loading}>Download PDF</button>
            <button
              onClick={() => {
                if (pkg.flowchart_svg) {const w = window.open();
                  if (w) {
                    w.document.write(pkg.flowchart_svg);
                    w.document.title = "Flowchart";
                  }
                } else {
                  toast.error("No flowchart available");
                }
              }}
            >
              View Flowchart
            </button>
          </div>

          {pkg.recommendations && (
            <div style={{ marginTop: 16 }}>
              <h4>Recommendations</h4>
              <pre style={{ background: "#071018", color: "#cfe8d8", padding: 10, borderRadius: 8, maxHeight: 200, overflow: "auto" }}>
                {JSON.stringify(pkg.recommendations, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}