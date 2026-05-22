export type GlossaryTerm = {
  term: string
  slug: string
  shortDef: string
  definition: string
  example?: string
  related?: string[]
}

export const TERMS: GlossaryTerm[] = [
  {
    term: 'Cost of Goods Sold (COGS)',
    slug: 'cogs',
    shortDef: 'What you paid to acquire the item you sold.',
    definition:
      'Cost of Goods Sold is the total amount you spent to acquire and prepare an item for resale. This includes the purchase price, any repairs, cleaning, or direct costs needed to make the item sellable. It does not include your platform fees or shipping — those are separate costs subtracted when calculating net profit.',
    example:
      'You buy a pair of sneakers at a thrift store for $12. Your COGS is $12. If you also paid $3 to clean them before listing, your COGS would be $15.',
    related: ['net-profit', 'gross-profit', 'roi'],
  },
  {
    term: 'Net Profit',
    slug: 'net-profit',
    shortDef: 'What you actually made after every cost.',
    definition:
      'Net profit is the real money you keep after subtracting every cost from your sale: the platform fee, your cost of goods (COGS), and your shipping cost. This is the only number that actually matters — gross revenue and gross profit both overstate what you made.',
    example:
      'You sell a jacket for $45 on eBay. eBay takes $6.28 (13.25% + $0.30). You paid $8 for the jacket and $5 to ship it. Net profit = $45 − $6.28 − $8 − $5 = $25.72.',
    related: ['gross-profit', 'cogs', 'platform-fee'],
  },
  {
    term: 'Gross Profit',
    slug: 'gross-profit',
    shortDef: 'Sale price minus COGS only — before fees and shipping.',
    definition:
      'Gross profit is your sale price minus only your cost of goods. It ignores platform fees and shipping costs, so it always looks better than net profit. Gross profit is useful for understanding markup, but net profit is what you actually keep.',
    example:
      'You sell a jacket for $45 that you bought for $8. Gross profit = $37. Net profit (after eBay fees and shipping) is closer to $25.',
    related: ['net-profit', 'cogs', 'profit-margin'],
  },
  {
    term: 'Platform Fee',
    slug: 'platform-fee',
    shortDef: 'The cut a marketplace takes from each sale.',
    definition:
      'A platform fee (also called a selling fee or commission) is the percentage or flat amount a resale marketplace charges for each completed sale. Fees vary significantly across platforms: Poshmark charges 20%, eBay charges ~13.25% + $0.30, and Vinted charges sellers nothing. Platform fees are deducted from your payout automatically — you never write a check.',
    example:
      'You sell a $50 item on Poshmark. Poshmark\'s platform fee is 20% = $10. Your payout is $40 — before subtracting your COGS and any shipping you paid.',
    related: ['final-value-fee', 'net-profit', 'listing-fee'],
  },
  {
    term: 'Final Value Fee',
    slug: 'final-value-fee',
    shortDef: 'eBay\'s name for its selling fee — charged when an item sells.',
    definition:
      'The Final Value Fee is eBay\'s term for its selling fee. It is charged when your item sells, not when you list it. The standard rate is 13.25% of the total sale amount (including any buyer-paid shipping) plus $0.30 per order. Some categories like books and DVDs have higher rates. eBay offers 250 free listings per month before charging insertion fees.',
    example:
      'Your $60 jacket sells on eBay with $8 buyer-paid shipping. eBay calculates the fee on $68 total: 13.25% × $68 + $0.30 = $9.31 in fees.',
    related: ['platform-fee', 'listing-fee', 'net-profit'],
  },
  {
    term: 'ROI (Return on Investment)',
    slug: 'roi',
    shortDef: 'Net profit as a percentage of what you invested.',
    definition:
      'ROI measures how efficiently your money is working. It compares your net profit to what you originally invested (your COGS). Formula: (net profit ÷ COGS) × 100. A high ROI means you turned a small investment into a large return. ROI is especially useful for comparing deals — a $5 profit on a $5 item (100% ROI) is often better than a $15 profit on a $60 item (25% ROI).',
    example:
      'You buy a game for $4 and sell it for $22. After $3 in fees and $4 shipping, net profit = $11. ROI = ($11 ÷ $4) × 100 = 275%.',
    related: ['net-profit', 'cogs', 'profit-margin'],
  },
  {
    term: 'Profit Margin',
    slug: 'profit-margin',
    shortDef: 'Net profit as a percentage of your sale price.',
    definition:
      'Profit margin expresses how much of each dollar of revenue you actually keep. Formula: (net profit ÷ sale price) × 100. Unlike ROI (which compares profit to your investment), margin compares profit to revenue. Margin is most useful for understanding whether your pricing is sustainable across a high volume of sales.',
    example:
      'You sell an item for $50 and net $15 after all costs. Profit margin = ($15 ÷ $50) × 100 = 30%.',
    related: ['net-profit', 'roi', 'gross-profit'],
  },
  {
    term: 'Break-Even Price',
    slug: 'break-even',
    shortDef: 'The minimum sale price where you make $0 profit.',
    definition:
      'The break-even price is the lowest sale price at which you cover all your costs — COGS, platform fees, and shipping — without making or losing money. Anything above break-even is profit. Knowing your break-even price before you list prevents you from pricing too low and losing money on a sale. The formula varies by platform because of different fee structures.',
    example:
      'You buy a book for $3 and plan to sell on eBay. Shipping costs $5. eBay\'s fee formula gives a break-even of around $9.75 — price below that and you lose money.',
    related: ['net-profit', 'platform-fee', 'cogs'],
  },
  {
    term: 'Haul',
    slug: 'haul',
    shortDef: 'A batch of items bought together at once.',
    definition:
      'A haul is a collection of items purchased in a single trip or transaction — from a thrift store, estate sale, garage sale, or wholesale lot. The total cost of the haul is divided across individual items (usually proportionally or equally) to determine per-item COGS. Tracking hauls properly is important for accurate profit calculation on each item.',
    example:
      'You spend $60 at an estate sale and buy 10 items. Your average COGS per item is $6. If one item sells for $40 and another for $8, you track each with $6 COGS.',
    related: ['cogs', 'sourcing', 'liquidation'],
  },
  {
    term: 'Flip',
    slug: 'flip',
    shortDef: 'Buying an item and reselling it for more than you paid.',
    definition:
      'Flipping is the act of buying something at one price and selling it for a higher price, pocketing the difference as profit. Reselling is the broader activity; flipping emphasizes the buy-low, sell-high dynamic. The term is commonly used for physical goods (clothes, electronics, collectibles) but also applies to real estate and other assets.',
    example:
      'You find a vintage camera at a thrift store for $15, clean it up, and sell it on eBay for $120. That\'s a flip.',
    related: ['sourcing', 'haul', 'roi'],
  },
  {
    term: 'Sourcing',
    slug: 'sourcing',
    shortDef: 'The process of finding and buying items to resell.',
    definition:
      'Sourcing is how resellers find inventory. Common sourcing channels include thrift stores, estate sales, garage sales, retail clearance, liquidation pallets, online arbitrage (buying from one online marketplace to sell on another), and wholesale. Your sourcing cost directly determines your COGS — and your ability to find good items cheaply is the single biggest driver of reselling profit.',
    example:
      'A reseller\'s sourcing routine: Goodwill on Tuesday (discount day), Facebook Marketplace pickups on weekends, and checking liquidation sites monthly for electronics pallets.',
    related: ['haul', 'cogs', 'flip'],
  },
  {
    term: 'Liquidation',
    slug: 'liquidation',
    shortDef: 'Selling inventory quickly, often at a discount, to turn it into cash.',
    definition:
      'In reselling, liquidation has two meanings. First, you can buy liquidation inventory — returned, overstock, or excess retail goods sold by stores or warehouses in bulk at steep discounts. Second, you can liquidate your own inventory — selling items quickly at reduced prices when you need cash or want to clear storage. Liquidation pallets are a popular sourcing channel but carry risk since contents can be unknown quality.',
    example:
      'A reseller buys a 50-pound liquidation pallet from Amazon returns for $120. After sorting, 15 items are sellable and 10 are defective. They price each sellable item to recoup the full $120 across the batch.',
    related: ['sourcing', 'haul', 'cogs'],
  },
  {
    term: 'Listing Fee',
    slug: 'listing-fee',
    shortDef: 'A fee charged to post an item for sale on a platform.',
    definition:
      'A listing fee is charged simply for putting an item up for sale, regardless of whether it sells. Not all platforms charge listing fees — Poshmark, Mercari, Depop, and Vinted list for free. eBay gives 250 free listings per month, then charges per additional listing. Etsy charges $0.20 per listing, which renews each time an item sells. Listing fees are a cost even when items don\'t sell.',
    example:
      'You list 300 items on eBay in a month. The first 250 are free; you pay a small insertion fee for the remaining 50.',
    related: ['platform-fee', 'final-value-fee'],
  },
  {
    term: 'Payment Processing Fee',
    slug: 'payment-processing-fee',
    shortDef: 'The fee to move money from buyer to seller through a payment system.',
    definition:
      'Payment processing fees are charged by the payment system handling the transaction. Typically 2.5–3% of the sale amount. Some platforms bundle this into their advertised selling fee (Poshmark, eBay after Managed Payments); others charge it on top of their selling fee (Mercari charges ~10% selling + ~3% processing separately; Etsy charges 6.5% transaction + ~3% payment processing). Always check whether the platform fee you see includes payment processing or not.',
    example:
      'Mercari\'s published fee is 10%, but with payment processing included the effective total is about 13%. The break-even price on a Mercari listing should account for the full 13%.',
    related: ['platform-fee', 'final-value-fee', 'net-profit'],
  },
]

export function getTerm(slug: string): GlossaryTerm | undefined {
  return TERMS.find(t => t.slug === slug)
}

export function getRelatedTerms(slugs: string[]): GlossaryTerm[] {
  return slugs.map(s => TERMS.find(t => t.slug === s)).filter(Boolean) as GlossaryTerm[]
}
