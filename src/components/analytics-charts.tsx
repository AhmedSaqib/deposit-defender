'use client'

import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis,
} from 'recharts'
import { formatCurrency } from '@/lib/platform-fees'

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#84cc16']

type SliceData = { name: string; value: number }
type CostTotals = { revenue: number; cogs: number; fees: number; shipping: number; profit: number }

function EmptyState() {
  return (
    <div className="h-48 flex items-center justify-center text-zinc-500 text-sm">
      No sales yet — log some sales to see breakdowns.
    </div>
  )
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs">
      <p className="text-zinc-300">{payload[0].name}</p>
      <p className="text-white font-semibold">{formatCurrency(payload[0].value)}</p>
    </div>
  )
}

export default function AnalyticsCharts({
  categoryData,
  platformData,
  costTotals,
  count,
}: {
  categoryData: SliceData[]
  platformData: SliceData[]
  costTotals: CostTotals
  count: number
}) {
  const hasData = categoryData.length > 0

  const costBreakdown = [
    { name: 'Net profit', value: Math.max(costTotals.profit, 0) },
    { name: 'Cost of goods', value: costTotals.cogs },
    { name: 'Platform fees', value: costTotals.fees },
    { name: 'Shipping', value: costTotals.shipping },
  ].filter(d => d.value > 0)

  const costColors = ['#10b981', '#3b82f6', '#f59e0b', '#f43f5e']

  const platformBarData = platformData.map(d => ({ name: d.name, profit: d.value }))

  return (
    <div className="space-y-6">
      {/* Summary tiles — top */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
        {[
          { label: 'Items sold', value: count.toString(), color: 'text-white', isCurrency: false },
          { label: 'Total revenue', value: costTotals.revenue, color: 'text-white', isCurrency: true },
          { label: 'Cost of goods', value: costTotals.cogs, color: 'text-blue-400', isCurrency: true },
          { label: 'Platform fees', value: costTotals.fees, color: 'text-amber-400', isCurrency: true },
          { label: 'Shipping paid', value: costTotals.shipping, color: 'text-rose-400', isCurrency: true },
        ].map(({ label, value, color, isCurrency }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-500 text-xs mb-1">{label}</p>
            <p className={`font-bold text-lg ${color}`}>{isCurrency ? formatCurrency(value as number) : value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Category breakdown */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h3 className="text-sm font-medium text-zinc-400 mb-4">Profit by category</h3>
          {!hasData ? <EmptyState /> : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%" cy="50%"
                  innerRadius={55} outerRadius={85}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-zinc-400 text-xs">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Revenue breakdown donut */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h3 className="text-sm font-medium text-zinc-400 mb-4">Where your revenue goes</h3>
          {!hasData ? <EmptyState /> : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%" cy="50%"
                  innerRadius={55} outerRadius={85}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {costBreakdown.map((_, i) => (
                    <Cell key={i} fill={costColors[i % costColors.length]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-zinc-400 text-xs">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Platform profit bar chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h3 className="text-sm font-medium text-zinc-400 mb-4">Net profit by platform</h3>
        {!hasData ? <EmptyState /> : (
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={platformBarData} layout="vertical" margin={{ top: 0, right: 12, left: 8, bottom: 0 }}>
              <XAxis type="number" tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={false} tickLine={false} width={110} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, fontSize: 13, color: '#e4e4e7' }}
                itemStyle={{ color: '#e4e4e7' }}
                formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Net profit']}
              />
              <Bar dataKey="profit" radius={[0, 4, 4, 0]}>
                {platformBarData.map((entry, i) => (
                  <Cell key={i} fill={entry.profit >= 0 ? '#10b981' : '#f43f5e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  )
}
