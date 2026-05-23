import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://marginlog.net'),
  title: {
    default: 'MarginLog — Resale Profit Tracker',
    template: '%s — MarginLog',
  },
  description: 'Track true profit across eBay, Poshmark, Mercari, Depop, and more. Know your real numbers after fees.',
  keywords: ['resale profit tracker', 'ebay profit calculator', 'poshmark profit', 'mercari fees', 'reseller tool', 'flipping profit tracker', 'resale business tracker'],
  openGraph: {
    type: 'website',
    siteName: 'MarginLog',
    title: 'MarginLog — Resale Profit Tracker',
    description: 'Track true profit across eBay, Poshmark, Mercari, Depop, and more. Know your real numbers after fees.',
    url: 'https://marginlog.net',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'MarginLog — Resale Profit Tracker' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MarginLog — Resale Profit Tracker',
    description: 'Track true profit across eBay, Poshmark, Mercari, Depop, and more. Know your real numbers after fees.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="min-h-screen bg-zinc-900">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
