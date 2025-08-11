import { MetadataRoute } from 'next'

/**
 * Manual Locations Sitemap file
 * 
 * Contains manually edited and SEO-optimized location-specific service pages.
 * These pages have been individually crafted with enhanced content, metadata,
 * and structured data for maximum SEO performance.
 * 
 * Higher priority than dynamic location pages as they contain unique, 
 * human-written content and comprehensive SEO optimization.
 * 
 * @returns {MetadataRoute.Sitemap} The sitemap entries for manually optimized location pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.cleaningprofessionals.com.au'
  
  // Manually edited and SEO-optimized location pages
  // Add new manually edited pages here as they are completed
  const manualLocationPages = [
    {
      url: `${baseUrl}/locations/epping/end-of-lease-cleaning/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95 // Highest priority - manually optimized pages
    }
    // Add more manually edited pages here as they are completed:
    // {
    //   url: `${baseUrl}/locations/[suburb]/[service]/`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.95
    // }
  ]
  
  return manualLocationPages
}
