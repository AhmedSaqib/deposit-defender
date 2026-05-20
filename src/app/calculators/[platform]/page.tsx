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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Logo />
        <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors">
          Log in
        </Link>
      </header>

      <main className="max-w-lg mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/calculators" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors mb-4 inline-block">
            ← All calculators
          </Link>
          <h1 className="text-2xl font-bold mb-2">
            Free {platform.name} Profit Calculator
          </h1>
          <p className="text-zinc-400 text-sm">
            See your real profit after the {platform.feeLabel} fee, shipping, and cost of goods.
            No account needed.
          </p>
        </div>

        <ProfitCalculator platformSlug={slug} />

        <div className="mt-12">
          <p className="text-xs text-zinc-600 mb-4">Also selling on</p>
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
      </main>

      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap gap-4 text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
          <Link href="/calculators" className="hover:text-zinc-400 transition-colors">All calculators</Link>
          <Link href="/signup" className="hover:text-zinc-400 transition-colors">Start tracking free</Link>
        </div>
      </footer>
    </div>
  )
}
