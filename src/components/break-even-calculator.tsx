'use client'

import { useState } from 'react'
import Link from 'next/link'

type Platform = {
  name: string
  slug: string
  feeRate: number
  fixedFee: number
  isPoshmark?: boolean
}

const PLATFORMS: Platform[] = [
  { name: 'eBay', slug: 'ebay', feeRate: 0.1325, fixedFee: 0.30 },
  { name: 'Poshmark', slug: 'poshmark', feeRate: 0.20, fixedFee: 0, isPoshmark: true },
  { name: 'Mercari', slug: 'mercari', feeRate: 0.13, fixedFee: 0 },
  { name: 'Depop', slug: 'depop', feeRate: 0.10, fixedFee: 0 },
  { name: 'Etsy', slug: 'etsy', feeRate: 0.095, fixedFee: 0.20 },
  { name: 'Facebook Marketplace', slug: 'facebook', feeRate: 0.05, fixedFee: 0 },
  { name: 'Vinted', slug: 'vinted', feeRate: 0, fixedFee: 0 },
]

function calcBreakEven(platform: Platform, cogs: number, shipping: number, targetProfit: number): number {
  const needed = cogs + shipping + targetProfit
  if (platform.isPoshmark) {
    const flatPrice = needed + 2.95
    if (flatPrice < 15) return flatPrice
    return needed / (1 - 0.20)
  }
  if (platform.feeRate === 0) return needed + platform.fixedFee
  return (needed + platform.fixedFee) / (1 - platform.feeRate)
}

function fmt(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
}

export default function BreakEvenCalculator() {
  const [cogs, setCogs] = useState('')
  const [shipping, setShipping] = useState('')
  const [target, setTarget] = useState('')
  const [platformSlug, setPlatformSlug] = useState('ebay')

  const platform = PLATFORMS.find(p => p.slug === platformSlug)!
  const cogsVal = parseFloat(cogs) || 0
  const shippingVal = parseFloat(shipping) || 0
  const targetVal = parseFloat(target) || 0

  const breakEven = calcBreakEven(platform, cogsVal, shippingVal, 0)
  const targetPrice = calcBreakEven(platform, cogsVal, shippingVal, targetVal)
  const feeAtBreakEven = breakEven - cogsVal - shippingVal
  const hasInput = cogsVal > 0 || shippingVal > 0

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Platform</label>
          <select
            value={platformSlug}
            onChange={e => setPlatformSlug(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            {PLATFORMS.map(p => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Cost of goods (what you paid)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={cogs}
              onChange={e => setCogs(e.target.value)}
              placeholder="0.00"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-7 pr-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Shipping cost (what you pay)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={shipping}
              onChange={e => setShipping(e.target.value)}
              placeholder="0.00"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-7 pr-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
            />
          </div>
          {platform.slug === 'poshmark' && (
            <p className="text-xs text-zinc-600 mt-1">Poshmark provides a prepaid label to buyers — enter $0 unless you upgraded shipping.</p>
          )}
          {platform.slug === 'vinted' && (
            <p className="text-xs text-zinc-600 mt-1">Vinted buyer pays shipping — enter $0.</p>
          )}
        </div>

        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Target profit (optional)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">$</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={target}
              onChange={e => setTarget(e.target.value)}
              placeholder="0.00"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-7 pr-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {hasInput && (
        <div className="border-t border-zinc-800 pt-5 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-zinc-800/60 rounded-xl p-4">
              <p className="text-xs text-zinc-500 mb-1">Break-even price</p>
              <p className="text-2xl font-bold text-white">{fmt(breakEven)}</p>
              <p className="text-xs text-zinc-600 mt-1">Minimum to cover all costs</p>
            </div>
            {targetVal > 0 && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                <p className="text-xs text-zinc-400 mb-1">Price to hit {fmt(targetVal)} profit</p>
                <p className="text-2xl font-bold text-emerald-400">{fmt(targetPrice)}</p>
                <p className="text-xs text-zinc-600 mt-1">Including all costs and fees</p>
              </div>
            )}
          </div>

          <div className="bg-zinc-800/40 rounded-xl p-4 space-y-2 text-sm">
            <p className="text-xs text-zinc-500 font-medium mb-3">Cost breakdown at break-even price of {fmt(breakEven)}</p>
            <div className="flex justify-between text-zinc-400">
              <span>Cost of goods</span>
              <span>{fmt(cogsVal)}</span>
            </div>
            {shippingVal > 0 && (
              <div className="flex justify-between text-zinc-400">
                <span>Shipping cost</span>
                <span>{fmt(shippingVal)}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-400">
              <span>{platform.name} fee</span>
              <span>{fmt(feeAtBreakEven)}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-700 pt-2 text-zinc-300 font-medium">
              <span>Net profit</span>
              <span>$0.00</span>
            </div>
          </div>

          <p className="text-xs text-zinc-600">
            Price anything above {fmt(breakEven)} and you profit. Below it, you lose money.
            {' '}<Link href={`/calculators/${platform.slug === 'facebook' ? 'facebook-marketplace' : platform.slug}`} className="text-emerald-500 hover:text-emerald-400">Open full {platform.name} calculator →</Link>
          </p>
        </div>
      )}

      {!hasInput && (
        <div className="text-center py-4">
          <p className="text-sm text-zinc-600">Enter what you paid above to see your break-even price.</p>
        </div>
      )}
    </div>
  )
}
