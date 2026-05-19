import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moveproof.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MoveProof.ai — AI Property Inspection & Deposit Dispute",
    template: "%s | MoveProof.ai",
  },
  description:
    "Dispute unfair deposit deductions or document property damage with AI. Upload before and after photos, get a formal PDF report in minutes. Free tools included — worldwide.",
  keywords: [
    "deposit dispute", "security deposit return", "property inspection report",
    "landlord deposit deduction", "deposit return deadline", "demand letter deposit",
    "tenant rights", "wear and tear", "AI property inspection",
  ],
  authors: [{ name: "MoveProof.ai", url: SITE_URL }],
  creator: "MoveProof.ai",
  openGraph: {
    type: "website",
    siteName: "MoveProof.ai",
    url: SITE_URL,
    title: "MoveProof.ai — AI Property Inspection & Deposit Dispute",
    description:
      "Dispute unfair deposit deductions or document property damage with AI. Upload before and after photos, get a formal PDF report in minutes.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "MoveProof.ai" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoveProof.ai — AI Property Inspection & Deposit Dispute",
    description:
      "Dispute unfair deposit deductions or document property damage with AI. Free tools included — worldwide.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <footer className="mt-auto border-t border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} MoveProof. Not legal advice.</p>
            <nav className="flex gap-5 text-xs text-gray-500">
              <Link href="/about" className="hover:text-gray-800 transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-gray-800 transition-colors">Privacy Policy</Link>
              <a href="mailto:hello@moveproof.app" className="hover:text-gray-800 transition-colors">Contact</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
