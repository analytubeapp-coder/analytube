//app/dashboard/components/PreviewFlowchart.tsx

"use client";

import { useState } from "react";

export default function PreviewFlowchart({ svg }: { svg: string }) {
  const [zoom, setZoom] = useState(1);

  if (!svg)
    return <p className="text-white/50 text-center py-20">No flowchart generated yet.</p>;

  return (
    <div className="w-full h-[70vh] overflow-auto bg-black/20 rounded-xl border border-white/10 relative">
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
          className="px-3 py-1 bg-white/10 border border-white/20 rounded-md text-white"
        >
          -
        </button>
        <button
          onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
          className="px-3 py-1 bg-white/10 border border-white/20 rounded-md text-white"
        >
          +
        </button>
      </div>

      <div
        className="p-10"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}