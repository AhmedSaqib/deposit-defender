import { createClient } from '@/lib/supabase/server'

export const FREE_LIMIT = 20

export type SubscriptionInfo = {
  status: 'active' | 'free'
  cancelAtPeriodEnd: boolean
  currentPeriodEnd: string | null
}

export async function getSubscriptionInfo(userId: string): Promise<SubscriptionInfo> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('subscriptions')
    .select('status, current_period_end, cancel_at_period_end')
    .eq('user_id', userId)
    .single()

  return {
    status: data?.status === 'active' ? 'active' : 'free',
    cancelAtPeriodEnd: data?.cancel_at_period_end ?? false,
    currentPeriodEnd: data?.current_period_end ?? null,
  }
}

export async function getSubscriptionStatus(userId: string) {
  const { status } = await getSubscriptionInfo(userId)
  return status
}

export async function getMonthlyCount(userId: string) {
  const supabase = await createClient()
  const start = new Date()
  start.setDate(1)
  start.setHours(0, 0, 0, 0)

  const { count } = await supabase
    .from('sales')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', start.toISOString())

  return count ?? 0
}

export async function canLogSale(userId: string) {
  const status = await getSubscriptionStatus(userId)
  if (status === 'active') return true
  const count = await getMonthlyCount(userId)
  return count < FREE_LIMIT
}
