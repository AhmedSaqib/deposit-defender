'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CALC_PLATFORMS, calcPlatformFee, calcNetProfit } from '@/lib/calculator-config'

const DISPLAY_ORDER = ['vinted', 'etsy', 'ebay', 'facebook-marketplace', 'mercari', 'depop', 'poshmark']

export default function CompareCalculator() {
  const [salePrice, setSalePrice] = useState('')
  const [cogs, setCogs] = useState('')
  const [shipping, setShipping] = useState('')

  const sale = parseFloat(salePrice) || 0
  const cost = parseFloat(cogs) || 0
  const ship = parseFloat(shipping) || 0

  const hasInput = sale > 0

  const results = DISPLAY_ORDER.map(slug => {
    const platform = CALC_PLATFORMS[slug]
    const fee = calcPlatformFee(platform, sale)
    const net = calcNetProfit(platform, sale, cost, ship)
    const roi = cost > 0 ? (net / cost) * 100 : null
    return { slug, platform, fee, net, roi }
  }).sort((a, b) => b.net - a.net)

  const best = results[0]
  const worst = results[results.length - 1]
  const gap = best.net - worst.net

  return (
    <div className="space-y-4">
      <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Sale price" value={salePrice} onChange={setSalePrice} />
          <Field label="Cost of goods" value={cogs} onChange={setCogs} />
          <Field label="Shipping you paid" value={shipping} onChange={setShipping} />
        </div>
        {!hasInput && (
          <p className="text-xs text-zinc-600">Enter a sale price to compare platforms instantly</p>
        )}
      </div>

      {hasInput && (
        <>
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 gap-2 px-5 py-3 border-b border-zinc-700 text-xs text-zinc-500 font-medium">
              <span>Platform</span>
              <span className="text-right">Fee</span>
              <span className="text-right">Net profit</span>
              <span className="text-right">ROI</span>
            </div>

            {results.map(({ slug, platform, fee, net, roi }, i) => {
              const isBest = i === 0
              const isWorst = i === results.length - 1 && gap > 0.5

              return (
                <div
                  key={slug}
                  className={`grid grid-cols-4 gap-2 px-5 py-3.5 border-b border-zinc-700/50 last:border-0 ${isBest ? 'bg-emerald-500/5' : ''}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm text-zinc-300 truncate">{platform.name}</span>
                    {isBest && <span className="text-xs text-emerald-400 shrink-0">best</span>}
                    {isWorst && <span className="text-xs text-zinc-600 shrink-0">worst</span>}
                  </div>
                  <span className="text-sm text-red-400 text-right">−${fee.toFixed(2)}</span>
                  <span className={`text-sm font-medium text-right ${net >= 0 ? (isBest ? 'text-emerald-400' : 'text-zinc-300') : 'text-red-400'}`}>
                    ${net.toFixed(2)}
                  </span>
                  <span className={`text-sm text-right ${roi === null ? 'text-zinc-600' : roi >= 0 ? 'text-zinc-400' : 'text-red-400'}`}>
                    {roi === null ? '—' : `${roi.toFixed(0)}%`}
                  </span>
                </div>
              )
            })}
          </div>

          {gap > 0.5 && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <p className="text-sm text-emerald-300 leading-relaxed">
                <span className="font-semibold text-white">{best.platform.name}</span> gives you the best profit at{' '}
                <span className="font-semibold text-emerald-400">${best.net.toFixed(2)}</span> —{' '}
                <span className="font-semibold text-white">${gap.toFixed(2)} more</span> than{' '}
                {worst.platform.name} on this sale.
              </p>
            </div>
          )}

          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 text-center">
            <p className="text-sm font-medium text-white mb-1">Selling across multiple platforms?</p>
            <p className="text-sm text-zinc-400 mb-5">
              Log every sale automatically. MarginLog tracks your profit, analytics, and tax exports — free during beta.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Start tracking free
            </Link>
            <p className="text-xs text-zinc-600 mt-3">Free · No card required</p>
          </div>
        </>
      )}
    </div>
  )
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-sm text-zinc-400 mb-1.5 block">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">$</span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="0.00"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-7 pr-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>
    </div>
  )
}
