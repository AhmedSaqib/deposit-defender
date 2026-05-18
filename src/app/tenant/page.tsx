"use client";

import { useState } from "react";
import Link from "next/link";
import { FileDropZone } from "@/components/FileDropZone";
import type { AnalysisResult, ClaimAnalysis } from "@/lib/analyze";

const VERDICT_CONFIG: Record<
  ClaimAnalysis["verdict"],
  { label: string; bg: string; text: string; border: string }
> = {
  likely_invalid: {
    label: "Likely Invalid — Dispute This",
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-500",
  },
  likely_valid: {
    label: "Likely Valid",
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-500",
  },
  partially_valid: {
    label: "Partially Valid — Negotiate",
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-500",
  },
  insufficient_evidence: {
    label: "Insufficient Evidence",
    bg: "bg-gray-50",
    text: "text-gray-700",
    border: "border-gray-400",
  },
};

function formatCAD(amount: number | null): string {
  if (amount === null) return "N/A";
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(amount);
}

function VerdictBadge({ verdict }: { verdict: ClaimAnalysis["verdict"] }) {
  const cfg = VERDICT_CONFIG[verdict];
  return (
    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded ${cfg.bg} ${cfg.text}`}>
      {cfg.label}
    </span>
  );
}

function ClaimCard({ claim, index }: { claim: ClaimAnalysis; index: number }) {
  const cfg = VERDICT_CONFIG[claim.verdict];
  return (
    <div className={`rounded-lg border-l-4 ${cfg.border} bg-white shadow-sm p-5`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-sm font-semibold text-gray-900">
          {index + 1}. {claim.claim}
        </h3>
        <VerdictBadge verdict={claim.verdict} />
      </div>
      <div className="flex gap-6 mb-4">
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">Claimed</p>
          <p className="text-sm font-bold text-gray-800">{formatCAD(claim.claimed_amount_cad)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">Disputable</p>
          <p className="text-sm font-bold text-green-700">{formatCAD(claim.suggested_dispute_amount_cad)}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Reasoning</p>
          <p className="text-sm text-gray-700 leading-relaxed">{claim.reasoning}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Wear &amp; Tear</p>
          <p className="text-sm text-gray-700 leading-relaxed">{claim.wear_and_tear_assessment}</p>
        </div>
        {claim.photo_references.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Photo Evidence</p>
            <ul className="space-y-0.5">
              {claim.photo_references.map((ref, i) => (
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

export default function TenantPage() {
  const [deductionLetter, setDeductionLetter] = useState("");
  const [beforePhotos, setBeforePhotos] = useState<File[]>([]);
  const [afterPhotos, setAfterPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("mode", "tenant");
      formData.append("deductionLetter", deductionLetter);
      beforePhotos.forEach((f) => formData.append("beforePhotos", f));
      afterPhotos.forEach((f) => formData.append("afterPhotos", f));

      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Analysis failed");
      setResult(data);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!result) return;
    setDownloadingPdf(true);
    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "tenant", result }),
      });
      if (!res.ok) throw new Error("PDF generation failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "deposit-defender-rebuttal.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "PDF generation failed");
    } finally {
      setDownloadingPdf(false);
    }
  };

  const canSubmit =
    deductionLetter.trim().length > 0 &&
    beforePhotos.length > 0 &&
    afterPhotos.length > 0 &&
    !loading;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
            ← Back
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Tenant Dispute Analysis</h1>
            <p className="text-xs text-gray-500">DepositDefender · Ontario RTA / LTB</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-800 leading-relaxed">
          <strong>Not legal advice.</strong> For legal guidance visit{" "}
          <a href="https://stepstojustice.ca" target="_blank" rel="noopener noreferrer" className="underline">
            stepstojustice.ca
          </a>{" "}
          or call the LTB at 1-888-332-3234.
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <label htmlFor="deductionLetter" className="block text-sm font-semibold text-gray-700 mb-1">
              Landlord&apos;s Deduction Letter
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Paste the full text including each claimed item and dollar amount.
            </p>
            <textarea
              id="deductionLetter"
              value={deductionLetter}
              onChange={(e) => setDeductionLetter(e.target.value)}
              rows={8}
              placeholder="e.g. 'Wall damage in bedroom: $400. Deep cleaning fee: $250. Carpet stain in living room: $150.'"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FileDropZone
              id="beforePhotos"
              label="Move-In Photos"
              hint="Photos from the start of your tenancy"
              files={beforePhotos}
              onChange={setBeforePhotos}
            />
            <FileDropZone
              id="afterPhotos"
              label="Move-Out Photos"
              hint="Photos from when you left"
              files={afterPhotos}
              onChange={setAfterPhotos}
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {loading ? "Analyzing…" : "Analyze My Case"}
          </button>

          {loading && (
            <div className="text-center text-sm text-gray-500 space-y-1">
              <p className="font-medium text-blue-700">Claude is reviewing your photos and letter…</p>
              <p>This takes 30–90 seconds with many photos. Please wait.</p>
            </div>
          )}
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Analysis Complete</h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{result.overall_summary}</p>
              <div className="flex gap-8 mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Total Claimed</p>
                  <p className="text-xl font-bold text-gray-800">{formatCAD(result.total_claimed_cad)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Disputable Amount</p>
                  <p className="text-xl font-bold text-green-700">{formatCAD(result.total_disputable_cad)}</p>
                </div>
              </div>
              <button
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {downloadingPdf ? "Generating PDF…" : "Download Rebuttal PDF"}
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-base font-bold text-gray-800">
                Claim-by-Claim Analysis ({result.claims.length} claims)
              </h2>
              {result.claims.map((claim, i) => (
                <ClaimCard key={i} claim={claim} index={i} />
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-base font-bold text-gray-800 mb-3">Recommended Next Steps</h2>
              <ol className="space-y-2">
                {result.recommended_next_steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-700">
                    <span className="font-bold text-blue-700 shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <p className="text-xs text-gray-400 text-center pb-4">
              DepositDefender is not a law firm and does not provide legal advice.{" "}
              <a href="https://stepstojustice.ca" target="_blank" rel="noopener noreferrer" className="underline">
                stepstojustice.ca
              </a>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
