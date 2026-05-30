import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/logo'
import { getPost, POSTS } from '@/lib/posts'
import { createClient } from '@/lib/supabase/server'

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
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://marginlog.net/blog/${slug}`,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  }
}

function EbayFeesExplained2025() {
  return (
    <article className="prose prose-invert prose-zinc max-w-none">
      <p className="text-zinc-400 lead">
        Most sellers glance at the sale price and feel good. Then eBay takes their cut, you subtract what you paid for the item, factor in the shipping you actually covered, and the number that hits your account is always lower than expected. This post breaks down every eBay fee with real examples — so you know exactly what you keep on a $20, $50, and $100 sale.
      </p>

      <h2 className="text-white">The fees eBay actually charges</h2>
      <p className="text-zinc-400">eBay's fee structure breaks into three buckets:</p>
      <ul className="text-zinc-400 space-y-2">
        <li><span className="text-white font-medium">Final value fee</span> — the main one. A percentage of the total sale amount including any shipping the buyer paid. Charged when the item sells.</li>
        <li><span className="text-white font-medium">Insertion fee</span> — charged when you create a listing. Free for the first 250 listings per month; $0.35 per listing after that.</li>
        <li><span className="text-white font-medium">Payment processing</span> — eBay manages payments directly since 2021. The processing cost is baked into the final value fee rate, so there is no separate PayPal fee anymore.</li>
      </ul>
      <p className="text-zinc-400">
        For most resellers, the insertion fee is irrelevant — you're unlikely to exceed 250 listings a month. The final value fee is the one that matters.
      </p>

      <h2 className="text-white">Final value fee rates by category</h2>
      <p className="text-zinc-400">
        The standard rate for most categories is <span className="text-white font-medium">13.25% + $0.30 per order</span>. This covers the majority of what resellers sell — clothing, collectibles, electronics, home goods, sporting goods.
      </p>
      <p className="text-zinc-400">Notable exceptions:</p>
      <ul className="text-zinc-400 space-y-1">
        <li>Books, DVDs, music, video games: <span className="text-white">14.95%</span></li>
        <li>Clothing &amp; shoes under $100: <span className="text-white">15%</span> (drops to 8% for items over $100)</li>
        <li>Watches priced over $5,000: <span className="text-white">6.5%</span></li>
        <li>Heavy equipment parts: <span className="text-white">3%</span></li>
      </ul>
      <p className="text-zinc-400">
        If you're selling clothing under $100 — one of the most common reselling categories — you're paying 15%, not 13.25%. That gap adds up at volume.
      </p>

      <h2 className="text-white">eBay fees apply to shipping too</h2>
      <p className="text-zinc-400">
        This catches a lot of sellers off guard. eBay calculates the final value fee on the <span className="text-white font-medium">total transaction amount</span>, which includes any shipping cost the buyer paid. If you list an item for $40 and charge $8 shipping, eBay fees apply to $48 — not $40.
      </p>
      <p className="text-zinc-400">
        This is why charging separately for shipping doesn't save as much as it feels like it should. The buyer pays $8 for shipping, but eBay takes 13.25% of that $8 too ($1.06). You collect $8 and keep roughly $6.94 of it — less your actual postage cost on top of that.
      </p>
      <p className="text-zinc-400">
        Many experienced sellers price shipping into the item and offer free shipping. It simplifies the math and can improve search ranking, since eBay's algorithm favours free shipping listings.
      </p>

      <h2 className="text-white">What a $50 sale actually leaves you</h2>
      <p className="text-zinc-400">
        Here's the full calculation on a $50 sale with free shipping to the buyer:
      </p>
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 space-y-2 text-sm not-prose my-6">
        <div className="flex justify-between text-zinc-400"><span>Sale price</span><span>$50.00</span></div>
        <div className="flex justify-between text-zinc-400"><span>eBay fee (13.25% + $0.30)</span><span>− $6.93</span></div>
        <div className="flex justify-between text-zinc-400"><span>Shipping you paid</span><span>− $6.50</span></div>
        <div className="flex justify-between text-zinc-400"><span>Cost of goods</span><span>− $12.00</span></div>
        <div className="flex justify-between text-white font-semibold border-t border-zinc-700 pt-2"><span>Net profit</span><span>$24.57</span></div>
      </div>
      <p className="text-zinc-400">
        That's 49 cents kept for every dollar sold. Not unusual — but a long way from the $50 that appeared in your eBay dashboard. If you paid more than $12 for the item or shipped something heavy, the margin compresses further.
      </p>

      <h2 className="text-white">What a $20 sale leaves you</h2>
      <p className="text-zinc-400">
        Lower-priced items are where the math gets uncomfortable. The $0.30 fixed fee becomes proportionally large, and shipping costs don't scale down:
      </p>
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 space-y-2 text-sm not-prose my-6">
        <div className="flex justify-between text-zinc-400"><span>Sale price</span><span>$20.00</span></div>
        <div className="flex justify-between text-zinc-400"><span>eBay fee (13.25% + $0.30)</span><span>− $2.95</span></div>
        <div className="flex justify-between text-zinc-400"><span>Shipping you paid</span><span>− $5.00</span></div>
        <div className="flex justify-between text-zinc-400"><span>Cost of goods</span><span>− $6.00</span></div>
        <div className="flex justify-between text-white font-semibold border-t border-zinc-700 pt-2"><span>Net profit</span><span>$6.05</span></div>
      </div>
      <p className="text-zinc-400">
        $6.05 on a $20 sale — a 30% margin. Pay $8 for the item instead of $6 and you're down to $4.05. Pay $10 and you've made $2.05 for the time spent listing, packing, and shipping. This is why experienced resellers have a minimum margin rule. Many won't touch anything that won't 2x after fees.
      </p>

      <h2 className="text-white">The minimum price formula</h2>
      <p className="text-zinc-400">
        Before listing anything, it's worth calculating the floor — the sale price below which you're guaranteed to lose money. The formula for standard eBay categories:
      </p>
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 text-sm not-prose my-6">
        <p className="text-zinc-400 mb-2">Minimum price = (COGS + shipping cost + $0.30) ÷ (1 − 0.1325)</p>
        <p className="text-zinc-500 text-xs">Example: item cost $10, shipping $5 → ($10 + $5 + $0.30) ÷ 0.8675 = <span className="text-white">$17.63 minimum</span></p>
      </div>
      <p className="text-zinc-400">
        List below $17.63 and you lose money on the sale. List at $22 and you keep $4.07. The further above your floor you can list, the better — but knowing the floor stops you from pricing deals that feel okay but are actually losses.
      </p>
      <p className="text-zinc-400">
        You can also use the <Link href="/tools/break-even" className="text-emerald-400 hover:text-emerald-300">break-even calculator</Link> here to do this automatically for any platform.
      </p>

      <h2 className="text-white">eBay Store — when does it make sense?</h2>
      <p className="text-zinc-400">
        eBay offers store subscriptions ranging from $7.95 to $349.95 per month. The main benefits are more free listings and slightly reduced final value fees on some categories (typically 0.25–0.50% lower).
      </p>
      <p className="text-zinc-400">
        The math on whether a store pays off: at a 0.25% fee reduction, a Basic Store at $27.95/month breaks even at roughly <span className="text-white font-medium">$11,180/month in gross sales</span>. Below that volume, you save more by paying standard rates. Most casual resellers are better off without a subscription until they're consistently clearing five figures a month.
      </p>

      <h2 className="text-white">eBay vs other platforms on the same item</h2>
      <p className="text-zinc-400">
        eBay's 13.25% sits between Poshmark (20%) and Mercari (10%). For high-value items, Depop charges around 10% and Facebook Marketplace charges 5% on shipped sales — or nothing on local pickup.
      </p>
      <p className="text-zinc-400">
        The right platform depends on the item, the buyer base, and your shipping cost. A $60 clothing item nets roughly $40 on eBay and $36 on Poshmark — a $4 difference per sale that adds up at volume. You can <Link href="/calculators/compare" className="text-emerald-400 hover:text-emerald-300">compare all platform fees side by side</Link> to see which one keeps the most money in your pocket on any given item.
      </p>

      <hr className="border-zinc-700 my-10" />

      <h2 className="text-white">The number to actually watch</h2>
      <p className="text-zinc-400">
        eBay's Seller Hub shows gross sales. Your bank account shows deposits. Neither tells you what you made. Net profit — sale price minus eBay's fee, your shipping cost, and what you paid for the item — is the only figure worth tracking.
      </p>
      <p className="text-zinc-400">
        The problem is that doing this calculation manually for every sale is tedious enough that most sellers stop doing it. They end up with a rough feel for their numbers rather than actual data — which makes it impossible to know whether a category is profitable, whether a platform is worth the effort, or whether the business is growing or shrinking.
      </p>
      <p className="text-zinc-400">
        If you want to track this without a spreadsheet, <Link href="/calculators/ebay" className="text-emerald-400 hover:text-emerald-300">the eBay calculator here</Link> handles the fee maths instantly. For tracking every sale and seeing running profit over time, <Link href="/" className="text-emerald-400 hover:text-emerald-300">MarginLog</Link> does it automatically — log a sale, select eBay, and the 13.25% + $0.30 is deducted straight away. Free to start.
      </p>
    </article>
  )
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

      <hr className="border-zinc-700 my-10" />

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

function HowToTrackResellingProfits() {
  return (
    <article className="prose prose-invert prose-zinc max-w-none">
      <p className="text-zinc-400 lead">
        Most resellers have a rough sense of what they made last month. Very few know the actual number. The difference matters more than you'd think — especially at tax time, and especially once you're selling across more than one platform.
      </p>
      <p className="text-zinc-400">
        This is a straightforward guide to tracking reselling profits properly — what to record, when to record it, and how to make the system stick.
      </p>

      <div className="mt-8" />
      <h2 className="text-white">Why most resellers don't know their real profit</h2>
      <p className="text-zinc-400">
        The problem isn't laziness. It's that the number you see — the sale price — feels like profit. You sold a jacket for $45 and $45 hit your account. Except it didn't. Poshmark took $9. You paid $12 for the jacket. Shipping was $6. The real number was $18.
      </p>
      <p className="text-zinc-400">
        When you're doing a handful of sales a month, this gap is annoying but manageable. As volume scales, it becomes the difference between a business that's growing and one that's quietly running at a loss.
      </p>

      <div className="mt-8" />
      <h2 className="text-white">The four numbers you actually need to track</h2>
      <p className="text-zinc-400">
        Every sale has four components that determine your real profit:
      </p>
      <ul className="text-zinc-400 space-y-2">
        <li><span className="text-white font-medium">Sale price</span> — what the buyer paid</li>
        <li><span className="text-white font-medium">Platform fee</span> — what the platform takes (<Link href="/calculators/ebay" className="text-emerald-400 hover:text-emerald-300">eBay ~13.25%</Link>, <Link href="/calculators/poshmark" className="text-emerald-400 hover:text-emerald-300">Poshmark 20%</Link>, <Link href="/calculators/mercari" className="text-emerald-400 hover:text-emerald-300">Mercari 10%</Link>, etc.)</li>
        <li><span className="text-white font-medium">Cost of goods (COGS)</span> — what you paid for the item</li>
        <li><span className="text-white font-medium">Shipping cost</span> — what you actually paid to ship it, not what you charged</li>
      </ul>
      <p className="text-zinc-400">
        Net profit = Sale price − Platform fee − COGS − Shipping cost
      </p>
      <p className="text-zinc-400">
        That's it. Everything else — ROI, margin percentage, platform comparisons — is just different ways of looking at these four numbers.
      </p>

      <div className="mt-8" />
      <h2 className="text-white">When to record each number</h2>
      <p className="text-zinc-400">
        Timing matters more than most people realise. The biggest mistake resellers make is trying to reconstruct COGS at the end of the month or at tax time. By then you've forgotten what you paid at the garage sale three weeks ago, and the receipt is gone.
      </p>
      <p className="text-zinc-400">
        The right time to record COGS is at the point of purchase — not when the item sells. This is the single habit change that makes the most difference. When you get home from a sourcing run, log what you paid per item before you do anything else.
      </p>
      <p className="text-zinc-400">
        Sale price, platform fee, and shipping you can always retrieve from your platform order history. COGS is the one you can't recover retroactively.
      </p>

      <div className="mt-8" />
      <h2 className="text-white">Tracking across multiple platforms</h2>
      <p className="text-zinc-400">
        Selling on <Link href="/calculators/ebay" className="text-emerald-400 hover:text-emerald-300">eBay</Link> and <Link href="/calculators/poshmark" className="text-emerald-400 hover:text-emerald-300">Poshmark</Link> simultaneously is where spreadsheets start breaking down. You end up with separate tabs, inconsistent column names, and no single view of how your business is actually doing.
      </p>
      <p className="text-zinc-400">
        The key is a single system that handles all platforms with their correct fee structures built in. When you log a sale on eBay, 13.25% should be deducted automatically. When you log on Poshmark, 20%. You shouldn't be looking up fee tables every time.
      </p>
      <p className="text-zinc-400">
        This also matters when you're deciding which platform to use for a given item. If you track properly, you can see over time that Mercari outperforms eBay on certain categories for you — or that Facebook Marketplace has better margins despite lower prices. That's data you can't get from a gut feeling. You can also <Link href="/calculators/compare" className="text-emerald-400 hover:text-emerald-300">compare platform fees side by side</Link> before you list.
      </p>

      <div className="mt-8" />
      <h2 className="text-white">Handling hauls and bulk purchases</h2>
      <p className="text-zinc-400">
        Buying in bulk — a lot at an estate sale, a pallet, a job lot — creates a specific tracking problem. You paid one price for a group of items with different expected values.
      </p>
      <p className="text-zinc-400">
        The equal-split approach (total cost ÷ number of items) is fast but inaccurate. If you paid $60 for a lot of 10 items and three of them will sell for $30 each while the rest go for $5, assigning $6 COGS to every item distorts your profit on every sale.
      </p>
      <p className="text-zinc-400">
        A better method: allocate cost proportionally based on expected sale price. Items worth more absorb more of the total cost. It takes five extra minutes per haul and makes every per-item profit figure meaningful.
      </p>

      <div className="mt-8" />
      <h2 className="text-white">Business expenses beyond the items</h2>
      <p className="text-zinc-400">
        Profit tracking isn't complete without expenses. Shipping supplies, packaging materials, storage, mileage, platform subscriptions — these are all real costs of your reselling business, and in most countries they're tax-deductible.
      </p>
      <p className="text-zinc-400">
        Most resellers track item-level costs reasonably well but ignore operating expenses entirely. A reseller doing $2,000 a month in net profit likely has $200–$400 in legitimate deductible expenses they never claim — which means overpaying tax every year.
      </p>
      <p className="text-zinc-400">
        Log expenses as they happen, not at tax time. One line per purchase with a category. That's all it takes.
      </p>

      <div className="mt-8" />
      <h2 className="text-white">Choosing a system that sticks</h2>
      <p className="text-zinc-400">
        The best tracking system is the one you actually use. For low volume sellers, a well-structured spreadsheet works fine. The columns you need: date, item, platform, sale price, COGS, shipping cost, platform fee (formula), net profit (formula).
      </p>
      <p className="text-zinc-400">
        As volume increases, the manual entry and formula maintenance become the bottleneck. This is when a dedicated tool starts to make sense — not because spreadsheets can't do it, but because the friction of updating them consistently gets high enough that the system breaks down.
      </p>
      <p className="text-zinc-400">
        Whatever you use, the non-negotiable is logging every sale close to when it happens, not in batches at the end of the month. The further you get from the sale, the less accurate your records.
      </p>

      <hr className="border-zinc-700 my-10" />

      <h2 className="text-white">A simpler starting point</h2>
      <p className="text-zinc-400">
        If you want to skip building a spreadsheet from scratch, <Link href="/" className="text-emerald-400 hover:text-emerald-300">MarginLog</Link> is free to start. It handles the platform fee calculations automatically for eBay, Poshmark, Mercari, Depop, Etsy, Facebook Marketplace, and Vinted — so you log the sale and see the real number straight away. It also has a haul calculator for bulk purchases and an expense tracker built in.
      </p>
      <p className="text-zinc-400">
        If you'd rather build your own system, the four numbers above are all you need to get started. The habit matters more than the tool.
      </p>
    </article>
  )
}

const CONTENT: Record<string, React.FC> = {
  'ebay-fees-explained-2026': EbayFeesExplained2025,
  'how-to-track-reselling-profits': HowToTrackResellingProfits,
  'reselling-profit-mistakes': ResellingProfitMistakes,
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const Content = CONTENT[slug]
  if (!Content) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'MarginLog', url: 'https://marginlog.net' },
    publisher: { '@type': 'Organization', name: 'MarginLog', url: 'https://marginlog.net' },
    url: `https://marginlog.net/blog/${slug}`,
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
        <Link href="/blog" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-8 inline-block">← Blog</Link>
        <p className="text-xs text-zinc-500 mb-3">{post.date} · {post.readingTime}</p>
        <h1 className="text-3xl font-bold leading-tight mb-10">{post.title}</h1>
        <Content />
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
