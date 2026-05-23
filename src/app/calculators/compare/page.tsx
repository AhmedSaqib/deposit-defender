import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/logo'
import CompareCalculator from '@/components/compare-calculator'
import { CALC_PLATFORMS, CALC_PLATFORM_SLUGS } from '@/lib/calculator-config'

export const metadata: Metadata = {
  title: 'Compare Resale Platform Fees — eBay vs Poshmark vs Mercari & More',
  description: 'See your profit on every resale platform side by side. Compare eBay, Poshmark, Mercari, Depop, Etsy, Facebook Marketplace, and Vinted fees instantly.',
  alternates: { canonical: 'https://marginlog.net/calculators/compare' },
  openGraph: {
    title: 'Compare Resale Platform Fees — eBay vs Poshmark vs Mercari & More',
    description: 'See your profit on every resale platform side by side. Enter one price, compare all 7 platforms instantly.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which resale platform has the lowest fees?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vinted charges sellers 0% — the lowest of any major resale platform. Facebook Marketplace is free for local pickup. For shipped items, Etsy (~9.5%) and eBay (13.25%) are lower than Poshmark (20%), which has the highest fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'eBay vs Poshmark — which is better for sellers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'eBay charges 13.25% + $0.30 while Poshmark charges 20%. On a $50 sale, eBay takes $6.93 vs Poshmark\'s $10. eBay is cheaper on fees, but Poshmark\'s built-in audience for fashion may convert better for clothing sellers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which platform makes sellers the most money?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On fees alone: Vinted (0%) > Facebook local (0%) > Etsy (~9.5%) > eBay (13.25%) > Mercari (~13%) > Depop (~10%) > Poshmark (20%). But profit also depends on sell-through rate and audience size on each platform.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Mercari or eBay have lower fees?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They are very close. eBay charges 13.25% + $0.30. Mercari charges 10% selling fee + ~3% payment processing = ~13% total. For most sales eBay and Mercari are nearly identical in fees, with eBay slightly higher on small items due to the $0.30 fixed fee.',
      },
    },
  ],
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Logo light />
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-medium px-4 py-1.5 rounded-lg transition-colors"
          >
            Start free
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/calculators" className="text-xs text-zinc-500 hover:text-zinc-600 transition-colors mb-6 inline-block">
          ← All calculators
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3 leading-tight">
            Which platform makes you the most money?
          </h1>
          <p className="text-zinc-600 leading-relaxed">
            Enter your numbers once. See your real profit on every resale platform side by side — eBay, Poshmark, Mercari, Depop, Etsy, Facebook Marketplace, and Vinted.
          </p>
        </div>

        <CompareCalculator />

        {/* Fee overview table */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-4">Resale platform fee comparison</h2>
          <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 px-5 py-3 border-b border-zinc-200 text-xs text-zinc-500 font-medium">
              <span>Platform</span>
              <span className="text-center">Fee</span>
              <span className="text-right">On a $50 sale</span>
            </div>
            {CALC_PLATFORM_SLUGS.map(slug => {
              const p = CALC_PLATFORMS[slug]
              const fee = p.poshmarkThreshold && 50 >= 15
                ? 50 * p.feeRate + p.fixedFee
                : 50 * p.feeRate + p.fixedFee
              return (
                <Link
                  key={slug}
                  href={`/calculators/${slug}`}
                  className="grid grid-cols-3 px-5 py-3.5 border-b border-zinc-200 last:border-0 hover:bg-zinc-50 transition-colors"
                >
                  <span className="text-sm text-zinc-600">{p.name}</span>
                  <span className="text-sm text-zinc-600 text-center">{p.feeLabel}</span>
                  <span className="text-sm text-red-600 text-right">−${fee.toFixed(2)}</span>
                </Link>
              )
            })}
          </div>
          <p className="text-xs text-zinc-500 mt-2">Click any platform for a full profit calculator.</p>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-6">Platform fee questions</h2>
          <div className="space-y-5">
            {(jsonLd.mainEntity as Array<{ name: string; acceptedAnswer: { text: string } }>).map(faq => (
              <div key={faq.name} className="border-b border-zinc-200 pb-5">
                <p className="font-medium text-zinc-900 mb-2">{faq.name}</p>
                <p className="text-sm text-zinc-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-white border border-zinc-200 rounded-2xl p-8 text-center">
          <p className="text-xl font-bold mb-2">Track every sale automatically</p>
          <p className="text-zinc-600 text-sm mb-6 max-w-md mx-auto">
            MarginLog logs every sale in 30 seconds — true profit, analytics across all platforms, and CSV export for tax season. Free during beta.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Create your free account
          </Link>
          <p className="text-xs text-zinc-500 mt-3">Free · No card required · Lifetime free during beta</p>
        </div>
      </main>

      <footer className="border-t border-zinc-200 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap gap-4 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-600 transition-colors">Home</Link>
          <Link href="/calculators" className="hover:text-zinc-600 transition-colors">All calculators</Link>
          <Link href="/signup" className="hover:text-zinc-600 transition-colors">Start free</Link>
        </div>
      </footer>
    </div>
  )
}
