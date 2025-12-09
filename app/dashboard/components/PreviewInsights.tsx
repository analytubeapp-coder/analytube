//app/dashboard/components/PrevieInsights.tsx

"use client";

export default function PreviewInsights({ data }: { data: any }) {
  if (!data)
    return <p className="text-white/50 text-center py-20">No insights available.</p>;

  return (
    <div className="space-y-10 text-white max-h-[70vh] overflow-y-auto pr-4">

      {/* Improvements */}
      <InsightBlock
        title="Recommended Improvements"
        list={data.improvements}
      />

      {/* Risks */}
      <div>
        <h2 className="section-title">Risks & Mitigation</h2>
        <div className="space-y-4">
          {data.risks.map((r: any, i: number) => (
            <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="font-semibold">{r.risk}</h3>
              <p className="text-white/70 text-sm">Score: {r.score}</p>
              <p className="text-white/70 text-sm">Mitigation: {r.mitigation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Roles */}
      <div>
        <h2 className="section-title">Suggested Roles</h2>
        <div className="space-y-4">
          {data.suggested_roles.map((r: any, i: number) => (
            <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h3 className="font-semibold">{r.role}</h3>
              <p className="text-white/70 mt-1">{r.reason}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function InsightBlock({ title, list }: any) {
  return (
    <div>
      <h2 className="section-title">{title}</h2>
      <ul className="list-disc ml-6 text-white/70 space-y-2">
        {list.map((x: string, i: number) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    </div>
  );
}