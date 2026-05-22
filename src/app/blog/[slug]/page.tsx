import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/logo'
import { getPost, POSTS } from '@/lib/posts'

export async function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | MarginLog`,
    description: post.description,
    alternates: { canonical: `https://marginlog.net/blog/${slug}` },
    openGraph: { title: post.title, description: post.description, type: 'article' },
  }
}

function ResellingProfitMistakes() {
  return (
    <article className="prose prose-invert prose-zinc max-w-none">
      <p className="text-zinc-400 lead">
        Most resellers know roughly what they sell. Far fewer know what they actually keep. The gap between those two numbers is where businesses quietly fail — not from bad products or slow sales, but from never tracking the right things.
      </p>
      <p className="text-zinc-400">
        Here are five mistakes that cost resellers real money, and what to do about each one.
      </p>

      <h2 className="text-white">1. Tracking revenue instead of profit</h2>
      <p className="text-zinc-400">
        A $10,000 month sounds great. But after eBay takes 13%, Poshmark takes 20%, you subtract what you paid for the items, and factor in shipping — that number can look very different.
      </p>
      <p className="text-zinc-400">
        The problem is most resellers look at their bank account or their platform dashboard and mistake gross sales for profit. These are not the same number. Platform fees alone on a $10,000 month can run $1,300–$2,000 before you've accounted for anything else.
      </p>
      <p className="text-zinc-400">
        The fix: calculate net profit on every sale, not just at the end of the month. Once you see the real number per item, you start making better decisions about what to list and where.
      </p>

      <div className="mt-8" />
      <h2 className="text-white">2. Not knowing the real cost of a haul</h2>
      <p className="text-zinc-400">
        You spend $80 at a garage sale and come home with 20 items. Most people divide equally — $4 per item — and move on. But some of those items will sell for $5 and others for $60. Treating them the same distorts your profit on every sale.
      </p>
      <p className="text-zinc-400">
        A better approach: allocate cost proportionally based on expected sale price. Items you expect to sell for more absorb more of the haul cost. It takes an extra five minutes and makes your per-item profit numbers accurate.
      </p>
      <p className="text-zinc-400">
        This is also what stops you from thinking a $25 sale was profitable when $18 of it was the item's allocated cost plus fees.
      </p>

      <div className="mt-8" />
      <h2 className="text-white">3. Ignoring business expenses entirely</h2>
      <p className="text-zinc-400">
        Reselling has real operating costs that most people never log: shipping supplies, packaging materials, storage, mileage to the post office, platform subscriptions, phone bills. These are all legitimately deductible business expenses in most countries.
      </p>
      <p className="text-zinc-400">
        If you're not tracking them, you're not deducting them — which means you're paying tax on income you didn't actually keep. A reseller doing $3,000 a month in net profit likely has $300–$500 in legitimate expenses they never claim.
      </p>
      <p className="text-zinc-400">
        The fix is simple: log expenses as they happen, not at tax time. One line per purchase. Categorising by type (shipping supplies, subscriptions, mileage) makes it easy to hand to an accountant or file yourself.
      </p>

      <div className="mt-8" />
      <h2 className="text-white">4. Assuming your biggest platform is your best platform</h2>
      <p className="text-zinc-400">
        Most resellers sell on multiple platforms and have a feel for which one moves inventory fastest. That's not the same as which one is most profitable.
      </p>
      <p className="text-zinc-400">
        Poshmark's 20% fee versus eBay's 13% makes a significant difference at scale. Mercari can outperform both on certain categories. The only way to know which platform actually makes you more money is to track net margin by platform over time — not by gut feel, and not by looking at total sales.
      </p>
      <p className="text-zinc-400">
        One month of clean data per platform will tell you more than a year of guessing.
      </p>

      <div className="mt-8" />
      <h2 className="text-white">5. Reconstructing records at tax time</h2>
      <p className="text-zinc-400">
        Every reseller who hasn't built a tracking habit eventually faces the same April situation: months of sales, no cost records, PayPal and bank statements that don't tell the full story.
      </p>
      <p className="text-zinc-400">
        Cost of goods is the biggest issue. You can usually retrieve sale prices from platform history, but what you paid for items six months ago — especially from garage sales or Facebook Marketplace — is nearly impossible to reconstruct accurately. Which means you either overstate your profit and overpay tax, or you understate it and take on risk.
      </p>
      <p className="text-zinc-400">
        The only fix is logging as you go. Even a rough record at the time of purchase beats nothing. And at tax time, a CSV export of your sales and costs is worth more than a shoebox of receipts.
      </p>

      <hr className="border-zinc-800 my-10" />

      <h2 className="text-white">The common thread</h2>
      <p className="text-zinc-400">
        All five of these come down to the same thing: reselling is a business, and businesses need numbers. Not a rough sense of how things are going — actual numbers, per sale, tracked consistently.
      </p>
      <p className="text-zinc-400">
        We built <Link href="/" className="text-emerald-400 hover:text-emerald-300">MarginLog</Link> to make that straightforward. Log a sale, pick the platform, and fees are deducted automatically. Track your haul costs, your expenses, and your sourcing trips. Export everything when you need it. It's free to start — no spreadsheet required.
      </p>
    </article>
  )
}

const CONTENT: Record<string, React.FC> = {
  'reselling-profit-mistakes': ResellingProfitMistakes,
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const Content = CONTENT[slug]
  if (!Content) notFound()

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Logo />
        <div className="flex gap-3">
          <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5">Log in</Link>
          <Link href="/signup" className="text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-medium px-4 py-1.5 rounded-lg transition-colors">Get started free</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/blog" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-8 inline-block">← Blog</Link>
        <p className="text-xs text-zinc-500 mb-3">{post.date} · {post.readingTime}</p>
        <h1 className="text-3xl font-bold leading-tight mb-10">{post.title}</h1>
        <Content />
      </main>

      <footer className="border-t border-zinc-800 mt-16">
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
