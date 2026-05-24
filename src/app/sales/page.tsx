import AppFooter from '@/components/app-footer'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { PlusCircle, FileInput } from 'lucide-react'
import Nav from '@/components/nav'
import { createClient } from '@/lib/supabase/server'
import SalesTable, { type Sale } from '@/components/sales-table'

export default async function SalesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: sales = [] } = await supabase
    .from('sales')
    .select('*')
    .order('sale_date', { ascending: false })

  const allSales = (sales ?? []) as Sale[]

  const csvUrl = '/api/export'

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Nav />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Sales history</h1>
          <div className="flex gap-2">
            <a
              href={csvUrl}
              className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-colors"
            >
              Export CSV
            </a>
            <Link href="/import" className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-4 py-2 rounded-lg transition-colors">
              <FileInput className="w-4 h-4" /> Import
            </Link>
            <Link href="/log" className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
              <PlusCircle className="w-4 h-4" /> Log sale
            </Link>
          </div>
        </div>

        {allSales.length === 0 ? (
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-12 text-center">
            <p className="text-zinc-400 text-sm mb-4">No sales logged yet.</p>
            <Link href="/log" className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
              Log your first sale
            </Link>
          </div>
        ) : (
          <SalesTable initialSales={allSales} />
        )}
      </main>
      <AppFooter />
    </div>
  )
}
