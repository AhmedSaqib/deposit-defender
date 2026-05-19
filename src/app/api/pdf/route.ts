import { NextRequest } from "next/server";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { AnalysisResultSchema, InspectionReportSchema } from "@/lib/analyze";
import { RebuttalDocument, InspectionReportDocument } from "@/lib/pdf";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { mode, result, meta } = body as {
    mode?: string;
    result: unknown;
    meta?: { propertyAddress?: string; tenantName?: string };
  };

  const generatedAt = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toResponse = (buf: Buffer, filename: string) =>
      new Response(new Uint8Array(buf), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });

    if (mode === "landlord") {
      const report = InspectionReportSchema.parse(result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const buffer = await renderToBuffer(React.createElement(InspectionReportDocument, { report, generatedAt, meta }) as any);
      return toResponse(buffer, "moveproof-inspection-report.pdf");
    } else {
      const analysisResult = AnalysisResultSchema.parse(result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const buffer = await renderToBuffer(React.createElement(RebuttalDocument, { result: analysisResult, generatedAt }) as any);
      return toResponse(buffer, "moveproof-rebuttal.pdf");
    }
  } catch {
    return Response.json({ error: "Invalid result data or PDF generation failed" }, { status: 400 });
  }
}
