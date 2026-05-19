export const PLATFORMS = {
  ebay: { name: 'eBay', fee: 0.1325 },
  poshmark: { name: 'Poshmark', fee: 0.20 },
  mercari: { name: 'Mercari', fee: 0 },
  depop: { name: 'Depop', fee: 0 },
  facebook: { name: 'Facebook Marketplace', fee: 0.05 },
  vinted: { name: 'Vinted', fee: 0 },
  etsy: { name: 'Etsy', fee: 0.065 },
  other: { name: 'Other', fee: 0 },
} as const

export type Platform = keyof typeof PLATFORMS

export const CATEGORIES = [
  'Clothing & Shoes',
  'Electronics',
  'Collectibles',
  'Books & Media',
  'Home & Garden',
  'Toys & Games',
  'Sports',
  'Other',
] as const

export const EXPENSE_CATEGORIES = [
  'Shipping supplies',
  'Platform subscriptions',
  'Packaging & materials',
  'Storage',
  'Equipment',
  'Mileage & transport',
  'Internet & phone',
  'Other',
] as const

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number]

export function calcNetProfit(
  salePrice: number,
  cogs: number,
  shippingCost: number,
  platform: Platform
): number {
  const fee = salePrice * PLATFORMS[platform].fee
  return salePrice - cogs - shippingCost - fee
}

export function calcPlatformFee(salePrice: number, platform: Platform): number {
  return salePrice * PLATFORMS[platform].fee
}

export function calcROI(netProfit: number, cogs: number): number {
  if (cogs === 0) return 0
  return (netProfit / cogs) * 100
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
}
