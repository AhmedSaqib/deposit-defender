import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/logo'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Reselling Profit Margin Benchmarks by Category & Platform',
  description: 'What profit margins do experienced resellers actually hit? Benchmarks by category (clothing, electronics, collectibles) and by platform (eBay, Poshmark, Mercari).',
  alternates: { canonical: 'https://marginlog.net/tools/profit-benchmark' },
}

const categoryBenchmarks = [
  {
    category: 'Clothing & Shoes',
    emoji: '👗',
    margin: '25–45%',
    roi: '60–150%',
    notes: 'Wide range depending on brand and condition. Designer and vintage items can push margins far higher. Fast-moving on Poshmark and Depop.',
  },
  {
    category: 'Electronics',
    emoji: '💻',
    margin: '8–18%',
    roi: '15–40%',
    notes: 'Thin margins due to high competition and high COGS. Best results come from tested, working items with original accessories. eBay is the dominant platform.',
  },
  {
    category: 'Collectibles',
    emoji: '🏆',
    margin: '40–70%',
    roi: '100–300%',
    notes: 'High potential ROI but longer time to sell. Requires category knowledge. Condition and provenance matter significantly. Mostly eBay.',
  },
  {
    category: 'Books & Media',
    emoji: '📚',
    margin: '30–60%',
    roi: '50–200%',
    notes: 'Low COGS (often $0.25–$2 per book) and decent sell prices on rare titles. Volume matters. eBay and Amazon (if you use it) dominate.',
  },
  {
    category: 'Home & Garden',
    emoji: '🏠',
    margin: '20–35%',
    roi: '40–80%',
    notes: 'Shipping cost is the main risk — heavy items eat margin fast. Best sold locally on Facebook Marketplace. Thrift store sourcing works well.',
  },
  {
    category: 'Toys & Games',
    emoji: '🎮',
    margin: '25–50%',
    roi: '60–150%',
    notes: 'Vintage and complete sets command premium prices. Condition is critical. Sealed items can be exceptional. eBay is primary.',
  },
  {
    category: 'Sports Equipment',
    emoji: '🏋️',
    margin: '20–40%',
    roi: '40–100%',
    notes: 'Good margins on high-ticket gear (bikes, weights, golf clubs). Heavy items usually best sold locally. Seasonal demand affects timing.',
  },
]

const platformBenchmarks = [
  {
    platform: 'eBay',
    emoji: '🛒',
    margin: '15–28%',
    roi: '40–100%',
    fee: '~13.25%',
    notes: 'Highest buyer volume. Fees are significant but competitive pricing is possible due to large market size.',
  },
  {
    platform: 'Poshmark',
    emoji: '👗',
    margin: '18–35%',
    roi: '50–120%',
    fee: '20%',
    notes: 'Higher fee but fashion buyers accept premium prices. Shipping handled by platform. Strong community engagement helps sales.',
  },
  {
    platform: 'Mercari',
    emoji: '📦',
    margin: '16–28%',
    roi: '40–90%',
    fee: '~13%',
    notes: 'Similar effective fees to eBay. Simpler to use. Good for general merchandise. Growing buyer base.',
  },
  {
    platform: 'Depop',
    emoji: '👟',
    margin: '22–40%',
    roi: '60–130%',
    fee: '~10%',
    notes: 'Lower fees than Poshmark. Fashion/streetwear focused. Younger buyer demographic. Strong for vintage and branded clothing.',
  },
  {
    platform: 'Facebook Marketplace',
    emoji: '📘',
    margin: '35–55%',
    roi: '80–200%',
    fee: '0% (local) / 5% (shipped)',
    notes: 'Best margins of any platform for local sales — zero fees. Ideal for furniture, appliances, and heavy items. Requires meeting in person.',
  },
  {
    platform: 'Vinted',
    emoji: '👕',
    margin: '30–50%',
    roi: '70–150%',
    fee: '0%',
    notes: 'Zero seller fees make this the most margin-friendly platform. Primarily clothing. Smaller buyer base than eBay or Poshmark.',
  },
  {
    platform: 'Etsy',
    emoji: '🎨',
    margin: '15–30%',
    roi: '40–90%',
    fee: '~9.5% + $0.20',
    notes: 'Best for handmade, vintage, and unique items. $0.20 listing fee impacts margins on lower-priced items. Offsite ads can add 12–15% more.',
  },
]

const roiTiers = [
  { tier: 'Just starting out', roi: '30–80%', desc: 'Learning what sells, building sourcing habits. Focus on ROI over volume.' },
  { tier: 'Getting consistent', roi: '80–150%', desc: 'Reliable sourcing channels, faster sell-through. Most part-time resellers land here.' },
  { tier: 'Experienced reseller', roi: '150–300%', desc: 'Deep category knowledge, strong sourcing relationships, fast inventory turnover.' },
  { tier: 'Expert / niche specialist', roi: '300%+', desc: 'Highly specific niche, exclusive sourcing access, or brand arbitrage expertise.' },
]

export default async function ProfitBenchmarkPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Logo />
        <div className="flex items-center gap-3">
          {user ? (
            <Link href="/dashboard" className="text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-medium px-4 py-1.5 rounded-lg transition-colors">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5">Log in</Link>
              <Link href="/signup" className="text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-medium px-4 py-1.5 rounded-lg transition-colors">Get started free</Link>
            </>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-xs text-zinc-500 mb-3">
            <Link href="/tools" className="hover:text-zinc-400">Tools</Link> / Profit Benchmarks
          </p>
          <h1 className="text-3xl font-bold mb-3">Reselling Profit Margin Benchmarks</h1>
          <p className="text-zinc-400 leading-relaxed">
            What margins do experienced resellers actually achieve? These benchmarks are based on typical reselling patterns by category and platform — use them to assess whether your deals are hitting the mark or leaving money on the table.
          </p>
          <p className="text-xs text-zinc-600 mt-2">Note: benchmarks are ranges, not guarantees. Your sourcing quality, pricing strategy, and platform expertise all affect actual results.</p>
        </div>

        <h2 className="text-lg font-semibold mb-4">By category</h2>
        <div className="space-y-3 mb-12">
          {categoryBenchmarks.map(b => (
            <div key={b.category} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{b.emoji}</span>
                  <span className="font-medium">{b.category}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-emerald-400 font-semibold">{b.margin} margin</p>
                  <p className="text-xs text-zinc-500">{b.roi} ROI</p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{b.notes}</p>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-4">By platform</h2>
        <div className="space-y-3 mb-12">
          {platformBenchmarks.map(b => (
            <div key={b.platform} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{b.emoji}</span>
                  <span className="font-medium">{b.platform}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-emerald-400 font-semibold">{b.margin} margin</p>
                  <p className="text-xs text-zinc-500">Fee: {b.fee}</p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{b.notes}</p>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-4">ROI by experience level</h2>
        <div className="space-y-3 mb-12">
          {roiTiers.map(t => (
            <div key={t.tier} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-start gap-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5 text-emerald-400 font-semibold text-sm whitespace-nowrap">
                {t.roi}
              </div>
              <div>
                <p className="font-medium text-white text-sm mb-0.5">{t.tier}</p>
                <p className="text-sm text-zinc-400">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
          <h2 className="font-semibold text-white mb-3">How to use these benchmarks</h2>
          <div className="space-y-3 text-sm text-zinc-400">
            <p>If your margins are consistently below the benchmarks for your category, the problem is usually sourcing (paying too much) or pricing (selling too cheap). Rarely is it the platform.</p>
            <p>ROI and margin tell different stories. A 300% ROI on a $1 item is $3 profit — impressive ratio, poor volume. A 40% margin on a $200 item is $80 profit — the better deal. Track both.</p>
            <p>Platform choice matters less than category expertise. A reseller who knows vintage electronics will outperform benchmarks regardless of which platform they use.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <Link href="/tools/break-even" className="text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-colors">
            Break-even calculator →
          </Link>
          <Link href="/tools/platform-comparison" className="text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-colors">
            Compare platform fees →
          </Link>
          <Link href="/glossary/roi" className="text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-colors">
            What is ROI? →
          </Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-white mb-1">Know your actual margins, not estimates</p>
          <p className="text-sm text-zinc-400 mb-5">MarginLog tracks your real net profit on every sale — with dashboards by category and platform so you can see where you&apos;re actually beating these benchmarks.</p>
          <Link href="/signup" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition-colors">
            Start tracking free
          </Link>
        </div>
      </main>

      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap gap-4 text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
          <Link href="/tools" className="hover:text-zinc-400 transition-colors">Tools</Link>
          <Link href="/blog" className="hover:text-zinc-400 transition-colors">Blog</Link>
          <Link href="/glossary/profit-margin" className="hover:text-zinc-400 transition-colors">What is profit margin?</Link>
        </div>
      </footer>
    </div>
  )
}
