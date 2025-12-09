//app/dashboard/components/DashboardTabs.tsx

"use client";

import { useState } from "react";
import PreviewSOP from "./PreviewSOP";
import PreviewFlowchart from "./PreviewFlowchart";
import PreviewInsights from "./PreviewInsights";

const tabs = ["SOP", "Flowchart", "Insights"] as const;
type TabOption = (typeof tabs)[number];

export default function DashboardTabs({
  result,
  loading,
}: {
  result: any;
  loading: boolean;
}) {
  const [active, setActive] = useState<TabOption>("SOP");

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`
              pb-3 px-2 text-lg
              transition-all duration-200
              ${
                active === tab
                  ? "text-white border-b-2 border-[#f4c17f]"
                  : "text-white/50 hover:text-white"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-xl bg-white/5 p-6 border border-white/10 min-h-[500px]">

        {/* Loading */}
        {loading && (
          <p className="text-white/60 text-center py-20 text-lg">
            Generating your SOP... Please wait.
          </p>
        )}

        {/* No result */}
        {!loading && !result && (
          <p className="text-white/40 text-center py-20 text-lg">
            Fill the form and click <span className="text-white">Generate SOP</span> to begin.
          </p>
        )}

        {/* Results */}
        {!loading && result && (
          <>
            {active === "SOP" && <PreviewSOP sop={result.sop} />}
            {active === "Flowchart" && (
              <PreviewFlowchart svg={result.flowchart_svg} />
            )}
            {active === "Insights" && (
              <PreviewInsights data={result.recommendations} />
            )}
          </>
        )}
      </div>
    </div>
  );
}