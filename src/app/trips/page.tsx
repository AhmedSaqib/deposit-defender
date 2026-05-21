import AppFooter from '@/components/app-footer'
import { redirect } from 'next/navigation'
import Nav from '@/components/nav'
import { createClient } from '@/lib/supabase/server'
import { createTrip, deleteTrip } from '@/lib/actions'
import { calcNetProfit, formatCurrency, type Platform } from '@/lib/platform-fees'

type LinkedSale = {
  id: string
  sale_price: number
  cost_of_goods: number
  shipping_cost: number
  platform: string
  status?: string | null
}

type Trip = {
  id: string
  name: string
  trip_date: string
  total_spent: number
  notes: string | null
  sales: LinkedSale[]
}

export default async function TripsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: raw = [] } = await supabase
    .from('sourcing_trips')
    .select('id, name, trip_date, total_spent, notes, sales(id, sale_price, cost_of_goods, shipping_cost, platform, status)')
    .order('trip_date', { ascending: false })

  const trips = (raw ?? []) as Trip[]

  const today = new Date().toISOString().split('T')[0]

  function tripProfit(trip: Trip) {
    return trip.sales
      .filter(s => s.status !== 'returned')
      .reduce((sum, s) => sum + calcNetProfit(s.sale_price, s.cost_of_goods, s.shipping_cost, s.platform as Platform), 0)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Nav />
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-semibold">Sourcing trips</h1>
          <p className="text-zinc-500 text-sm mt-1">Tag sales to a trip to measure its real ROI — after the cost of the trip itself.</p>
        </div>

        {/* Create trip form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Log a sourcing trip</h2>
          <form action={createTrip} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Trip name</label>
              <input
                name="name"
                required
                placeholder="e.g. Goodwill · Fairfax"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Date</label>
                <input
                  name="trip_date"
                  type="date"
                  required
                  defaultValue={today}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Total spent ($)</label>
                <input
                  name="total_spent"
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
              <label className="block text-sm text-zinc-400 mb-1.5">Notes <span className="text-zinc-600">(optional)</span></label>
              <input
                name="notes"
                placeholder="optional"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              Create trip
            </button>
          </form>
        </div>

        {/* Trip list */}
        {trips.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <p className="text-zinc-500 text-sm">No trips yet. Create one above, then tag sales to it when logging.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trips.map(trip => {
              const profit = tripProfit(trip)
              const netROI = profit - trip.total_spent
              const itemCount = trip.sales.filter(s => s.status !== 'returned').length

              return (
                <div key={trip.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-white font-semibold">{trip.name}</p>
                      <p className="text-zinc-500 text-xs mt-0.5">{trip.trip_date}{trip.notes ? ` · ${trip.notes}` : ''}</p>
                    </div>
                    <form action={async () => {
                      'use server'
                      await deleteTrip(trip.id)
                    }}>
                      <button type="submit" className="text-zinc-600 hover:text-red-400 transition-colors text-xs">Delete</button>
                    </form>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <p className="text-zinc-500 text-xs mb-0.5">Spent on trip</p>
                      <p className="text-rose-400 font-semibold">{formatCurrency(trip.total_spent)}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs mb-0.5">Items sold</p>
                      <p className="text-white font-semibold">{itemCount}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs mb-0.5">Sales profit</p>
                      <p className={`font-semibold ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{formatCurrency(profit)}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs mb-0.5">Net ROI</p>
                      <p className={`font-semibold ${netROI >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{formatCurrency(netROI)}</p>
                    </div>
                  </div>

                  {itemCount === 0 && (
                    <p className="text-zinc-600 text-xs mt-3">No sales tagged yet — select this trip when logging a sale.</p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
      <AppFooter />
    </div>
  )
}
