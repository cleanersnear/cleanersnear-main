import { MetadataRoute } from 'next'

/**
 * Home sitemap file
 * 
 * Contains the main pages of the website with highest priority.
 * These are the core pages that define the website's main navigation structure.
 * 
 * @returns {MetadataRoute.Sitemap} The sitemap entries for home and main pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cleaningprofessionals.com.au'
  
  // Main pages with highest priority (1.0)
  // These are the most important pages that should be crawled frequently
  const mainPages = [
    {
      route: '',
      priority: 1.0,
      changeFrequency: 'daily' as const
    },
    {
      route: 'contact',
      priority: 1.0,
      changeFrequency: 'daily' as const
    },
    {
      route: 'quick-book',
      priority: 1.0,
      changeFrequency: 'daily' as const
    },
    {
      route: 'reviews',
      priority: 1.0,
      changeFrequency: 'daily' as const
    },
    {
      route: 'get-quote',
      priority: 1.0,
      changeFrequency: 'daily' as const
    }
  ]

  // Quick Book Flow Pages (0.8)
  // These are important conversion pages but not as critical as main pages
  const quickBookPages = [
    'quick-book/location',
    'quick-book/service'
  ].map(route => ({
    route,
    priority: 0.8,
    changeFrequency: 'weekly' as const
  }))

  // Important pages (0.9)
  // These are secondary pages that are still important for SEO
  const importantPages = [
    'about',
    'reviews',
    'pricing',
    'blogs',
    'locations',
    'faqs',
    'contact',
    'get-quote',
    'privacy-policy',
    'terms-and-conditions'
  ].map(route => ({
    route,
    priority: 0.9,
    changeFrequency: 'daily' as const
  }))

  // Combine all pages and format them for the sitemap
  // Ensure trailing slashes for consistency with Next.js config
  const allPages = [...mainPages, ...quickBookPages, ...importantPages]
    .map(({ route, priority, changeFrequency }) => {
      // Format URL with trailing slash for consistency
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

  // Remove any duplicate URLs (in case of overlapping routes)
  const uniqueUrls = new Set<string>()
  const uniquePages = allPages.filter(page => {
    if (uniqueUrls.has(page.url)) {
      return false
    }
    uniqueUrls.add(page.url)
    return true
  })

  return uniquePages
} 