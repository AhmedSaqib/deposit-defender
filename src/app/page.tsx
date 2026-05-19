import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, BarChart3, FileInput, Layers, Receipt, MapPin } from 'lucide-react'
import Logo from '@/components/logo'

export const metadata: Metadata = {
  title: 'MarginLog — Resale Profit Tracker',
  description: 'Track true profit on every sale across eBay, Poshmark, Mercari, Depop, and more. See real net profit after platform fees, COGS, and shipping — free.',
  alternates: { canonical: 'https://marginlog.vercel.app' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://marginlog.vercel.app/#website',
      url: 'https://marginlog.vercel.app',
      name: 'MarginLog',
      description: 'Resale profit tracker for eBay, Poshmark, Mercari, Depop, and more.',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://marginlog.vercel.app/#app',
      name: 'MarginLog',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Track true resale profit after platform fees across eBay, Poshmark, Mercari, Depop, Etsy, Facebook Marketplace, and Vinted.',
      url: 'https://marginlog.vercel.app',
    },
  ],
}

const features = [
  {
    icon: TrendingUp,
    title: 'True profit tracking',
    desc: 'Real net profit after platform fees, COGS, and shipping. Fee tables for eBay, Poshmark, Mercari, Depop, Etsy, and more — kept current.',
  },
  {
    icon: BarChart3,
    title: 'Analytics that matter',
    desc: 'Profit by platform, category, and month in one dashboard. Know exactly where your margin comes from.',
  },
  {
    icon: FileInput,
    title: 'Import any CSV',
    desc: 'Upload a CSV from any platform — column names are detected automatically, no reformatting needed. Export for tax season in one click.',
  },
  {
    icon: Layers,
    title: 'Built for how resellers work',
    desc: 'Split a haul purchase across items, log bundles with proportional revenue, and track returns that drop out of your totals automatically.',
  },
  {
    icon: MapPin,
    title: 'Sourcing trip ROI',
    desc: 'Group sales by sourcing trip and see real net ROI after the cost of the trip itself. Know if Goodwill Tuesday was actually worth it.',
  },
  {
    icon: Receipt,
    title: 'Business expense tracker',
    desc: 'Log shipping supplies, platform subscriptions, mileage, and more. Organized by Schedule C category so tax season is less painful.',
  },
]

const bars = [28, 45, 36, 62, 48, 71, 55, 80, 63, 74, 68, 92]

const platforms = [
  { name: 'Poshmark', amount: '$542', pct: 88, color: 'bg-emerald-500' },
  { name: 'eBay', amount: '$418', pct: 67, color: 'bg-blue-500' },
  { name: 'Mercari', amount: '$324', pct: 52, color: 'bg-amber-500' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Logo />
        <div className="flex gap-3">
          <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5">
            Log in
          </Link>
          <Link href="/signup" className="text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-medium px-4 py-1.5 rounded-lg transition-colors">
            Get started free
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6">
        <section className="py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-emerald-400 text-sm font-medium mb-4 tracking-wide uppercase">Built for resellers</p>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
                Stop guessing what<br />you actually made
              </h1>
              <p className="text-zinc-400 text-lg lg:text-xl mb-10 leading-relaxed">
                Log every sale, track true profit after fees, and finally know your numbers — across every resale platform.
              </p>
              <Link
                href="/signup"
                className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3.5 rounded-xl text-base transition-colors"
              >
                Start tracking free
              </Link>
            </div>

            {/* Dashboard preview */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Net profit this month</p>
                  <p className="text-3xl font-bold text-emerald-400">$1,284</p>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-lg">↑ 23%</span>
              </div>

              {/* Mini bar chart */}
              <div className="flex items-end gap-1 h-20">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm transition-all ${i === bars.length - 1 ? 'bg-emerald-400' : 'bg-zinc-700'}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <p className="text-xs text-zinc-600 -mt-2">Monthly profit · last 12 months</p>

              {/* Platform breakdown */}
              <div className="border-t border-zinc-800 pt-4 space-y-3">
                {platforms.map(({ name, amount, pct, color }) => (
                  <div key={name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">{name}</span>
                      <span className="text-zinc-300 font-medium">{amount}</span>
                    </div>
                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </section>

        <section className="py-12 text-center border-t border-zinc-800">
          <p className="text-zinc-500 text-sm">Supports eBay · Poshmark · Mercari · Depop · Facebook Marketplace · Vinted · Etsy</p>
        </section>
      </main>

      <footer className="border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">© {new Date().getFullYear()} MarginLog. Not financial advice.</p>
          <nav className="flex gap-5 text-xs text-zinc-600">
            <Link href="/about" className="hover:text-zinc-400 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-zinc-400 transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
