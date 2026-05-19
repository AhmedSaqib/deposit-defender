import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/Logo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://moveproof.ai/#website",
      url: "https://moveproof.ai",
      name: "MoveProof.ai",
      description:
        "AI-powered property inspection reports and deposit dispute analysis for landlords and tenants worldwide.",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://moveproof.ai/#app",
      name: "MoveProof.ai",
      url: "https://moveproof.ai",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Dispute unfair deposit deductions or document property damage with AI. Upload before and after photos to get a formal PDF report in minutes.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "AI deposit dispute analysis",
        "Property inspection report generation",
        "Security deposit deadline calculator",
        "Demand letter generator",
      ],
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brand size="lg" />
            <span className="hidden sm:block text-sm text-gray-400 pl-3 border-l border-gray-200">
              Your property. Your proof.
            </span>
          </div>
          <nav className="flex items-center gap-5">
            <Link href="/about" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">About</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <h1 className="sr-only">MoveProof.ai — AI Property Inspection and Deposit Dispute Analysis</h1>
        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Who are you?</h2>
        <p className="text-sm text-gray-500 text-center mb-10">
          Choose your role to get started. Upload your photos and get an AI-powered report in minutes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Tenant card */}
          <Link
            href="/tenant"
            className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all p-8 flex flex-col gap-4"
          >
            <div className="text-4xl">🏠</div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                I&apos;m a Tenant
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                My landlord withheld part or all of my deposit. I want to dispute the deductions with an AI-analyzed rebuttal.
              </p>
            </div>
            <div className="mt-auto">
              <ul className="text-xs text-gray-500 space-y-1">
                <li>✓ Paste the landlord&apos;s deduction letter</li>
                <li>✓ Upload move-in and move-out photos</li>
                <li>✓ Get a claim-by-claim rebuttal PDF</li>
              </ul>
            </div>
            <span className="inline-block mt-2 text-sm font-semibold text-blue-700 group-hover:underline">
              Dispute my deductions →
            </span>
          </Link>

          {/* Landlord card */}
          <Link
            href="/landlord"
            className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all p-8 flex flex-col gap-4"
          >
            <div className="text-4xl">🔑</div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                I&apos;m a Landlord
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                My tenant has moved out. I want to document any damage by comparing before and after photos and generate a formal inspection report.
              </p>
            </div>
            <div className="mt-auto">
              <ul className="text-xs text-gray-500 space-y-1">
                <li>✓ Upload before and after photos</li>
                <li>✓ AI identifies damage vs. wear &amp; tear</li>
                <li>✓ Download a detailed inspection report PDF</li>
              </ul>
            </div>
            <span className="inline-block mt-2 text-sm font-semibold text-emerald-700 group-hover:underline">
              Inspect my property →
            </span>
          </Link>
        </div>

        <div className="mt-12">
          <h2 className="text-base font-bold text-gray-700 mb-1">Free Tools</h2>
          <p className="text-xs text-gray-500 mb-4">No photos needed — useful at any stage of a tenancy.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/tools/deadline"
              className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all p-5 flex flex-col gap-2"
            >
              <p className="text-base font-bold text-gray-800 group-hover:text-blue-700 transition-colors">⏱ Deposit Deadline Calculator</p>
              <p className="text-xs text-gray-500 leading-relaxed">Find out exactly when your deposit must be returned and get a ready-to-send follow-up letter.</p>
              <span className="text-xs font-semibold text-blue-700 group-hover:underline mt-1">Calculate deadline →</span>
            </Link>
            <Link
              href="/tools/demand"
              className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all p-5 flex flex-col gap-2"
            >
              <p className="text-base font-bold text-gray-800 group-hover:text-blue-700 transition-colors">✉️ Demand Letter Generator</p>
              <p className="text-xs text-gray-500 leading-relaxed">Generate a formal demand letter to dispute unfair deductions — ready to send in minutes.</p>
              <span className="text-xs font-semibold text-blue-700 group-hover:underline mt-1">Write demand letter →</span>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-10">
          Not legal advice. Consult a local legal professional for jurisdiction-specific guidance.
        </p>
      </main>
    </div>
  );
}
