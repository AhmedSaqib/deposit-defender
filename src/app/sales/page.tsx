import { redirect } from 'next/navigation'
import Link from 'next/link'
import { PlusCircle, FileInput } from 'lucide-react'
import Nav from '@/components/nav'
import { createClient } from '@/lib/supabase/server'
import { deleteSale, markReturned } from '@/lib/actions'
import { calcNetProfit, calcPlatformFee, PLATFORMS, formatCurrency, type Platform } from '@/lib/platform-fees'

type Sale = {
  id: string
  item_name: string
  category: string
  platform: string
  cost_of_goods: number
  sale_price: number
  shipping_cost: number
  sale_date: string
  notes: string | null
  status?: string | null
}

export default async function SalesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: sales = [] } = await supabase
    .from('sales')
    .select('*')
    .order('sale_date', { ascending: false })

  const allSales = (sales ?? []) as Sale[]

  const csvUrl = '/api/export'

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Nav />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Sales history</h1>
          <div className="flex gap-2">
            <a
              href={csvUrl}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-colors"
            >
              Export CSV
            </a>
            <Link href="/import" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-colors">
              <FileInput className="w-4 h-4" /> Import
            </Link>
            <Link href="/log" className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              <PlusCircle className="w-4 h-4" /> Log sale
            </Link>
          </div>
        </div>

        {allSales.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <p className="text-zinc-400 text-sm mb-4">No sales logged yet.</p>
            <Link href="/log" className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
              Log your first sale
            </Link>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-xs">
                    <th className="text-left px-4 py-3 font-medium">Item</th>
                    <th className="text-left px-4 py-3 font-medium">Platform</th>
                    <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Date</th>
                    <th className="text-right px-4 py-3 font-medium">Sale price</th>
                    <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">Fees</th>
                    <th className="text-right px-4 py-3 font-medium">Net profit</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {allSales.map(s => {
                    const fee = calcPlatformFee(s.sale_price, s.platform as Platform)
                    const profit = calcNetProfit(s.sale_price, s.cost_of_goods, s.shipping_cost, s.platform as Platform)
                    return (
                      <tr key={s.id} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <p className="text-white">{s.item_name}</p>
                            {s.status === 'returned' && (
                              <span className="text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20 px-1.5 py-0.5 rounded">Returned</span>
                            )}
                          </div>
                          <p className="text-zinc-500 text-xs">{s.category}</p>
                        </td>
                        <td className="px-4 py-3 text-zinc-400">
                          {PLATFORMS[s.platform as Platform]?.name ?? s.platform}
                        </td>
                        <td className="px-4 py-3 text-zinc-400 hidden sm:table-cell">{s.sale_date}</td>
                        <td className="px-4 py-3 text-right text-zinc-300">{formatCurrency(s.sale_price)}</td>
                        <td className="px-4 py-3 text-right text-red-400/70 hidden sm:table-cell">-{formatCurrency(fee)}</td>
                        <td className={`px-4 py-3 text-right font-semibold ${s.status === 'returned' ? 'text-zinc-500 line-through' : profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {formatCurrency(s.status === 'returned' ? 0 : profit)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 justify-end">
                            {s.status !== 'returned' && (
                              <form action={async () => {
                                'use server'
                                await markReturned(s.id)
                              }}>
                                <button type="submit" className="text-zinc-600 hover:text-amber-400 transition-colors text-xs">
                                  Return
                                </button>
                              </form>
                            )}
                            <form action={async () => {
                              'use server'
                              await deleteSale(s.id)
                            }}>
                              <button type="submit" className="text-zinc-600 hover:text-red-400 transition-colors text-xs">
                                Delete
                              </button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
