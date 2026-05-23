import AppFooter from '@/components/app-footer'
import { redirect } from 'next/navigation'
import Nav from '@/components/nav'
import { createClient } from '@/lib/supabase/server'
import BundleForm from '@/components/bundle-form'

export default async function BundlePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Nav />
      <BundleForm />
      <AppFooter />
    </div>
  )
}
