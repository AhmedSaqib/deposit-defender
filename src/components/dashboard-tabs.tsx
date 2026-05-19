'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PlusCircle, FileInput } from 'lucide-react'
import ProfitChart from '@/components/profit-chart'
import AnalyticsCharts from '@/components/analytics-charts'
import { PLATFORMS, calcNetProfit, formatCurrency, type Platform } from '@/lib/platform-fees'

type Sale = {
  id: string
  item_name: string
  category: string
  platform: string
  cost_of_goods: number
  sale_price: number
  shipping_cost: number
  sale_date: string
}

type Stat = { label: string; value: string; sub: string }
type MonthData = { month: string; profit: number }
type SliceData = { name: string; value: number }
type CostTotals = { revenue: number; cogs: number; fees: number; shipping: number; profit: number }

type Props = {
  stats: Stat[]
  monthlyData: MonthData[]
  recentSales: Sale[]
  categoryData: SliceData[]
  platformData: SliceData[]
  costTotals: CostTotals
  count: number
}

const TABS = ['Overview', 'Analytics'] as const
type Tab = typeof TABS[number]

export default function DashboardTabs({
  stats, monthlyData, recentSales, categoryData, platformData, costTotals, count,
}: Props) {
  const [active, setActive] = useState<Tab>('Overview')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                active === tab
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Link
            href="/import"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-colors"
          >
            <FileInput className="w-4 h-4" /> Import
          </Link>
          <Link
            href="/log"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <PlusCircle className="w-4 h-4" /> Log sale
          </Link>
        </div>
      </div>

      {active === 'Overview' && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(s => (
              <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <p className="text-zinc-500 text-xs mb-1">{s.label}</p>
                <p className="text-white font-bold text-xl">{s.value}</p>
                <p className="text-zinc-600 text-xs mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h2 className="text-sm font-medium text-zinc-400 mb-4">Monthly profit</h2>
            <ProfitChart data={monthlyData} />
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-zinc-400">Recent sales</h2>
              <Link href="/sales" className="text-xs text-emerald-400 hover:text-emerald-300">View all</Link>
            </div>
            {recentSales.length === 0 ? (
              <p className="text-zinc-500 text-sm py-4 text-center">
                No sales yet.{' '}
                <Link href="/log" className="text-emerald-400 underline">Log your first one.</Link>
              </p>
            ) : (
              <>
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-zinc-800">
                  <span className="text-xs text-zinc-600">Item</span>
                  <div className="flex gap-6 text-xs text-zinc-600">
                    <span className="w-16 text-right">Revenue</span>
                    <span className="w-16 text-right">Profit</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {recentSales.map(s => {
                    const profit = calcNetProfit(s.sale_price, s.cost_of_goods, s.shipping_cost, s.platform as Platform)
                    return (
                      <div key={s.id} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                        <div>
                          <p className="text-sm text-white">{s.item_name}</p>
                          <p className="text-xs text-zinc-500">
                            {PLATFORMS[s.platform as Platform]?.name ?? s.platform} · {s.sale_date}
                          </p>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-sm text-zinc-400 w-16 text-right">{formatCurrency(s.sale_price)}</span>
                          <span className={`text-sm font-semibold w-16 text-right ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {formatCurrency(profit)}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </>
      )}

      {active === 'Analytics' && (
        <AnalyticsCharts
          categoryData={categoryData}
          platformData={platformData}
          costTotals={costTotals}
          count={count}
        />
      )}
    </div>
  )
}
