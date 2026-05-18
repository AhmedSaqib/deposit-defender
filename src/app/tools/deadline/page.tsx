"use client";

import { useState } from "react";
import Link from "next/link";

const JURISDICTIONS = [
  { code: "UK",    name: "United Kingdom",              days: 10, source: "Tenancy Deposit Scheme" },
  { code: "AU-NSW",name: "Australia — New South Wales", days: 14, source: "Residential Tenancies Act 2010" },
  { code: "AU-VIC",name: "Australia — Victoria",        days: 14, source: "Residential Tenancies Act 1997" },
  { code: "AU-QLD",name: "Australia — Queensland",      days: 10, source: "RTRA Act 2008" },
  { code: "AU-WA", name: "Australia — Western Australia",days: 21,source: "Residential Tenancies Act 1987" },
  { code: "CA-ON", name: "Canada — Ontario",            days: 10, source: "Residential Tenancies Act" },
  { code: "CA-BC", name: "Canada — British Columbia",   days: 15, source: "Residential Tenancy Act" },
  { code: "CA-AB", name: "Canada — Alberta",            days: 10, source: "Residential Tenancies Act" },
  { code: "US-CA", name: "USA — California",            days: 21, source: "Civil Code §1950.5" },
  { code: "US-NY", name: "USA — New York",              days: 14, source: "General Obligations Law §7-108" },
  { code: "US-TX", name: "USA — Texas",                 days: 30, source: "Property Code §92.103" },
  { code: "US-FL", name: "USA — Florida",               days: 15, source: "Florida Statutes §83.49" },
  { code: "US-WA", name: "USA — Washington",            days: 21, source: "RCW 59.18.280" },
  { code: "US-IL", name: "USA — Illinois",              days: 30, source: "765 ILCS 710" },
  { code: "US-GA", name: "USA — Georgia",               days: 30, source: "O.C.G.A. §44-7-34" },
  { code: "OTHER", name: "Other / Not Listed",          days: 30, source: null },
] as const;

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-xs font-semibold px-3 py-1.5 rounded bg-gray-900 text-white hover:bg-gray-700 transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function DeadlinePage() {
  const [jurisdiction, setJurisdiction] = useState("");
  const [moveOutDate, setMoveOutDate] = useState("");

  const jur = JURISDICTIONS.find((j) => j.code === jurisdiction);
  const moveOut = moveOutDate ? new Date(moveOutDate + "T12:00:00") : null;
  const deadline = moveOut && jur ? addDays(moveOut, jur.days) : null;
  const today = new Date();
  const daysUntil = deadline ? Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : null;
  const isOverdue = daysUntil !== null && daysUntil < 0;

  const tenantLetter = deadline && moveOut && jur
    ? `${formatDate(today)}

[Landlord Name]
[Landlord Address]

RE: Security Deposit Return — [Property Address]

Dear [Landlord Name],

I am writing regarding my security deposit for the above-referenced property, from which I vacated on ${formatDate(moveOut)}.

Under the tenancy laws applicable in ${jur.name}${jur.source ? ` (${jur.source})` : ""}, you are required to return my deposit within ${jur.days} days of my departure. The deadline for return is therefore ${formatDate(deadline)}.

${isOverdue ? `As of today, this deadline has passed. I formally demand the return of my full security deposit, or a written itemized statement of any deductions, within 7 days of this letter. Failure to comply may result in legal action and a claim for any statutory penalties available under local law.` : `Please ensure the deposit is returned in full, or accompanied by a written itemized statement of any deductions, by ${formatDate(deadline)}.`}

Please confirm receipt of this letter and advise of the expected return date.

Yours sincerely,
[Your Name]
[Your Contact Details]`
    : "";

  const landlordLetter = deadline && moveOut && jur
    ? `${formatDate(today)}

[Tenant Name]
[Tenant Forwarding Address]

RE: Security Deposit Return — [Property Address]

Dear [Tenant Name],

Thank you for your tenancy at [Property Address], which concluded on ${formatDate(moveOut)}.

This letter confirms that under the tenancy laws in ${jur.name}${jur.source ? ` (${jur.source})` : ""}, your security deposit is due to be returned, along with any itemized deductions, no later than ${formatDate(deadline)}.

${isOverdue ? `Please accept our apologies for the delay. We are processing your deposit return and will contact you shortly with the final accounting.` : `We are currently reviewing the property condition and will provide you with either a full refund or an itemized statement of any deductions by this date.`}

If you have any questions, please do not hesitate to contact us.

Yours sincerely,
[Landlord Name]
[Contact Details]`
    : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">← Back</Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Deposit Deadline Calculator</h1>
            <p className="text-xs text-gray-500">MoveProof Free Tool</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Jurisdiction</label>
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your location…</option>
              {JURISDICTIONS.map((j) => (
                <option key={j.code} value={j.code}>{j.name}</option>
              ))}
            </select>
            {jur?.source && (
              <p className="text-xs text-gray-400 mt-1">Source: {jur.source}</p>
            )}
            {jurisdiction === "OTHER" && (
              <p className="text-xs text-amber-600 mt-1">Using 30 days as a conservative estimate. Verify the exact deadline for your location.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Move-Out Date</label>
            <input
              type="date"
              value={moveOutDate}
              onChange={(e) => setMoveOutDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {deadline && jur && (
          <>
            <div className={`rounded-xl border-2 p-6 text-center ${isOverdue ? "border-red-400 bg-red-50" : daysUntil !== null && daysUntil <= 5 ? "border-amber-400 bg-amber-50" : "border-green-400 bg-green-50"}`}>
              <p className="text-sm font-semibold text-gray-600 mb-1">Deposit return deadline</p>
              <p className={`text-3xl font-bold mb-2 ${isOverdue ? "text-red-700" : daysUntil !== null && daysUntil <= 5 ? "text-amber-700" : "text-green-700"}`}>
                {formatDate(deadline)}
              </p>
              <p className={`text-sm font-medium ${isOverdue ? "text-red-600" : daysUntil !== null && daysUntil <= 5 ? "text-amber-600" : "text-green-600"}`}>
                {isOverdue
                  ? `${Math.abs(daysUntil!)} day${Math.abs(daysUntil!) !== 1 ? "s" : ""} overdue`
                  : daysUntil === 0
                  ? "Due today"
                  : `${daysUntil} day${daysUntil !== 1 ? "s" : ""} remaining`}
              </p>
              <p className="text-xs text-gray-500 mt-2">{jur.days} days after move-out · {jur.source ?? "Local tenancy law"}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-gray-800">Letter for Tenants</h2>
                  <CopyButton text={tenantLetter} />
                </div>
                <p className="text-xs text-gray-500 mb-3">Send this to your landlord to formally request the deposit return{isOverdue ? " (overdue version)" : ""}.</p>
                <pre className="text-xs text-gray-700 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap leading-relaxed border border-gray-100">{tenantLetter}</pre>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-gray-800">Letter for Landlords</h2>
                  <CopyButton text={landlordLetter} />
                </div>
                <p className="text-xs text-gray-500 mb-3">Send this to your tenant to confirm the deposit timeline.</p>
                <pre className="text-xs text-gray-700 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap leading-relaxed border border-gray-100">{landlordLetter}</pre>
              </div>
            </div>
          </>
        )}

        <p className="text-xs text-gray-400 text-center pb-4">
          Not legal advice. Deadlines shown are general guidelines — verify with a local legal professional. MoveProof accepts no liability for reliance on this tool.
        </p>
      </main>
    </div>
  );
}
