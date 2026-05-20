import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createAdminClient()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.user_id
    if (!userId) return NextResponse.json({ ok: true })

    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    const raw = subscription as any
    const periodEnd = raw.current_period_end ?? raw.items?.data?.[0]?.current_period_end
    await supabase.from('subscriptions').upsert({
      user_id: userId,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      cancel_at_period_end: raw.cancel_at_period_end ?? false,
      current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      updated_at: new Date().toISOString(),
    })
  }

  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const raw = subscription as any
    const periodEnd = raw.current_period_end ?? raw.items?.data?.[0]?.current_period_end
    await supabase
      .from('subscriptions')
      .update({
        status: subscription.status,
        cancel_at_period_end: raw.cancel_at_period_end ?? false,
        current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscription.id)
  }

  return NextResponse.json({ ok: true })
}
