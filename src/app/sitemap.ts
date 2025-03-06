import { MetadataRoute } from 'next'
import { MELBOURNE_REGIONS } from '@/utils/location/regions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cleaningprofessionals.com.au'
  
  // Priority 1: Main pages with highest priority (1.0)
  const mainPages = [
    {
      route: '',
      priority: 1.0,
      changeFrequency: 'daily' as const
    },
    {
      route: 'services',
      priority: 1.0,
      changeFrequency: 'daily' as const
    }
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority
  }))

  // Priority 1.5: Core service pages (0.95)
  const coreServicePages = [
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
  ].map(service => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.95,
    images: [{
      loc: `${baseUrl}/images/services/${service}.webp`,
      title: `Professional ${service.replace('-', ' ')} Services in Melbourne`,
      caption: `Expert ${service.replace('-', ' ')} services by Cleaning Professionals Melbourne`
    }]
  }))

  // Priority 2: Important pages (0.9)
  const importantPages = [
    'about',
    'reviews',
    'locations',
    'pricing',
    'blogs',
    'faqs',
    'contact',
    'get-quote',
    'privacy-policy',
    'terms-and-conditions'
  ].map(route => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9
  }))

  // Priority 2: Important blog posts (0.9)
  const importantBlogPosts = [
    'professional-cleaning-services-melbourne',
    'professional-mold-removal-melbourne-guide',
    'professional-move-out-cleaning-melbourne-guide',
    'move-out-cleaning-mistakes-Victoria',
    'professional-end-of-lease-cleaning-Melbourne',
    'professional-office-cleaning-melbourne-benefits'
  ].map(slug => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }))

  // Quick Book Flow Pages (0.8)
  const quickBookPages = [
    'quick-book',
    'quick-book/location',
    'quick-book/service'
  ].map(route => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // Location pages (0.75)
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

  // Return all combined routes
  return [
    ...mainPages,
    ...coreServicePages,
    ...importantPages,
    ...importantBlogPosts,
    ...quickBookPages,
    ...locationPages
  ]
} 
