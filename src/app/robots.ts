import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/log', '/sales', '/haul', '/bundle', '/expenses', '/trips', '/import', '/api/'],
    },
    sitemap: 'https://marginlog.vercel.app/sitemap.xml',
  }
}
