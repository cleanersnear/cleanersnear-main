export const getLocalBusinessSchema = (suburb: string) => {
  // Normalize and capitalize suburb name
  const capitalizedSuburb = suburb.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://cleaningprofessionals.com.au/locations/${suburb}/ndis-cleaning`,
    name: `Cleaning Professionals ${capitalizedSuburb} - NDIS Cleaning`,
    image: '/images/ndis-cleaning-melbourne.jpg',
    description: `NDIS registered cleaning service in ${capitalizedSuburb}. Weekly, one-off, and specialized support. Trained support workers, all supplies included.`,
    url: `https://cleaningprofessionals.com.au/locations/${suburb}/ndis-cleaning`,
    telephone: '0450124086',
    email: 'info@cleaningprofessionals.com.au',
    priceRange: '$$',
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
      name: `NDIS Cleaning Services in ${capitalizedSuburb}`,
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2500',
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