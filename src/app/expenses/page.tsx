import AppFooter from '@/components/app-footer'
import { redirect } from 'next/navigation'
import Nav from '@/components/nav'
import { createClient } from '@/lib/supabase/server'
import { logExpense, deleteExpense } from '@/lib/actions'
import { EXPENSE_CATEGORIES, formatCurrency } from '@/lib/platform-fees'

type Expense = {
  id: string
  description: string
  amount: number
  category: string
  expense_date: string
  notes: string | null
}

export default async function ExpensesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: expenses = [] } = await supabase
    .from('expenses')
    .select('*')
    .order('expense_date', { ascending: false })

  const all = (expenses ?? []) as Expense[]

  const now = new Date()
  const thisYear = now.getFullYear().toString()
  const thisMonth = now.toISOString().slice(0, 7)

  const yearTotal = all.filter(e => e.expense_date.startsWith(thisYear)).reduce((s, e) => s + e.amount, 0)
  const monthTotal = all.filter(e => e.expense_date.startsWith(thisMonth)).reduce((s, e) => s + e.amount, 0)

  const byCategory = EXPENSE_CATEGORIES.map(cat => ({
    cat,
    total: all.filter(e => e.expense_date.startsWith(thisYear) && e.category === cat).reduce((s, e) => s + e.amount, 0),
  })).filter(({ total }) => total > 0).sort((a, b) => b.total - a.total)

  const today = now.toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Nav />
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-semibold">Business expenses</h1>
          <p className="text-zinc-500 text-sm mt-1">Track deductible costs for tax season. Figures are for reference — consult a tax professional.</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-500 text-xs mb-1">This month</p>
            <p className="text-white font-bold text-xl">{formatCurrency(monthTotal)}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-500 text-xs mb-1">{thisYear} total</p>
            <p className="text-white font-bold text-xl">{formatCurrency(yearTotal)}</p>
          </div>
        </div>

        {/* Category breakdown */}
        {byCategory.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h2 className="text-sm font-medium text-zinc-400 mb-3">{thisYear} by category</h2>
            <div className="space-y-2">
              {byCategory.map(({ cat, total }) => (
                <div key={cat} className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">{cat}</span>
                  <span className="text-zinc-300 font-medium">{formatCurrency(total)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add expense form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Log an expense</h2>
          <form action={logExpense} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Description</label>
              <input
                name="description"
                required
                placeholder="e.g. Poly mailers 6x9 (100-pack)"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Amount ($)</label>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  placeholder="0.00"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Date</label>
                <input
                  name="expense_date"
                  type="date"
                  required
                  defaultValue={today}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Category</label>
              <select
                name="category"
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              >
                {EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Notes <span className="text-zinc-600">(optional)</span></label>
              <input
                name="notes"
                placeholder="optional"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
            >
              Add expense
            </button>
          </form>
        </div>

        {/* Expense list */}
        {all.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-xs">
                    <th className="text-left px-4 py-3 font-medium">Description</th>
                    <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Category</th>
                    <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Date</th>
                    <th className="text-right px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {all.map(e => (
                    <tr key={e.id} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-white">{e.description}</p>
                        {e.notes && <p className="text-zinc-500 text-xs">{e.notes}</p>}
                      </td>
                      <td className="px-4 py-3 text-zinc-400 hidden sm:table-cell">{e.category}</td>
                      <td className="px-4 py-3 text-zinc-400 hidden sm:table-cell">{e.expense_date}</td>
                      <td className="px-4 py-3 text-right text-rose-400 font-medium">-{formatCurrency(e.amount)}</td>
                      <td className="px-4 py-3">
                        <form action={async () => {
                          'use server'
                          await deleteExpense(e.id)
                        }}>
                          <button type="submit" className="text-zinc-600 hover:text-red-400 transition-colors text-xs">Delete</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {all.length === 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <p className="text-zinc-500 text-sm">No expenses logged yet.</p>
          </div>
        )}
      </main>
      <AppFooter />
    </div>
  )
}
