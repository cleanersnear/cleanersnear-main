import { MetadataRoute } from 'next'
import { MELBOURNE_REGIONS } from '@/utils/location/regions'

/**
 * Location Services sitemap file
 * 
 * Contains all location-specific service pages for local SEO targeting.
 * These pages combine location targeting with specific cleaning services.
 * 
 * @returns {MetadataRoute.Sitemap} The sitemap entries for location-service pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.cleaningprofessionals.com.au'
  
  // Define available services - only keeping the specified ones
  const services = [
    'end-of-lease-cleaning',
    'deep-cleaning',
    'general-cleaning',
    'move-in-cleaning',
    'ndis-cleaning'
  ] as const

  // Generate location-service pages (0.85)
  // Higher priority than basic location pages as they target specific services
  const locationServicePages = Object.values(MELBOURNE_REGIONS).flatMap(region =>
    region.councils.flatMap(council =>
      council.key_suburbs.flatMap(suburb => {
        const slugifiedSuburb = suburb.toLowerCase().replace(/\s+/g, '-')
        
        // Generate URLs for each service in this suburb
        return services.map(service => ({
          url: `${baseUrl}/locations/${slugifiedSuburb}/${service}/`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.85 // Higher priority than basic location pages
        }))
      })
    )
  )

  // Deduplicate any potential duplicate URLs
  const uniqueUrls = new Set<string>()
  const uniqueLocationServicePages = locationServicePages.filter(page => {
    const normalized = page.url.toLowerCase()
    if (uniqueUrls.has(normalized)) {
      return false
    }
    uniqueUrls.add(normalized)
    return true
  })
  
  return uniqueLocationServicePages
} 