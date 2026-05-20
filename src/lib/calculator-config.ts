export type FAQ = { q: string; a: string }

export type CalcPlatform = {
  name: string
  slug: string
  feeRate: number
  fixedFee: number
  feeLabel: string
  feeNote: string
  heroHeadline: string
  heroSubtext: string
  feeExplainer: string
  signupHook: string
  faqs: FAQ[]
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
    heroHeadline: 'How much did that eBay sale actually make you?',
    heroSubtext: 'eBay takes 13.25% plus $0.30 on most sales. Add shipping and what you paid for the item — and that $60 sale might have made you $18. Find out exactly.',
    feeExplainer: 'eBay charges a final value fee of 13.25% on most categories (clothing, electronics, collectibles, home goods) plus a $0.30 per-order fee. Some categories like books and DVDs are higher at 14.95%. The fee applies to the total sale amount including any shipping charged to the buyer. If you offer free shipping, eBay still calculates the fee on the item price.',
    signupHook: 'Selling on eBay regularly? Log every sale automatically — dashboards, analytics, and CSV export for tax season.',
    faqs: [
      {
        q: 'How much does eBay take from a sale?',
        a: 'eBay charges a final value fee of 13.25% on most categories plus $0.30 per order. For a $50 sale, that\'s $6.93 in fees before shipping and your cost of goods.',
      },
      {
        q: 'Does eBay charge fees on shipping?',
        a: 'Yes. eBay\'s final value fee applies to the total transaction amount, which includes any shipping cost charged to the buyer. If you charge $10 for shipping on a $40 item, eBay calculates the fee on the full $50.',
      },
      {
        q: 'What is the eBay final value fee?',
        a: 'The final value fee is eBay\'s main selling fee. It\'s 13.25% for most categories plus $0.30 per order. It\'s charged when your item sells, not when you list it.',
      },
      {
        q: 'How do I calculate profit on eBay?',
        a: 'Subtract the eBay final value fee (13.25% + $0.30), your actual shipping cost, and what you originally paid for the item from your sale price. The number left is your net profit.',
      },
    ],
  },

  poshmark: {
    name: 'Poshmark',
    slug: 'poshmark',
    feeRate: 0.20,
    fixedFee: 0,
    feeLabel: '20% (or $2.95 flat under $15)',
    feeNote: '20% for sales $15+. Flat $2.95 for sales under $15.',
    poshmarkThreshold: true,
    shippingNote: 'Poshmark provides a prepaid label to buyers — enter $0 unless you upgraded shipping.',
    heroHeadline: 'Poshmark takes 20%. Here\'s what you actually keep.',
    heroSubtext: 'After Poshmark\'s cut, you might be keeping less than you think — especially on lower-priced items. See your real profit before you price your next listing.',
    feeExplainer: 'Poshmark has one of the highest fee structures of any resale platform. For sales of $15 or more, Poshmark takes 20% of the sale price. For sales under $15, they charge a flat $2.95 fee regardless of the price. Poshmark provides a prepaid shipping label to buyers, so sellers generally don\'t pay shipping directly — but the 20% cut is taken from your full listing price.',
    signupHook: 'Selling on Poshmark and other platforms? Track true profit across all of them in one place — free.',
    faqs: [
      {
        q: 'How much does Poshmark take from a sale?',
        a: 'Poshmark takes 20% of the sale price for items sold at $15 or more. For items under $15, they charge a flat $2.95 fee. You keep the rest.',
      },
      {
        q: 'Do I pay shipping on Poshmark?',
        a: 'Poshmark provides a prepaid shipping label for buyers. As a seller, you generally don\'t pay for shipping directly — but Poshmark\'s 20% fee is already taken from your sale price.',
      },
      {
        q: 'Is selling on Poshmark profitable?',
        a: 'It depends entirely on your margins. Poshmark\'s 20% fee is high compared to other platforms. Use this calculator to see your real profit after fees and cost of goods before deciding on a listing price.',
      },
      {
        q: 'What is Poshmark\'s fee for a $50 sale?',
        a: 'On a $50 sale, Poshmark takes 20% = $10. You keep $40 before accounting for cost of goods.',
      },
    ],
  },

  mercari: {
    name: 'Mercari',
    slug: 'mercari',
    feeRate: 0.10,
    fixedFee: 0,
    feeLabel: '10% + ~3% payment processing',
    feeNote: '10% selling fee plus ~3% payment processing = ~13% effective',
    heroHeadline: 'Your Mercari profit — after fees, not before.',
    heroSubtext: 'Mercari charges 10% to sell plus another 3% to process the payment. That\'s ~13% off the top before you\'ve even subtracted what you paid for the item.',
    feeExplainer: 'Mercari charges a 10% selling fee on every transaction. On top of that, there\'s approximately a 3% payment processing fee. Combined, you\'re looking at roughly 13% in fees on most sales. Mercari also offers a shipping label program — if you use Mercari\'s prepaid labels, the buyer pays shipping and you don\'t need to subtract it from your profit.',
    signupHook: 'Flipping on Mercari? Log every sale and see which items are actually worth your time.',
    faqs: [
      {
        q: 'What percentage does Mercari take?',
        a: 'Mercari charges a 10% selling fee plus approximately 3% for payment processing, for a total of around 13% on most sales.',
      },
      {
        q: 'How do I calculate Mercari profit?',
        a: 'Take your sale price, subtract 13% in fees (10% selling + 3% payment), subtract your shipping cost if you paid it, then subtract what you originally paid for the item. That\'s your net profit.',
      },
      {
        q: 'Does Mercari charge fees on shipping?',
        a: 'Mercari\'s selling fee is based on the item sale price, not including shipping if the buyer pays it separately through Mercari\'s label program.',
      },
    ],
  },

  depop: {
    name: 'Depop',
    slug: 'depop',
    feeRate: 0.10,
    fixedFee: 0,
    feeLabel: '~10%',
    feeNote: 'Approximately 10% total — varies by payment method and region',
    heroHeadline: 'What did that Depop sale actually put in your pocket?',
    heroSubtext: 'Depop\'s fees add up fast, especially when you account for what you paid for the item and shipping. Get the real number before your next drop.',
    feeExplainer: 'Depop charges approximately 10% on sales. Fees can vary slightly depending on your payment method and region. In addition to Depop\'s cut, you may also incur payment processing fees depending on how the transaction is completed. Always factor in your actual shipping cost (what you paid to send the item) and the original cost of the piece when calculating real profit.',
    signupHook: 'Selling vintage and streetwear on Depop? Track your margins so you know what\'s worth sourcing.',
    faqs: [
      {
        q: 'How much does Depop charge sellers?',
        a: 'Depop charges approximately 10% on each sale. Additional payment processing fees may apply depending on your region and payment method.',
      },
      {
        q: 'Is selling on Depop profitable?',
        a: 'It depends on your sourcing cost and sell price. With ~10% in fees plus shipping, items need a healthy markup to be worth selling. Use this calculator to model your margins before listing.',
      },
      {
        q: 'Does Depop charge for shipping?',
        a: 'Depop doesn\'t charge a platform fee on shipping, but you pay to send the item. Always include your actual shipping cost when calculating real profit.',
      },
    ],
  },

  etsy: {
    name: 'Etsy',
    slug: 'etsy',
    feeRate: 0.095,
    fixedFee: 0.20,
    feeLabel: '~9.5% + $0.20',
    feeNote: '6.5% transaction + ~3% payment processing + $0.20 listing fee per item',
    heroHeadline: 'Etsy fees are sneaky. Here\'s your actual profit.',
    heroSubtext: 'Between the listing fee, transaction fee, and payment processing, Etsy takes close to 10% plus $0.20. On a $30 sale you might net $22 before your materials cost. Calculate it properly.',
    feeExplainer: 'Etsy has multiple fee layers that add up quickly. There\'s a $0.20 listing fee per item (charged when you list, not when it sells), a 6.5% transaction fee on the sale price including shipping, and approximately 3% payment processing through Etsy Payments. Combined, you\'re looking at roughly 9.5% + $0.20 on most sales. If you\'re a high-volume seller, Etsy\'s Star Seller program and offsite ads (which add another 12–15% fee) can significantly affect your margins.',
    signupHook: 'Selling on Etsy? Track your true profit per item — especially important when materials cost varies per listing.',
    faqs: [
      {
        q: 'How much does Etsy take from a sale?',
        a: 'Etsy charges a $0.20 listing fee, a 6.5% transaction fee, and approximately 3% payment processing — totaling roughly 9.5% + $0.20 per sale.',
      },
      {
        q: 'What is Etsy\'s transaction fee?',
        a: 'Etsy\'s transaction fee is 6.5% of the total sale amount, which includes the item price and any shipping charged to the buyer.',
      },
      {
        q: 'Does Etsy charge fees on shipping?',
        a: 'Yes. Etsy\'s 6.5% transaction fee applies to the total transaction amount including shipping. So if you charge $8 shipping on a $25 item, Etsy calculates the fee on the full $33.',
      },
      {
        q: 'How do I calculate Etsy profit?',
        a: 'Subtract the Etsy fees (~9.5% + $0.20), your actual shipping cost, and your materials/cost of goods from the sale price. What remains is your net profit.',
      },
    ],
  },

  facebook: {
    name: 'Facebook Marketplace',
    slug: 'facebook-marketplace',
    feeRate: 0.05,
    fixedFee: 0,
    feeLabel: '5% (shipped items)',
    feeNote: '5% for shipped items. Local cash pickup has no fee.',
    heroHeadline: 'Facebook Marketplace profit — local vs. shipped.',
    heroSubtext: 'Local pickup on Facebook is fee-free, but shipped items cost you 5%. Plus your actual shipping cost. See what you\'re really making on each sale.',
    feeExplainer: 'Facebook Marketplace\'s fee structure depends on how the item is sold. For local pickup paid in cash or through Facebook Pay, there is no selling fee — you keep everything. For shipped items sold through Facebook\'s checkout, Facebook charges a 5% selling fee (or $0.40 minimum for items under $8). If you\'re shipping, always factor in your actual shipping cost, which can easily eat into margins on lower-priced items.',
    signupHook: 'Flipping locally on Facebook? Track every deal and see your real profit — even on cash sales.',
    faqs: [
      {
        q: 'Does Facebook Marketplace charge selling fees?',
        a: 'Local pickup sold through cash or Facebook Pay: no fee. Shipped items sold through Facebook\'s checkout: 5% selling fee (minimum $0.40).',
      },
      {
        q: 'What is Facebook Marketplace\'s selling fee?',
        a: '5% on the sale price for shipped items. There\'s no fee for local pickup transactions.',
      },
      {
        q: 'Is Facebook Marketplace profitable for resellers?',
        a: 'Local flipping on Facebook can be very profitable since there are no platform fees. Shipping adds complexity — the 5% fee plus actual shipping cost need to be factored into your price.',
      },
    ],
  },

  vinted: {
    name: 'Vinted',
    slug: 'vinted',
    feeRate: 0,
    fixedFee: 0,
    feeLabel: '0% — sellers pay nothing',
    feeNote: 'Vinted charges buyers a protection fee. Sellers keep the full sale price.',
    shippingNote: 'Vinted provides shipping labels paid by the buyer — enter $0 unless you arranged your own shipping.',
    heroHeadline: 'Vinted sellers keep 100% of the sale price. Here\'s your real profit.',
    heroSubtext: 'Unlike Poshmark or eBay, Vinted charges no selling fees. But your profit still depends on what you paid for the item and your shipping cost. See the actual number.',
    feeExplainer: 'Vinted is unique among resale platforms — sellers pay zero fees. Vinted makes money by charging buyers a buyer protection fee, which is separate from the seller\'s earnings. As a Vinted seller, you receive the full listing price. Vinted provides prepaid shipping labels that the buyer pays for. Your profit calculation is simpler than other platforms: just your sale price minus what you originally paid for the item.',
    signupHook: 'Selling on Vinted and other platforms? Compare your profit across all of them in one dashboard.',
    faqs: [
      {
        q: 'Does Vinted charge seller fees?',
        a: 'No. Vinted charges zero fees to sellers. You receive your full listing price. Vinted charges buyers a protection fee on their end.',
      },
      {
        q: 'How do I calculate Vinted profit?',
        a: 'Simple: your sale price minus what you originally paid for the item. Vinted takes no cut. The buyer pays for shipping separately via Vinted\'s prepaid label system.',
      },
      {
        q: 'Is Vinted better than Poshmark for sellers?',
        a: 'On fees alone, yes — Vinted takes 0% vs Poshmark\'s 20%. However, Vinted\'s buyer base differs. Use the calculators for both platforms to compare your actual profit per item on each.',
      },
    ],
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
