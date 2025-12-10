//app/dashboard/components/PreviewInsights.tsx

"use client";

export default function PreviewInsights({ data }: { data: any }) {
  if (!data)
    return (
      <p className="text-white/50 text-center py-20">
        No insights available.
      </p>
    );

  const improvements = data.improvements ?? [];
  const risks = data.risks ?? [];
  const roles = data.suggested_roles ?? [];

  return (
    <div className="space-y-10 text-white max-h-[70vh] overflow-y-auto pr-4">

      {/* Improvements */}
      <InsightBlock title="Recommended Improvements" list={improvements} />

      {/* Risks */}
      <InsightSection title="Risks & Mitigation">
        {risks.length === 0 && (
          <p className="text-white/50 text-sm">No risks identified.</p>
        )}

        <div className="space-y-4">
          {risks.map((r: any, i: number) => (
            <div
              key={i}
              className="bg-white/5 p-4 rounded-xl border border-white/10"
            >
              <h3 className="font-semibold">{r.risk}</h3>
              <p className="text-white/70 text-sm">Score: {r.score}</p>
              <p className="text-white/70 text-sm">
                Mitigation: {r.mitigation}
              </p>
            </div>
          ))}
        </div>
      </InsightSection>

      {/* Suggested Roles */}
      <InsightSection title="Suggested Roles">
        {roles.length === 0 && (
          <p className="text-white/50 text-sm">No role suggestions.</p>
        )}

        <div className="space-y-4">
          {roles.map((r: any, i: number) => (
            <div
              key={i}
              className="bg-white/5 p-4 rounded-xl border border-white/10"
            >
              <h3 className="font-semibold">{r.role}</h3>
              <p className="text-white/70 mt-1">{r.reason}</p>
            </div>
          ))}
        </div>
      </InsightSection>
    </div>
  );
}

function InsightBlock({ title, list }: any) {
  return (
    <InsightSection title={title}>
      {list.length === 0 ? (
        <p className="text-white/50 text-sm">No recommendations.</p>
      ) : (
        <ul className="list-disc ml-6 text-white/70 space-y-2">
          {list.map((x: string, i: number) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      )}
    </InsightSection>
  );
}

function InsightSection({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[#f4c17f] tracking-wide">
        {title}
      </h2>
      {children}
    </div>
  );
}