import { PLATFORMS, CATEGORIES } from '@/lib/platform-fees'

export type ImportRow = {
  item_name: string
  category: string
  platform: string
  cost_of_goods: number
  sale_price: number
  shipping_cost: number
  sale_date: string
  notes: string
}

export type ParseResult = {
  rows: ImportRow[]
  warnings: string[]
  columnMap: Record<string, string>
}

const ALIASES: Record<keyof ImportRow, string[]> = {
  // Generic + eBay ("Item Title") + Poshmark ("Listing Title")
  item_name:      ['item_name', 'item name', 'item', 'name', 'title', 'item title', 'listing title', 'product', 'description', 'listing'],
  // Generic + eBay ("Sold For") + Poshmark ("Order Price") + Etsy ("Item Subtotal")
  sale_price:     ['sale_price', 'sale price', 'price', 'sold price', 'amount', 'revenue', 'selling price', 'sold for', 'order price', 'item subtotal', 'subtotal'],
  cost_of_goods:  ['cost_of_goods', 'cost of goods', 'cogs', 'cost', 'purchase price', 'bought for', 'buy price', 'paid', 'cost price'],
  // Generic + eBay ("Shipping Paid By Buyer") + Etsy ("Shipping Cost")
  shipping_cost:  ['shipping_cost', 'shipping cost', 'shipping', 'ship cost', 'postage', 'delivery cost', 'shipping paid by buyer', 'buyer shipping', 'shipping charged'],
  platform:       ['platform', 'marketplace', 'site', 'sold on', 'channel', 'source'],
  category:       ['category', 'type', 'cat', 'item type', 'department'],
  // Generic + Poshmark ("Order Date") + Etsy ("Order Date")
  sale_date:      ['sale_date', 'sale date', 'date', 'sold date', 'sold at', 'date sold', 'order date'],
  notes:          ['notes', 'note', 'comments', 'comment', 'memo'],
}

const PLATFORM_ALIASES: Record<string, string> = {
  ebay: 'ebay', 'e-bay': 'ebay', 'e bay': 'ebay',
  poshmark: 'poshmark', posh: 'poshmark',
  mercari: 'mercari',
  depop: 'depop',
  facebook: 'facebook', 'facebook marketplace': 'facebook', 'fb marketplace': 'facebook', 'fb': 'facebook',
  vinted: 'vinted',
  etsy: 'etsy',
}

function detectColumn(header: string): keyof ImportRow | null {
  const h = header.toLowerCase().trim()
  for (const [field, aliases] of Object.entries(ALIASES)) {
    if (aliases.includes(h)) return field as keyof ImportRow
  }
  return null
}

function normalizePlatform(raw: string): string {
  const lower = raw.toLowerCase().trim()
  return PLATFORM_ALIASES[lower] ?? 'other'
}

function normalizeCategory(raw: string): string {
  const match = CATEGORIES.find(c => c.toLowerCase() === raw.toLowerCase().trim())
  return match ?? 'Other'
}

function parseDate(raw: string): string {
  if (!raw) return new Date().toISOString().split('T')[0]
  const d = new Date(raw)
  if (!isNaN(d.getTime())) return d.toISOString().split('T')[0]
  return new Date().toISOString().split('T')[0]
}

export function parseCSV(text: string): ParseResult {
  if (text.trimStart().startsWith('{\\rtf')) {
    return {
      rows: [],
      warnings: ['This file is Rich Text Format (.rtf), not a CSV. To export a real CSV: in Excel use Save As → CSV; in Numbers use File → Export To → CSV; in Google Sheets use File → Download → CSV.'],
      columnMap: {},
    }
  }

  const lines = text.trim().split(/\r?\n/)
  if (lines.length < 2) return { rows: [], warnings: ['File is empty or has no data rows.'], columnMap: {} }

  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, '').trim())
  const columnMap: Record<string, string> = {}
  const fieldIndex: Partial<Record<keyof ImportRow, number>> = {}

  headers.forEach((h, i) => {
    const field = detectColumn(h)
    if (field) {
      fieldIndex[field] = i
      columnMap[h] = field
    }
  })

  const warnings: string[] = []
  if (fieldIndex.item_name === undefined) warnings.push('Could not detect item name column.')
  if (fieldIndex.sale_price === undefined) warnings.push('Could not detect sale price column.')
  if (fieldIndex.sale_date === undefined) warnings.push('Could not detect sale date column — using today for all rows.')

  const rows: ImportRow[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const cells = line.match(/(".*?"|[^,]+|(?<=,)(?=,)|(?<=,)$|^(?=,))/g) ?? line.split(',')
    const get = (field: keyof ImportRow, fallback: string) => {
      const idx = fieldIndex[field]
      if (idx === undefined) return fallback
      return (cells[idx] ?? '').replace(/^"|"$/g, '').trim()
    }

    const salePrice = parseFloat(get('sale_price', '0')) || 0
    if (salePrice <= 0) {
      warnings.push(`Row ${i + 1}: skipped — sale price is 0 or missing.`)
      continue
    }

    rows.push({
      item_name:     get('item_name', `Imported item ${i}`),
      sale_price:    salePrice,
      cost_of_goods: parseFloat(get('cost_of_goods', '0')) || 0,
      shipping_cost: parseFloat(get('shipping_cost', '0')) || 0,
      platform:      normalizePlatform(get('platform', 'other')),
      category:      normalizeCategory(get('category', 'Other')),
      sale_date:     parseDate(get('sale_date', '')),
      notes:         get('notes', ''),
    })
  }

  return { rows, warnings, columnMap }
}

export const TEMPLATE_HEADERS = [
  'item_name', 'sale_price', 'cost_of_goods', 'shipping_cost',
  'platform', 'category', 'sale_date', 'notes',
].join(',')

export const TEMPLATE_EXAMPLE =
  '"Vintage Levi\'s 501",45.00,12.00,8.00,poshmark,Clothing & Shoes,2026-05-01,"Fast sale"'

export const PLATFORM_OPTIONS = Object.keys(PLATFORMS).join(', ')
export const CATEGORY_OPTIONS = CATEGORIES.join(', ')
