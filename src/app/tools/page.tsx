import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/logo'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Free Reselling Tools — MarginLog',
  description: 'Free tools for resellers: platform fee comparison, break-even calculator, profit margin benchmarks, and a plain-English glossary.',
  alternates: { canonical: 'https://marginlog.net/tools' },
}

const tools = [
  {
    href: '/tools/platform-comparison',
    emoji: '📊',
    title: 'Platform Fee Comparison',
    desc: 'eBay vs Poshmark vs Mercari vs Etsy — every fee side by side. See which platform keeps the most money in your pocket.',
  },
  {
    href: '/tools/break-even',
    emoji: '🎯',
    title: 'Break-Even Calculator',
    desc: 'Enter what you paid and your shipping cost. Get the minimum sale price you need to not lose money — on any platform.',
  },
  {
    href: '/tools/profit-benchmark',
    emoji: '📈',
    title: 'Profit Margin Benchmarks',
    desc: 'What margins do experienced resellers actually hit by category and platform? Use these numbers to know if your deals are worth it.',
  },
  {
    href: '/glossary',
    emoji: '📖',
    title: 'Reselling Glossary',
    desc: 'Plain-English definitions of COGS, ROI, net profit, final value fee, and every other term resellers need to understand their numbers.',
  },
]

export default async function ToolsPage() {
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
        <h1 className="text-3xl font-bold mb-2">Free Reselling Tools</h1>
        <p className="text-zinc-400 text-sm mb-10">No account needed. Built for resellers who want to understand their numbers.</p>

        <div className="space-y-4">
          {tools.map(tool => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex items-start gap-5 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-6 transition-colors group"
            >
              <span className="text-3xl mt-0.5">{tool.emoji}</span>
              <div>
                <h2 className="font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">{tool.title}</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-white mb-1">Want to track every sale automatically?</p>
          <p className="text-sm text-zinc-400 mb-5">MarginLog logs your profit, fees, and analytics across every platform — free to start.</p>
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
          <Link href="/calculators" className="hover:text-zinc-400 transition-colors">Calculators</Link>
          <Link href="/blog" className="hover:text-zinc-400 transition-colors">Blog</Link>
          <Link href="/glossary" className="hover:text-zinc-400 transition-colors">Glossary</Link>
        </div>
      </footer>
    </div>
  )
}
