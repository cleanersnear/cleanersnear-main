import { MetadataRoute } from 'next'

/**
 * Services sitemap file
 * 
 * Contains all service pages for the cleaning business.
 * Service pages are high priority as they represent core business offerings.
 * 
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
 * @returns {Promise<MetadataRoute.Sitemap>} The sitemap entries for service pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.cleaningprofessionals.com.au'
  
  return [
    // Main services page
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Individual service pages
    {
      url: `${baseUrl}/services/regular-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/once-off-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/ndis-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/airbnb-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/commercial-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/end-of-lease-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]
}