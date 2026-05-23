import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/logo'
import { createClient } from '@/lib/supabase/server'
import { TERMS } from '@/lib/glossary'

export const metadata: Metadata = {
  title: 'Reselling Glossary — COGS, ROI, Net Profit & More Explained',
  description: 'Plain-English definitions of every term resellers need to know: COGS, net profit, ROI, platform fees, break-even, and more.',
  alternates: { canonical: 'https://marginlog.net/glossary' },
}

export default async function GlossaryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
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
          <h1 className="text-3xl font-bold mb-2">Reselling Glossary</h1>
          <p className="text-zinc-400 text-sm">Plain-English definitions of every term you&apos;ll encounter tracking reselling profit.</p>
        </div>

        <div className="space-y-2">
          {TERMS.map(term => (
            <Link
              key={term.slug}
              href={`/glossary/${term.slug}`}
              className="flex items-center justify-between bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-xl px-5 py-4 transition-colors group"
            >
              <div>
                <p className="font-medium text-white group-hover:text-emerald-400 transition-colors">{term.term}</p>
                <p className="text-sm text-zinc-500 mt-0.5">{term.shortDef}</p>
              </div>
              <span className="text-zinc-600 group-hover:text-zinc-400 ml-4">→</span>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-zinc-800 border border-zinc-700 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-white mb-1">Put the numbers into practice</p>
          <p className="text-sm text-zinc-400 mb-5">MarginLog tracks net profit, ROI, and margins across every platform — automatically.</p>
          <Link href="/signup" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition-colors">
            Start tracking free
          </Link>
        </div>
      </main>

      <footer className="border-t border-zinc-700 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap gap-4 text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
          <Link href="/tools" className="hover:text-zinc-400 transition-colors">Tools</Link>
          <Link href="/blog" className="hover:text-zinc-400 transition-colors">Blog</Link>
          <Link href="/calculators" className="hover:text-zinc-400 transition-colors">Calculators</Link>
        </div>
      </footer>
    </div>
  )
}
