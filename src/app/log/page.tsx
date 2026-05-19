import { redirect } from 'next/navigation'
import Nav from '@/components/nav'
import { createClient } from '@/lib/supabase/server'
import { logSale } from '@/lib/actions'
import { PLATFORMS, CATEGORIES } from '@/lib/platform-fees'

export default async function LogPage({ searchParams }: { searchParams: Promise<{ cogs?: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const today = new Date().toISOString().split('T')[0]
  const params = await searchParams
  const defaultCogs = params.cogs ?? '0'

  const { data: trips = [] } = await supabase
    .from('sourcing_trips')
    .select('id, name, trip_date')
    .order('trip_date', { ascending: false })
    .limit(30)

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Nav />
      <main className="max-w-xl mx-auto px-4 py-8">
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
    </div>
  )
}
