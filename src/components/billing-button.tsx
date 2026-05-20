'use client'

import { useState } from 'react'
import { Zap } from 'lucide-react'

type Props = {
  isPro: boolean
  cancelAtPeriodEnd?: boolean
  currentPeriodEnd?: string | null
}

export default function BillingButton({ isPro, cancelAtPeriodEnd, currentPeriodEnd }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    const endpoint = isPro ? '/api/stripe/portal' : '/api/stripe/checkout'
    const res = await fetch(endpoint, { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    else setLoading(false)
  }

  if (isPro) {
    const endDate = currentPeriodEnd
      ? new Date(currentPeriodEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : null

    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-1.5 text-sm text-emerald-400 px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
        title={cancelAtPeriodEnd && endDate ? `Access ends ${endDate}` : 'Manage billing'}
      >
        <Zap className="w-4 h-4" />
        {loading ? '...' : cancelAtPeriodEnd && endDate ? `Pro · ends ${endDate}` : 'Pro'}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-1.5 text-sm bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
    >
      <Zap className="w-4 h-4" />
      {loading ? '...' : 'Upgrade'}
    </button>
  )
}
