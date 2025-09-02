export const getHouseCleaningSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://cleaningprofessionals.com.au/services/airbnb-cleaning/house-cleaning',
    name: 'Airbnb House Cleaning Melbourne',
    description: 'Professional Airbnb house cleaning service in Melbourne. Expert house cleaning for short stay properties, vacation rentals, and holiday homes.',
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
      '@type': 'City',
      name: 'Melbourne'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Airbnb House Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Studio/1 Bedroom House Cleaning',
            description: 'Complete house cleaning for studio and 1 bedroom Airbnb properties',
            price: '149.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '2 Bedroom House Cleaning',
            description: 'Comprehensive house cleaning for 2 bedroom short stay properties',
            price: '189.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '3+ Bedroom House Cleaning',
            description: 'Full house cleaning service for larger short stay properties',
            price: '298.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Vacation Rental House Cleaning',
            description: 'Specialized house cleaning for vacation rental properties',
            price: '149.00',
            priceCurrency: 'AUD'
          }
        }
      ]
    },
    serviceType: 'House Cleaning Service',
    category: 'Cleaning Services',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://cleaningprofessionals.com.au/services/airbnb-cleaning/book',
      servicePhone: '0450124086'
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
