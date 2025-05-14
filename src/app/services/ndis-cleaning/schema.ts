export const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://cleaningprofessionals.com.au/services/ndis-cleaning',
  name: 'NDIS Cleaning Services Melbourne',
  description: 'Professional NDIS registered cleaning service in Melbourne. Regular support from $45.18/hr, specialized support available. NDIS plan billing, trained support workers, and flexible scheduling.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Cleaning Professionals Melbourne',
    telephone: '0450124086',
    email: 'info@cleaningprofessionals.com.au',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      addressCountry: 'AU'
    }
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '-37.8136',
      longitude: '144.9631'
    },
    geoRadius: '50000'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'NDIS Cleaning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Regular NDIS Support Cleaning',
          description: 'Weekly cleaning support with 10% savings',
          price: '45.18',
          priceCurrency: 'AUD'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'One-Time NDIS Cleaning',
          description: 'Flexible one-time cleaning support',
          price: '50.20',
          priceCurrency: 'AUD'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Specialized NDIS Support',
          description: 'Specialized cleaning support with trained staff',
          price: '55.70',
          priceCurrency: 'AUD'
        }
      }
    ]
  },
  serviceType: 'NDIS Cleaning Service',
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://cleaningprofessionals.com.au/services/ndis-cleaning',
    servicePhone: '0450124086',
    serviceLocation: {
      '@type': 'Place',
      name: 'Melbourne Metropolitan Area'
    }
  },
  termsOfService: 'https://cleaningprofessionals.com.au/terms',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '2500',
    bestRating: '5',
    worstRating: '1'
  },
  additionalType: 'https://schema.org/CleaningService',
  audience: {
    '@type': 'Audience',
    audienceType: 'NDIS Participants'
  },
  potentialAction: {
    '@type': 'ReserveAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://cleaningprofessionals.com.au/services/ndis-cleaning/book',
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform'
      ]
    }
  }
} 