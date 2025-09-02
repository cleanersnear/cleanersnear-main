export const getMelbourneLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cleaningprofessionals.com.au/services/airbnb-cleaning/melbourne',
    name: 'Cleaning Professionals Melbourne - Airbnb Cleaning Melbourne',
    image: '/images/airbnb-cleaning-melbourne.jpg',
    description: 'Professional Airbnb cleaning service in Melbourne CBD, South Yarra, St Kilda, Richmond & all Melbourne suburbs. Expert turnover cleaning for short stay properties.',
    url: 'https://cleaningprofessionals.com.au/services/airbnb-cleaning/melbourne',
    telephone: '0450124086',
    email: 'info@cleaningprofessionals.com.au',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Melbourne CBD',
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
        '@type': 'City',
        name: 'Melbourne CBD'
      },
      {
        '@type': 'City',
        name: 'South Yarra'
      },
      {
        '@type': 'City',
        name: 'St Kilda'
      },
      {
        '@type': 'City',
        name: 'Richmond'
      },
      {
        '@type': 'City',
        name: 'Brunswick'
      },
      {
        '@type': 'City',
        name: 'Carlton'
      },
      {
        '@type': 'City',
        name: 'Docklands'
      },
      {
        '@type': 'City',
        name: 'Northcote'
      },
      {
        '@type': 'City',
        name: 'Fitzroy'
      },
      {
        '@type': 'City',
        name: 'Collingwood'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Melbourne Airbnb Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Melbourne CBD Airbnb Cleaning',
            price: '149.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'South Yarra Airbnb Cleaning',
            price: '149.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'St Kilda Airbnb Cleaning',
            price: '149.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Richmond Airbnb Cleaning',
            price: '149.00',
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
