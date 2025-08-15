import { MetadataRoute } from 'next'

/**
 * Manual Locations Sitemap file
 * 
 * Simple sitemap for manually optimized location pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://www.cleaningprofessionals.com.au/locations/epping/end-of-lease-cleaning/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95
    },
    {
      url: 'https://www.cleaningprofessionals.com.au/locations/melbourne-cbd/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95
    }
  ]
}
