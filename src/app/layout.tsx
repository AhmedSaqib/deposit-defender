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

export const metadata: Metadata = {
  title: "MoveProof — AI Property Inspection & Deposit Dispute",
  description:
    "AI-powered property inspection reports and deposit dispute analysis for landlords and tenants worldwide.",
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
