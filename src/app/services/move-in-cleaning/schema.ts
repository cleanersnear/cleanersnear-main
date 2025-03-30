export const getLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cleaningprofessionals.com.au/services/move-in-cleaning',
    name: 'Cleaning Professionals Melbourne - Move In & Out Cleaning',
    image: '/images/move-in-cleaning-melbourne.jpg',
    description: 'Professional move in and move out cleaning service in Melbourne. Moving in cleaning from $48.50/hr and moving out cleaning from $63.05/hr. Expert cleaners, all supplies included.',
    url: 'https://cleaningprofessionals.com.au/services/move-in-cleaning',
    telephone: '0450124086',
    email: 'info@cleaningprofessionals.com.au',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Melbourne',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      postalCode: '3000',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-37.8136',
      longitude: '144.9631'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '07:00',
        closes: '20:00'
      }
    ],
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
      name: 'Move In & Out Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Moving In Cleaning',
            description: 'Deep cleaning before you move into your new home',
            price: '48.50',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Moving Out Cleaning',
            description: 'End of lease or pre-sale cleaning service',
            price: '63.05',
            priceCurrency: 'AUD'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '5000',
      bestRating: '5',
      worstRating: '1'
    },
    sameAs: [
      'https://www.facebook.com/people/Cleaning-Professionals/61572518431848/',
      'https://www.instagram.com/cleaning__professionals/',
      'https://www.linkedin.com/company/cleaning-professionals-melbourne/'
    ]
  }
}
