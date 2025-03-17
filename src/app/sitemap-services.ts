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
  
  // Core service pages (0.95)
  // Primary cleaning services excluding end-of-lease which has its own entry
  const coreServices = [
    'carpet-cleaning',
    'general-cleaning',
    'deep-cleaning',
    'move-in-cleaning',
    'ndis-cleaning',
    'commercial-cleaning'
  ].map(service => ({
    url: `${baseUrl}/services/${service}/`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.95
  }))

  // Supporting service pages (0.9)
  // Specialized cleaning services that complement our main offerings
  const supportingServices = [
    'after-renovation-cleaning',
    'oven-cleaning',
    'upholstery-cleaning',
    'window-cleaning'
  ].map(service => ({
    url: `${baseUrl}/services/${service}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }))

  // Combine all pages and ensure no duplicates
  const allServicePages = [
    ...mainPages,
    ...coreServices,
    ...supportingServices
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