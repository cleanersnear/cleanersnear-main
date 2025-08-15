import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Melbourne Cleaning Services | Professional House Cleaners Melbourne CBD | Cleaning Professionals",
    description: "Looking for Melbourne cleaning services? Our professional house cleaners provide expert cleaning services in Melbourne CBD and surrounding areas. End of lease, NDIS, carpet, and commercial cleaning. Book your local Melbourne cleaner today!",
    keywords: [
      "melbourne cleaning services",
      "house cleaning melbourne",
      "house cleaners melbourne",
      "cleaning services melbourne",
      "professional cleaners melbourne",
      "melbourne cbd cleaning",
      "house cleaning melbourne cbd",
      "end of lease cleaning melbourne",
      "carpet cleaning melbourne",
      "commercial cleaning melbourne",
      "NDIS cleaning melbourne",
      "cleaning services near me melbourne",
      "house cleaners near me melbourne",
      "professional cleaning melbourne",
      "local cleaners melbourne",
      "residential cleaning melbourne",
      "office cleaning melbourne",
      "apartment cleaning melbourne",
      "deep cleaning melbourne",
      "spring cleaning melbourne",
      "melbourne cbd cleaning reviews",
      "cleaning company melbourne cbd",
      "trusted cleaners melbourne",
      "melbourne cleaning testimonials",
      "cleaning services melbourne cbd reviews"
    ],
    alternates: {
      canonical: "/locations/melbourne-cbd/",
    },
    openGraph: {
      title: "Melbourne Cleaning Services | Professional House Cleaners Melbourne CBD",
      description: "Professional Melbourne cleaning services in CBD and surrounding areas. Trusted house cleaners for homes and businesses. End of lease, NDIS, carpet cleaning.",
      url: "https://www.cleaningprofessionals.com.au/locations/melbourne-cbd/",
      type: 'website',
      images: [
        {
          url: '/images/homepage/Cleaning Professionals Desktop Hero.png',
          width: 1200,
          height: 630,
          alt: 'Professional Melbourne Cleaning Services - House Cleaners Melbourne CBD',
        }
      ],
      siteName: 'Cleaning Professionals Melbourne'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Melbourne Cleaning Services | Professional House Cleaners Melbourne CBD',
      description: 'Professional Melbourne cleaning services in CBD and surrounding areas. Trusted house cleaners for homes and businesses.',
      images: ['/images/homepage/Cleaning Professionals Desktop Hero.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'structured-data': JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          'name': 'Cleaning Professionals - Melbourne Cleaning Services',
          'image': 'https://www.cleaningprofessionals.com.au/images/logo.png',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Melbourne CBD',
            'addressRegion': 'VIC',
            'addressCountry': 'AU',
            'postalCode': '3000'
          },
          'telephone': '0450124086',
          'url': 'https://www.cleaningprofessionals.com.au/locations/melbourne-cbd/',
          'description': 'Professional Melbourne cleaning services in CBD and surrounding areas. Expert house cleaners for end of lease, NDIS, carpet, and commercial cleaning.',
          'serviceArea': {
            '@type': 'City',
            'name': 'Melbourne CBD'
          },
          'areaServed': [
            {
              '@type': 'City',
              'name': 'Melbourne CBD'
            },
            {
              '@type': 'City',
              'name': 'Carlton'
            },
            {
              '@type': 'City',
              'name': 'North Melbourne'
            },
            {
              '@type': 'City',
              'name': 'Docklands'
            }
          ],
          'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Melbourne Cleaning Services',
            'itemListElement': [
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'House Cleaning Melbourne CBD'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'End of Lease Cleaning Melbourne'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'NDIS Cleaning Melbourne'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'Carpet Cleaning Melbourne'
                }
              },
              {
                '@type': 'Offer',
                'itemOffered': {
                  '@type': 'Service',
                  'name': 'Commercial Cleaning Melbourne'
                }
              }
            ]
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.8',
            'reviewCount': '127',
            'bestRating': '5',
            'worstRating': '1'
          },
          'review': [
            {
              '@type': 'Review',
              'author': {
                '@type': 'Person',
                'name': 'Sarah T.'
              },
              'reviewRating': {
                '@type': 'Rating',
                'ratingValue': '5',
                'bestRating': '5'
              },
              'reviewBody': 'Absolutely amazing service! Got my full bond back without any issues. The team was professional and thorough. Highly recommend in Melbourne CBD!'
            },
            {
              '@type': 'Review',
              'author': {
                '@type': 'Person',
                'name': 'Michael C.'
              },
              'reviewRating': {
                '@type': 'Rating',
                'ratingValue': '5',
                'bestRating': '5'
              },
              'reviewBody': 'Very impressed with the attention to detail. They cleaned areas I didn\'t even think about. The bond back guarantee gave me peace of mind.'
            },
            {
              '@type': 'Review',
              'author': {
                '@type': 'Person',
                'name': 'Liam P.'
              },
              'reviewRating': {
                '@type': 'Rating',
                'ratingValue': '5',
                'bestRating': '5'
              },
              'reviewBody': 'Booked online in under a minute and the team arrived on time. Honest pricing, no hidden fees, and they followed the real estate checklist.'
            },
            {
              '@type': 'Review',
              'author': {
                '@type': 'Person',
                'name': 'Amelia R.'
              },
              'reviewRating': {
                '@type': 'Rating',
                'ratingValue': '5',
                'bestRating': '5'
              },
              'reviewBody': 'The oven and bathrooms look brand new. Friendly cleaners and great communication. Highly recommend their end of lease clean.'
            },
            {
              '@type': 'Review',
              'author': {
                '@type': 'Person',
                'name': 'Noah K.'
              },
              'reviewRating': {
                '@type': 'Rating',
                'ratingValue': '5',
                'bestRating': '5'
              },
              'reviewBody': 'Professional, insured and eco-friendly products. Agent was happy at final inspection and my full bond was returned the same day.'
            }
          ]
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': 'Melbourne Cleaning Services | Professional House Cleaners Melbourne CBD',
          'description': 'Professional Melbourne cleaning services in CBD and surrounding areas. Expert house cleaners for end of lease, NDIS, carpet, and commercial cleaning.',
          'url': 'https://www.cleaningprofessionals.com.au/locations/melbourne-cbd/',
          'mainEntity': {
            '@type': 'LocalBusiness',
            'name': 'Cleaning Professionals Melbourne'
          }
        }
      ])
    }
  }
} 
