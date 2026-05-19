import { describe, it, expect } from 'vitest'
import { parseCSV } from '@/lib/csv-import'

describe('parseCSV — standard headers', () => {
  it('parses a well-formed CSV', () => {
    const csv = `item_name,sale_price,cost_of_goods,platform,sale_date\nVintage Jeans,45,12,poshmark,2026-05-01`
    const { rows, warnings } = parseCSV(csv)
    expect(rows).toHaveLength(1)
    expect(rows[0].item_name).toBe('Vintage Jeans')
    expect(rows[0].sale_price).toBe(45)
    expect(rows[0].cost_of_goods).toBe(12)
    expect(rows[0].platform).toBe('poshmark')
    expect(rows[0].sale_date).toBe('2026-05-01')
    expect(warnings).toHaveLength(0)
  })

  it('parses multiple rows', () => {
    const csv = `item_name,sale_price\nItem A,20\nItem B,35`
    const { rows } = parseCSV(csv)
    expect(rows).toHaveLength(2)
    expect(rows[0].item_name).toBe('Item A')
    expect(rows[1].item_name).toBe('Item B')
  })
})

describe('parseCSV — column alias detection', () => {
  it('maps "title" to item_name', () => {
    const csv = `title,price\nVintage Shirt,30`
    const { rows } = parseCSV(csv)
    expect(rows[0].item_name).toBe('Vintage Shirt')
    expect(rows[0].sale_price).toBe(30)
  })

  it('maps "sold price" to sale_price', () => {
    const csv = `name,sold price\nShoes,50`
    const { rows } = parseCSV(csv)
    expect(rows[0].sale_price).toBe(50)
  })

  it('maps "cost" to cost_of_goods', () => {
    const csv = `item_name,sale_price,cost\nBag,40,15`
    const { rows } = parseCSV(csv)
    expect(rows[0].cost_of_goods).toBe(15)
  })

  it('maps "postage" to shipping_cost', () => {
    const csv = `item_name,sale_price,postage\nHat,25,5`
    const { rows } = parseCSV(csv)
    expect(rows[0].shipping_cost).toBe(5)
  })

  it('maps "date" to sale_date', () => {
    const csv = `item_name,sale_price,date\nItem,10,2026-01-15`
    const { rows } = parseCSV(csv)
    expect(rows[0].sale_date).toBe('2026-01-15')
  })
})

describe('parseCSV — platform normalization', () => {
  it('normalizes "fb marketplace" to facebook', () => {
    const csv = `item_name,sale_price,platform\nItem,20,fb marketplace`
    const { rows } = parseCSV(csv)
    expect(rows[0].platform).toBe('facebook')
  })

  it('normalizes "posh" to poshmark', () => {
    const csv = `item_name,sale_price,platform\nItem,20,posh`
    const { rows } = parseCSV(csv)
    expect(rows[0].platform).toBe('poshmark')
  })

  it('normalizes "e-bay" to ebay', () => {
    const csv = `item_name,sale_price,platform\nItem,20,e-bay`
    const { rows } = parseCSV(csv)
    expect(rows[0].platform).toBe('ebay')
  })

  it('defaults unknown platform to "other"', () => {
    const csv = `item_name,sale_price,platform\nItem,20,unknown_platform`
    const { rows } = parseCSV(csv)
    expect(rows[0].platform).toBe('other')
  })
})

describe('parseCSV — warnings and skips', () => {
  it('skips rows where sale price is 0', () => {
    const csv = `item_name,sale_price\nItem A,0\nItem B,20`
    const { rows, warnings } = parseCSV(csv)
    expect(rows).toHaveLength(1)
    expect(rows[0].item_name).toBe('Item B')
    expect(warnings.some(w => w.includes('skipped'))).toBe(true)
  })

  it('warns when item_name column is missing', () => {
    const csv = `sale_price\n20`
    const { warnings } = parseCSV(csv)
    expect(warnings.some(w => w.includes('item name'))).toBe(true)
  })

  it('warns when sale_price column is missing', () => {
    const csv = `item_name\nSome Item`
    const { warnings } = parseCSV(csv)
    expect(warnings.some(w => w.includes('sale price'))).toBe(true)
  })

  it('warns and uses today when sale_date column is missing', () => {
    const csv = `item_name,sale_price\nItem,20`
    const { warnings } = parseCSV(csv)
    expect(warnings.some(w => w.includes('sale date'))).toBe(true)
  })

  it('returns empty rows and a warning for a single-line file', () => {
    const { rows, warnings } = parseCSV('item_name,sale_price')
    expect(rows).toHaveLength(0)
    expect(warnings.length).toBeGreaterThan(0)
  })

  it('returns warning for empty string input', () => {
    const { rows, warnings } = parseCSV('')
    expect(rows).toHaveLength(0)
    expect(warnings.length).toBeGreaterThan(0)
  })
})

describe('parseCSV — quoted values', () => {
  it('strips surrounding quotes from values', () => {
    const csv = `item_name,sale_price\n"Vintage Levi's 501",45`
    const { rows } = parseCSV(csv)
    expect(rows[0].item_name).toBe("Vintage Levi's 501")
    expect(rows[0].sale_price).toBe(45)
  })

  it('handles quoted item names with commas', () => {
    const csv = `item_name,sale_price\n"Shirt, vintage 1990s",30`
    const { rows } = parseCSV(csv)
    expect(rows[0].item_name).toBe('Shirt, vintage 1990s')
  })
})

describe('parseCSV — defaults', () => {
  it('defaults cost_of_goods to 0 when missing', () => {
    const csv = `item_name,sale_price\nItem,20`
    const { rows } = parseCSV(csv)
    expect(rows[0].cost_of_goods).toBe(0)
  })

  it('defaults shipping_cost to 0 when missing', () => {
    const csv = `item_name,sale_price\nItem,20`
    const { rows } = parseCSV(csv)
    expect(rows[0].shipping_cost).toBe(0)
  })

  it('defaults category to "Other" when missing', () => {
    const csv = `item_name,sale_price\nItem,20`
    const { rows } = parseCSV(csv)
    expect(rows[0].category).toBe('Other')
  })
})
