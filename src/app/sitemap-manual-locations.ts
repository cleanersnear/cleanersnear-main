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
  // Using www subdomain as per Next.js config and enforcing HTTPS
  const baseUrl = 'https://www.cleaningprofessionals.com.au'
  
  // Manually edited and SEO-optimized location pages
  // These pages have been individually crafted with enhanced content, metadata,
  // and structured data for maximum SEO performance
  const manualLocationPages = [
    {
      route: 'locations/epping/end-of-lease-cleaning',
      priority: 0.95,
      changeFrequency: 'weekly' as const
    }
    // Add more manually edited pages here as they are completed:
    // {
    //   route: 'locations/[suburb]/[service]',
    //   priority: 0.95,
    //   changeFrequency: 'weekly' as const
    // }
  ]

  // Format pages for the sitemap
  const formattedPages = manualLocationPages.map(({ route, priority, changeFrequency }) => {
    // Ensure consistent URL formatting with trailing slash
    const formattedUrl = `${baseUrl}/${route}/`
      
    return {
      url: formattedUrl,
      lastModified: new Date(),
      changeFrequency,
      priority
    }
  })

  // Remove any duplicate URLs
  const uniqueUrls = new Set<string>()
  const uniquePages = formattedPages.filter(page => {
    const normalized = page.url.toLowerCase()
    if (uniqueUrls.has(normalized)) {
      return false
    }
    uniqueUrls.add(normalized)
    return true
  })

  return uniquePages
}
