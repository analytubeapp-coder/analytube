//app/dashboard/components/PreviewFlowchart.tsx

"use client";

import { useState, useMemo } from "react";

export default function PreviewFlowchart({ svg }: { svg: string }) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom((z) => Math.min(2, z + 0.1));
  const handleZoomOut = () => setZoom((z) => Math.max(0.5, z - 0.1));
  const handleReset = () => setZoom(1);

  const svgContent = useMemo(() => ({ __html: svg }), [svg]);

  if (!svg)
    return (
      <p className="text-white/50 text-center py-20">
        No flowchart generated yet.
      </p>
    );

  return (
    <div className="w-full h-[70vh] overflow-auto bg-black/20 rounded-xl border border-white/10 relative transition-all duration-300">

      {/* Zoom controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <ZoomButton onClick={handleZoomOut}>−</ZoomButton>
        <ZoomButton onClick={handleZoomIn}>+</ZoomButton>
        {zoom !== 1 && <ZoomButton onClick={handleReset}>Reset</ZoomButton>}
      </div>

      {/* SVG Viewer */}
      <div
        className="min-w-max p-10 transition-transform duration-200 ease-out"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
        }}
        dangerouslySetInnerHTML={svgContent}
      />
    </div>
  );
}

function ZoomButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        px-3 py-1 text-sm font-medium
        bg-white/10 hover:bg-white/20
        border border-white/20 hover:border-white/40
        rounded-md text-white
        transition-all duration-200
        backdrop-blur-sm
      "
    >
      {children}
    </button>
  );
}