export const getLocalBusinessSchema = (suburb: string = 'Melbourne') => {
  const capitalizedSuburb = suburb.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://cleaningprofessionals.com.au/locations/${suburb}/commercial-cleaning`,
    name: `Cleaning Professionals ${capitalizedSuburb} - Commercial Cleaning Services`,
    image: '/images/commercial-cleaning-melbourne.jpg',
    description: `Professional commercial cleaning service in ${capitalizedSuburb}. Specialized in thorough sanitization, detailed cleaning of all surfaces, and intensive cleaning using professional-grade equipment. Starting from $53.07/hour with minimum 3 hours booking.`,
    url: `https://cleaningprofessionals.com.au/locations/${suburb}/commercial-cleaning`,
    telephone: '0450124086',
    email: 'info@cleaningprofessionals.com.au',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: capitalizedSuburb,
      addressLocality: capitalizedSuburb,
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
        opens: '08:00',
        closes: '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '19:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '09:00',
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
      name: `Commercial Cleaning Services in ${capitalizedSuburb}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hourly Commercial Cleaning',
            description: 'Professional commercial cleaning service with minimum 3 hours booking',
            price: '53.07',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '4 Hours Commercial Cleaning Package',
            description: 'Most popular package ideal for small offices and retail spaces',
            price: '212.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '6 Hours Commercial Cleaning Package',
            description: 'Perfect for larger offices and commercial spaces',
            price: '318.00',
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
