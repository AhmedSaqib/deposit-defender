'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Trash2 } from 'lucide-react'
import { importSales } from '@/lib/actions'
import { PLATFORMS, CATEGORIES, formatCurrency } from '@/lib/platform-fees'

type BundleItem = { name: string; cost: string }

export default function BundleForm() {
  const [bundlePrice, setBundlePrice] = useState('')
  const [platform, setPlatform] = useState('poshmark')
  const [category, setCategory] = useState('Clothing & Shoes')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [shipping, setShipping] = useState('0')
  const [allocation, setAllocation] = useState<'proportional' | 'equal'>('proportional')
  const [items, setItems] = useState<BundleItem[]>([{ name: '', cost: '' }, { name: '', cost: '' }])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const bundlePriceNum = parseFloat(bundlePrice) || 0
  const shippingNum = parseFloat(shipping) || 0
  const totalCogs = items.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0)

  function getAllocatedPrice(item: BundleItem): number {
    if (allocation === 'equal') return bundlePriceNum / items.length
    const cost = parseFloat(item.cost) || 0
    if (totalCogs === 0) return bundlePriceNum / items.length
    return bundlePriceNum * (cost / totalCogs)
  }

  function addItem() {
    setItems([...items, { name: '', cost: '' }])
  }

  function removeItem(i: number) {
    if (items.length <= 2) return
    setItems(items.filter((_, idx) => idx !== i))
  }

  function updateItem(i: number, field: keyof BundleItem, value: string) {
    setItems(items.map((item, idx) => idx === i ? { ...item, [field]: value } : item))
  }

  async function handleSubmit() {
    if (!bundlePriceNum || items.some(i => !i.name.trim())) {
      setError('Enter a bundle price and all item names.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await importSales(items.map(item => ({
        item_name: item.name,
        category,
        platform,
        cost_of_goods: parseFloat(item.cost) || 0,
        sale_price: parseFloat(getAllocatedPrice(item).toFixed(2)),
        shipping_cost: parseFloat((shippingNum / items.length).toFixed(2)),
        sale_date: date,
        notes: `Bundle of ${items.length} items`,
      })))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save bundle.')
      setLoading(false)
    }
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Bundle sale</h1>
        <p className="text-zinc-500 text-sm mt-1">Log one bundle sale split across multiple items with allocated revenue per item.</p>
      </div>

      {error && (
        <div className="text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Bundle sale price ($)</label>
            <input
              type="number" step="0.01" min="0" placeholder="0.00"
              value={bundlePrice}
              onChange={e => setBundlePrice(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Shipping cost ($)</label>
            <input
              type="number" step="0.01" min="0" placeholder="0.00"
              value={shipping}
              onChange={e => setShipping(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Platform</label>
            <select
              value={platform}
              onChange={e => setPlatform(e.target.value)}
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
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1.5">Sale date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">Revenue allocation</label>
          <div className="flex gap-2">
            {(['proportional', 'equal'] as const).map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setAllocation(opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  allocation === opt
                    ? 'bg-emerald-500 text-black'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {opt === 'proportional' ? 'Proportional to cost' : 'Split equally'}
              </button>
            ))}
          </div>
          <p className="text-xs text-zinc-600 mt-1.5">
            {allocation === 'proportional'
              ? "Revenue is split based on each item's share of total COGS."
              : 'Revenue is split equally regardless of individual costs.'}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-zinc-400">Items in bundle</label>
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
                  placeholder={`Item ${i + 1} name`}
                  value={item.name}
                  onChange={e => updateItem(i, 'name', e.target.value)}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <input
                  type="number" step="0.01" min="0" placeholder="COGS $"
                  value={item.cost}
                  onChange={e => updateItem(i, 'cost', e.target.value)}
                  className="w-24 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  disabled={items.length <= 2}
                  className="text-zinc-600 hover:text-red-400 transition-colors disabled:opacity-30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {bundlePriceNum > 0 && (
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
            <p className="text-xs text-zinc-500 mb-2">Allocated revenue per item</p>
            <div className="space-y-1.5">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-zinc-400">{item.name || `Item ${i + 1}`}</span>
                  <span className="text-white font-medium">{formatCurrency(getAllocatedPrice(item))}</span>
                </div>
              ))}
              <div className="flex justify-between text-xs pt-2 border-t border-zinc-700 mt-2">
                <span className="text-zinc-500">Total COGS</span>
                <span className="text-zinc-400">{formatCurrency(totalCogs)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
        >
          {loading ? 'Saving...' : `Save ${items.length}-item bundle`}
        </button>
        <Link href="/sales" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
          Cancel
        </Link>
      </div>
    </main>
  )
}
