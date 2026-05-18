"use client";

import { useState } from "react";
import Link from "next/link";

interface Dispute {
  id: number;
  item: string;
  amount: string;
  reason: string;
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
      className="text-sm font-semibold px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors"
    >
      {copied ? "Copied!" : "Copy Letter"}
    </button>
  );
}

let nextId = 1;

export default function DemandPage() {
  const [tenantName, setTenantName] = useState("");
  const [landlordName, setLandlordName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [moveOutDate, setMoveOutDate] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [disputes, setDisputes] = useState<Dispute[]>([
    { id: nextId++, item: "", amount: "", reason: "" },
  ]);
  const [letter, setLetter] = useState("");

  const addDispute = () => {
    setDisputes((prev) => [...prev, { id: nextId++, item: "", amount: "", reason: "" }]);
  };

  const removeDispute = (id: number) => {
    setDisputes((prev) => prev.filter((d) => d.id !== id));
  };

  const updateDispute = (id: number, field: keyof Omit<Dispute, "id">, value: string) => {
    setDisputes((prev) => prev.map((d) => d.id === id ? { ...d, [field]: value } : d));
  };

  const totalDisputed = disputes.reduce((sum, d) => {
    const n = parseFloat(d.amount.replace(/[^0-9.]/g, ""));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  const canGenerate =
    tenantName.trim() &&
    landlordName.trim() &&
    propertyAddress.trim() &&
    moveOutDate &&
    depositAmount.trim() &&
    disputes.some((d) => d.item.trim() && d.reason.trim());

  const generateLetter = () => {
    const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const moveOut = new Date(moveOutDate + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

    const validDisputes = disputes.filter((d) => d.item.trim() && d.reason.trim());
    const disputeLines = validDisputes.map((d, i) => {
      const amountStr = d.amount.trim() ? ` (${d.amount})` : "";
      return `${i + 1}. ${d.item}${amountStr}\n   ${d.reason}`;
    }).join("\n\n");

    const totalStr = totalDisputed > 0 ? totalDisputed.toFixed(2) : "[amount]";
    const currencyHint = depositAmount.match(/[£€$]/) ? depositAmount.match(/[£€$]/)?.[0] : "";
    const totalFormatted = currencyHint ? `${currencyHint}${totalStr}` : totalStr;

    const text = `${tenantName}
[Your Address]
[Your Email / Phone]

${date}

${landlordName}
[Landlord Address]

RE: Formal Demand for Security Deposit Return — ${propertyAddress}

Dear ${landlordName},

I am writing formally to dispute deductions made from my security deposit of ${depositAmount} for the above-referenced property, from which I vacated on ${moveOut}.

I dispute the following deductions on the grounds set out below:

${disputeLines}

These deductions are, in my view, either unlawful, excessive, or represent normal wear and tear which is not chargeable under standard tenancy law.

Based on the above, I formally demand the return of ${totalFormatted} within 14 days of the date of this letter. If I do not receive a satisfactory response within this period, I will have no choice but to pursue this matter through the appropriate legal channels, including but not limited to filing in the small claims court and seeking any statutory penalties or compensation available under applicable law.

I trust you will give this matter your prompt attention. Please respond in writing to the contact details above.

Yours sincerely,

${tenantName}`;

    setLetter(text);
    setTimeout(() => {
      document.getElementById("letter-output")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">← Back</Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Demand Letter Generator</h1>
            <p className="text-xs text-gray-500">MoveProof Free Tool · For Tenants</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-800 leading-relaxed">
          A formal written demand citing specific deductions often resolves disputes without going to court. Fill in your details below and we&apos;ll generate a professional letter ready to send.
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-gray-800">Your Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Your Name</label>
              <input type="text" value={tenantName} onChange={(e) => setTenantName(e.target.value)} placeholder="Jane Smith" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Landlord&apos;s Name</label>
              <input type="text" value={landlordName} onChange={(e) => setLandlordName(e.target.value)} placeholder="John Doe" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Property Address</label>
            <input type="text" value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} placeholder="123 Main Street, City" className={inputClass} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Move-Out Date</label>
              <input type="date" value={moveOutDate} onChange={(e) => setMoveOutDate(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Original Deposit Amount</label>
              <input type="text" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} placeholder="e.g. £1,200 or $1,500" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-sm font-bold text-gray-800">Disputed Deductions</h2>
          <p className="text-xs text-gray-500">Add each charge you want to dispute and explain why it shouldn&apos;t be deducted.</p>

          {disputes.map((d, i) => (
            <div key={d.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">Dispute {i + 1}</span>
                {disputes.length > 1 && (
                  <button onClick={() => removeDispute(d.id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Item</label>
                  <input type="text" value={d.item} onChange={(e) => updateDispute(d.id, "item", e.target.value)} placeholder="e.g. Cleaning fee" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Amount Charged</label>
                  <input type="text" value={d.amount} onChange={(e) => updateDispute(d.id, "amount", e.target.value)} placeholder="e.g. £250" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Why you&apos;re disputing it</label>
                <textarea
                  value={d.reason}
                  onChange={(e) => updateDispute(d.id, "reason", e.target.value)}
                  rows={2}
                  placeholder="e.g. The unit was professionally cleaned and left in the same condition as when I moved in. A cleaning fee is not justified."
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          ))}

          <button onClick={addDispute} className="text-sm text-blue-700 font-semibold hover:underline">+ Add another dispute</button>

          {totalDisputed > 0 && (
            <p className="text-sm text-gray-700">
              Total disputed: <span className="font-bold">{totalDisputed.toFixed(2)}</span>
            </p>
          )}
        </div>

        <button
          onClick={generateLetter}
          disabled={!canGenerate}
          className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          Generate Demand Letter
        </button>

        {letter && (
          <div id="letter-output" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-800">Your Demand Letter</h2>
              <CopyButton text={letter} />
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Review and fill in the bracketed sections before sending. Send via email with read receipt, or post with proof of delivery.
            </p>
            <pre className="text-xs text-gray-700 bg-gray-50 rounded-lg p-5 whitespace-pre-wrap leading-relaxed border border-gray-100">{letter}</pre>
          </div>
        )}

        <p className="text-xs text-gray-400 text-center pb-4">
          Not legal advice. Review with a local legal professional before sending if in doubt.
        </p>
      </main>
    </div>
  );
}
