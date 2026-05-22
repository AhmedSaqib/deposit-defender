import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/logo'
import { createClient } from '@/lib/supabase/server'
import BreakEvenCalculator from '@/components/break-even-calculator'

export const metadata: Metadata = {
  title: 'Break-Even Calculator for Resellers — Find Your Minimum Sale Price',
  description: 'Calculate the exact minimum price you need to sell an item for to cover your costs. Works for eBay, Poshmark, Mercari, Depop, Etsy, and more.',
  alternates: { canonical: 'https://marginlog.net/tools/break-even' },
}

export default async function BreakEvenPage() {
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
        <div className="mb-8">
          <p className="text-xs text-zinc-500 mb-3">
            <Link href="/tools" className="hover:text-zinc-400">Tools</Link> / Break-Even Calculator
          </p>
          <h1 className="text-3xl font-bold mb-3">Break-Even Calculator</h1>
          <p className="text-zinc-400 leading-relaxed">
            Enter what you paid for an item and your shipping cost. Get the minimum sale price you need to cover everything — platform fees included. Set a target profit to see the price you actually need to hit it.
          </p>
        </div>

        <BreakEvenCalculator />

        <div className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold">How to use the break-even calculator</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            The break-even price is the lowest sale price where you make exactly $0 profit — you cover your costs but earn nothing. Any price above it is profit; any price below it is a loss.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Enter your cost of goods (what you paid to buy the item), your shipping cost (what you&apos;ll pay to send it), and select the platform. The calculator accounts for each platform&apos;s fee structure — including Poshmark&apos;s flat $2.95 fee for items under $15.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Use the target profit field to find the price you need to hit a specific dollar profit. For example, if you want to make $20 on the sale, enter $20 and see exactly what you need to list the item for.
          </p>
          <p className="text-zinc-400 text-sm leading-relaxed">
            A common mistake is pricing based on gut feel or comps without accounting for fees. A $60 sale on eBay after a $10 item cost might feel like $50 profit — but eBay takes $8.25, and if you ship for $7, your real profit is $34.75. This calculator prevents that mistake.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tools/platform-comparison" className="text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-colors">
            Compare platform fees →
          </Link>
          <Link href="/tools/profit-benchmark" className="text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-colors">
            Profit margin benchmarks →
          </Link>
        </div>

        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-white mb-1">Log every sale and track your real profit automatically</p>
          <p className="text-sm text-zinc-400 mb-5">MarginLog deducts platform fees on every sale. Dashboard, analytics, and CSV export for tax season — free to start.</p>
          <Link href="/signup" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition-colors">
            Start tracking free
          </Link>
        </div>
      </main>

      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap gap-4 text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
          <Link href="/tools" className="hover:text-zinc-400 transition-colors">Tools</Link>
          <Link href="/calculators" className="hover:text-zinc-400 transition-colors">Calculators</Link>
          <Link href="/glossary/break-even" className="hover:text-zinc-400 transition-colors">What is break-even?</Link>
        </div>
      </footer>
    </div>
  )
}
