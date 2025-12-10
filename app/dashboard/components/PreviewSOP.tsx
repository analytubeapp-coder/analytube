// app/dashboard/components/PreviewSOP.tsx

"use client";

export default function PreviewSOP({ sop }: { sop: any }) {
  if (!sop) return null;

  return (
    <div className="text-white space-y-10 max-h-[70vh] overflow-y-auto pr-3">
      
      {/* HEADER */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-2">{sop.meta.title}</h1>
        <p className="text-white/60 text-sm">
          {sop.meta.company_name} — {sop.meta.industry}
        </p>
        <p className="text-xs text-white/40 mt-1">
          Generated at: {new Date(sop.meta.generated_at).toLocaleString()}
        </p>
      </div>

      {/* OVERVIEW */}
      <CardSection title="Overview">
        <p className="text-white/70 leading-relaxed">{sop.overview}</p>
      </CardSection>

      {/* OBJECTIVES */}
      <CardSection title="Objectives">
        <ul className="list-disc ml-6 space-y-2 text-white/70">
          {sop.objectives.map((x: any, i: number) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </CardSection>

      {/* SCOPE */}
      <CardSection title="Scope">
        <p className="text-white/70 leading-relaxed">{sop.scope}</p>
      </CardSection>

      {/* ROLES */}
      <CardSection title="Roles & Responsibilities">
        <div className="grid md:grid-cols-2 gap-6">
          {sop.roles.map((role: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-2">{role.role}</h3>

              <ul className="list-disc ml-6 text-white/70 space-y-1">
                {role.responsibilities.map((r: string, j: number) => (
                  <li key={j}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardSection>

      {/* INPUTS & OUTPUTS */}
      <CardSection title="Inputs & Outputs">
        <div className="space-y-4">
          {sop.inputs_outputs?.map((io: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-semibold text-lg">{io.title}</h3>

              <p className="text-white/70 text-sm mt-3">Inputs:</p>
              <ul className="list-disc ml-6 text-white/60 mb-3">
                {io.inputs.map((x: string, j: number) => (
                  <li key={j}>{x}</li>
                ))}
              </ul>

              <p className="text-white/70 text-sm">Outputs:</p>
              <ul className="list-disc ml-6 text-white/60">
                {io.outputs.map((x: string, j: number) => (
                  <li key={j}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardSection>

      {/* PROCEDURE */}
      <CardSection title="Procedure">
        <div className="space-y-6">
          {sop.procedure.map((step: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 relative">
              <h3 className="text-xl font-semibold mb-2">
                Step {step.step}: {step.title}
              </h3>

              <p className="text-white/70 mb-3">{step.description}</p>

              <div className="text-sm text-white/60 mb-3">
                Owner: {step.owner_role} — {step.estimated_time}
              </div>

              <p className="text-white/70 font-semibold mb-1">Checklist</p>
              <ul className="list-disc ml-6 text-white/70 space-y-1 mb-4">
                {step.checklist.map((c: string, j: number) => (
                  <li key={j}>{c}</li>
                ))}
              </ul>

              <p className="text-white/70 font-semibold mb-1">Exceptions</p>
              <ul className="list-disc ml-6 text-white/70 space-y-1">
                {step.exceptions.map((ex: any, j: number) => (
                  <li key={j}>
                    <b>{ex.condition}</b>: {ex.action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </CardSection>

      {/* KPIs */}
      <CardSection title="KPIs">
        <div className="grid md:grid-cols-2 gap-6">
          {sop.kpis.map((k: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-lg font-semibold">{k.name}</h3>
              <p className="text-white/70">{k.definition}</p>
              <p className="text-white/60 text-sm mt-1">
                Target: {k.target} — Frequency: {k.frequency}
              </p>
            </div>
          ))}
        </div>
      </CardSection>

      {/* RISKS */}
      <CardSection title="Risks & Mitigation">
        <div className="space-y-4">
          {sop.risks.map((r: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-semibold">{r.risk}</h3>
              <p className="text-white/60 text-sm mb-1">Impact: {r.impact}</p>
              <p className="text-white/60 text-sm mb-1">Likelihood: {r.likelihood}</p>
              <p className="text-white/60 text-sm">Mitigation: {r.mitigation}</p>
            </div>
          ))}
        </div>
      </CardSection>

      {/* TRAINING */}
      <CardSection title="Training Requirements">
        <div className="space-y-4">
          {sop.training.map((t: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-semibold text-lg">{t.role}</h3>
              <p className="text-white/70">{t.training_title}</p>
              <p className="text-white/60 text-sm mt-1">Duration: {t.duration}</p>

              <ul className="list-disc ml-6 text-white/70 mt-2">
                {t.resources.map((r: string, j: number) => (
                  <li key={j}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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