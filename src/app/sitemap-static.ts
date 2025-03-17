import { MetadataRoute } from 'next'

/**
 * Static sitemap file
 * 
 * Contains other static pages that don't fit in the other categories.
 * This includes legal pages, utility pages, etc.
 * These pages are important for compliance and user trust but typically have lower SEO priority.
 * 
 * @returns {MetadataRoute.Sitemap} The sitemap entries for static pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.cleaningprofessionals.com.au'
  
  // Static pages with medium priority (0.7)
  // These are important for compliance and user trust
  const staticPages = [
    {
      route: 'privacy-policy',
      priority: 0.7,
      changeFrequency: 'monthly' as const
    },
    {
      route: 'terms-and-conditions',
      priority: 0.7,
      changeFrequency: 'monthly' as const
    },
    {
      route: 'sitemap',
      priority: 0.5,
      changeFrequency: 'monthly' as const
    },
    {
      route: 'career',
      priority: 0.7,
      changeFrequency: 'weekly' as const
    }
    // Add any other static pages that don't fit in other categories
  ]

  // Format the static pages for the sitemap with trailing slashes
  return staticPages.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}/${route}/`,
    lastModified: new Date(),
    changeFrequency,
    priority
  }))
} 