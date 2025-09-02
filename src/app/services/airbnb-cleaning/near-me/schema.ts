export const getNearMeSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cleaningprofessionals.com.au/services/airbnb-cleaning/near-me',
    name: 'Cleaning Professionals Melbourne - Airbnb Cleaning Near Me',
    image: '/images/airbnb-cleaning-melbourne.jpg',
    description: 'Find professional Airbnb cleaning services near you in Melbourne. Local Airbnb cleaners available in your area with same-day service.',
    url: 'https://cleaningprofessionals.com.au/services/airbnb-cleaning/near-me',
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
    areaServed: [
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: '-37.8136',
          longitude: '144.9631'
        },
        geoRadius: '50000'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Local Airbnb Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Local Studio/1 Bedroom Airbnb Cleaning',
            description: 'Professional local cleaning for studio and 1 bedroom properties',
            price: '149.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Local 2 Bedroom Airbnb Cleaning',
            description: 'Comprehensive local cleaning for 2 bedroom properties',
            price: '189.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Local 3+ Bedroom Airbnb Cleaning',
            description: 'Full local cleaning service for larger properties',
            price: '298.00',
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
