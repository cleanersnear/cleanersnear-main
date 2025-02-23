import { MetadataRoute } from 'next'
import { MELBOURNE_REGIONS } from '@/utils/location/regions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cleaningprofessionals.com.au'
  
  // Main pages with high priority
  const mainPages = [
    {
      route: '',
      priority: 1.0,
      changeFrequency: 'daily' as const
    },
    {
      route: 'about',
      priority: 0.9,
      changeFrequency: 'weekly' as const
    },
    {
      route: 'reviews',
      priority: 0.9,
      changeFrequency: 'daily' as const
    },
    {
      route: 'contact',
      priority: 0.8,
      changeFrequency: 'weekly' as const
    },
    {
      route: 'pricing',
      priority: 0.9,
      changeFrequency: 'daily' as const
    },
    {
      route: 'faqs',
      priority: 0.8,
      changeFrequency: 'weekly' as const
    },
    {
      route: 'career',
      priority: 0.7,
      changeFrequency: 'weekly' as const
    }
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority
  }))

  // Service pages with all combinations
  const servicePages = [
    {
      route: 'services/carpet-cleaning',
      priority: 0.95,
      subcategories: [
        'residential-carpet-cleaning',
        'commercial-carpet-cleaning',
        'steam-carpet-cleaning',
        'dry-carpet-cleaning',
        'carpet-stain-removal',
        'carpet-deodorizing',
        'emergency-carpet-cleaning'
      ]
    },
    {
      route: 'services/end-of-lease-cleaning',
      priority: 0.95,
      subcategories: [
        'bond-cleaning',
        'vacate-cleaning',
        'rental-property-cleaning',
        'move-out-cleaning',
        'bond-back-guarantee'
      ]
    },
    {
      route: 'services/ndis-cleaning',
      priority: 0.95,
      subcategories: [
        'disability-support-cleaning',
        'assisted-living-cleaning',
        'specialized-cleaning-services',
        'ndis-approved-cleaning'
      ]
    },
    {
      route: 'services/commercial-cleaning',
      priority: 0.95,
      subcategories: [
        'office-cleaning',
        'retail-cleaning',
        'medical-facility-cleaning',
        'warehouse-cleaning',
        'school-cleaning',
        'gym-cleaning',
        'restaurant-cleaning',
        'industrial-cleaning'
      ]
    },
    {
      route: 'services/general-cleaning',
      priority: 0.9,
      subcategories: [
        'regular-cleaning',
        'deep-cleaning',
        'spring-cleaning',
        'one-time-cleaning',
        'recurring-cleaning'
      ]
    },
    {
      route: 'services/window-cleaning',
      priority: 0.9,
      subcategories: [
        'residential-windows',
        'commercial-windows',
        'high-rise',
        'pressure-cleaning'
      ]
    },
    {
      route: 'services/after-renovation-cleaning',
      priority: 0.9,
      subcategories: [
        'post-construction-cleaning',
        'builders-cleaning',
        'renovation-cleanup'
      ]
    },
    {
      route: 'services/oven-cleaning',
      priority: 0.85,
      subcategories: [
        'bbq-cleaning',
        'kitchen-deep-cleaning',
        'appliance-cleaning'
      ]
    }
  ].flatMap(({ route, priority, subcategories }) => [
    {
      url: `${baseUrl}/${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority
    },
    ...subcategories.map(sub => ({
      url: `${baseUrl}/${route}/${sub}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: priority - 0.05
    }))
  ])

  // Enhanced location pages with all service combinations
  const locationPages = Object.values(MELBOURNE_REGIONS).flatMap(region =>
    region.councils.flatMap(council =>
      council.key_suburbs.flatMap(suburb => {
        const slugifiedSuburb = suburb.toLowerCase().replace(/\s+/g, '-')
        const services = [
          'carpet-cleaning',
          'end-of-lease-cleaning',
          'ndis-cleaning',
          'commercial-cleaning',
          'general-cleaning',
          'window-cleaning',
          'after-renovation-cleaning',
          'oven-cleaning'
        ]
        
        return [
          {
            url: `${baseUrl}/locations/${slugifiedSuburb}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.85
          },
          ...services.map(service => ({
            url: `${baseUrl}/locations/${slugifiedSuburb}/${service}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.83
          }))
        ]
      })
    )
  )

  // Quick Book Flow Pages
  const quickBookPages = [
    {
      route: 'quick-book',
      priority: 0.9,
      subpages: [
        'details',
        'location',
        'service',
        'confirmation',
        'payment',
        'success'
      ]
    }
  ].flatMap(({ route, priority, subpages }) => [
    {
      url: `${baseUrl}/${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority
    },
    ...subpages.map(subpage => ({
      url: `${baseUrl}/${route}/${subpage}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: priority - 0.1
    }))
  ])

  // Blog structure from your existing blog components
  const blogData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/slugs`, {
    next: { revalidate: 3600 }
  }).then(res => res.json()).catch(() => ({ slugs: [] }))

  const blogPages = [
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/blogs/categories/cleaning-tips`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75
    },
    {
      url: `${baseUrl}/blogs/categories/home-maintenance`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75
    },
    ...blogData.slugs.map((slug: string) => ({
      url: `${baseUrl}/blogs/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }))
  ]

  // Service Area Pages with Regions
  const serviceAreaPages = Object.values(MELBOURNE_REGIONS).flatMap(region => [
    {
      url: `${baseUrl}/service-areas/${region.name.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85
    },
    // Add council-specific pages
    ...region.councils.map(council => ({
      url: `${baseUrl}/service-areas/${region.name.toLowerCase().replace(/\s+/g, '-')}/${council.name.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.83
    }))
  ])

  // Special Offers & Seasonal Pages
  const specialPages = [
    {
      url: `${baseUrl}/offers/new-customer-discount`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85
    },
    {
      url: `${baseUrl}/offers/seasonal-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85
    },
    {
      url: `${baseUrl}/services/spring-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85
    },
    {
      url: `${baseUrl}/services/holiday-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85
    }
  ]

  // Review Pages
  const reviewPages = [
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/reviews/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }
  ]

  // Service Combinations with Locations
  const serviceLocationCombos = Object.values(MELBOURNE_REGIONS)
    .flatMap(region =>
      region.councils.flatMap(council =>
        council.key_suburbs.flatMap(suburb => {
          const slugifiedSuburb = suburb.toLowerCase().replace(/\s+/g, '-')
          return [
            'end-of-lease-cleaning',
            'carpet-cleaning',
            'ndis-cleaning'
          ].map(service => ({
            url: `${baseUrl}/services/${service}/${slugifiedSuburb}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.82
          }))
        })
      )
    )

  // Information Pages
  const infoPages = [
    {
      url: `${baseUrl}/cleaning-guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75
    },
    {
      url: `${baseUrl}/cleaning-tips`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75
    },
    {
      url: `${baseUrl}/pricing/calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85
    }
  ]

  // Calculator Pages
  const calculatorPages = [
    {
      url: `${baseUrl}/pricing/calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85
    },
    {
      url: `${baseUrl}/pricing/calculator/end-of-lease`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85
    },
    {
      url: `${baseUrl}/pricing/calculator/carpet-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85
    },
    {
      url: `${baseUrl}/pricing/calculator/general-cleaning`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85
    }
  ]

  // Return all combined routes
  return [
    ...mainPages,
    ...servicePages,
    ...locationPages,
    ...quickBookPages,
    ...blogPages,
    ...serviceAreaPages,
    ...specialPages,
    ...reviewPages,
    ...serviceLocationCombos,
    ...infoPages,
    ...calculatorPages
  ]
} 