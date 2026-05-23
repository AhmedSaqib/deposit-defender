import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/logo'
import { POSTS } from '@/lib/posts'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Blog — MarginLog',
  description: 'Guides, tips, and insights for resellers who want to understand their numbers.',
  alternates: { canonical: 'https://marginlog.net/blog' },
}

export default async function BlogIndex() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Logo />
        <div className="flex gap-3">
          {user ? (
            <Link href="/dashboard" className="text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-medium px-4 py-1.5 rounded-lg transition-colors">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5">Log in</Link>
              <Link href="/signup" className="text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-medium px-4 py-1.5 rounded-lg transition-colors">Get started free</Link>
            </>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Blog</h1>
        <p className="text-zinc-400 text-sm mb-10">Guides and insights for resellers who want to understand their numbers.</p>

        <div className="space-y-4">
          {POSTS.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-2xl p-6 transition-colors"
            >
              <p className="text-xs text-zinc-500 mb-2">{post.date} · {post.readingTime}</p>
              <h2 className="text-white font-semibold text-lg mb-2 leading-snug">{post.title}</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">{post.description}</p>
              <p className="text-emerald-400 text-sm mt-4">Read →</p>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-zinc-700 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">© {new Date().getFullYear()} MarginLog</p>
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
