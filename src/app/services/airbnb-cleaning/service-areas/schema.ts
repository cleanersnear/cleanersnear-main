export const getServiceAreasSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cleaningprofessionals.com.au/services/airbnb-cleaning/service-areas',
    name: 'Cleaning Professionals Melbourne - Airbnb Cleaning Service Areas',
    image: '/images/airbnb-cleaning-melbourne.jpg',
    description: 'Complete list of Melbourne suburbs where we provide Airbnb cleaning services. Professional cleaning for short stay properties across all Melbourne areas.',
    url: 'https://cleaningprofessionals.com.au/services/airbnb-cleaning/service-areas',
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
        '@type': 'City',
        name: 'Melbourne CBD',
        postalCode: '3000'
      },
      {
        '@type': 'City',
        name: 'South Yarra',
        postalCode: '3141'
      },
      {
        '@type': 'City',
        name: 'St Kilda',
        postalCode: '3182'
      },
      {
        '@type': 'City',
        name: 'Richmond',
        postalCode: '3121'
      },
      {
        '@type': 'City',
        name: 'Brunswick',
        postalCode: '3056'
      },
      {
        '@type': 'City',
        name: 'Carlton',
        postalCode: '3053'
      },
      {
        '@type': 'City',
        name: 'Docklands',
        postalCode: '3008'
      },
      {
        '@type': 'City',
        name: 'Northcote',
        postalCode: '3070'
      },
      {
        '@type': 'City',
        name: 'Fitzroy',
        postalCode: '3065'
      },
      {
        '@type': 'City',
        name: 'Collingwood',
        postalCode: '3066'
      },
      {
        '@type': 'City',
        name: 'Preston',
        postalCode: '3072'
      },
      {
        '@type': 'City',
        name: 'Thornbury',
        postalCode: '3071'
      },
      {
        '@type': 'City',
        name: 'Coburg',
        postalCode: '3058'
      },
      {
        '@type': 'City',
        name: 'Essendon',
        postalCode: '3040'
      },
      {
        '@type': 'City',
        name: 'Moonee Ponds',
        postalCode: '3039'
      },
      {
        '@type': 'City',
        name: 'Ascot Vale',
        postalCode: '3032'
      },
      {
        '@type': 'City',
        name: 'Footscray',
        postalCode: '3011'
      },
      {
        '@type': 'City',
        name: 'Yarraville',
        postalCode: '3013'
      },
      {
        '@type': 'City',
        name: 'Williamstown',
        postalCode: '3016'
      },
      {
        '@type': 'City',
        name: 'Port Melbourne',
        postalCode: '3207'
      },
      {
        '@type': 'City',
        name: 'Albert Park',
        postalCode: '3206'
      },
      {
        '@type': 'City',
        name: 'Middle Park',
        postalCode: '3206'
      },
      {
        '@type': 'City',
        name: 'West Melbourne',
        postalCode: '3003'
      },
      {
        '@type': 'City',
        name: 'North Melbourne',
        postalCode: '3051'
      },
      {
        '@type': 'City',
        name: 'Kensington',
        postalCode: '3031'
      },
      {
        '@type': 'City',
        name: 'Flemington',
        postalCode: '3031'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Airbnb Cleaning Service Areas',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Melbourne CBD Airbnb Cleaning',
            description: 'Professional Airbnb cleaning service in Melbourne CBD',
            price: '149.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'South Yarra Airbnb Cleaning',
            description: 'Professional Airbnb cleaning service in South Yarra',
            price: '149.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'St Kilda Airbnb Cleaning',
            description: 'Professional Airbnb cleaning service in St Kilda',
            price: '149.00',
            priceCurrency: 'AUD'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Richmond Airbnb Cleaning',
            description: 'Professional Airbnb cleaning service in Richmond',
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
