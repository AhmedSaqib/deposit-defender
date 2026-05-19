"use client";

import { useState } from "react";
import { InnerHeader } from "@/components/InnerHeader";

interface Jurisdiction {
  code: string;
  name: string;
  days: number | null;
  source: string | null;
  note?: string;
}

const JURISDICTIONS: Jurisdiction[] = [
  {
    code: "UK",
    name: "United Kingdom",
    days: 10,
    source: "Housing Act 2004 / Tenancy Deposit Schemes",
    note: "10 days runs from when both parties agree on the amount to be returned — not necessarily from the move-out date itself.",
  },
  { code: "AU-NSW", name: "Australia — New South Wales",   days: 14,   source: "Residential Tenancies Act 2010" },
  { code: "AU-VIC", name: "Australia — Victoria",          days: 14,   source: "Residential Tenancies Act 1997" },
  {
    code: "AU-QLD",
    name: "Australia — Queensland",
    days: null,
    source: "RTRA Act 2008",
    note: "Queensland has no fixed statutory deadline. Disputes are handled through the RTA bond lodgement system — contact the Residential Tenancies Authority (RTA) directly to claim or dispute a bond refund.",
  },
  {
    code: "AU-WA",
    name: "Australia — Western Australia",
    days: null,
    source: "Residential Tenancies Act 1987",
    note: "Western Australia has no fixed statutory deadline for bond return. Disputes are resolved through the Commissioner for Consumer Protection or the Magistrates Court.",
  },
  {
    code: "CA-ON",
    name: "Canada — Ontario",
    days: null,
    source: null,
    note: "Ontario prohibits security/damage deposits under the Residential Tenancies Act. Only a last month's rent (LMR) deposit is permitted, and it is applied to the final month's rent — it is not returned separately. There is no deposit return deadline because no returnable deposit exists.",
  },
  {
    code: "CA-BC",
    name: "Canada — British Columbia",
    days: 15,
    source: "Residential Tenancy Act",
    note: "15 days from end of tenancy OR from the landlord's receipt of the tenant's forwarding address — whichever is later.",
  },
  {
    code: "CA-AB",
    name: "Canada — Alberta",
    days: 10,
    source: "Residential Tenancies Act",
    note: "10 business days (not calendar days) after the tenancy ends.",
  },
  { code: "US-CA", name: "USA — California", days: 21, source: "Civil Code §1950.5" },
  { code: "US-NY", name: "USA — New York",   days: 14, source: "General Obligations Law §7-108" },
  {
    code: "US-TX",
    name: "USA — Texas",
    days: 30,
    source: "Property Code §92.103",
    note: "30 days from move-out or from the landlord's receipt of the tenant's forwarding address — whichever is later.",
  },
  {
    code: "US-FL",
    name: "USA — Florida",
    days: 15,
    source: "Florida Statutes §83.49",
    note: "15 days if returning in full with no deductions. If making deductions, the landlord must send written notice of intent to claim within 30 days of move-out.",
  },
  {
    code: "US-WA",
    name: "USA — Washington",
    days: 30,
    source: "RCW 59.18.280",
    note: "30 days as amended in 2023 (previously 21 days). Seattle may have additional local requirements.",
  },
  {
    code: "US-IL",
    name: "USA — Illinois",
    days: 30,
    source: "765 ILCS 710",
    note: "30 days to provide an itemized statement of deductions; 45 days to return the remaining balance. Chicago has separate, stricter local rules.",
  },
  { code: "US-GA", name: "USA — Georgia",   days: 30, source: "O.C.G.A. §44-7-34" },
  { code: "OTHER", name: "Other / Not Listed", days: 30, source: null },
];

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
  const hasDeadline = jur && jur.days != null;
  const deadline = moveOut && hasDeadline ? addDays(moveOut, jur.days as number) : null;
  const today = new Date();
  const daysUntil = deadline ? Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : null;
  const isOverdue = daysUntil !== null && daysUntil < 0;

  const tenantLetter = deadline && moveOut && jur && jur.days != null
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

  const landlordLetter = deadline && moveOut && jur && jur.days != null
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
      <InnerHeader title="Deposit Deadline Calculator" subtitle="Free Tool — 15+ jurisdictions" />

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

        {jur && (
          <>
            {jur.note && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-800 leading-relaxed">
                <strong>Important:</strong> {jur.note}
              </div>
            )}

            {jur.days == null ? (
              moveOut && (
                <div className="rounded-xl border-2 border-gray-300 bg-gray-50 p-6 text-center">
                  <p className="text-sm font-semibold text-gray-600 mb-1">No fixed statutory deadline</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {jur.name} does not have a standard number-of-days rule for deposit return. See the note above for the applicable process.
                  </p>
                </div>
              )
            ) : (
              deadline && (
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
              )
            )}
          </>
        )}

        <p className="text-xs text-gray-400 text-center pb-4">
          Not legal advice. Deadlines are general guidelines based on publicly available statutes and may not reflect recent amendments, local overrides, or your specific circumstances. Always verify with a licensed legal professional in your jurisdiction. RentProof accepts no liability for reliance on this tool.
        </p>
      </main>
    </div>
  );
}
