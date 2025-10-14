import { MetadataRoute } from 'next'
import { MELBOURNE_REGIONS } from '@/utils/location/regions'

/**
 * Main sitemap file
 * 
 * Contains all URLs for the website in a single sitemap.
 * 
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
 * @returns {Promise<MetadataRoute.Sitemap>} All sitemap entries
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.cleaningprofessionals.com.au'
  
  // Homepage and main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/book`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ]

  // Information pages
  const infoPages = [
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/why_choose_us`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/how_it_works`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Legal pages
  const legalPages = [
    {
      url: `${baseUrl}/career`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Service pages
  const servicePages = [
    {
      url: `${baseUrl}/services/regular-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/general-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/once-off-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/deep-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/move-in-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/ndis-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/airbnb-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/commercial-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/end-of-lease-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ]

  // Location pages - Main suburb pages
  const locationPages = Object.values(MELBOURNE_REGIONS).flatMap(region =>
    region.councils.flatMap(council =>
      council.key_suburbs.map(suburb => {
        const slugifiedSuburb = suburb.toLowerCase().replace(/\s+/g, '-')
        return {
          url: `${baseUrl}/locations/${slugifiedSuburb}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.75
        }
      })
    )
  )

  // Location-specific service pages (suburb + service combinations)
  const services = [
    'regular-cleaning',
    'general-cleaning',
    'once-off-cleaning',
    'deep-cleaning',
    'move-in-cleaning',
    'ndis-cleaning',
    'airbnb-cleaning',
    'commercial-cleaning',
    'end-of-lease-cleaning'
  ]

  const locationServicePages = Object.values(MELBOURNE_REGIONS).flatMap(region =>
    region.councils.flatMap(council =>
      council.key_suburbs.flatMap(suburb => {
        const slugifiedSuburb = suburb.toLowerCase().replace(/\s+/g, '-')
        return services.map(service => ({
          url: `${baseUrl}/locations/${slugifiedSuburb}/${service}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.85
        }))
      })
    )
  )

  // Blog pages
  let blogPages: MetadataRoute.Sitemap = []
  
  try {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/slugs`, {
        next: { revalidate: 3600 },
        cache: 'no-store'
      })
      
      if (res.ok) {
        const { slugs } = await res.json()
        blogPages = slugs.map((slug: string) => ({
          url: `${baseUrl}/blogs/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8
        }))
      }
    }
  } catch (error) {
    console.error('Error fetching blog slugs for sitemap:', error)
  }

  // Combine all pages
  return [
    ...mainPages,
    ...infoPages,
    ...legalPages,
    ...servicePages,
    ...locationPages,
    ...locationServicePages,
    ...blogPages,
  ]
}
