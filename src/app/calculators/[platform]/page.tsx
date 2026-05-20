import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/logo'
import ProfitCalculator from '@/components/profit-calculator'
import { CALC_PLATFORMS, CALC_PLATFORM_SLUGS } from '@/lib/calculator-config'

export function generateStaticParams() {
  return CALC_PLATFORM_SLUGS.map(slug => ({ platform: slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ platform: string }> }
): Promise<Metadata> {
  const { platform: slug } = await params
  const platform = CALC_PLATFORMS[slug]
  if (!platform) return {}

  const title = `Free ${platform.name} Profit Calculator — True Profit After Fees`
  const description = `Calculate your real ${platform.name} profit after the ${platform.feeLabel} fee, shipping, and cost of goods. Free ${platform.name} fee calculator for resellers.`

  return {
    title,
    description,
    alternates: { canonical: `https://marginlog.vercel.app/calculators/${slug}` },
    openGraph: { title, description },
    twitter: { title, description },
  }
}

export default async function CalculatorPage(
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform: slug } = await params
  const platform = CALC_PLATFORMS[slug]
  if (!platform) notFound()

  const otherPlatforms = CALC_PLATFORM_SLUGS.filter(s => s !== slug)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: platform.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Logo />
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-medium px-4 py-1.5 rounded-lg transition-colors"
          >
            Start free
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/calculators" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-6 inline-block">
          ← All calculators
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3 leading-tight">
            {platform.heroHeadline}
          </h1>
          <p className="text-zinc-400 leading-relaxed">
            {platform.heroSubtext}
          </p>
        </div>

        {/* Calculator */}
        <ProfitCalculator platformSlug={slug} />

        {/* Sign-up banner */}
        <div className="mt-10 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
          <p className="font-semibold text-emerald-400 mb-1">Selling on multiple platforms?</p>
          <p className="text-sm text-zinc-400 mb-4">{platform.signupHook}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup"
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm text-center"
            >
              Start tracking free — no card required
            </Link>
            <Link
              href="/"
              className="inline-block border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white font-medium px-6 py-2.5 rounded-xl transition-colors text-sm text-center"
            >
              See how it works
            </Link>
          </div>
        </div>

        {/* Fee explainer */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-3">How {platform.name} fees work</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">{platform.feeExplainer}</p>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold mb-6">{platform.name} profit — common questions</h2>
          <div className="space-y-5">
            {platform.faqs.map(faq => (
              <div key={faq.q} className="border-b border-zinc-800 pb-5">
                <p className="font-medium text-white mb-2">{faq.q}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other platforms */}
        <div className="mt-12">
          <p className="text-sm text-zinc-500 mb-3">Calculate profit on other platforms</p>
          <div className="flex flex-wrap gap-2">
            {otherPlatforms.map(s => (
              <Link
                key={s}
                href={`/calculators/${s}`}
                className="text-xs text-zinc-500 hover:text-white border border-zinc-800 hover:border-zinc-600 rounded-lg px-3 py-1.5 transition-colors"
              >
                {CALC_PLATFORMS[s].name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <p className="text-xl font-bold mb-2">Stop calculating this by hand</p>
          <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
            MarginLog logs every sale in 30 seconds — true profit, platform analytics, and CSV export for tax season. Free for up to 15 users during beta.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Create your free account
          </Link>
          <p className="text-xs text-zinc-600 mt-3">Free · No card required · Lifetime free during beta</p>
        </div>
      </main>

      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap gap-4 text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
          <Link href="/calculators" className="hover:text-zinc-400 transition-colors">All calculators</Link>
          <Link href="/about" className="hover:text-zinc-400 transition-colors">About</Link>
          <Link href="/signup" className="hover:text-zinc-400 transition-colors">Start free</Link>
        </div>
      </footer>
    </div>
  )
}
