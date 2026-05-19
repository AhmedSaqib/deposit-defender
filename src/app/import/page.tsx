import { redirect } from 'next/navigation'
import Nav from '@/components/nav'
import { createClient } from '@/lib/supabase/server'
import ImportForm from '@/components/import-form'

export default async function ImportPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Nav />
      <ImportForm />
    </div>
  )
}
