'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

type MonthData = { month: string; profit: number }

export default function ProfitChart({ data }: { data: MonthData[] }) {
  if (data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-zinc-500 text-sm">
        No sales yet — log your first sale to see the chart.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
        <XAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
        <Tooltip
          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 8, fontSize: 13, color: '#e4e4e7' }}
          labelStyle={{ color: '#a1a1aa' }}
          itemStyle={{ color: '#e4e4e7' }}
          formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Net profit']}
        />
        <Bar dataKey="profit" radius={[4, 4, 0, 0]} maxBarSize={60}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.profit >= 0 ? '#10b981' : '#f43f5e'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
