import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-5">
          <h1 className="text-2xl font-bold text-gray-900">DepositDefender</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            AI-powered property inspection and deposit dispute analysis — Ontario (RTA / LTB)
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Who are you?</h2>
        <p className="text-sm text-gray-500 text-center mb-10">
          Choose your role to get started. Each path uses Claude AI to analyze your photos.
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

        <p className="text-xs text-gray-400 text-center mt-10">
          Not legal advice. Ontario RTA / LTB jurisdiction only.{" "}
          <a
            href="https://stepstojustice.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            stepstojustice.ca
          </a>{" "}
          · LTB: 1-888-332-3234
        </p>
      </main>
    </div>
  );
}
