'use client'

import { useState } from 'react'

export default function UpgradeButton({ small }: { small?: boolean }) {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    else setLoading(false)
  }

  if (small) {
    return (
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="text-xs bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-3 py-1 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? '...' : 'Upgrade $9.99/mo'}
      </button>
    )
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-3 rounded-xl transition-colors disabled:opacity-50 text-sm"
    >
      {loading ? 'Loading...' : 'Upgrade to Pro — $9.99/month'}
    </button>
  )
}
