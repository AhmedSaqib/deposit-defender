'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { PLATFORMS, calcNetProfit, calcPlatformFee, formatCurrency, type Platform } from '@/lib/platform-fees'
import { updateSale, markReturned, deleteSale } from '@/lib/actions'

export type Sale = {
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

type EditState = {
  id: string
  field: 'item_name' | 'platform' | 'sale_date' | 'sale_price'
  value: string
} | null

export default function SalesTable({ initialSales }: { initialSales: Sale[] }) {
  const [sales, setSales] = useState<Sale[]>(initialSales)
  const [editing, setEditing] = useState<EditState>(null)

  function startEdit(id: string, field: EditState['field'], value: string) {
    setEditing({ id, field, value })
  }

  async function confirmEdit() {
    if (!editing) return
    const snap = editing
    // Optimistic update
    setSales(prev => prev.map(s => {
      if (s.id !== snap.id) return s
      if (snap.field === 'sale_price') return { ...s, sale_price: parseFloat(snap.value) || 0 }
      return { ...s, [snap.field]: snap.value }
    }))
    setEditing(null)
    await updateSale(snap.id, snap.field, snap.value)
  }

  function cancelEdit() {
    setEditing(null)
  }

  function cell(
    sale: Sale,
    field: EditState['field'],
    display: React.ReactNode,
    rawValue: string,
    align: 'left' | 'right' = 'left'
  ) {
    const isEditing = editing?.id === sale.id && editing?.field === field
    const alignClass = align === 'right' ? 'justify-end' : 'justify-start'

    if (isEditing) {
      return (
        <div className={`flex items-center gap-1 ${alignClass}`} onClick={e => e.stopPropagation()}>
          {field === 'platform' ? (
            <select
              value={editing.value}
              onChange={e => setEditing({ ...editing, value: e.target.value })}
              autoFocus
              className="bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-emerald-500"
            >
              {Object.entries(PLATFORMS).map(([key, { name }]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          ) : (
            <input
              type={field === 'sale_price' ? 'number' : field === 'sale_date' ? 'date' : 'text'}
              value={editing.value}
              onChange={e => setEditing({ ...editing, value: e.target.value })}
              autoFocus
              step={field === 'sale_price' ? '0.01' : undefined}
              min={field === 'sale_price' ? '0' : undefined}
              onKeyDown={e => { if (e.key === 'Enter') confirmEdit(); if (e.key === 'Escape') cancelEdit() }}
              className="bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-emerald-500 w-28"
            />
          )}
          <button onClick={confirmEdit} title="Confirm" className="text-emerald-400 hover:text-emerald-300 transition-colors shrink-0">
            <Check className="w-3.5 h-3.5" />
          </button>
          <button onClick={cancelEdit} title="Cancel" className="text-zinc-400 hover:text-zinc-200 transition-colors shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }

    return (
      <span
        onClick={() => sale.status !== 'returned' && startEdit(sale.id, field, rawValue)}
        className={`${sale.status !== 'returned' ? 'cursor-pointer hover:text-emerald-400' : ''} transition-colors`}
        title={sale.status !== 'returned' ? 'Click to edit' : undefined}
      >
        {display}
      </span>
    )
  }

  return (
    <>
      {/* Backdrop — click outside cancels edit */}
      {editing && (
        <div className="fixed inset-0 z-10" onMouseDown={cancelEdit} />
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative z-20">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 text-xs">
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
              {sales.map(s => {
                const fee = calcPlatformFee(s.sale_price, s.platform as Platform)
                const profit = calcNetProfit(s.sale_price, s.cost_of_goods, s.shipping_cost, s.platform as Platform)
                return (
                  <tr key={s.id} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {cell(s, 'item_name', <span className="text-white">{s.item_name}</span>, s.item_name)}
                        {s.status === 'returned' && (
                          <span className="text-xs bg-amber-400/10 text-amber-400 border border-amber-400/20 px-1.5 py-0.5 rounded shrink-0">Returned</span>
                        )}
                      </div>
                      <p className="text-zinc-500 text-xs mt-0.5">{s.category}</p>
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      {cell(s, 'platform', PLATFORMS[s.platform as Platform]?.name ?? s.platform, s.platform)}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 hidden sm:table-cell">
                      {cell(s, 'sale_date', s.sale_date, s.sale_date)}
                    </td>
                    <td className="px-4 py-3 text-right text-zinc-300">
                      {cell(s, 'sale_price', formatCurrency(s.sale_price), String(s.sale_price), 'right')}
                    </td>
                    <td className="px-4 py-3 text-right text-red-400/70 hidden sm:table-cell">
                      -{formatCurrency(fee)}
                    </td>
                    <td className={`px-4 py-3 text-right font-semibold ${s.status === 'returned' ? 'text-zinc-500 line-through' : profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatCurrency(s.status === 'returned' ? 0 : profit)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        {s.status !== 'returned' && (
                          <form action={markReturned.bind(null, s.id)}>
                            <button type="submit" className="text-xs text-zinc-300 hover:text-amber-400 border border-zinc-700 hover:border-amber-400/50 px-2 py-1 rounded transition-colors">
                              Return
                            </button>
                          </form>
                        )}
                        <form action={deleteSale.bind(null, s.id)}>
                          <button type="submit" className="text-xs text-zinc-300 hover:text-red-400 border border-zinc-700 hover:border-red-400/50 px-2 py-1 rounded transition-colors">
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
    </>
  )
}
