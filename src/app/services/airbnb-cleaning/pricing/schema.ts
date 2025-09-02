export const getPricingSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://cleaningprofessionals.com.au/services/airbnb-cleaning/pricing',
    name: 'Airbnb Cleaning Pricing Melbourne',
    description: 'Clear and transparent Airbnb cleaning pricing for all property sizes in Melbourne. Studio, 1-2 bedroom, 3+ bedroom pricing with no hidden fees.',
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
      name: 'Airbnb Cleaning Pricing',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Studio/1 Bedroom Airbnb Cleaning',
            description: 'Complete cleaning service for studio and 1 bedroom properties',
            price: '149.00',
            priceCurrency: 'AUD',
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: '149.00',
              priceCurrency: 'AUD',
              valueAddedTaxIncluded: true
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '2 Bedroom Airbnb Cleaning',
            description: 'Comprehensive cleaning service for 2 bedroom properties',
            price: '189.00',
            priceCurrency: 'AUD',
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: '189.00',
              priceCurrency: 'AUD',
              valueAddedTaxIncluded: true
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '3 Bedroom Airbnb Cleaning',
            description: 'Full cleaning service for 3 bedroom properties',
            price: '298.00',
            priceCurrency: 'AUD',
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: '298.00',
              priceCurrency: 'AUD',
              valueAddedTaxIncluded: true
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '4+ Bedroom Airbnb Cleaning',
            description: 'Premium cleaning service for 4+ bedroom properties',
            price: '310.00',
            priceCurrency: 'AUD',
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: '310.00',
              priceCurrency: 'AUD',
              valueAddedTaxIncluded: true
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hourly Airbnb Cleaning',
            description: 'Flexible hourly cleaning service for any property size',
            price: '49.89',
            priceCurrency: 'AUD',
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: '49.89',
              priceCurrency: 'AUD',
              valueAddedTaxIncluded: true
            }
          }
        }
      ]
    },
    serviceType: 'Cleaning Service',
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
