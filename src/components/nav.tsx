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
    <nav className="bg-zinc-800 border-b border-zinc-700 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Logo href="/dashboard" />
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Link href="/dashboard" className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white px-2 sm:px-3 py-1.5 rounded-lg hover:bg-zinc-700 transition-colors">
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link href="/log" className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white px-2 sm:px-3 py-1.5 rounded-lg hover:bg-zinc-700 transition-colors">
            <PlusCircle className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">Log sale</span>
          </Link>
          <Link href="/sales" className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white px-2 sm:px-3 py-1.5 rounded-lg hover:bg-zinc-700 transition-colors">
            <List className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">Sales</span>
          </Link>
          <Link href="/expenses" className="hidden sm:flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white px-2 sm:px-3 py-1.5 rounded-lg hover:bg-zinc-700 transition-colors">
            <Receipt className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">Expenses</span>
          </Link>
          <Link href="/trips" className="hidden sm:flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white px-2 sm:px-3 py-1.5 rounded-lg hover:bg-zinc-700 transition-colors">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline">Trips</span>
          </Link>
          <div className="hidden sm:block">
            <BillingButton
              isPro={isPro}
              cancelAtPeriodEnd={sub?.cancelAtPeriodEnd ?? false}
              currentPeriodEnd={sub?.currentPeriodEnd ?? null}
            />
          </div>
          <form action={signOut}>
            <button type="submit" className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white px-2 sm:px-3 py-1.5 rounded-lg hover:bg-zinc-700 transition-colors ml-1">
              <LogOut className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">{user?.email?.split('@')[0]}</span>
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}
