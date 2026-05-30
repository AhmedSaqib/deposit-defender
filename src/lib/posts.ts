export type Post = {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
}

export const POSTS: Post[] = [
  {
    slug: 'ebay-fees-explained-2026',
    title: 'eBay Fees Explained 2026 — What You Actually Keep',
    description: 'eBay takes more than most sellers realise. A full breakdown of every eBay fee, real examples of what a $20, $50, and $100 sale leaves you, and the minimum price formula every reseller should know.',
    date: '2026-05-25',
    readingTime: '7 min read',
  },
  {
    slug: 'how-to-track-reselling-profits',
    title: 'How to Track Reselling Profits (The Right Way)',
    description: 'Most resellers have no idea what they actually made last month. Here is a simple system for tracking reselling profits accurately — across every platform.',
    date: '2026-05-22',
    readingTime: '6 min read',
  },
  {
    slug: 'reselling-profit-mistakes',
    title: '5 Profit Mistakes Most Resellers Make (And How to Avoid Them)',
    description: 'Most resellers are unknowingly leaving money on the table. Here are the five most common profit tracking mistakes and how to fix them.',
    date: '2025-05-22',
    readingTime: '5 min read',
  },
]

export function getPost(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug)
}
