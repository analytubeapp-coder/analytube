// app/api/export-pdf/route.ts
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

function safeText(v: any) {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  return JSON.stringify(v);
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

async function fetchLogoArrayBuffer() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/logoo.png`);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { sop } = await req.json();
    if (!sop) return NextResponse.json({ error: "Missing SOP JSON" }, { status: 400 });

    const pdfDoc = await PDFDocument.create();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const logoBuf = await fetchLogoArrayBuffer();
    let logoImage: any = null;
    if (logoBuf) {
      try {
        logoImage = await pdfDoc.embedPng(logoBuf);
      } catch {
        // ignore embedding error
      }
    }

    const pageWidth = 595;
    const pageHeight = 842;
    const margin = 48;
    const fontTitle = 16;
    const fontHeader = 12;
    const fontBody = 11;

    // helper to add a new page
    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;

    // draw header
    if (logoImage) {
      const s = logoImage.scale(0.35);
      page.drawImage(logoImage, { x: margin, y: y - s.height + 4, width: s.width, height: s.height });
    }
    page.drawText(safeText(sop.meta?.title || "SOP Document"), { x: margin + 160, y: y - 10, size: fontTitle, font: helvetica });
    y -= 60;

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
    addLines(wrapText(`Scope: ${safeText(sop.scope || "")}`, 95), fontBody);

    if (Array.isArray(sop.procedure)) {
      addLines([`Procedure:`], fontHeader);
      for (const p of sop.procedure) {
        addLines([`Step ${p.step}: ${safeText(p.title)}`], fontHeader);
        addLines(wrapText(safeText(p.description || ""), 95), fontBody);
        if (Array.isArray(p.checklist)) addLines(p.checklist.map((c: string) => `- ${c}`), fontBody);
      }
    }

    if (Array.isArray(sop.risks) && sop.risks.length) {
      addLines([`Risk Assessment:`], fontHeader);
      for (const r of sop.risks) {
        addLines([`${safeText(r.risk)} — Impact: ${safeText(r.impact || r.score || "")}`], fontBody);
        addLines([`Mitigation: ${safeText(r.mitigation || "")}`], fontBody);
      }
    }

    // footer page numbers
    const pages = pdfDoc.getPages();
    for (let i = 0; i < pages.length; i++) {
      const pg = pages[i];
      pg.drawText(`Page ${i + 1} of ${pages.length}`, { x: pageWidth - 120, y: 20, size: 9, font: helvetica });
    }

    const pdfBytes = await pdfDoc.save();
    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${(sop.meta?.title || "sop").replace(/\s+/g, "_")}.pdf"`,
      },
    });
  } catch (err: any) {
    console.error("export-pdf error:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}