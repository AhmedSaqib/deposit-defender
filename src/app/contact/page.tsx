import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/contact-form'
import Logo from '@/components/logo'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send feedback, bug reports, or feature requests to the MarginLog team.',
  robots: { index: false, follow: false },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Logo light />
        <Link href="/login" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
          Log in
        </Link>
      </header>

      <main className="max-w-lg mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Contact us</h1>
          <p className="text-zinc-600 text-sm">Bug report, feature request, or general feedback — we read everything.</p>
        </div>
        <ContactForm />
      </main>
    </div>
  )
}
