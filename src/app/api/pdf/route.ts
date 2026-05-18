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
    if (mode === "landlord") {
      const report = InspectionReportSchema.parse(result);
      const buffer = await renderToBuffer(
        React.createElement(InspectionReportDocument, { report, generatedAt, meta })
      );
      return new Response(buffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="deposit-defender-inspection-report.pdf"',
        },
      });
    } else {
      const analysisResult = AnalysisResultSchema.parse(result);
      const buffer = await renderToBuffer(
        React.createElement(RebuttalDocument, { result: analysisResult, generatedAt })
      );
      return new Response(buffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="deposit-defender-rebuttal.pdf"',
        },
      });
    }
  } catch {
    return Response.json({ error: "Invalid result data or PDF generation failed" }, { status: 400 });
  }
}
