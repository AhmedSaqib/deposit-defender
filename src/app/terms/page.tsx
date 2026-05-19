import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Logo from '@/components/logo'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms governing your use of MarginLog.',
  robots: { index: false, follow: false },
}

const LAST_UPDATED = 'May 19, 2026'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="flex items-center justify-between px-6 py-4 max-w-3xl mx-auto">
        <Logo />
        <Link href="/" className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-zinc-500 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-8 text-zinc-300 leading-relaxed text-sm">

          <section>
            <h2 className="text-white font-semibold mb-2">1. Acceptance</h2>
            <p>By creating an account or using MarginLog, you agree to these terms. If you do not agree, do not use the service.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">2. What MarginLog is</h2>
            <p>MarginLog is a personal profit tracking tool. It calculates estimated net profit based on platform fee rates you configure and the data you enter. It is <strong className="text-white">not</strong> accounting software, tax software, or financial advice. The profit figures displayed are estimates. You are responsible for verifying accuracy with your own records and consulting a qualified accountant or tax professional for any financial or tax decisions.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">3. Your account</h2>
            <p>You are responsible for keeping your login credentials secure. You are responsible for all activity that occurs under your account. You must be at least 16 years old to use MarginLog.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">4. Acceptable use</h2>
            <p>You agree not to use MarginLog to store unlawful content, attempt to access other users' data, reverse-engineer the service, or use it in any way that violates applicable law.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">5. Data and exports</h2>
            <p>You own the data you enter into MarginLog. We claim no rights to it. You can export it at any time. We store it solely to provide the service to you.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">6. Service availability</h2>
            <p>We aim for high availability but do not guarantee uninterrupted access. We may perform maintenance, experience outages, or make changes to the service at any time. We are not liable for losses caused by service interruptions.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">7. Fee accuracy</h2>
            <p>Platform fee rates (eBay, Poshmark, Mercari, etc.) change over time. We update our fee tables when platforms announce changes, but we cannot guarantee real-time accuracy. Always verify current rates with the platform directly before making financial decisions.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">8. Limitation of liability</h2>
            <p>MarginLog is provided "as is." To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the service, including but not limited to losses from inaccurate profit calculations.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">9. Termination</h2>
            <p>You may stop using MarginLog and delete your account at any time. We may terminate accounts that violate these terms. On termination, your data will be deleted within 30 days.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">10. Changes to terms</h2>
            <p>We may update these terms. We will notify you by email at least 14 days before material changes take effect. Continued use of the service after that date constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-white font-semibold mb-2">11. Contact</h2>
            <p>Questions about these terms: <a href="mailto:hello@marginlog.ai" className="text-emerald-400 hover:text-emerald-300">hello@marginlog.ai</a></p>
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
