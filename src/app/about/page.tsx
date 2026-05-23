import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Logo from '@/components/logo'

export const metadata = {
  title: 'About MarginLog — Resale Profit Tracker for Serious Resellers',
  description: 'Learn how MarginLog helps resellers track true profit across eBay, Poshmark, Mercari, and more. Built to show your real numbers after every fee.',
  alternates: { canonical: 'https://marginlog.net/about' },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <header className="flex items-center justify-between px-6 py-4 max-w-3xl mx-auto">
        <Logo />
        <Link href="/" className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">About MarginLog</h1>
        <p className="text-zinc-500 text-sm mb-10">The resale profit tracker that tells you what you actually made.</p>

        <div className="space-y-8 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg mb-3">Why we built this</h2>
            <p>
              Every reseller knows the problem. You sell something on Poshmark for $45 and think you made $45. Then you subtract the 20% platform fee, the $8 you spent on shipping, and the $12 you paid at the thrift store — and you made $18. Or maybe less. You're not really sure.
            </p>
            <p className="mt-3">
              Most resellers track their numbers in spreadsheets they build from scratch, or don't track at all. The apps that exist are either built for professional businesses (too complex, too expensive) or don't account for what fees actually are on each platform.
            </p>
            <p className="mt-3">
              MarginLog was built to fix that. Log a sale in 30 seconds, see your real profit immediately, and over time understand which platforms and categories are actually making you money.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">What MarginLog does</h2>
            <ul className="space-y-2 text-zinc-400">
              {[
                'Calculates true net profit after platform fees, your shipping cost, and cost of goods',
                'Tracks every sale across eBay, Poshmark, Mercari, Depop, Facebook Marketplace, Vinted, and Etsy',
                'Shows you which platforms and categories perform best over time',
                'Exports your full sales history to CSV — useful at tax time',
                'Keeps fee tables current so you always get accurate numbers',
              ].map(item => (
                <li key={item} className="flex gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">What MarginLog doesn't do</h2>
            <p className="text-zinc-400">
              MarginLog is not accounting software. It is not a tax filing tool. It is not a crosslisting tool. It does one thing well: tells you your real profit on every item you sell, and shows you trends over time. If you need more than that, you likely already know what you need.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">Who it's for</h2>
            <p className="text-zinc-400">
              Casual resellers who sell a few items a month and want to stop guessing. Intermediate resellers running a side hustle who need to understand their margins. Anyone who has ever sold something online and then tried to remember what they actually paid for it.
            </p>
          </section>

          <section className="border-t border-zinc-700 pt-8">
            <p className="text-zinc-500 text-sm">
              Questions or feedback? Email us at{' '}
              <a href="mailto:hello@marginlog.ai" className="text-emerald-400 hover:text-emerald-300">
                hello@marginlog.ai
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-700 mt-16">
        <div className="max-w-3xl mx-auto px-6 py-6 flex flex-wrap gap-4 text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-zinc-400 transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms</Link>
        </div>
      </footer>
    </div>
  )
}
