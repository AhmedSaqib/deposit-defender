# MarginLog — Resale Profit Tracker

**[marginlog.net](https://marginlog.net)**

MarginLog is a web app for resellers (eBay, Poshmark, Mercari, Depop, Etsy, Facebook Marketplace, Vinted) to track sales, calculate real profit after fees, and understand their business performance — without a spreadsheet.

---

## What it does

| Feature | Description |
|---------|-------------|
| **Log a sale** | Record item, platform, sale price, cost of goods, shipping, and date |
| **Auto fee calculation** | Platform fees deducted automatically — see true net profit, not gross revenue |
| **Dashboard** | Monthly profit, margin %, top categories, chart of sales over time |
| **Sales history** | Full list of logged sales with delete and return marking |
| **Expenses tracking** | Log business expenses (packaging, mileage, subscriptions) |
| **Sourcing trips** | Group sales by the haul they came from |
| **Haul calculator** | Split a bulk purchase cost across multiple items to get per-item COGS |
| **Bundle logger** | Log a multi-item bundle as a single sale |
| **CSV import** | Bulk upload sales from any platform export (flexible column name matching) |
| **CSV export** | Download all sales as a spreadsheet for tax time |
| **Free calculators** | Public profit calculators for all 7 platforms — no login needed |

---

## Plans

| | Free | Pro ($9.99/month) |
|--|------|-------------------|
| Sales logged | 20/month | Unlimited |
| Dashboard & analytics | ✅ | ✅ |
| CSV import & export | ✅ | ✅ |
| Expenses & trips | ✅ | ✅ |

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Server Actions) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (Postgres + RLS) |
| Auth | Supabase Auth (email/password) |
| Payments | Stripe (Checkout + Customer Portal + Webhooks) |
| Email | Resend |
| Error monitoring | Sentry |
| Hosting | Vercel |
| Charts | Recharts |

---

## Local setup

### 1. Clone and install

```bash
git clone https://github.com/AhmedSaqib/deposit-defender.git
cd deposit-defender
npm install
```

### 2. Environment variables

Create `.env.local` with the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=re_...

# Sentry (optional locally)
SENTRY_AUTH_TOKEN=...
```

### 3. Database

Run `supabase-schema.sql` in your Supabase SQL editor. It creates:
- `sales` — sale records with platform, pricing, status
- `expenses` — business expense records
- `sourcing_trips` — sourcing trip groupings
- `subscriptions` — Stripe subscription state (managed by webhook)

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/            # Main analytics dashboard
│   ├── log/                  # Log a sale form
│   ├── sales/                # Sales history
│   ├── import/               # CSV bulk import
│   ├── expenses/             # Expense tracking
│   ├── trips/                # Sourcing trips
│   ├── haul/                 # Haul cost splitter
│   ├── bundle/               # Bundle logger
│   ├── calculators/          # Public fee calculators (SEO)
│   ├── api/
│   │   ├── stripe/           # checkout, webhook, portal
│   │   ├── export/           # CSV export
│   │   └── contact/          # Contact form (Resend)
│   ├── login/ signup/        # Auth pages
│   └── terms/ privacy/       # Legal pages
├── components/
│   ├── nav.tsx               # Top navigation with billing state
│   ├── app-footer.tsx        # Footer (Contact / Terms / Privacy)
│   ├── billing-button.tsx    # Upgrade / Pro / Pro-ending button
│   ├── upgrade-button.tsx    # Standalone upgrade CTA
│   ├── import-form.tsx       # CSV import UI
│   ├── haul-calculator.tsx
│   └── bundle-form.tsx
└── lib/
    ├── actions.ts            # All server actions (logSale, importSales, etc.)
    ├── subscription.ts       # Stripe gating helpers (canLogSale, getMonthlyCount)
    ├── platform-fees.ts      # Fee rates, profit/ROI calculation helpers
    ├── csv-import.ts         # CSV parsing with flexible column name matching
    ├── calculator-config.ts  # Per-platform calculator content + FAQ copy
    └── supabase/
        ├── server.ts         # SSR Supabase client
        ├── client.ts         # Browser Supabase client
        └── admin.ts          # Service-role client (webhook writes, bypasses RLS)
```

---

## Stripe webhook (local testing)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Events handled:
- `checkout.session.completed` — create/upgrade subscription record
- `customer.subscription.updated` — sync cancel state and period end
- `customer.subscription.deleted` — mark subscription as free

---

## Deployment

Hosted on Vercel. Push to `main` → auto-deploys.

All environment variables above must be set in Vercel project settings. The Stripe webhook endpoint should point to `https://marginlog.net/api/stripe/webhook`.
