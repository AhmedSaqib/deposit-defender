import { MetadataRoute } from 'next'
import { CALC_PLATFORM_SLUGS } from '@/lib/calculator-config'

const BASE = 'https://marginlog.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const calculatorPages: MetadataRoute.Sitemap = CALC_PLATFORM_SLUGS.map(slug => ({
    url: `${BASE}/calculators/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/calculators`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...calculatorPages,
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]
}
