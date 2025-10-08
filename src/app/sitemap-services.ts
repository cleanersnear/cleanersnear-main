import { MetadataRoute } from 'next'

/**
 * Services sitemap file
 * 
 * Contains all service pages with special emphasis on end-of-lease cleaning.
 * Priority structure:
 * 1.0 - Main services page and end-of-lease cleaning (highest priority service)
 * 0.95 - Core cleaning services
 * 0.9 - Supporting services
 * 
 * @returns {MetadataRoute.Sitemap} The sitemap entries for service pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.cleaningprofessionals.com.au'
  
  // Main services pages with highest priority
  const mainPages = [
    {
      // Main services landing page
      url: `${baseUrl}/services/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      // End of lease cleaning - our specialized service
      // This is a comprehensive, dedicated page with full service details
      url: `${baseUrl}/services/end-of-lease-cleaning/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    }
  ]
  
  // Updated current services (six pages total)
  const currentServices = [
    'regular-cleaning',
    'once-off-cleaning',
    'ndis-cleaning',
    'airbnb-cleaning',
    'commercial-cleaning',
    'end-of-lease-cleaning'
  ].map(service => ({
    url: `${baseUrl}/services/${service}/`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.95
  }))

  // Combine all pages and ensure no duplicates
  const allServicePages = [
    ...mainPages,
    ...currentServices
  ]
  
  // Remove any duplicate URLs with case-insensitive comparison
  const uniqueUrls = new Set<string>()
  const uniqueServicePages = allServicePages.filter(page => {
    const normalized = page.url.toLowerCase()
    if (uniqueUrls.has(normalized)) {
      return false
    }
    uniqueUrls.add(normalized)
    return true
  })
  
  return uniqueServicePages
} 