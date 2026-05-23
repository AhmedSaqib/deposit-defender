import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/logo'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'eBay vs Poshmark vs Mercari: Full Fee Comparison 2026',
  description: 'Side-by-side fee comparison for every major resale platform in 2026. See selling fees, payment processing, listing fees, and real net payout on a $50 sale.',
  alternates: { canonical: 'https://marginlog.net/tools/platform-comparison' },
  openGraph: {
    title: 'eBay vs Poshmark vs Mercari: Full Fee Comparison 2026',
    description: 'Side-by-side fee comparison for every major resale platform. Know which platform keeps the most money in your pocket.',
    type: 'article',
  },
}

const platforms = [
  {
    name: 'eBay',
    emoji: '🛒',
    sellingFee: '13.25% + $0.30',
    paymentProcessing: 'Included',
    listingFee: '250 free/mo',
    feeOnShipping: 'Yes',
    shippingPaidBy: 'Seller',
    effectiveTotal: '~13.6%',
    payout50: '$43.08',
    bestFor: 'Electronics, collectibles, broad categories',
    href: '/calculators/ebay',
    notes: 'Fee applies to total including buyer-paid shipping. Some categories (books, DVDs) are higher at 14.95%.',
  },
  {
    name: 'Poshmark',
    emoji: '👗',
    sellingFee: '20% (or $2.95 flat under $15)',
    paymentProcessing: 'Included',
    listingFee: 'Free',
    feeOnShipping: 'N/A',
    shippingPaidBy: 'Buyer (prepaid label)',
    effectiveTotal: '20%',
    payout50: '$40.00',
    bestFor: 'Fashion, clothing, accessories',
    href: '/calculators/poshmark',
    notes: 'Buyer pays shipping via prepaid label. Seller doesn\'t pay shipping but keeps only 80% of sale price.',
  },
  {
    name: 'Mercari',
    emoji: '📦',
    sellingFee: '10% + ~3% payment',
    paymentProcessing: '~3% (separate)',
    listingFee: 'Free',
    feeOnShipping: 'No (if buyer pays)',
    shippingPaidBy: 'Buyer or Seller',
    effectiveTotal: '~13%',
    payout50: '$43.50',
    bestFor: 'General goods, quick casual sales',
    href: '/calculators/mercari',
    notes: 'Payment processing fee varies slightly. If seller pays shipping, it\'s subtracted from your earnings.',
  },
  {
    name: 'Depop',
    emoji: '👟',
    sellingFee: '~10%',
    paymentProcessing: 'Varies by region',
    listingFee: 'Free',
    feeOnShipping: 'No',
    shippingPaidBy: 'Seller',
    effectiveTotal: '~10–13%',
    payout50: '~$43–$45',
    bestFor: 'Streetwear, vintage, fashion',
    href: '/calculators/depop',
    notes: 'Total fees vary by region and payment method. Primarily a fashion and streetwear platform.',
  },
  {
    name: 'Etsy',
    emoji: '🎨',
    sellingFee: '6.5% + $0.20 listing',
    paymentProcessing: '~3% (separate)',
    listingFee: '$0.20 per listing',
    feeOnShipping: 'Yes',
    shippingPaidBy: 'Seller',
    effectiveTotal: '~9.5% + $0.20',
    payout50: '~$45.05',
    bestFor: 'Handmade, vintage, unique items',
    href: '/calculators/etsy',
    notes: '$0.20 listing fee charged when item lists and renews when it sells. Offsite ads add 12–15% if enabled.',
  },
  {
    name: 'Facebook Marketplace',
    emoji: '📘',
    sellingFee: '5% (shipped only)',
    paymentProcessing: 'Included',
    listingFee: 'Free',
    feeOnShipping: 'Yes',
    shippingPaidBy: 'Seller',
    effectiveTotal: '5% (0% local pickup)',
    payout50: '$47.50 shipped / $50.00 local',
    bestFor: 'Large items, local flipping',
    href: '/calculators/facebook-marketplace',
    notes: 'No fee at all for local pickup cash sales. 5% only applies to shipped items through Facebook checkout.',
  },
  {
    name: 'Vinted',
    emoji: '👕',
    sellingFee: '0%',
    paymentProcessing: '0%',
    listingFee: 'Free',
    feeOnShipping: 'N/A',
    shippingPaidBy: 'Buyer',
    effectiveTotal: '0%',
    payout50: '$50.00',
    bestFor: 'Clothing, sustainable fashion',
    href: '/calculators/vinted',
    notes: 'Sellers pay zero fees. Vinted charges buyers a protection fee. You receive your full listing price.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'eBay vs Poshmark vs Mercari: Full Fee Comparison 2026',
  description: 'Side-by-side fee comparison for every major resale platform in 2026.',
  url: 'https://marginlog.net/tools/platform-comparison',
  datePublished: '2026-01-01',
  dateModified: '2026-05-22',
  author: { '@type': 'Organization', name: 'MarginLog' },
  publisher: { '@type': 'Organization', name: 'MarginLog', url: 'https://marginlog.net' },
}

export default async function PlatformComparisonPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-xs text-zinc-500 mb-3">
            <Link href="/tools" className="hover:text-zinc-400">Tools</Link> / Platform Comparison
          </p>
          <h1 className="text-3xl font-bold mb-3">Platform Fee Comparison 2026</h1>
          <p className="text-zinc-400 leading-relaxed max-w-2xl">
            Every major resale platform side by side — selling fees, payment processing, and what you actually keep on a $50 sale. Updated for 2026.
          </p>
        </div>

        {/* Cards — mobile-first, stacked */}
        <div className="space-y-4 mb-12 lg:hidden">
          {platforms.map(p => (
            <div key={p.name} className="bg-zinc-800 border border-zinc-700 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{p.emoji}</span>
                <span className="font-semibold">{p.name}</span>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Selling fee</dt>
                  <dd className="text-zinc-200 text-right">{p.sellingFee}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Payment processing</dt>
                  <dd className="text-zinc-200">{p.paymentProcessing}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Listing fee</dt>
                  <dd className="text-zinc-200">{p.listingFee}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Shipping paid by</dt>
                  <dd className="text-zinc-200">{p.shippingPaidBy}</dd>
                </div>
                <div className="flex justify-between border-t border-zinc-700 pt-2 mt-2">
                  <dt className="text-zinc-400 font-medium">Payout on $50 sale</dt>
                  <dd className="text-emerald-400 font-semibold">{p.payout50}</dd>
                </div>
              </dl>
              {p.notes && <p className="text-xs text-zinc-600 mt-3 leading-relaxed">{p.notes}</p>}
              <Link href={p.href} className="inline-block mt-3 text-xs text-emerald-400 hover:text-emerald-300">
                Open {p.name} calculator →
              </Link>
            </div>
          ))}
        </div>

        {/* Table — desktop */}
        <div className="hidden lg:block overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700 text-left">
                <th className="pb-3 pr-4 text-zinc-500 font-medium">Platform</th>
                <th className="pb-3 pr-4 text-zinc-500 font-medium">Selling Fee</th>
                <th className="pb-3 pr-4 text-zinc-500 font-medium">Payment Processing</th>
                <th className="pb-3 pr-4 text-zinc-500 font-medium">Listing Fee</th>
                <th className="pb-3 pr-4 text-zinc-500 font-medium">Shipping Paid By</th>
                <th className="pb-3 pr-4 text-zinc-500 font-medium">Effective Total</th>
                <th className="pb-3 text-zinc-500 font-medium">Payout on $50</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map(p => (
                <tr key={p.name} className="border-b border-zinc-700/60 hover:bg-zinc-800/50 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2">
                      <span>{p.emoji}</span>
                      <Link href={p.href} className="font-medium hover:text-emerald-400 transition-colors">{p.name}</Link>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-zinc-300">{p.sellingFee}</td>
                  <td className="py-3.5 pr-4 text-zinc-300">{p.paymentProcessing}</td>
                  <td className="py-3.5 pr-4 text-zinc-300">{p.listingFee}</td>
                  <td className="py-3.5 pr-4 text-zinc-300">{p.shippingPaidBy}</td>
                  <td className="py-3.5 pr-4 text-zinc-300">{p.effectiveTotal}</td>
                  <td className="py-3.5 font-semibold text-emerald-400">{p.payout50}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-zinc-600 mt-3">Payout on $50 assumes the buyer pays shipping (where applicable). Fees shown are for standard categories and may vary.</p>
        </div>

        {/* Platform detail cards */}
        <h2 className="text-xl font-semibold mb-4">Platform breakdown</h2>
        <div className="space-y-4 mb-12">
          {platforms.map(p => (
            <div key={p.name} className="bg-zinc-800 border border-zinc-700 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{p.emoji}</span>
                  <span className="font-semibold">{p.name}</span>
                </div>
                <Link href={p.href} className="text-xs text-emerald-400 hover:text-emerald-300">Calculator →</Link>
              </div>
              <p className="text-xs text-zinc-500 mb-1">Best for: {p.bestFor}</p>
              {p.notes && <p className="text-sm text-zinc-400 leading-relaxed">{p.notes}</p>}
            </div>
          ))}
        </div>

        {/* Key takeaways */}
        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 mb-8">
          <h2 className="font-semibold text-white mb-4">Key takeaways</h2>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li className="flex gap-3"><span className="text-emerald-400 mt-0.5">→</span><span><strong className="text-zinc-200">Vinted keeps the most in your pocket</strong> — zero seller fees, but the buyer base is primarily clothing and the platform is smaller than eBay or Poshmark.</span></li>
            <li className="flex gap-3"><span className="text-emerald-400 mt-0.5">→</span><span><strong className="text-zinc-200">Poshmark's 20% is the highest</strong> — but buyers expect it, shipping is handled, and the fashion-focused audience can support higher prices.</span></li>
            <li className="flex gap-3"><span className="text-emerald-400 mt-0.5">→</span><span><strong className="text-zinc-200">Facebook Marketplace is free for local sales</strong> — zero fees for local pickup, making it the most profitable platform for bulky or heavy items.</span></li>
            <li className="flex gap-3"><span className="text-emerald-400 mt-0.5">→</span><span><strong className="text-zinc-200">eBay vs Mercari are roughly equal</strong> — both land around 13% effective fees. eBay has far more buyers; Mercari is simpler to use.</span></li>
            <li className="flex gap-3"><span className="text-emerald-400 mt-0.5">→</span><span><strong className="text-zinc-200">Etsy's $0.20 listing fee adds up</strong> — on low-price items, the listing fee is a meaningful percentage. Best for items $20 and up.</span></li>
          </ul>
        </div>

        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-white mb-1">Selling across multiple platforms?</p>
          <p className="text-sm text-zinc-400 mb-5">MarginLog tracks every sale automatically — real net profit after fees, analytics by platform, and CSV export for tax season.</p>
          <Link href="/signup" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition-colors">
            Start tracking free
          </Link>
          <p className="text-xs text-zinc-600 mt-3">Free · No card required</p>
        </div>
      </main>

      <footer className="border-t border-zinc-700 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap gap-4 text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
          <Link href="/tools" className="hover:text-zinc-400 transition-colors">Tools</Link>
          <Link href="/calculators" className="hover:text-zinc-400 transition-colors">Calculators</Link>
          <Link href="/blog" className="hover:text-zinc-400 transition-colors">Blog</Link>
        </div>
      </footer>
    </div>
  )
}
