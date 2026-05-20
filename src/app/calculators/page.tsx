import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/logo'
import { CALC_PLATFORMS } from '@/lib/calculator-config'

export const metadata: Metadata = {
  title: 'Free Reseller Profit Calculators — eBay, Poshmark, Mercari & More',
  description: 'Free profit calculators for every resale platform. See your true net profit after fees, shipping, and cost of goods. No signup required.',
  alternates: { canonical: 'https://marginlog.net/calculators' },
}

const icons: Record<string, string> = {
  ebay: '🛒',
  poshmark: '👗',
  mercari: '📦',
  depop: '👟',
  etsy: '🎨',
  facebook: '📘',
  vinted: '👕',
}

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Logo />
        <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors">
          Log in
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3">Free Reseller Profit Calculators</h1>
          <p className="text-zinc-400 leading-relaxed">
            Pick your platform. Enter the numbers. See what you actually made — after every fee, shipping cost, and what you paid for the item.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.values(CALC_PLATFORMS).map(platform => (
            <Link
              key={platform.slug}
              href={`/calculators/${platform.slug}`}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-5 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{icons[platform.slug] ?? '📊'}</span>
                <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {platform.name}
                </span>
              </div>
              <p className="text-sm text-zinc-500">
                Fee: {platform.feeLabel}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-white mb-1">Selling across multiple platforms?</p>
          <p className="text-sm text-zinc-400 mb-5">
            MarginLog tracks every sale automatically — profit, analytics, and CSV export for tax season.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Start tracking free
          </Link>
          <p className="text-xs text-zinc-600 mt-3">Free · No card required</p>
        </div>
      </main>

      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap gap-4 text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-zinc-400 transition-colors">About</Link>
          <Link href="/calculators" className="hover:text-zinc-400 transition-colors">Calculators</Link>
        </div>
      </footer>
    </div>
  )
}
