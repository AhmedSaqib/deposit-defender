import Link from 'next/link'

export default function AppFooter() {
  return (
    <footer className="border-t border-zinc-700 mt-16">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap gap-4 text-xs text-zinc-600">
        <Link href="/tools" className="hover:text-zinc-400 transition-colors">Tools</Link>
        <Link href="/blog" className="hover:text-zinc-400 transition-colors">Blog</Link>
        <Link href="/glossary" className="hover:text-zinc-400 transition-colors">Glossary</Link>
        <Link href="/contact" className="hover:text-zinc-400 transition-colors">Contact</Link>
        <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms</Link>
        <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
        <span className="ml-auto">MarginLog © {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
