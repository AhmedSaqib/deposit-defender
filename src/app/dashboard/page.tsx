import AppFooter from '@/components/app-footer'
import { redirect } from 'next/navigation'
import Nav from '@/components/nav'
import DashboardTabs from '@/components/dashboard-tabs'
import { createClient } from '@/lib/supabase/server'
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
  status?: string | null
}

function netProfit(s: Sale) {
  return calcNetProfit(s.sale_price, s.cost_of_goods, s.shipping_cost, s.platform as Platform)
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: sales = [] } = await supabase
    .from('sales')
    .select('*')
    .order('sale_date', { ascending: false })

  const all = (sales ?? []) as Sale[]
  const active = all.filter(s => s.status !== 'returned')

  const now = new Date()
  const thisMonth = active.filter(s => s.sale_date.slice(0, 7) === now.toISOString().slice(0, 7))

  // Stats
  const totalProfit = active.reduce((sum, s) => sum + netProfit(s), 0)
  const monthProfit = thisMonth.reduce((sum, s) => sum + netProfit(s), 0)
  const totalRevenue = active.reduce((sum, s) => sum + s.sale_price, 0)

  const platformTotals: Record<string, number> = {}
  active.forEach(s => {
    platformTotals[s.platform] = (platformTotals[s.platform] ?? 0) + netProfit(s)
  })
  const bestPlatform = Object.entries(platformTotals).sort(([, a], [, b]) => b - a)[0]

  const stats = [
    { label: 'Total profit', value: formatCurrency(totalProfit), sub: 'all time' },
    { label: 'Profit this month', value: formatCurrency(monthProfit), sub: `${thisMonth.length} sales` },
    { label: 'Total revenue', value: formatCurrency(totalRevenue), sub: `${active.length} sales` },
    {
      label: 'Best platform',
      value: bestPlatform ? (PLATFORMS[bestPlatform[0] as Platform]?.name ?? bestPlatform[0]) : '—',
      sub: bestPlatform ? formatCurrency(bestPlatform[1]) : 'no sales yet',
    },
  ]

  // Monthly data
  const monthMap: Record<string, number> = {}
  active.forEach(s => {
    const key = s.sale_date.slice(0, 7)
    monthMap[key] = (monthMap[key] ?? 0) + netProfit(s)
  })
  const monthlyData = Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([key, profit]) => ({
      month: new Date(key + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      profit: parseFloat(profit.toFixed(2)),
    }))

  // Category breakdown
  const catMap: Record<string, number> = {}
  active.forEach(s => {
    catMap[s.category] = (catMap[s.category] ?? 0) + netProfit(s)
  })
  const categoryData = Object.entries(catMap)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))

  // Platform breakdown
  const platMap: Record<string, number> = {}
  active.forEach(s => {
    const name = PLATFORMS[s.platform as Platform]?.name ?? s.platform
    platMap[name] = (platMap[name] ?? 0) + netProfit(s)
  })
  const platformData = Object.entries(platMap)
    .sort(([, a], [, b]) => b - a)
    .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))

  // Cost totals
  const costTotals = active.reduce(
    (acc, s) => ({
      revenue: acc.revenue + s.sale_price,
      cogs: acc.cogs + s.cost_of_goods,
      fees: acc.fees + calcPlatformFee(s.sale_price, s.platform as Platform),
      shipping: acc.shipping + s.shipping_cost,
      profit: acc.profit + netProfit(s),
    }),
    { revenue: 0, cogs: 0, fees: 0, shipping: 0, profit: 0 }
  )

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Nav />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold mb-6">Dashboard</h1>
        <DashboardTabs
          stats={stats}
          monthlyData={monthlyData}
          recentSales={active.slice(0, 5)}
          categoryData={categoryData}
          platformData={platformData}
          costTotals={costTotals}
          count={active.length}
        />
      </main>
      <AppFooter />
    </div>
  )
}
