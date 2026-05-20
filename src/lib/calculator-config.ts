export type CalcPlatform = {
  name: string
  slug: string
  feeRate: number
  fixedFee: number
  feeLabel: string
  feeNote: string
  poshmarkThreshold?: boolean
  shippingNote?: string
}

export const CALC_PLATFORMS: Record<string, CalcPlatform> = {
  ebay: {
    name: 'eBay',
    slug: 'ebay',
    feeRate: 0.1325,
    fixedFee: 0.30,
    feeLabel: '13.25% + $0.30',
    feeNote: 'Standard final value fee for most categories',
  },
  poshmark: {
    name: 'Poshmark',
    slug: 'poshmark',
    feeRate: 0.20,
    fixedFee: 0,
    feeLabel: '20% (or $2.95 flat under $15)',
    feeNote: '20% for sales $15+. Flat $2.95 for sales under $15.',
    poshmarkThreshold: true,
    shippingNote: 'Poshmark provides a prepaid label — enter $0 if buyer paid shipping.',
  },
  mercari: {
    name: 'Mercari',
    slug: 'mercari',
    feeRate: 0.13,
    fixedFee: 0,
    feeLabel: '~13% (10% selling + 3% payment)',
    feeNote: '10% selling fee plus ~3% payment processing fee',
  },
  depop: {
    name: 'Depop',
    slug: 'depop',
    feeRate: 0.10,
    fixedFee: 0,
    feeLabel: '~10%',
    feeNote: 'Approximately 10% total — varies by payment method and region',
  },
  etsy: {
    name: 'Etsy',
    slug: 'etsy',
    feeRate: 0.095,
    fixedFee: 0.20,
    feeLabel: '~9.5% + $0.20',
    feeNote: '6.5% transaction + ~3% payment processing + $0.20 listing fee',
  },
  facebook: {
    name: 'Facebook Marketplace',
    slug: 'facebook-marketplace',
    feeRate: 0.05,
    fixedFee: 0,
    feeLabel: '5%',
    feeNote: '5% for shipped items. Local cash pickup: no fee.',
  },
  vinted: {
    name: 'Vinted',
    slug: 'vinted',
    feeRate: 0,
    fixedFee: 0,
    feeLabel: '0% — sellers pay nothing',
    feeNote: 'Vinted charges buyers a protection fee. Sellers keep the full sale price.',
    shippingNote: 'Vinted provides shipping labels — enter $0 unless you arranged your own shipping.',
  },
}

export const CALC_PLATFORM_SLUGS = Object.keys(CALC_PLATFORMS)

export function calcPlatformFee(platform: CalcPlatform, salePrice: number): number {
  if (platform.poshmarkThreshold && salePrice < 15) return 2.95
  return salePrice * platform.feeRate + platform.fixedFee
}

export function calcNetProfit(
  platform: CalcPlatform,
  salePrice: number,
  cogs: number,
  shipping: number,
): number {
  return salePrice - cogs - shipping - calcPlatformFee(platform, salePrice)
}
