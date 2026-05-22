export type Post = {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
}

export const POSTS: Post[] = [
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
