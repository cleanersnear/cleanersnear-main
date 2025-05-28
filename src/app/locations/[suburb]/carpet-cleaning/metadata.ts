import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ suburb: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const suburb = resolvedParams.suburb?.replace(/-/g, ' ') || 'Melbourne'
  const capitalizedSuburb = suburb.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  return {
    title: `Carpet Cleaning ${capitalizedSuburb} | Professional Carpet Cleaners | From $35/room`,
    description: `Professional carpet cleaning services in ${capitalizedSuburb}. Deep steam cleaning, stain & odor removal, rug, sofa, and mattress cleaning. Eco-friendly | same day service | 100% satisfaction guarantee. Book your carpet clean today!`,
    keywords: `carpet cleaning ${suburb}, professional carpet cleaners ${suburb}, carpet stain removal ${suburb}, deep carpet cleaning ${suburb}, eco friendly carpet cleaning ${suburb}, carpet sanitization ${suburb}, rug cleaning ${suburb}, sofa cleaning ${suburb}, mattress cleaning ${suburb}, upholstery cleaning ${suburb}, commercial carpet cleaning ${suburb}, residential carpet cleaning ${suburb}, steam cleaning ${suburb}, pet stain removal ${suburb}, same day carpet cleaning ${suburb}, carpet cleaning company ${suburb}`,
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
    openGraph: {
      title: `Carpet Cleaning ${capitalizedSuburb} | Professional Carpet Cleaners`,
      description: `Expert carpet cleaning in ${capitalizedSuburb}. Deep steam cleaning, stain & odor removal, rug, sofa, and mattress cleaning. Eco-friendly, same day service, 100% satisfaction guarantee.`,
      url: `https://www.cleaningprofessionals.com.au/locations/${suburb.replace(/ /g, '-')}/carpet-cleaning/`,
      siteName: 'Cleaning Professionals Melbourne',
      images: [
        {
          url: '/images/carpet-cleaning-melbourne.jpg',
          width: 1200,
          height: 630,
          alt: `Professional Carpet Cleaning Services ${capitalizedSuburb}`,
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Carpet Cleaning ${capitalizedSuburb} | Book Today`,
      description: `Professional carpet cleaning in ${capitalizedSuburb}. Deep steam cleaning, stain & odor removal, rug, sofa, and mattress cleaning. Eco-friendly, same day service.`,
      images: ['/images/carpet-cleaning-melbourne.jpg'],
    },
    alternates: {
      canonical: `/locations/${suburb.replace(/ /g, '-')}/carpet-cleaning/`,
    },
    authors: [{ name: 'Cleaning Professionals Melbourne' }],
    generator: 'Next.js',
    applicationName: `Carpet Cleaning Services ${capitalizedSuburb}`,
    referrer: 'origin-when-cross-origin',
    creator: 'Cleaning Professionals Melbourne',
    publisher: 'Cleaning Professionals Melbourne',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
    verification: {
      google: 'G-W87SXGYKC1',
    },
    category: 'Carpet Cleaning Services',
    other: {
      'geo.region': 'AU-VIC',
      'geo.placename': capitalizedSuburb,
      'geo.position': '-37.8136;144.9631',
      'ICBM': '-37.8136, 144.9631',
      'og:price:amount': '35.00',
      'og:price:currency': 'AUD',
      'business:contact_data:locality': capitalizedSuburb,
      'business:contact_data:region': 'Victoria',
      'business:contact_data:country': 'Australia',
      'og:availability': 'in stock',
      'business:hours:day': 'Mon-Sun 7:00-20:00',
      'og:service:type': 'Carpet Cleaning',
      'og:phone_number': '0450124086',
      'og:service:features': 'Deep steam cleaning, stain removal, rug cleaning, sofa cleaning, mattress cleaning, eco-friendly, pet stain removal, same day service, 100% satisfaction guarantee',
      'og:service:area': `${capitalizedSuburb}, Victoria, Australia`,
      'og:service:category': 'Residential & Commercial Carpet Cleaning',
      'og:service:booking_url': `https://www.cleaningprofessionals.com.au/locations/${suburb.replace(/ /g, '-')}/carpet-cleaning/book`,
      'og:service:rating': '4.9',
      'og:service:review_count': '2500',
      'og:service:provider': 'Cleaning Professionals Melbourne',
    }
  }
} 