import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Logo from '@/components/logo'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How MarginLog collects, uses, and protects your data.',
  robots: { index: false, follow: false },
}

const LAST_UPDATED = 'May 19, 2026'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="flex items-center justify-between px-6 py-4 max-w-3xl mx-auto">
        <Logo />
        <Link href="/" className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-8 text-zinc-300 leading-relaxed text-sm">

          <section>
            <h2 className="text-white font-semibold mb-2">1. What we collect</h2>
            <p>When you create an account, we collect your <strong className="text-white">email address</strong> and a hashed password. We do not collect your name, phone number, or payment information.</p>
            <p className="mt-2">When you log a sale, we store the data you enter: item name, category, platform, prices, date, and optional notes. This data is associated with your account and stored in our database.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">2. How we use your data</h2>
            <p>Your data is used exclusively to power the MarginLog service — to display your sales history, calculate your profit, and generate your CSV exports. We do not use your data to train AI models. We do not sell your data. We do not share your data with third parties except as required by law.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">3. Data storage</h2>
            <p>Your data is stored on <a href="https://supabase.com" className="text-emerald-400 hover:text-emerald-300" target="_blank" rel="noopener noreferrer">Supabase</a>, a managed database platform. Data is encrypted at rest and in transit. Supabase infrastructure runs on AWS and is SOC 2 compliant.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">4. Analytics</h2>
            <p>We use <a href="https://vercel.com/analytics" className="text-emerald-400 hover:text-emerald-300" target="_blank" rel="noopener noreferrer">Vercel Analytics</a> to understand aggregate usage patterns (page views, general traffic). This data is anonymised and does not include personally identifiable information. No cookies are used for analytics.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">5. Your rights</h2>
            <p>You can delete your account and all associated data at any time by emailing us at <a href="mailto:hello@marginlog.ai" className="text-emerald-400 hover:text-emerald-300">hello@marginlog.ai</a>. You can export all your data at any time using the CSV export feature. We will fulfill any data deletion request within 30 days.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">6. Cookies</h2>
            <p>We use a single session cookie to keep you logged in. We do not use tracking cookies or advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">7. Changes to this policy</h2>
            <p>If we make material changes to this policy, we will notify you by email before the changes take effect. Continued use of MarginLog after that date constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">8. Contact</h2>
            <p>Privacy questions: <a href="mailto:hello@marginlog.ai" className="text-emerald-400 hover:text-emerald-300">hello@marginlog.ai</a></p>
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-800 mt-16">
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
