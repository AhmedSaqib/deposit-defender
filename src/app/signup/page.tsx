'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Logo from '@/components/logo'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    createClient().auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/dashboard')
    })
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-emerald-700 text-xl">✓</span>
          </div>
          <h2 className="text-zinc-900 font-semibold text-lg mb-2">Check your email</h2>
          <p className="text-zinc-600 text-sm">We sent a confirmation link to <strong className="text-zinc-900">{email}</strong>. Click it to activate your account.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Logo light />
          </div>
          <p className="text-zinc-600 text-sm">Create your free account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-4">
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}
          <div>
            <label className="block text-sm text-zinc-600 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1.5">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white border border-zinc-300 rounded-lg px-3 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold py-2.5 rounded-lg transition-colors text-sm"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-zinc-500 text-sm mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-600 hover:text-emerald-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
