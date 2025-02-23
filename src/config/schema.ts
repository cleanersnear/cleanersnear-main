export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Cleaning Professionals Australia',
  image: 'https://cleaningprofessionals.com.au/images/logo.png',
  '@id': 'https://cleaningprofessionals.com.au',
  url: 'https://cleaningprofessionals.com.au',
  telephone: '0450124086',
  description: 'Professional cleaning services in Melbourne including end of lease cleaning, deep cleaning, NDIS cleaning, and regular cleaning services. Servicing all Melbourne suburbs.',
  
  // Mobile business - no physical address
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
    addressCountry: 'AU'
  },
  
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: -37.8136,
      longitude: 144.9631
    },
    geoRadius: '50000' // 50km radius covering Melbourne suburbs
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
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '09:00',
      closes: '19:00'
    }
  ],

  priceRange: '$$',
  
  // Services offered
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cleaning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'End of Lease Cleaning',
          description: 'Comprehensive end of lease cleaning service with 100% bond back guarantee'
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: [
            { 'Studio/1 Bedroom': '260-315' },
            { '2 Bedrooms': '287-408' },
            { '3 Bedrooms': '359-650' },
            { '4 Bedrooms': '545-890' }
          ],
          priceCurrency: 'AUD'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Regular House Cleaning',
          description: 'Weekly, fortnightly, or monthly cleaning services'
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: {
            'Weekly Rate': '48.50',
            'Fortnightly Rate': '58.50',
            '3-Weekly Rate': '63.05',
            'Monthly/One-Time': '65.00'
          },
          description: 'Per hour rates with discounts: Weekly (10% OFF), Fortnightly (5% OFF), 3-Weekly (3% OFF)',
          priceCurrency: 'AUD'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'NDIS Cleaning',
          description: 'Specialized cleaning services for NDIS participants'
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '45-55',
          description: 'Per hour (NDIS funding typically covers up to $50.20 per hour)',
          priceCurrency: 'AUD'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Move In/Out Cleaning',
          description: 'Complete cleaning service for moving transitions'
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: [
            { 'Studio/1 Bedroom': '220-280' },
            { '2 Bedrooms': '280-350' },
            { '3 Bedrooms': '350-450' },
            { '4 Bedrooms': '450-550' }
          ],
          priceCurrency: 'AUD'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'General House Cleaning (Flat Rate)',
          description: 'Complete home cleaning with fixed rates'
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: [
            { 'Studio/1 Bedroom': '178' },
            { '2 Bedrooms': '212' },
            { '3 Bedrooms': '309' },
            { '4 Bedrooms': '395' }
          ],
          description: 'Includes all cleaning supplies and equipment',
          priceCurrency: 'AUD'
        }
      }
    ]
  },

  // Special Offers
  offers: [
    {
      '@type': 'Offer',
      name: 'Weekly Cleaning Discount',
      description: 'Save 10% on weekly cleaning services',
      availabilityStarts: '2024-01-01',
      availabilityEnds: '2024-12-31'
    },
    {
      '@type': 'Offer',
      name: 'Fortnightly Cleaning Discount',
      description: 'Save 5% on fortnightly cleaning services',
      availabilityStarts: '2024-01-01',
      availabilityEnds: '2024-12-31'
    },
    {
      '@type': 'Offer',
      name: '3-Weekly Cleaning Discount',
      description: 'Save 3% on 3-weekly cleaning services',
      availabilityStarts: '2024-01-01',
      availabilityEnds: '2024-12-31'
    }
  ]
}) 