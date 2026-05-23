'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Trash2 } from 'lucide-react'
import { formatCurrency } from '@/lib/platform-fees'

export default function HaulCalculator() {
  const [totalCost, setTotalCost] = useState('')
  const [items, setItems] = useState<string[]>(['', '', ''])

  const totalCostNum = parseFloat(totalCost) || 0
  const cogsPerItem = items.length > 0 && totalCostNum > 0 ? totalCostNum / items.length : 0

  function addItem() {
    setItems([...items, ''])
  }

  function removeItem(i: number) {
    if (items.length <= 1) return
    setItems(items.filter((_, idx) => idx !== i))
  }

  function updateItem(i: number, val: string) {
    setItems(items.map((item, idx) => idx === i ? val : item))
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Haul cost splitter</h1>
        <p className="text-zinc-500 text-sm mt-1">Split one purchase price across multiple items to get per-item COGS.</p>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Total purchase cost ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="e.g. 40.00"
            value={totalCost}
            onChange={e => setTotalCost(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-zinc-400">Items in haul ({items.length})</label>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Plus className="w-3 h-3" /> Add item
            </button>
          </div>
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  placeholder={`Item ${i + 1}`}
                  value={item}
                  onChange={e => updateItem(i, e.target.value)}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  disabled={items.length <= 1}
                  className="text-zinc-600 hover:text-red-400 transition-colors disabled:opacity-30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {cogsPerItem > 0 && (
        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-zinc-400">Cost per item</p>
            <p className="text-2xl font-bold text-emerald-400">{formatCurrency(cogsPerItem)}</p>
          </div>
          <p className="text-xs text-zinc-500 mb-4">
            {formatCurrency(totalCostNum)} ÷ {items.length} item{items.length !== 1 ? 's' : ''}
          </p>
          <div className="space-y-2 border-t border-zinc-700 pt-4">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-zinc-300">{item || `Item ${i + 1}`}</span>
                <Link
                  href={`/log?cogs=${cogsPerItem.toFixed(2)}`}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Log this →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link href="/log" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
        ← Back to log sale
      </Link>
    </main>
  )
}
