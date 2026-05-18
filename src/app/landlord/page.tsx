"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropZone } from "@/components/FileDropZone";
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

  const canSubmit = beforePhotos.length > 0 && afterPhotos.length > 0 && !loading;

  const chargeableFindings = report?.findings.filter((f) => !f.is_wear_and_tear && f.severity !== "none") ?? [];
  const wearFindings = report?.findings.filter((f) => f.is_wear_and_tear) ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            ← Back
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Property Inspection Report</h1>
            <p className="text-xs text-gray-500">DepositDefender · Ontario RTA / LTB</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-800 leading-relaxed">
          <strong>How it works:</strong> Upload your before and after photos. Claude will compare them, identify any damage beyond normal wear and tear, and generate a formal inspection report you can use to document deductions.
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FileDropZone
              id="beforePhotos"
              label="Before Photos (Move-In)"
              hint="Taken at the start of the tenancy"
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
              <p className="font-medium text-emerald-700">Claude is comparing your before and after photos…</p>
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
              <button
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {downloadingPdf ? "Generating PDF…" : "Download Inspection Report PDF"}
              </button>
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
                  These items are expected degradation from normal use and cannot be deducted from the deposit under the RTA.
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

            <p className="text-xs text-gray-400 text-center pb-4">
              DepositDefender is not a law firm. Estimated costs are approximations — verify with contractors.{" "}
              <a href="https://stepstojustice.ca" target="_blank" rel="noopener noreferrer" className="underline">
                stepstojustice.ca
              </a>{" "}
              · LTB: 1-888-332-3234
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
