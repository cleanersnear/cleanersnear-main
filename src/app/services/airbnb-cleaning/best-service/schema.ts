export const getBestServiceSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://cleaningprofessionals.com.au/services/airbnb-cleaning/best-service',
    name: 'Best Airbnb Cleaning Service Melbourne',
    description: 'Melbourne\'s best Airbnb cleaning service with professional turnover cleaning, same-day service, competitive pricing, and 100% satisfaction guarantee.',
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
      name: 'Best Airbnb Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Best Studio/1 Bedroom Airbnb Cleaning',
            description: 'Professional turnover cleaning for studio and 1 bedroom properties',
            price: '149.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Best 2 Bedroom Airbnb Cleaning',
            description: 'Comprehensive cleaning service for 2 bedroom short stay properties',
            price: '189.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Best 3+ Bedroom Airbnb Cleaning',
            description: 'Premium cleaning service for larger short stay properties',
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
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Sarah M.'
        },
        reviewBody: 'Best Airbnb cleaning service in Melbourne. Professional, reliable, and always on time.'
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Michael R.'
        },
        reviewBody: 'Top-rated Airbnb cleaning service. Excellent quality and great value for money.'
      }
    ],
    serviceType: 'Airbnb Cleaning Service',
    category: 'Cleaning Services',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://cleaningprofessionals.com.au/services/airbnb-cleaning/book',
      servicePhone: '0450124086'
    }
  }
}
