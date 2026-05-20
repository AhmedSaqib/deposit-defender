import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/lib/actions'
import { BarChart3, PlusCircle, List, LogOut, Receipt, MapPin } from 'lucide-react'
import Logo from '@/components/logo'
import BillingButton from '@/components/billing-button'
import { getSubscriptionInfo } from '@/lib/subscription'

export default async function Nav() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const sub = user ? await getSubscriptionInfo(user.id) : null
  const isPro = sub?.status === 'active'

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Logo href="/dashboard" />
        <div className="flex items-center gap-1">
          <Link href="/dashboard" className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
            <BarChart3 className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/log" className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
            <PlusCircle className="w-4 h-4" /> Log sale
          </Link>
          <Link href="/sales" className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
            <List className="w-4 h-4" /> Sales
          </Link>
          <Link href="/expenses" className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
            <Receipt className="w-4 h-4" /> Expenses
          </Link>
          <Link href="/trips" className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
            <MapPin className="w-4 h-4" /> Trips
          </Link>
          <BillingButton
            isPro={isPro}
            cancelAtPeriodEnd={sub?.cancelAtPeriodEnd ?? false}
            currentPeriodEnd={sub?.currentPeriodEnd ?? null}
          />
          <form action={signOut}>
            <button type="submit" className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors ml-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{user?.email?.split('@')[0]}</span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}
