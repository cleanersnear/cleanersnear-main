import { MetadataRoute } from 'next'

/**
 * Static sitemap file
 * 
 * Contains static pages that don't fit in other categories.
 * Priority structure:
 * 0.8 - Career pages (frequently updated)
 * 0.7 - Legal and policy pages (important for trust)
 * 
 * @returns {MetadataRoute.Sitemap} The sitemap entries for static pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.cleaningprofessionals.com.au'
  
  // Career pages (0.8)
  // Higher priority due to frequent updates and recruitment needs
  const careerPages = [
    {
      route: 'career',
      priority: 0.8,
      changeFrequency: 'weekly' as const
    }
  ]

  // Legal and policy pages (0.7)
  // Important for compliance and user trust
  const legalPages = [
    {
      route: 'privacy-policy',
      priority: 0.7,
      changeFrequency: 'monthly' as const
    },
    {
      route: 'terms-and-conditions',
      priority: 0.7,
      changeFrequency: 'monthly' as const
    }
  ]

  // Combine all static pages
  const allStaticPages = [
    ...careerPages,
    ...legalPages
  ]

  // Format the static pages for the sitemap with trailing slashes
  return allStaticPages.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}/${route}/`,
    lastModified: new Date(),
    changeFrequency,
    priority
  }))
} 