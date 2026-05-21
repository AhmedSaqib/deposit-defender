import AppFooter from '@/components/app-footer'
import { redirect } from 'next/navigation'
import Nav from '@/components/nav'
import { createClient } from '@/lib/supabase/server'
import HaulCalculator from '@/components/haul-calculator'

export default async function HaulPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Nav />
      <HaulCalculator />
      <AppFooter />
    </div>
  )
}
