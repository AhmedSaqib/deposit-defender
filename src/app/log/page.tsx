import { redirect } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/nav'
import AppFooter from '@/components/app-footer'
import { createClient } from '@/lib/supabase/server'
import { logSale } from '@/lib/actions'
import { PLATFORMS, CATEGORIES } from '@/lib/platform-fees'
import { getMonthlyCount, FREE_LIMIT } from '@/lib/subscription'
import UpgradeButton from '@/components/upgrade-button'

export default async function LogPage({ searchParams }: { searchParams: Promise<{ cogs?: string; limit?: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const today = new Date().toISOString().split('T')[0]
  const params = await searchParams
  const defaultCogs = params.cogs ?? '0'
  const atLimit = params.limit === '1'

  const [{ data: trips = [] }, monthlyCount] = await Promise.all([
    supabase.from('sourcing_trips').select('id, name, trip_date').order('trip_date', { ascending: false }).limit(30),
    getMonthlyCount(user.id),
  ])

  if (atLimit) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Nav />
        <main className="max-w-xl mx-auto px-4 py-8">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 text-center">
            <p className="text-4xl mb-4">🔒</p>
            <h1 className="text-xl font-bold mb-2">You've hit your free limit</h1>
            <p className="text-zinc-400 text-sm mb-1">
              You've logged <span className="text-white font-semibold">{monthlyCount} of {FREE_LIMIT} sales</span> this month.
            </p>
            <p className="text-zinc-500 text-sm mb-6">
              Upgrade to MarginLog Pro for unlimited sales tracking, analytics, and CSV export.
            </p>
            <UpgradeButton />
            <p className="text-xs text-zinc-600 mt-4">
              Resets on the 1st of next month · Cancel anytime
            </p>
          </div>
        </main>
        <AppFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Nav />
      <main className="max-w-xl mx-auto px-4 py-8">
        {monthlyCount >= FREE_LIMIT - 3 && (
          <div className="mb-4 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 flex items-center justify-between">
            <p className="text-sm text-amber-400">
              {FREE_LIMIT - monthlyCount} free sale{FREE_LIMIT - monthlyCount === 1 ? '' : 's'} left this month
            </p>
            <UpgradeButton small />
          </div>
        )}
        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-xl font-semibold">Log a sale</h1>
          <div className="flex gap-3 text-xs text-zinc-500">
            <a href="/haul" className="hover:text-emerald-400 transition-colors">Split a haul →</a>
            <a href="/bundle" className="hover:text-emerald-400 transition-colors">Log a bundle →</a>
          </div>
        </div>

        <form action={logSale} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Item name</label>
            <input
              name="item_name"
              required
              placeholder="e.g. Vintage Levi's 501 Jeans"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Platform</label>
              <select
                name="platform"
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {Object.entries(PLATFORMS).map(([key, { name }]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Category</label>
              <select
                name="category"
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Sale price ($)</label>
              <input
                name="sale_price"
                type="number"
                step="0.01"
                min="0"
                required
                placeholder="0.00"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Cost of goods ($)</label>
              <input
                name="cost_of_goods"
                type="number"
                step="0.01"
                min="0"
                defaultValue={defaultCogs}
                placeholder="0.00"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Shipping cost ($)</label>
              <input
                name="shipping_cost"
                type="number"
                step="0.01"
                min="0"
                defaultValue="0"
                placeholder="0.00"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Sale date</label>
            <input
              name="sale_date"
              type="date"
              required
              defaultValue={today}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {trips && trips.length > 0 && (
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Sourcing trip <span className="text-zinc-600">(optional)</span></label>
              <select
                name="sourcing_trip_id"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="">None</option>
                {trips.map((t: { id: string; name: string; trip_date: string }) => (
                  <option key={t.id} value={t.id}>{t.name} · {t.trip_date}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Notes <span className="text-zinc-600">(optional)</span></label>
            <textarea
              name="notes"
              rows={2}
              placeholder="e.g. sold fast, bundle deal..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2.5 rounded-lg transition-colors text-sm"
          >
            Save sale
          </button>
        </form>
      </main>
      <AppFooter />
    </div>
  )
}
