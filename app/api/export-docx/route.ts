// app/api/export-docx/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  TextRun,
} from "docx";

function safeString(v: any) {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  try {
    return String(v);
  } catch {
    return JSON.stringify(v);
  }
}

function createHeading(text: string, level: typeof HeadingLevel[keyof typeof HeadingLevel]) {
  return new Paragraph({ text, heading: level, spacing: { after: 200 } });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sop = body?.sop;
    if (!sop) return NextResponse.json({ error: "Missing SOP JSON" }, { status: 400 });

    const children: any[] = [];

    // Title (no logo)
    children.push(
      new Paragraph({
        children: [new TextRun({ text: safeString(sop.meta?.title || "SOP Document"), bold: true })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
      })
    );

    // Business type line
    children.push(
      new Paragraph({
        text: `Business Type: ${safeString(sop.meta?.business_type || "")}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
      })
    );

    // Overview
    children.push(createHeading("Overview", HeadingLevel.HEADING_1));
    children.push(new Paragraph(safeString(sop.overview || "")));

    // Objectives
    children.push(createHeading("Objectives", HeadingLevel.HEADING_2));
    if (Array.isArray(sop.objectives) && sop.objectives.length) {
      for (const o of sop.objectives) children.push(new Paragraph(`• ${safeString(o)}`));
    } else children.push(new Paragraph("No objectives specified."));

    // Scope
    children.push(createHeading("Scope", HeadingLevel.HEADING_2));
    children.push(new Paragraph(safeString(sop.scope || "")));

    // Roles table
    children.push(createHeading("Roles & Responsibilities", HeadingLevel.HEADING_2));
    const roleHeader = new TableRow({
      children: [
        new TableCell({ children: [new Paragraph("Role")], width: { size: 25, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph("Responsibilities")], width: { size: 55, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph("Time")], width: { size: 20, type: WidthType.PERCENTAGE } }),
      ],
    });

    const roleRows =
      Array.isArray(sop.roles) && sop.roles.length
        ? sop.roles.map(
            (r: any) =>
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(safeString(r.role))] }),
                  new TableCell({ children: [new Paragraph((r.responsibilities || []).join("\n"))] }),
                  new TableCell({ children: [new Paragraph(safeString(r.time_commitment || ""))] }),
                ],
              })
          )
        : [new TableRow({ children: [new TableCell({ children: [new Paragraph("No roles defined")] })] })];

    children.push(new Table({ rows: [roleHeader, ...roleRows], width: { size: 100, type: WidthType.PERCENTAGE } }));

    // Tools
    children.push(createHeading("Tools & Integrations", HeadingLevel.HEADING_2));
    if (Array.isArray(sop.tools) && sop.tools.length) {
      for (const t of sop.tools) children.push(new Paragraph(`• ${safeString(t.name)} — ${safeString(t.purpose || "")}`));
    } else children.push(new Paragraph("No specific tools required."));

    // Procedure
    children.push(createHeading("Step-by-Step Procedure", HeadingLevel.HEADING_2));
    if (Array.isArray(sop.procedure) && sop.procedure.length) {
      for (const p of sop.procedure) {
        children.push(new Paragraph({ text: `Step ${safeString(p.step)}: ${safeString(p.title)}`, heading: HeadingLevel.HEADING_3 }));
        children.push(new Paragraph(safeString(p.description || "")));
        if (Array.isArray(p.checklist) && p.checklist.length) {
          for (const c of p.checklist) children.push(new Paragraph(`  - ${safeString(c)}`));
        }
        // spacing
        children.push(new Paragraph(""));
      }
    } else children.push(new Paragraph("No procedure steps provided."));

    // Risks table
    children.push(createHeading("Risk Assessment", HeadingLevel.HEADING_2));
    if (Array.isArray(sop.risks) && sop.risks.length) {
      const riskHeader = new TableRow({
        children: [new TableCell({ children: [new Paragraph("Risk")] }), new TableCell({ children: [new Paragraph("Impact")] }), new TableCell({ children: [new Paragraph("Mitigation")] })],
      });
      const riskRows = sop.risks.map(
        (r: any) =>
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(safeString(r.risk))] }),
              new TableCell({ children: [new Paragraph(safeString(r.impact || r.score || ""))] }),
              new TableCell({ children: [new Paragraph(safeString(r.mitigation || ""))] }),
            ],
          })
      );
      children.push(new Table({ rows: [riskHeader, ...riskRows] }));
    } else children.push(new Paragraph("No risks identified."));

    // KPIs
    children.push(createHeading("KPIs & Metrics", HeadingLevel.HEADING_2));
    if (Array.isArray(sop.kpis) && sop.kpis.length) {
      for (const k of sop.kpis) children.push(new Paragraph(`${safeString(k.name)} — ${safeString(k.formula || "")} — Target: ${safeString(k.target || "")}`));
    } else children.push(new Paragraph("No KPIs defined."));

    // Training
    children.push(createHeading("Training & Implementation Tips", HeadingLevel.HEADING_2));
    if (Array.isArray(sop.training) && sop.training.length) {
      for (const t of sop.training) children.push(new Paragraph(`${safeString(t.role)} — ${safeString(t.training_title)} — Duration: ${safeString(t.duration)}`));
    } else children.push(new Paragraph("No training specifics provided."));

    // Templates
    children.push(createHeading("Templates", HeadingLevel.HEADING_2));
    if (Array.isArray(sop.templates) && sop.templates.length) {
      for (const t of sop.templates) {
        children.push(new Paragraph({ text: `${safeString(t.name)}`, heading: HeadingLevel.HEADING_3 }));
        children.push(new Paragraph(safeString(t.content || "")));
      }
    } else children.push(new Paragraph("No templates included."));

    // Document Control
    children.push(createHeading("Document Control", HeadingLevel.HEADING_2));
    children.push(new Paragraph(`Version: ${safeString(sop.document_control?.version || "1.0")}`));
    children.push(new Paragraph(`Author: ${safeString(sop.document_control?.author || "")}`));
    children.push(new Paragraph(`Last Reviewed: ${safeString(sop.document_control?.last_reviewed || "")}`));

    const doc = new Document({ sections: [{ children }] });
    const buffer = await Packer.toBuffer(doc);

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${(sop.meta?.title || "sop").replace(/\s+/g, "_")}.docx"`,
      },
    });
  } catch (err: any) {
    console.error("export-docx error:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}