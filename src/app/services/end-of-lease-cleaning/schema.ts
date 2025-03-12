export const getLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cleaningprofessionals.com.au/services/end-of-lease-cleaning',
    name: 'Cleaning Professionals Melbourne - End of Lease Cleaning',
    image: '/images/end-of-lease-cleaning-melbourne.jpg',
    description: 'Professional end of lease cleaning service in Melbourne with 100% bond back guarantee. Expert cleaners, real estate approved, same-day service available.',
    url: 'https://cleaningprofessionals.com.au/services/end-of-lease-cleaning',
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
      name: 'End of Lease Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '1 Bedroom/Studio Apartment Cleaning',
            price: '260.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '2 Bedroom Apartment Cleaning',
            price: '287.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '3 Bedroom House Cleaning',
            price: '359.00',
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
    }
  }
} 