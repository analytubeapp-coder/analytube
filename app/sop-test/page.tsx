"use client";

import SopGenerator from "@/components/SopGenerator";

export default function SopTestPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">SOP Generator – Test Page</h1>
      <p className="mb-4 text-gray-300">
        This is a temporary test page to check the SOP API workflows, PDF export, and DOCX export.
      </p>
      <SopGenerator />
    </div>
  );
}