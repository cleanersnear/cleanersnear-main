export const getLocalBusinessSchema = (suburb: string) => {
  // Normalize and capitalize suburb name
  const capitalizedSuburb = suburb.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://cleaningprofessionals.com.au/locations/${suburb}/general-cleaning`,
    name: `Cleaning Professionals ${capitalizedSuburb} - House Cleaning`,
    image: '/images/house-cleaning-melbourne.jpg',
    description: `Professional house cleaning service in ${capitalizedSuburb}. Weekly, fortnightly and one-off cleaning services with satisfaction guarantee. Expert cleaners, all supplies included.`,
    url: `https://cleaningprofessionals.com.au/locations/${suburb}/general-cleaning`,
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
      name: `House Cleaning Services in ${capitalizedSuburb}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Weekly House Cleaning',
            description: 'Regular weekly house cleaning service',
            price: '76.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fortnightly House Cleaning',
            description: 'Regular fortnightly house cleaning service',
            price: '86.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'One-off House Cleaning',
            description: 'One-time deep house cleaning service',
            price: '90.00',
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