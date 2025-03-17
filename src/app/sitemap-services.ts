import { MetadataRoute } from 'next'

/**
 * Services sitemap file
 * 
 * Contains all service pages and their related pages.
 * Service pages are critical for SEO as they target specific keywords and services.
 * 
 * @returns {MetadataRoute.Sitemap} The sitemap entries for service pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.cleaningprofessionals.com.au'
  
  // Main services page
  const servicesMainPage = {
    url: `${baseUrl}/services/`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0
  }
  
  // Core service pages (0.95)
  // These are the main service offerings and should be highly prioritized
  const coreServices = [
    'carpet-cleaning',
    'end-of-lease-cleaning',
    'general-cleaning',
    'deep-cleaning',
    'move-in-cleaning',
    'ndis-cleaning',
    'commercial-cleaning',
    'after-renovation-cleaning',
    'oven-cleaning',
    'upholstery-cleaning',
    'window-cleaning'
  ]
  
  // Map services to sitemap entries with proper formatting
  const coreServicePages = coreServices.map(service => ({
    url: `${baseUrl}/services/${service}/`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.95
  }))

  // End of Lease main page (0.95) - This was explicitly mentioned in the original sitemap
  // Although it's already included in coreServicePages, we're keeping this for clarity
  // since it was specifically called out in the original sitemap
  const endOfLeaseMainPage = {
    url: `${baseUrl}/services/end-of-lease-cleaning/`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.95
  }

  // Return all service pages
  // We'll combine all and then deduplicate to avoid any duplicate URLs
  const allServicePages = [
    servicesMainPage,
    ...coreServicePages,
    endOfLeaseMainPage
  ]
  
  // Remove any duplicate URLs
  const uniqueUrls = new Set<string>()
  const uniqueServicePages = allServicePages.filter(page => {
    if (uniqueUrls.has(page.url)) {
      return false
    }
    uniqueUrls.add(page.url)
    return true
  })
  
  return uniqueServicePages
} 