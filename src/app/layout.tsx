import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MarginLog — Resale Profit Tracker',
  description: 'Track true profit across eBay, Poshmark, Mercari, Depop, and more. Know your real numbers after fees.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="min-h-screen bg-zinc-950">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
