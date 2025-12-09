//app/dashboard/components/PreviewSOP.tsx

"use client";

export default function PreviewSOP({ sop }: { sop: any }) {
  if (!sop) return null;

  return (
    <div className="text-white space-y-10 max-h-[70vh] overflow-y-auto pr-4 sop-scroll">

      {/* Title & Metadata */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{sop.meta.title}</h1>
        <p className="text-white/60 text-sm">
          {sop.meta.company_name} — {sop.meta.industry}
        </p>
      </div>

      {/* Overview */}
      <Section title="Overview" text={sop.overview} />

      {/* Objectives */}
      <ListSection title="Objectives" items={sop.objectives} />

      {/* Scope */}
      <Section title="Scope" text={sop.scope} />

      {/* Roles */}
      <div>
        <h2 className="section-title">Roles & Responsibilities</h2>
        <div className="space-y-6">
          {sop.roles.map((role: any, i: number) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <h3 className="text-xl font-semibold mb-2">{role.role}</h3>
              <ul className="list-disc ml-6 text-white/70">
                {role.responsibilities.map((r: string, j: number) => (
                  <li key={j}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Inputs & Outputs */}
      <div>
        <h2 className="section-title">Inputs & Outputs</h2>
        <div className="space-y-4">
          {sop.inputs_outputs.map((io: any, i: number) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <h3 className="text-lg font-semibold mb-1">{io.title}</h3>

              <p className="text-white/70 text-sm">Inputs:</p>
              <ul className="list-disc ml-6 text-white/70 mb-2">
                {io.inputs.map((x: string, j: number) => (
                  <li key={j}>{x}</li>
                ))}
              </ul>

              <p className="text-white/70 text-sm">Outputs:</p>
              <ul className="list-disc ml-6 text-white/70">
                {io.outputs.map((x: string, j: number) => (
                  <li key={j}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Procedure Steps */}
      <div>
        <h2 className="section-title">Procedure</h2>

        <div className="space-y-6">
          {sop.procedure.map((step: any, i: number) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <h3 className="font-semibold text-xl mb-2">
                Step {step.step}: {step.title}
              </h3>
              <p className="text-white/70 mb-3">{step.description}</p>

              <p className="text-white/60 text-sm mb-1">
                Owner: {step.owner_role}
              </p>
              <p className="text-white/60 text-sm mb-2">
                Time: {step.estimated_time}
              </p>

              <p className="text-white/70">Checklist:</p>
              <ul className="list-disc ml-6 text-white/70 mb-3">
                {step.checklist.map((c: string, j: number) => (
                  <li key={j}>{c}</li>
                ))}
              </ul>

              <p className="text-white/70">Exceptions:</p>
              <ul className="list-disc ml-6 text-white/70">
                {step.exceptions.map((ex: any, j: number) => (
                  <li key={j}>
                    <b>{ex.condition}</b>: {ex.action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div>
        <h2 className="section-title">KPIs</h2>
        <ul className="space-y-3">
          {sop.kpis.map((k: any, i: number) => (
            <li
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
                <h3 className="text-lg font-semibold">{k.name}</h3>
              <p className="text-white/70">{k.definition}</p>
              <p className="text-white/60 text-sm mt-1">
                Target: {k.target} — Frequency: {k.frequency}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Tools */}
      <ListSection title="Tools" items={sop.tools.map((t: any) => `${t.name} — ${t.purpose}`)} />

      {/* Risks */}
      <div>
        <h2 className="section-title">Risks & Mitigation</h2>
        <div className="space-y-4">
          {sop.risks.map((r: any, i: number) => (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4" key={i}>
              <h3 className="font-semibold">{r.risk}</h3>
              <p className="text-white/70 text-sm mb-1">Impact: {r.impact}</p>
              <p className="text-white/70 text-sm mb-1">Likelihood: {r.likelihood}</p>
              <p className="text-white/70 text-sm">Mitigation: {r.mitigation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Training */}
      <div>
        <h2 className="section-title">Training Requirements</h2>
        <div className="space-y-4">
          {sop.training.map((t: any, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
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
      </div>

    </div>
  );
}

function Section({ title, text }: any) {
  return (
    <div>
      <h2 className="section-title">{title}</h2>
      <p className="text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}

function ListSection({ title, items }: any) {
  return (
    <div>
      <h2 className="section-title">{title}</h2>
      <ul className="list-disc ml-6 text-white/70 space-y-1">
        {items.map((x: any, i: number) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    </div>
  );
}