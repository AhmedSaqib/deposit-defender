"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropZone } from "@/components/FileDropZone";
import { InnerHeader } from "@/components/InnerHeader";
import type { InspectionReport, DamageFinding } from "@/lib/analyze";

const SEVERITY_CONFIG: Record<
  DamageFinding["severity"],
  { label: string; bg: string; text: string; border: string }
> = {
  none: { label: "No Damage", bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-300" },
  cosmetic: { label: "Cosmetic", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-400" },
  moderate: { label: "Moderate", bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-500" },
  significant: { label: "Significant", bg: "bg-red-50", text: "text-red-800", border: "border-red-500" },
};

const CONDITION_CONFIG: Record<
  InspectionReport["overall_condition"],
  { label: string; color: string }
> = {
  excellent: { label: "Excellent", color: "text-green-700" },
  good: { label: "Good", color: "text-blue-700" },
  fair: { label: "Fair", color: "text-amber-700" },
  poor: { label: "Poor", color: "text-red-700" },
};

function formatCAD(amount: number | null): string {
  if (amount === null) return "N/A";
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(amount);
}

function SeverityBadge({ severity }: { severity: DamageFinding["severity"] }) {
  const cfg = SEVERITY_CONFIG[severity];
  return (
    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded ${cfg.bg} ${cfg.text}`}>
      {cfg.label}
    </span>
  );
}

function FindingCard({ finding, index }: { finding: DamageFinding; index: number }) {
  const severityCfg = SEVERITY_CONFIG[finding.severity];
  return (
    <div className={`rounded-lg border-l-4 ${severityCfg.border} bg-white shadow-sm p-5`}>
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {index + 1}. {finding.item}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{finding.location}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <SeverityBadge severity={finding.severity} />
          {finding.is_wear_and_tear ? (
            <span className="inline-block text-xs font-bold px-2 py-0.5 rounded bg-green-50 text-green-700">
              Wear &amp; Tear
            </span>
          ) : finding.severity !== "none" ? (
            <span className="inline-block text-xs font-bold px-2 py-0.5 rounded bg-red-50 text-red-700">
              Chargeable
            </span>
          ) : null}
        </div>
      </div>

      {!finding.is_wear_and_tear && finding.estimated_repair_cost_cad !== null && finding.severity !== "none" && (
        <div className="mt-3 mb-3">
          <p className="text-xs text-gray-500 uppercase font-semibold">Estimated Repair Cost</p>
          <p className="text-sm font-bold text-red-700">{formatCAD(finding.estimated_repair_cost_cad)}</p>
        </div>
      )}

      <div className="space-y-3 mt-3">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Description</p>
          <p className="text-sm text-gray-700 leading-relaxed">{finding.description}</p>
        </div>
        {finding.severity !== "none" && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Repair Recommendation</p>
            <p className="text-sm text-gray-700 leading-relaxed">{finding.repair_recommendation}</p>
          </div>
        )}
        {finding.photo_references.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Photo Evidence</p>
            <ul className="space-y-0.5">
              {finding.photo_references.map((ref, i) => (
                <li key={i} className="text-xs text-gray-600 flex gap-1">
                  <span className="text-gray-400">•</span> {ref}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LandlordPage() {
  const [propertyAddress, setPropertyAddress] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [notes, setNotes] = useState("");
  const [beforePhotos, setBeforePhotos] = useState<File[]>([]);
  const [afterPhotos, setAfterPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<InspectionReport | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [deductionLetter, setDeductionLetter] = useState("");
  const [letterCopied, setLetterCopied] = useState(false);

  const generateDeductionLetter = () => {
    if (!report) return;
    const chargeable = report.findings.filter((f) => !f.is_wear_and_tear && f.severity !== "none");
    const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const itemLines = chargeable.map((f, i) =>
      `${i + 1}. ${f.item}${f.location ? ` — ${f.location}` : ""}\n   ${f.description}\n   Recommended repair: ${f.repair_recommendation}\n   Estimated cost: ${f.estimated_repair_cost_cad !== null ? `$${f.estimated_repair_cost_cad.toFixed(2)}` : "TBD"}`
    ).join("\n\n");
    const total = report.total_chargeable_cad > 0 ? `$${report.total_chargeable_cad.toFixed(2)}` : "see above";

    const letter = `${propertyAddress || "[Landlord Name]"}
${propertyAddress ? "" : "[Landlord Address]"}
${date}

${tenantName || "[Tenant Name]"}
[Tenant Forwarding Address]

RE: Security Deposit Deductions — ${propertyAddress || "[Property Address]"}

Dear ${tenantName || "[Tenant Name]"},

Following your departure from ${propertyAddress || "the above-referenced property"} and our subsequent inspection, this letter provides a formal itemized accounting of deductions from your security deposit.

PROPERTY CONDITION SUMMARY
Overall condition: ${report.overall_condition.charAt(0).toUpperCase() + report.overall_condition.slice(1)}
${report.overall_summary}

ITEMIZED DEDUCTIONS
${chargeable.length === 0 ? "No chargeable damage was identified. Your full deposit will be returned." : itemLines}

${chargeable.length > 0 ? `TOTAL DEDUCTIONS: ${total}

Please note that normal wear and tear has not been charged, in accordance with standard tenancy law. The deductions above reflect only damage beyond reasonable wear.

${report.total_chargeable_cad > 0 ? `[Your deposit balance after deductions will be confirmed separately once all repair costs are finalised.]` : ""}` : ""}

If you have any questions regarding this itemization, please contact us within 7 days of receiving this letter.

${report.recommended_next_steps.length > 0 ? `NEXT STEPS\n${report.recommended_next_steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n` : ""}
Yours sincerely,

${propertyAddress || "[Landlord Name]"}
[Contact Details]`;

    setDeductionLetter(letter);
    setTimeout(() => {
      document.getElementById("deduction-letter")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const copyDeductionLetter = () => {
    navigator.clipboard.writeText(deductionLetter);
    setLetterCopied(true);
    setTimeout(() => setLetterCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setReport(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("mode", "landlord");
      if (propertyAddress.trim()) formData.append("propertyAddress", propertyAddress);
      if (tenantName.trim()) formData.append("tenantName", tenantName);
      if (notes.trim()) formData.append("notes", notes);
      beforePhotos.forEach((f) => formData.append("beforePhotos", f));
      afterPhotos.forEach((f) => formData.append("afterPhotos", f));

      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Analysis failed");
      setReport(data);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!report) return;
    setDownloadingPdf(true);
    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "landlord",
          result: report,
          meta: { propertyAddress: propertyAddress || undefined, tenantName: tenantName || undefined },
        }),
      });
      if (!res.ok) throw new Error("PDF generation failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "deposit-defender-inspection-report.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "PDF generation failed");
    } finally {
      setDownloadingPdf(false);
    }
  };

  const canSubmit = afterPhotos.length > 0 && !loading;

  const chargeableFindings = report?.findings.filter((f) => !f.is_wear_and_tear && f.severity !== "none") ?? [];
  const wearFindings = report?.findings.filter((f) => f.is_wear_and_tear) ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <InnerHeader title="Property Inspection Report" subtitle="AI-powered damage vs. wear & tear analysis" maxWidth="max-w-3xl" />

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-800 leading-relaxed">
          <strong>How it works:</strong> Upload your after photos (before photos optional). Our AI will analyse them for damage beyond normal wear and tear and generate a formal inspection report. Before photos improve accuracy significantly.
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="propertyAddress" className="block text-sm font-semibold text-gray-700 mb-1">
                Property Address <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                id="propertyAddress"
                type="text"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                placeholder="123 Main St, Unit 4, Toronto, ON"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="tenantName" className="block text-sm font-semibold text-gray-700 mb-1">
                Tenant Name <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                id="tenantName"
                type="text"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-1">
              Inspection Notes <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any specific concerns or areas to focus on (e.g. 'tenant had a pet', 'focus on kitchen and master bedroom')."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FileDropZone
              id="beforePhotos"
              label="Before Photos (Move-In) — optional"
              hint="If you have them — our AI will still analyse after photos alone"
              files={beforePhotos}
              onChange={setBeforePhotos}
            />
            <FileDropZone
              id="afterPhotos"
              label="After Photos (Move-Out)"
              hint="Taken after the tenant has left"
              files={afterPhotos}
              onChange={setAfterPhotos}
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-emerald-700 text-white font-semibold py-3 rounded-lg hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {loading ? "Analyzing…" : "Generate Inspection Report"}
          </button>

          {loading && (
            <div className="text-center text-sm text-gray-500 space-y-1">
              <p className="font-medium text-emerald-700">Analysing your photos…</p>
              <p>This takes 30–90 seconds with many photos. Please wait.</p>
            </div>
          )}
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
            <strong>Error:</strong> {error}
          </div>
        )}

        {report && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">Inspection Complete</h2>
                <span className={`text-lg font-bold ${CONDITION_CONFIG[report.overall_condition].color}`}>
                  Overall: {CONDITION_CONFIG[report.overall_condition].label}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{report.overall_summary}</p>
              <div className="flex gap-8 mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Chargeable to Tenant</p>
                  <p className="text-xl font-bold text-red-700">{formatCAD(report.total_chargeable_cad)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Wear &amp; Tear (not chargeable)</p>
                  <p className="text-xl font-bold text-gray-600">{formatCAD(report.total_wear_and_tear_cad)}</p>
                </div>
              </div>
              <div className="flex gap-3 text-xs text-gray-500 mb-4">
                <span>{chargeableFindings.length} chargeable finding{chargeableFindings.length !== 1 ? "s" : ""}</span>
                <span>·</span>
                <span>{wearFindings.length} wear &amp; tear item{wearFindings.length !== 1 ? "s" : ""}</span>
                <span>·</span>
                <span>{report.findings.length} total</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleDownloadPdf}
                  disabled={downloadingPdf}
                  className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {downloadingPdf ? "Generating PDF…" : "Download Inspection Report PDF"}
                </button>
                <button
                  onClick={generateDeductionLetter}
                  className="bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Generate Deduction Letter
                </button>
              </div>
            </div>

            {/* Chargeable findings */}
            {chargeableFindings.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-gray-800">
                  Chargeable Damage ({chargeableFindings.length})
                </h2>
                {chargeableFindings.map((finding, i) => (
                  <FindingCard key={i} finding={finding} index={i} />
                ))}
              </div>
            )}

            {/* Wear and tear findings */}
            {wearFindings.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-gray-800">
                  Normal Wear &amp; Tear — Not Chargeable ({wearFindings.length})
                </h2>
                <p className="text-xs text-gray-500 -mt-2">
                  These items are expected degradation from normal use and generally cannot be deducted from the deposit under standard tenancy law.
                </p>
                {wearFindings.map((finding, i) => (
                  <FindingCard key={i} finding={finding} index={i} />
                ))}
              </div>
            )}

            {/* Next steps */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-base font-bold text-gray-800 mb-3">Recommended Next Steps</h2>
              <ol className="space-y-2">
                {report.recommended_next_steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-700">
                    <span className="font-bold text-emerald-700 shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {deductionLetter && (
              <div id="deduction-letter" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold text-gray-800">Deduction Letter</h2>
                  <button
                    onClick={copyDeductionLetter}
                    className="text-sm font-semibold px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                  >
                    {letterCopied ? "Copied!" : "Copy Letter"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Fill in the bracketed sections before sending. Deliver via email with read receipt or post with proof of delivery.
                </p>
                <pre className="text-xs text-gray-700 bg-gray-50 rounded-lg p-5 whitespace-pre-wrap leading-relaxed border border-gray-100">{deductionLetter}</pre>
              </div>
            )}

            <p className="text-xs text-gray-400 text-center pb-4">
              MoveProof is not a law firm. Estimated costs are approximations — verify with local contractors. Consult a legal professional for jurisdiction-specific advice.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
