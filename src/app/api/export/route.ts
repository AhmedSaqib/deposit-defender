import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { calcNetProfit, calcPlatformFee, PLATFORMS, type Platform } from '@/lib/platform-fees'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new NextResponse('Unauthorized', { status: 401 })

  const { data: sales = [] } = await supabase
    .from('sales')
    .select('*')
    .order('sale_date', { ascending: false })

  const rows = [
    ['Date', 'Item', 'Category', 'Platform', 'Sale Price', 'Cost of Goods', 'Shipping', 'Platform Fee', 'Net Profit'],
    ...(sales ?? []).map(s => {
      const fee = calcPlatformFee(s.sale_price, s.platform as Platform)
      const profit = calcNetProfit(s.sale_price, s.cost_of_goods, s.shipping_cost, s.platform as Platform)
      return [
        s.sale_date,
        s.item_name,
        s.category,
        PLATFORMS[s.platform as Platform]?.name ?? s.platform,
        s.sale_price.toFixed(2),
        s.cost_of_goods.toFixed(2),
        s.shipping_cost.toFixed(2),
        fee.toFixed(2),
        profit.toFixed(2),
      ]
    }),
  ]

  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="marginlog-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
