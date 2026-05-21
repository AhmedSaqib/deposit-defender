'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PLATFORMS, EXPENSE_CATEGORIES, type Platform, type ExpenseCategory } from '@/lib/platform-fees'
import { canLogSale } from '@/lib/subscription'
import { z } from 'zod'

const SaleSchema = z.object({
  item_name: z.string().min(1),
  category: z.string().min(1),
  platform: z.enum(Object.keys(PLATFORMS) as [Platform, ...Platform[]]),
  cost_of_goods: z.coerce.number().min(0),
  sale_price: z.coerce.number().min(0.01),
  shipping_cost: z.coerce.number().min(0),
  sale_date: z.string().min(1),
  notes: z.string().optional(),
})

export async function logSale(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const allowed = await canLogSale(user.id)
  if (!allowed) redirect('/log?limit=1')

  const parsed = SaleSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) throw new Error('Invalid form data')

  const tripId = (formData.get('sourcing_trip_id') as string)?.trim() || null

  const { error } = await supabase.from('sales').insert({
    ...parsed.data,
    user_id: user.id,
    status: 'sold',
    ...(tripId ? { sourcing_trip_id: tripId } : {}),
  })

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
  revalidatePath('/sales')
  revalidatePath('/trips')
  redirect('/sales')
}

export async function deleteSale(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase
    .from('sales')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
  revalidatePath('/sales')
}

export async function importSales(rows: {
  item_name: string
  category: string
  platform: string
  cost_of_goods: number
  sale_price: number
  shipping_cost: number
  sale_date: string
  notes: string
}[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase.from('sales').insert(
    rows.map(row => ({ ...row, user_id: user.id, status: 'sold' }))
  )
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
  revalidatePath('/sales')
  redirect('/sales')
}

export async function markReturned(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase
    .from('sales')
    .update({ status: 'returned' })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)

  revalidatePath('/dashboard')
  revalidatePath('/sales')
}

// ── Expenses ──────────────────────────────────────────────────────────────────

const ExpenseSchema = z.object({
  description: z.string().min(1),
  amount: z.coerce.number().min(0.01),
  category: z.enum(EXPENSE_CATEGORIES as unknown as [ExpenseCategory, ...ExpenseCategory[]]),
  expense_date: z.string().min(1),
  notes: z.string().optional(),
})

export async function logExpense(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const parsed = ExpenseSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) throw new Error('Invalid expense data')

  const { error } = await supabase.from('expenses').insert({ ...parsed.data, user_id: user.id })
  if (error) throw new Error(error.message)

  revalidatePath('/expenses')
}

export async function deleteExpense(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase.from('expenses').delete().eq('id', id).eq('user_id', user.id)
  if (error) throw new Error(error.message)

  revalidatePath('/expenses')
}

// ── Sourcing trips ────────────────────────────────────────────────────────────

const TripSchema = z.object({
  name: z.string().min(1),
  trip_date: z.string().min(1),
  total_spent: z.coerce.number().min(0),
  notes: z.string().optional(),
})

export async function createTrip(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const parsed = TripSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) throw new Error('Invalid trip data')

  const { error } = await supabase.from('sourcing_trips').insert({ ...parsed.data, user_id: user.id })
  if (error) throw new Error(error.message)

  revalidatePath('/trips')
}

export async function deleteTrip(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase.from('sourcing_trips').delete().eq('id', id).eq('user_id', user.id)
  if (error) throw new Error(error.message)

  revalidatePath('/trips')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
