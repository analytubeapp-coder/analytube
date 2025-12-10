// app/dashboard/components/PreviewSOP.tsx

"use client";

export default function PreviewSOP({ sop }: { sop: any }) {
  if (!sop) return null;

  const meta = sop.meta ?? {};
  const objectives = sop.objectives ?? [];
  const roles = sop.roles ?? [];
  const io = sop.inputs_outputs ?? [];
  const procedure = sop.procedure ?? [];
  const kpis = sop.kpis ?? [];
  const risks = sop.risks ?? [];
  const training = sop.training ?? [];

  return (
    <div className="text-white space-y-10 max-h-[70vh] overflow-y-auto pr-3">

      {/* HEADER */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-2">{meta.title ?? "Untitled SOP"}</h1>

        <p className="text-white/60 text-sm">
          {(meta.company_name || "Unknown Company")} — {(meta.industry || "No industry")}
        </p>

        <p className="text-xs text-white/40 mt-1">
          Generated at: {meta.generated_at ? new Date(meta.generated_at).toLocaleString() : "—"}
        </p>
      </div>

      {/* OVERVIEW */}
      <CardSection title="Overview">
        <p className="text-white/70 leading-relaxed">
          {sop.overview || "No overview provided."}
        </p>
      </CardSection>

      {/* OBJECTIVES */}
      <CardSection title="Objectives">
        {objectives.length === 0 ? (
          <p className="text-white/50 text-sm">No objectives listed.</p>
        ) : (
          <ul className="list-disc ml-6 space-y-2 text-white/70">
            {objectives.map((x: any, i: number) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        )}
      </CardSection>

      {/* SCOPE */}
      <CardSection title="Scope">
        <p className="text-white/70 leading-relaxed">{sop.scope || "No scope defined."}</p>
      </CardSection>

      {/* ROLES */}
      <CardSection title="Roles & Responsibilities">
        {roles.length === 0 ? (
          <p className="text-white/50 text-sm">No roles included.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {roles.map((role: any, i: number) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold mb-2">{role.role}</h3>

                <ul className="list-disc ml-6 text-white/70 space-y-1">
                  {(role.responsibilities ?? []).map((r: string, j: number) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </CardSection>

      {/* INPUTS & OUTPUTS */}
      <CardSection title="Inputs & Outputs">
        {io.length === 0 ? (
          <p className="text-white/50 text-sm">No inputs or outputs documented.</p>
        ) : (
          <div className="space-y-4">
            {io.map((item: any, i: number) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold text-lg">{item.title}</h3>

                <p className="text-white/70 text-sm mt-3">Inputs:</p>
                <ul className="list-disc ml-6 text-white/60 mb-3">
                  {(item.inputs ?? []).map((x: string, j: number) => (
                    <li key={j}>{x}</li>
                  ))}
                </ul>

                <p className="text-white/70 text-sm">Outputs:</p>
                <ul className="list-disc ml-6 text-white/60">
                  {(item.outputs ?? []).map((x: string, j: number) => (
                    <li key={j}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </CardSection>

      {/* PROCEDURE */}
      <CardSection title="Procedure">
        {procedure.length === 0 ? (
          <p className="text-white/50 text-sm">No procedure steps provided.</p>
        ) : (
          <div className="space-y-6">
            {procedure.map((step: any, i: number) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-xl font-semibold mb-2">
                  Step {step.step}: {step.title}
                </h3>

                <p className="text-white/70 mb-3">{step.description}</p>

                <div className="text-sm text-white/60 mb-3">
                  Owner: {step.owner_role || "—"} — {step.estimated_time || "—"}
                </div>

                {/* Checklist */}
                <p className="text-white/70 font-semibold mb-1">Checklist</p>
                <ul className="list-disc ml-6 text-white/70 space-y-1 mb-4">
                  {(step.checklist ?? []).map((c: string, j: number) => (
                    <li key={j}>{c}</li>
                  ))}
                </ul>

                {/* Exceptions */}
                <p className="text-white/70 font-semibold mb-1">Exceptions</p>
                <ul className="list-disc ml-6 text-white/70 space-y-1">
                  {(step.exceptions ?? []).map((ex: any, j: number) => (
                    <li key={j}>
                      <b>{ex.condition}</b>: {ex.action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </CardSection>

      {/* KPIs */}
      <CardSection title="KPIs">
        {kpis.length === 0 ? (
          <p className="text-white/50 text-sm">No KPIs defined.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {kpis.map((k: any, i: number) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold">{k.name}</h3>
                <p className="text-white/70">{k.definition}</p>
                <p className="text-white/60 text-sm mt-1">
                  Target: {k.target} — Frequency: {k.frequency}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardSection>

      {/* RISKS */}
      <CardSection title="Risks & Mitigation">
        {risks.length === 0 ? (
          <p className="text-white/50 text-sm">No risks identified.</p>
        ) : (
          <div className="space-y-4">
            {risks.map((r: any, i: number) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold">{r.risk}</h3>
                <p className="text-white/60 text-sm mb-1">Impact: {r.impact}</p>
                <p className="text-white/60 text-sm mb-1">
                  Likelihood: {r.likelihood}
                </p>
                <p className="text-white/60 text-sm">Mitigation: {r.mitigation}</p>
              </div>
            ))}
          </div>
        )}
      </CardSection>

      {/* TRAINING */}
      <CardSection title="Training Requirements">
        {training.length === 0 ? (
          <p className="text-white/50 text-sm">No training documented.</p>
        ) : (
          <div className="space-y-4">
            {training.map((t: any, i: number) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold text-lg">{t.role}</h3>
                <p className="text-white/70">{t.training_title}</p>
                <p className="text-white/60 text-sm mt-1">Duration: {t.duration}</p>

                <ul className="list-disc ml-6 text-white/70 mt-2">
                  {(t.resources ?? []).map((r: string, j: number) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </CardSection>

    </div>
  );
}

function CardSection({ title, children }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      {children}
    </div>
  );
}