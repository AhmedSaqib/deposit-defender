'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CALC_PLATFORMS, calcPlatformFee, calcNetProfit } from '@/lib/calculator-config'

export default function ProfitCalculator({ platformSlug }: { platformSlug: string }) {
  const platform = CALC_PLATFORMS[platformSlug]
  const [salePrice, setSalePrice] = useState('')
  const [cogs, setCogs] = useState('')
  const [shipping, setShipping] = useState('')
  const [shown, setShown] = useState(false)

  const sale = parseFloat(salePrice) || 0
  const cost = parseFloat(cogs) || 0
  const ship = parseFloat(shipping) || 0

  const fee = sale > 0 ? calcPlatformFee(platform, sale) : 0
  const net = sale > 0 ? calcNetProfit(platform, sale, cost, ship) : 0
  const roi = cost > 0 ? (net / cost) * 100 : 0
  const assumed = sale - cost
  const gap = assumed - net

  function handleCalc() {
    if (sale > 0) setShown(true)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-4">
        <Field label="Sale price" value={salePrice} onChange={v => { setSalePrice(v); setShown(false) }} />
        <Field label="What you paid (cost of goods)" value={cogs} onChange={v => { setCogs(v); setShown(false) }} />
        <Field
          label="Shipping you paid to send it"
          value={shipping}
          onChange={v => { setShipping(v); setShown(false) }}
          hint={platform.shippingNote}
        />

        <p className="text-xs text-zinc-500 pt-1">
          {platform.name} fee: <span className="text-zinc-500">{platform.feeLabel}</span>
          {' · '}{platform.feeNote}
        </p>

        <button
          onClick={handleCalc}
          disabled={!salePrice || sale <= 0}
          className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-xl transition-colors"
        >
          Calculate my profit
        </button>
      </div>

      {shown && (
        <>
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-3">
            <Row label="Sale price" value={`$${sale.toFixed(2)}`} />
            <Row label={`${platform.name} fee (${platform.feeLabel})`} value={`−$${fee.toFixed(2)}`} negative />
            {ship > 0 && <Row label="Shipping" value={`−$${ship.toFixed(2)}`} negative />}
            {cost > 0 && <Row label="Cost of goods" value={`−$${cost.toFixed(2)}`} negative />}

            <div className="border-t border-zinc-200 pt-3 flex items-center justify-between">
              <span className="font-semibold text-zinc-900">Net profit</span>
              <span className={`text-2xl font-bold ${net >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                ${net.toFixed(2)}
              </span>
            </div>

            {cost > 0 && (
              <div className="flex justify-between text-sm pt-1">
                <span className="text-zinc-500">Return on investment</span>
                <span className={roi >= 0 ? 'text-emerald-600' : 'text-red-600'}>{roi.toFixed(1)}%</span>
              </div>
            )}
          </div>

          {gap > 1 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                Without accounting for fees{cost > 0 ? ' and costs' : ''}, you might have assumed{' '}
                <span className="font-semibold text-zinc-900">${assumed.toFixed(2)}</span> profit.
                Your real profit is{' '}
                <span className={`font-semibold ${net >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  ${net.toFixed(2)}
                </span>.
                {' '}That's <span className="font-semibold text-zinc-900">${gap.toFixed(2)}</span> you didn't account for.
              </p>
            </div>
          )}

          <div className="bg-white border border-zinc-200 rounded-2xl p-6 text-center">
            <p className="text-sm font-medium text-zinc-900 mb-1">Stop doing this math by hand</p>
            <p className="text-sm text-zinc-600 mb-5">
              Log every sale in 30 seconds. Dashboards, analytics across all platforms, and CSV export for tax season.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Start tracking free
            </Link>
            <p className="text-xs text-zinc-500 mt-3">Free · No card required</p>
          </div>
        </>
      )}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  hint?: string
}) {
  return (
    <div>
      <label className="text-sm text-zinc-600 mb-1.5 block">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">$</span>
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="0.00"
          className="w-full bg-white border border-zinc-300 rounded-lg pl-7 pr-4 py-2.5 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>
      {hint && <p className="text-xs text-zinc-500 mt-1">{hint}</p>}
    </div>
  )
}

function Row({ label, value, negative }: { label: string; value: string; negative?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-zinc-600">{label}</span>
      <span className={negative ? 'text-red-600' : 'text-zinc-600'}>{value}</span>
    </div>
  )
}
