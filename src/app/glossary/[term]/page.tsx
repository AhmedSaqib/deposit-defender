import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/logo'
import { createClient } from '@/lib/supabase/server'
import { TERMS, getTerm, getRelatedTerms } from '@/lib/glossary'

type Props = { params: Promise<{ term: string }> }

export async function generateStaticParams() {
  return TERMS.map(t => ({ term: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term: slug } = await params
  const term = getTerm(slug)
  if (!term) return {}
  return {
    title: `${term.term} — Reselling Glossary`,
    description: term.shortDef,
    alternates: { canonical: `https://marginlog.net/glossary/${slug}` },
  }
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term: slug } = await params
  const term = getTerm(slug)
  if (!term) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const related = term.related ? getRelatedTerms(term.related) : []

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

      <main className="max-w-2xl mx-auto px-6 py-12">
        <p className="text-xs text-zinc-500 mb-6">
          <Link href="/glossary" className="hover:text-zinc-400">Glossary</Link> / {term.term}
        </p>

        <h1 className="text-3xl font-bold mb-2">{term.term}</h1>
        <p className="text-emerald-400 text-sm font-medium mb-6">{term.shortDef}</p>

        <div className="prose prose-invert prose-sm max-w-none">
          <p className="text-zinc-300 leading-relaxed text-base">{term.definition}</p>

          {term.example && (
            <div className="mt-6 bg-zinc-800 border border-zinc-700 rounded-xl p-5">
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide mb-2">Example</p>
              <p className="text-zinc-300 text-sm leading-relaxed">{term.example}</p>
            </div>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm font-medium text-zinc-500 mb-3">Related terms</h2>
            <div className="space-y-2">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/glossary/${r.slug}`}
                  className="flex items-center justify-between bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-xl px-4 py-3 transition-colors group"
                >
                  <div>
                    <p className="font-medium text-white group-hover:text-emerald-400 transition-colors text-sm">{r.term}</p>
                    <p className="text-xs text-zinc-500">{r.shortDef}</p>
                  </div>
                  <span className="text-zinc-600 group-hover:text-zinc-400 ml-4">→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/tools/break-even" className="text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-colors">
            Break-even calculator →
          </Link>
          <Link href="/tools/platform-comparison" className="text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-colors">
            Platform fee comparison →
          </Link>
        </div>

        <div className="mt-10 bg-zinc-800 border border-zinc-700 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-white mb-1">Track your real numbers automatically</p>
          <p className="text-sm text-zinc-400 mb-5">MarginLog calculates net profit, ROI, and margins on every sale — across every platform.</p>
          <Link href="/signup" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition-colors">
            Start tracking free
          </Link>
        </div>
      </main>

      <footer className="border-t border-zinc-700 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap gap-4 text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
          <Link href="/glossary" className="hover:text-zinc-400 transition-colors">Glossary</Link>
          <Link href="/tools" className="hover:text-zinc-400 transition-colors">Tools</Link>
          <Link href="/blog" className="hover:text-zinc-400 transition-colors">Blog</Link>
        </div>
      </footer>
    </div>
  )
}
