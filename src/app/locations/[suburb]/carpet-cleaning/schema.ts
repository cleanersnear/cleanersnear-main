export const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://cleaningprofessionals.com.au/services/carpet-cleaning',
  name: 'Carpet Cleaning Services Melbourne',
  description: 'Professional carpet cleaning service in Melbourne. Deep steam cleaning, stain & odor removal, rug, sofa, and mattress cleaning. Eco-friendly, pet-safe, same day service, 100% satisfaction guarantee.',
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
    name: 'Carpet Cleaning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Carpet Cleaning (per room)',
          description: 'Deep steam cleaning for bedrooms, living rooms, and study rooms',
          price: '35.00',
          priceCurrency: 'AUD'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Rug Cleaning',
          description: 'Professional cleaning for large, medium, and small rugs',
          price: '35.00',
          priceCurrency: 'AUD'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sofa/Couch Cleaning',
          description: 'Steam or dry cleaning for sofas and couches',
          price: '70.00',
          priceCurrency: 'AUD'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Chair Cleaning',
          description: 'Cleaning for recliner, day, arm chairs, and ottomans',
          price: '25.00',
          priceCurrency: 'AUD'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mattress Cleaning',
          description: 'Steam cleaning for all mattress sizes',
          price: '40.00',
          priceCurrency: 'AUD'
        }
      }
    ]
  },
  serviceType: 'Carpet Cleaning Service',
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://cleaningprofessionals.com.au/services/carpet-cleaning',
    servicePhone: '0450124086',
    serviceLocation: {
      '@type': 'Place',
      name: 'Melbourne Metropolitan Area'
    }
  },
  termsOfService: 'https://cleaningprofessionals.com.au/terms',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '2500',
    bestRating: '5',
    worstRating: '1'
  },
  additionalType: 'https://schema.org/CleaningService',
  audience: {
    '@type': 'Audience',
    audienceType: 'Homeowners, Renters, Businesses'
  },
  potentialAction: {
    '@type': 'ReserveAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://cleaningprofessionals.com.au/services/carpet-cleaning/book',
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform'
      ]
    }
  },
  // FAQPage structured data
  faqPage: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How is carpet cleaning priced?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We offer transparent, upfront pricing based on the number of rooms, size of the area, and any additional services like upholstery or rug cleaning. Our standard room cleaning starts at $35, with no hidden fees—what you see is what you pay.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What carpet cleaning methods do you use?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We use professional hot water extraction (steam cleaning) for most carpets, which is highly effective for deep cleaning and stain removal. We also offer dry cleaning for delicate or specialty carpets and encapsulation cleaning for commercial spaces.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How long does it take for carpets to dry?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Most carpets dry within 3-6 hours after cleaning, depending on ventilation, carpet thickness, and weather conditions. We use powerful extraction equipment to minimize drying time and can provide fans if needed.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can you remove all stains and odors?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We have a high success rate with stain and odor removal, including pet stains, wine, coffee, food spills, and more. While most stains can be removed, some older or set-in stains may not come out completely—but we always do our best!'
        }
      },
      {
        '@type': 'Question',
        'name': 'Do I need to move my furniture before cleaning?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We ask that you move small and breakable items before our arrival. Our technicians can help move light furniture (like chairs and small tables) as needed, but we do not move heavy or valuable items such as beds, pianos, or electronics for safety reasons.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is your carpet cleaning safe for kids and pets?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes! We use eco-friendly, non-toxic cleaning solutions that are safe for children, pets, and allergy sufferers. Our cleaning products are biodegradable and leave no harmful residues.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How can I deep clean my carpet myself?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'You can deep clean your carpet by vacuuming thoroughly first, treating stains with appropriate cleaners, and using a carpet shampooer or steam cleaner. However, for best results and to avoid damage, professional cleaning is recommended, especially for tough stains or high-traffic areas.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is it cheaper to clean your own carpet?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'While DIY carpet cleaning may seem cheaper upfront, professional cleaning provides better results and can actually save money long-term by extending your carpet\'s lifespan. Professional equipment and expertise ensure thorough cleaning without the risk of over-wetting or damage.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is it worth getting carpets cleaned professionally?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Absolutely! Regular professional cleaning helps maintain the quality of your carpet by removing deep-seated dirt and debris that can wear down fibers over time. It also improves indoor air quality, removes allergens, and keeps your home looking and smelling fresh.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is it better to shampoo or steam clean carpets?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'For a deeper, more effective clean, steam cleaning (hot water extraction) is generally preferred over shampooing. Steam cleaning penetrates deep into carpet fibers to remove dirt, stains, and allergens, while shampooing mostly cleans the surface and can leave residues.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How often should I have my carpets professionally cleaned?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Most experts recommend professional carpet cleaning every 6-12 months for average households. High-traffic areas, homes with pets, children, or allergy sufferers may benefit from cleaning every 3-6 months. Commercial spaces typically need quarterly cleaning.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Will carpet cleaning remove pet odors and stains?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Professional carpet cleaning is highly effective at removing most pet odors and stains. We use specialized enzyme-based treatments that break down pet urine crystals and neutralize odors at the source. For severe pet odor issues, we may recommend additional treatments or deodorizing services.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can you clean delicate or specialty rugs?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, we offer cleaning for all types of rugs, including delicate Persian rugs, antique rugs, wool rugs, and specialty materials like silk or jute. Our technicians assess each rug individually and use appropriate cleaning methods to ensure safe and effective cleaning.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What should I do to prepare for carpet cleaning?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Before we arrive, please vacuum lightly, remove small items and breakables from the area, and identify any specific stains or problem areas. We\'ll handle the rest! It\'s also helpful to have pets secured in another area during cleaning.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Do you offer same-day carpet cleaning service?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, we offer same-day service when possible, depending on availability and the size of the job. For urgent cleaning needs, please call us directly and we\'ll do our best to accommodate your schedule.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What\'s the difference between residential and commercial carpet cleaning?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Commercial carpet cleaning typically involves larger areas, different scheduling requirements, and may use different cleaning methods suited for high-traffic commercial carpets. We offer flexible scheduling for businesses, including after-hours and weekend cleaning.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can carpet cleaning help with allergies?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes! Professional carpet cleaning removes allergens like dust mites, pollen, pet dander, and other particles trapped deep in carpet fibers. This can significantly improve indoor air quality and reduce allergy symptoms.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What happens if I\'m not satisfied with the cleaning?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We stand behind our work with a satisfaction guarantee. If you\'re not completely happy with the results, please contact us within 24 hours and we\'ll return to re-clean any areas of concern at no additional charge.'
        }
      }
    ]
  }
} 