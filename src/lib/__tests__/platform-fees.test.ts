import { describe, it, expect } from 'vitest'
import { calcNetProfit, calcPlatformFee, formatCurrency } from '@/lib/platform-fees'

describe('calcPlatformFee', () => {
  it('calculates eBay fee at 13.25%', () => {
    expect(calcPlatformFee(100, 'ebay')).toBeCloseTo(13.25)
  })
  it('calculates Poshmark fee at 20%', () => {
    expect(calcPlatformFee(50, 'poshmark')).toBe(10)
  })
  it('calculates Facebook Marketplace fee at 5%', () => {
    expect(calcPlatformFee(200, 'facebook')).toBe(10)
  })
  it('calculates Etsy fee at 6.5%', () => {
    expect(calcPlatformFee(100, 'etsy')).toBeCloseTo(6.5)
  })
  it('returns 0 for Mercari (fee eliminated)', () => {
    expect(calcPlatformFee(100, 'mercari')).toBe(0)
  })
  it('returns 0 for Depop (fee eliminated)', () => {
    expect(calcPlatformFee(100, 'depop')).toBe(0)
  })
  it('returns 0 for Vinted', () => {
    expect(calcPlatformFee(100, 'vinted')).toBe(0)
  })
  it('returns 0 for Other', () => {
    expect(calcPlatformFee(100, 'other')).toBe(0)
  })
  it('handles zero sale price', () => {
    expect(calcPlatformFee(0, 'ebay')).toBe(0)
  })
})

describe('calcNetProfit', () => {
  it('deducts COGS, shipping, and platform fee correctly', () => {
    // 100 - 30 (cogs) - 10 (shipping) - 13.25 (ebay fee) = 46.75
    expect(calcNetProfit(100, 30, 10, 'ebay')).toBeCloseTo(46.75)
  })
  it('handles zero COGS and shipping on Poshmark', () => {
    // 50 - 0 - 0 - 10 (20% fee) = 40
    expect(calcNetProfit(50, 0, 0, 'poshmark')).toBe(40)
  })
  it('handles zero-fee platforms', () => {
    // 100 - 40 - 5 - 0 = 55
    expect(calcNetProfit(100, 40, 5, 'mercari')).toBe(55)
  })
  it('returns negative profit when costs exceed revenue', () => {
    expect(calcNetProfit(10, 50, 5, 'ebay')).toBeLessThan(0)
  })
  it('returns zero when sale exactly covers all costs', () => {
    // mercari: 0 fee. cogs=80, shipping=20, sale=100 → profit=0
    expect(calcNetProfit(100, 80, 20, 'mercari')).toBe(0)
  })
})

describe('formatCurrency', () => {
  it('formats a positive integer', () => {
    expect(formatCurrency(100)).toBe('$100.00')
  })
  it('formats a decimal value', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50')
  })
  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })
  it('formats a negative value', () => {
    expect(formatCurrency(-50)).toBe('-$50.00')
  })
  it('formats a large number with comma separator', () => {
    expect(formatCurrency(10000)).toBe('$10,000.00')
  })
})
