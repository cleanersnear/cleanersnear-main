import { MetadataRoute } from 'next'
import { MELBOURNE_REGIONS } from '@/utils/location/regions'

/**
 * Locations sitemap file
 * 
 * Contains all location pages for local SEO targeting.
 * Location pages are crucial for targeting specific geographic areas.
 * 
 * @returns {MetadataRoute.Sitemap} The sitemap entries for location pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.cleaningprofessionals.com.au'
  
  // Main locations page
  const locationsMainPage = {
    url: `${baseUrl}/locations/`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9
  }
  
  // Location pages (0.75)
  // These target specific suburbs and regions
  const locationPages = Object.values(MELBOURNE_REGIONS).flatMap(region =>
    region.councils.flatMap(council =>
      council.key_suburbs.map(suburb => {
        const slugifiedSuburb = suburb.toLowerCase().replace(/\s+/g, '-')
        return {
          url: `${baseUrl}/locations/${slugifiedSuburb}/`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.75
        }
      })
    )
  )

  // Return all location pages
  // Deduplicate any potential duplicate URLs
  const allLocationPages = [
    locationsMainPage,
    ...locationPages
  ]
  
  // Use a Set to deduplicate by URL
  const uniqueUrls = new Set<string>()
  const uniqueLocationPages = allLocationPages.filter(page => {
    const normalized = page.url.toLowerCase()
    if (uniqueUrls.has(normalized)) {
      return false
    }
    uniqueUrls.add(normalized)
    return true
  })
  
  return uniqueLocationPages
} 