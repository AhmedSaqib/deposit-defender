# MarginLog Changelog

All notable changes to MarginLog, organised by development session.

---

## Session 1 — Foundation & Core Features
*Initial build: auth, sale logging, dashboard, CSV export*

### Added
- Supabase authentication (email/password signup, login, logout)
- Sale logging form — item name, platform, category, sale price, COGS, shipping, date, notes
- Platform fee calculation for eBay, Poshmark, Mercari, Depop, Etsy, Facebook Marketplace, Vinted
- Sales history page with delete functionality
- Dashboard with profit analytics and charts (Recharts)
- CSV export for tax reporting (`/api/export`)
- Expenses tracking page
- Sourcing trips — log a trip and associate sales to it
- Haul calculator — split a sourcing haul across multiple items
- Bundle logger — log a bundle of items as one sale
- CSV import for bulk sale upload
- Nav component with all routes
- Logo component

---

## Session 2 — SEO, Performance & Calculator Pages
*SEO overhaul, calculator landing pages, performance optimisation, domain migration*

### Added
- `src/app/sitemap.ts` — dynamic sitemap covering all public routes + all calculator pages
- `src/app/robots.ts` — allows public routes, disallows all auth/dashboard routes
- `src/app/opengraph-image.tsx` — edge-rendered 1200×630 OG image
- `src/app/logo-square/route.tsx` — 1200×1200 square logo for Google Ads
- `src/lib/calculator-config.ts` — accurate fee config for all 7 platforms with FAQs, hero copy, fee explainers
- `src/components/profit-calculator.tsx` — interactive client-side profit calculator with emotional reveal
- `src/components/compare-calculator.tsx` — live side-by-side platform comparison calculator
- `src/app/calculators/page.tsx` — calculator index page listing all 7 platforms
- `src/app/calculators/[platform]/page.tsx` — dynamic per-platform calculator page with FAQPage JSON-LD, `generateStaticParams`, per-page SEO metadata
- `src/app/calculators/compare/page.tsx` — compare all platforms page targeting "eBay vs Poshmark fees" queries
- `public/googleebcf8393a23b474f.html` — Google Search Console verification file
- `public/llms.txt` — LLM/AI crawler discoverability file
- JSON-LD structured data on homepage (SoftwareApplication + WebSite schema)
- Calculator chip links on landing page for all 7 platforms + compare

### Changed
- `src/app/layout.tsx` — added `metadataBase`, title template, full OG/Twitter metadata, keywords, `display: swap` on Geist font for LCP/FCP
- `src/app/page.tsx` — added metadata export, JSON-LD, secondary CTA linking to calculators
- `next.config.ts` — added `optimizePackageImports` for lucide-react and recharts (−88 KiB JS)
- `package.json` — added `browserslist` targeting modern browsers (−13.7 KiB polyfills)
- `src/app/api/contact/route.ts` — fixed Resend lazy init (was crashing build at module level)
- `src/app/contact/page.tsx` — added noindex metadata
- `src/app/privacy/page.tsx` — added noindex metadata
- `src/app/terms/page.tsx` — added noindex metadata
- All `marginlog.vercel.app` references replaced with `marginlog.net` across 7 files

### Fixed
- Facebook Marketplace URL bug — config key was `facebook` but slug was `facebook-marketplace`, causing wrong sitemap URLs
- Resend module-level initialisation crashing build when env var not present

---

## Session 3 — Stripe Payments & Monetisation
*Full Stripe subscription integration, 20/month free tier, paywall*

### Added
- `src/lib/subscription.ts` — `getSubscriptionInfo()`, `getSubscriptionStatus()`, `getMonthlyCount()`, `canLogSale()` helpers
- `src/app/api/stripe/checkout/route.ts` — creates Stripe Checkout session, reuses existing customer if present
- `src/app/api/stripe/webhook/route.ts` — handles `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`; uses Supabase admin client to bypass RLS
- `src/app/api/stripe/portal/route.ts` — opens Stripe Customer Portal for billing management
- `src/lib/supabase/admin.ts` — service role Supabase client for server-side admin operations
- `src/components/upgrade-button.tsx` — upgrade CTA button (full and small variants)
- `src/components/billing-button.tsx` — nav button showing "Upgrade" for free users, "Pro" or "Pro · ends Jun 20" for paid/cancelling users
- Supabase `subscriptions` table with `user_id`, `stripe_customer_id`, `stripe_subscription_id`, `status`, `cancel_at_period_end`, `current_period_end`

### Changed
- `src/lib/actions.ts` — `logSale` checks `canLogSale()` before inserting; redirects to `/log?limit=1` if at monthly limit
- `src/app/log/page.tsx` — shows full paywall screen when `?limit=1`; shows warning banner at 17–19 sales remaining
- `src/components/nav.tsx` — added `BillingButton` showing subscription state for all logged-in users
- `src/middleware.ts` — reverted expanded matcher back to specific protected routes only (public calculator pages must remain accessible)

### Fixed
- Stripe module-level initialisation crash at build time — moved `new Stripe()` inside each handler
- Webhook 500 error — switched from anon Supabase client to admin client; anon client had no RLS write permission
- `current_period_end` crash — new Stripe API version (2026-04-22.dahlia) moved the field; added fallback to `items.data[0].current_period_end`

---

## Session 4 — Legal, Monitoring & Production Readiness
*Sentry error monitoring, real Terms/Privacy content, Stripe live mode*

### Added
- Sentry error monitoring via `@sentry/nextjs` — server and edge configs, source map uploads
- `src/app/global-error.tsx` — global error boundary
- `src/instrumentation.ts` + `src/instrumentation-client.ts` — Sentry instrumentation hooks

### Changed
- `src/app/terms/page.tsx` — added billing/subscription section (free tier, $9.99/month, cancellation, no partial refunds, 30-day price change notice), governing law (Canada), correct contact email
- `src/app/privacy/page.tsx` — added Stripe, Vercel, Resend as named sub-processors, clarified card data handling, correct contact email
- `sentry.server.config.ts` / `sentry.edge.config.ts` — reduced `tracesSampleRate` from 1 to 0.1, removed `sendDefaultPii` to respect privacy policy
- `next.config.ts` — wrapped with `withSentryConfig` for source map uploads
- `src/app/calculators/page.tsx` — added "Sign up free" button to header alongside "Log in"
- Switched Stripe from test mode to live mode — new product, price, webhook, and API keys in Vercel
- Stripe Customer Portal activated in live mode

---

## Session 5 — UX Polish & Data Integrity
*Auth redirects, footer navigation, analytics-safe data model*

### Added
- `src/components/app-footer.tsx` — footer with Contact, Terms, and Privacy links added to all 8 authenticated pages (dashboard, sales, log, import, haul, bundle, expenses, trips)

### Changed
- `src/middleware.ts` — bidirectional auth redirect: authenticated users hitting `/`, `/login`, or `/signup` are now redirected to `/dashboard`
- `src/lib/actions.ts` — `logSale` and `importSales` now always write `status: 'sold'` explicitly, making the column safe to add a `NOT NULL` + `CHECK` constraint in Postgres
- `src/app/log/page.tsx` — haul/bundle shortcut links bumped from `text-zinc-500` to `text-zinc-400` for legible contrast
- `src/components/import-form.tsx` — corrected misleading subtext from "Upload a CSV — column names are detected automatically" to explicitly state platform-specific CSV exports only

### Pending (SQL — run in Supabase)
```sql
UPDATE sales SET status = 'sold' WHERE status IS NULL;
ALTER TABLE sales ALTER COLUMN status SET DEFAULT 'sold';
ALTER TABLE sales ALTER COLUMN status SET NOT NULL;
ALTER TABLE sales ADD CONSTRAINT sales_status_check CHECK (status IN ('sold', 'returned'));
```

---

## Platform fee reference

| Platform | Fee |
|----------|-----|
| eBay | 13.25% + $0.30 |
| Poshmark | 20% (or $2.95 flat under $15) |
| Mercari | 10% + ~3% payment processing |
| Depop | ~10% |
| Etsy | ~9.5% + $0.20 |
| Facebook Marketplace | 5% (shipped items) |
| Vinted | 0% (sellers pay nothing) |
