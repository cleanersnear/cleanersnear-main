import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ suburb: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const suburb = resolvedParams.suburb.replace(/-/g, ' ')
  const capitalizedSuburb = suburb.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
  const slugSuburb = suburb.toLowerCase().replace(/ /g, '-')

  const locationKeywords = [
    `ndis cleaning near me ${suburb.toLowerCase()}`,
    `ndis cleaning services ${suburb.toLowerCase()}`,
    `ndis registered cleaners ${suburb.toLowerCase()}`,
    `disability cleaning ${suburb.toLowerCase()}`,
    `ndis support cleaning ${suburb.toLowerCase()}`,
    `house cleaning ndis ${suburb.toLowerCase()}`,
    `ndis home cleaning ${suburb.toLowerCase()}`,
    `ndis plan cleaning ${suburb.toLowerCase()}`,
    `ndis cleaning provider ${suburb.toLowerCase()}`,
    `ndis cleaning support ${suburb.toLowerCase()}`,
    `professional ndis cleaners ${suburb.toLowerCase()}`,
    `ndis cleaning service ${suburb.toLowerCase()}`,
    `ndis cleaning rates ${suburb.toLowerCase()}`,
    `ndis cleaning quote ${suburb.toLowerCase()}`
  ].join(', ')

  return {
    title: `NDIS Cleaning Services in ${capitalizedSuburb} | Registered NDIS Cleaners Near Me` ,
    description: `Professional NDIS cleaning services in ${capitalizedSuburb}. NDIS registered cleaners | Weekly from $45.18/hr | One-off from $50.20/hr | Specialized support $55.70/hr | All cleaning supplies included | Trained support workers. Book your NDIS cleaning in ${capitalizedSuburb} today!`,
    keywords: locationKeywords,
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
      title: `NDIS Cleaning in ${capitalizedSuburb} | Registered NDIS Cleaners` ,
      description: `NDIS cleaning services in ${capitalizedSuburb} | Regular support from $45.18/hr | Specialized support available | NDIS registered cleaners | Trained support workers | Flexible scheduling`,
      url: `https://www.cleaningprofessionals.com.au/locations/${slugSuburb}/ndis-cleaning/`,
      siteName: 'Cleaning Professionals Melbourne',
      images: [
        {
          url: '/images/ndis-cleaning-melbourne.jpg',
          width: 1200,
          height: 630,
          alt: `NDIS Cleaning Services in ${capitalizedSuburb}`,
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `NDIS Cleaning in ${capitalizedSuburb} | Registered NDIS Cleaners`,
      description: `NDIS registered cleaning services in ${capitalizedSuburb}. Professional cleaners | Regular & specialized support | Trained staff | NDIS plan billing available`,
      images: ['/images/ndis-cleaning-melbourne.jpg'],
    },
    alternates: {
      canonical: `/locations/${slugSuburb}/ndis-cleaning/`,
    },
    authors: [{ name: 'Cleaning Professionals Melbourne' }],
    generator: 'Next.js',
    applicationName: `NDIS Cleaning Services ${capitalizedSuburb}`,
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
    category: 'NDIS Cleaning Services',
    other: {
      'geo.region': 'AU-VIC',
      'geo.placename': capitalizedSuburb,
      'geo.position': '-37.8136;144.9631',
      'ICBM': '-37.8136, 144.9631',
      'og:price:amount': '45.18',
      'og:price:currency': 'AUD',
      'business:contact_data:locality': capitalizedSuburb,
      'business:contact_data:region': 'Victoria',
      'business:contact_data:country': 'Australia',
      'og:availability': 'in stock',
      'business:hours:day': 'Mon-Sun 7:00-20:00',
      'og:service:type': 'NDIS Cleaning',
      'og:price:standard_amount': '50.20',
      'og:phone_number': '0450124086'
    }
  }
} 