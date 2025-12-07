// app/api/export-pdf/route.ts

import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

function safeText(v: any) {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  try {
    return String(v);
  } catch {
    return JSON.stringify(v);
  }
}

function wrapText(text: string, maxCharsPerLine = 95) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxCharsPerLine) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sop = body?.sop;
    if (!sop) return NextResponse.json({ error: "Missing SOP JSON" }, { status: 400 });

    const pdfDoc = await PDFDocument.create();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pageWidth = 595;
    const pageHeight = 842;
    const margin = 48;
    const fontTitle = 16;
    const fontHeader = 12;
    const fontBody = 11;

    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;

    // Title header (no logo)
    page.drawText(safeText(sop.meta?.title || "SOP Document"), { x: margin, y: y, size: fontTitle, font: helvetica });
    y -= 36;

    const addLines = (lines: string[], size = fontBody) => {
      for (const line of lines) {
        if (y < margin + 80) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        page.drawText(line, { x: margin, y, size, font: helvetica });
        y -= size + 4;
      }
    };

    addLines(wrapText(`Overview: ${safeText(sop.overview || "")}`, 95), fontBody);
    y -= 6;
    addLines(wrapText(`Scope: ${safeText(sop.scope || "")}`, 95), fontBody);
    y -= 6;

    if (Array.isArray(sop.procedure)) {
      addLines(["Procedure:"], fontHeader);
      for (const p of sop.procedure) {
        addLines([`Step ${safeText(p.step)}: ${safeText(p.title)}`], fontHeader);
        addLines(wrapText(safeText(p.description || ""), 95), fontBody);
        if (Array.isArray(p.checklist)) addLines(p.checklist.map((c: string) => `- ${safeText(c)}`), fontBody);
        y -= 6;
      }
    }

    if (Array.isArray(sop.risks) && sop.risks.length) {
      addLines(["Risk Assessment:"], fontHeader);
      for (const r of sop.risks) {
        addLines([`${safeText(r.risk)} — Impact: ${safeText(r.impact || r.score || "")}`], fontBody);
        addLines([`Mitigation: ${safeText(r.mitigation || "")}`], fontBody);
        y -= 4;
      }
    }

    // footer page numbers
    const pages = pdfDoc.getPages();
    for (let i = 0; i < pages.length; i++) {
      const pg = pages[i];
      pg.drawText(`Page ${i + 1} of ${pages.length}`, { x: pageWidth - 120, y: 20, size: 9, font: helvetica });
    }

    const pdfBytes = await pdfDoc.save();
const uint8 = new Uint8Array(pdfBytes);

return new Response(uint8, {
  status: 200,
  headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="output.pdf"`,
  },
});
  } catch (err: any) {
    console.error("export-pdf error:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}