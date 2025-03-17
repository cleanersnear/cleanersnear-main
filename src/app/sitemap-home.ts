import { MetadataRoute } from 'next'

/**
 * Home sitemap file
 * 
 * Contains the main pages of the website with highest priority.
 * These are the core pages that define the website's main navigation structure.
 * Priority levels:
 * 1.0 - Critical conversion and main navigation pages
 * 0.9 - Important information and service pages
 * 0.8 - Supporting pages and secondary flows
 * 
 * @returns {MetadataRoute.Sitemap} The sitemap entries for home and main pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Using www subdomain as per Next.js config and enforcing HTTPS
  const baseUrl = 'https://www.cleaningprofessionals.com.au'
  
  // Critical conversion and main navigation pages (1.0)
  const mainPages = [
    {
      route: '',  // Homepage
      priority: 1.0,
      changeFrequency: 'daily' as const
    },
    {
      route: 'get-quote',  // Primary conversion page
      priority: 1.0,
      changeFrequency: 'daily' as const
    },
    {
      route: 'quick-book/location',  // Quick booking entry point (main quick-book page)
      priority: 1.0,
      changeFrequency: 'daily' as const
    },
    {
      route: 'locations',  // Main service areas page
      priority: 1.0,
      changeFrequency: 'daily' as const
    },
    {
      route: 'contact',  // Contact information
      priority: 1.0,
      changeFrequency: 'daily' as const
    },
    {
      route: 'services',  // Main services listing
      priority: 1.0,
      changeFrequency: 'daily' as const
    }
  ]

  // Booking flow pages (0.8)
  // These are important but not as critical as main landing pages
  const bookingPages = [
    'quick-book/service'
  ].map(route => ({
    route,
    priority: 0.8,
    changeFrequency: 'weekly' as const
  }))

  // Important information pages (0.9)
  // These pages support main conversion funnel
  const informationPages = [
    'about',
    'reviews',
    'pricing',
    'blogs',
    'faqs'
  ].map(route => ({
    route,
    priority: 0.9,
    changeFrequency: 'daily' as const
  }))

  // Legal and policy pages (0.7)
  // Important but less frequently accessed
  const legalPages = [
    'privacy-policy',
    'terms-and-conditions'
  ].map(route => ({
    route,
    priority: 0.7,
    changeFrequency: 'monthly' as const
  }))

  // Combine all pages and format them for the sitemap
  const allPages = [
    ...mainPages, 
    ...bookingPages, 
    ...informationPages,
    ...legalPages
  ].map(({ route, priority, changeFrequency }) => {
    // Ensure consistent URL formatting with trailing slash
    const formattedUrl = route === '' 
      ? `${baseUrl}/` 
      : `${baseUrl}/${route}/`
      
    return {
      url: formattedUrl,
      lastModified: new Date(),
      changeFrequency,
      priority
    }
  })

  // Remove any duplicate URLs
  const uniqueUrls = new Set<string>()
  const uniquePages = allPages.filter(page => {
    const normalized = page.url.toLowerCase()
    if (uniqueUrls.has(normalized)) {
      return false
    }
    uniqueUrls.add(normalized)
    return true
  })

  return uniquePages
} 
