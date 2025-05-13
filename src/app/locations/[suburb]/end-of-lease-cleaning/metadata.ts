import { Metadata, Viewport } from 'next'

// Separate viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ suburb: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params
  // Normalize suburb name from URL
  const suburb = resolvedParams.suburb.replace(/-/g, ' ')
  const capitalizedSuburb = suburb.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  // Create location-specific keyword variations
  const locationKeywords = [
    `end of lease cleaning ${suburb.toLowerCase()}`,
    `bond cleaning ${suburb.toLowerCase()}`,
    `vacate cleaning ${suburb.toLowerCase()}`,
    `end of lease cleaners ${suburb.toLowerCase()}`,
    `bond back cleaning ${suburb.toLowerCase()}`,
    `end of tenancy cleaning ${suburb.toLowerCase()}`,
    `exit clean ${suburb.toLowerCase()}`,
    `move out cleaning ${suburb.toLowerCase()}`,
    `cleaners near ${suburb.toLowerCase()}`,
    `end of lease cleaning near ${suburb.toLowerCase()}`,
    `local cleaners ${suburb.toLowerCase()}`,
    `bond cleaners ${suburb.toLowerCase()}`,
    `best end of lease cleaners ${suburb.toLowerCase()}`,
    `affordable end of lease cleaning ${suburb.toLowerCase()}`,
    `professional cleaners ${suburb.toLowerCase()}`,
    `end of lease cleaning services ${suburb.toLowerCase()}`
  ].join(', ')

  const slugSuburb = suburb.toLowerCase().replace(/ /g, '-')

  return {
    title: `End of Lease Cleaning ${capitalizedSuburb} | Bond Cleaners Near ${capitalizedSuburb} | From $289`,
    description: `Expert end of lease cleaning in ${capitalizedSuburb}. Local bond cleaners | Fixed prices from $289 | 72-hour bond back guarantee | REIV-compliant cleaning | Same-day service available | Book trusted local cleaners today`,
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
      title: `${capitalizedSuburb} End of Lease Cleaners | Local Bond Cleaning Experts Near You`,
      description: `Looking for end of lease cleaners in ${capitalizedSuburb}? | Local bond cleaning experts | Fixed prices | Same-day service | 100% bond back guarantee`,
      url: `https://www.cleaningprofessionals.com.au/locations/${slugSuburb}/end-of-lease-cleaning/`,
      siteName: 'Cleaning Professionals Melbourne',
      images: [
        {
          url: '/images/end-of-lease-cleaning-melbourne.jpg',
          width: 1200,
          height: 630,
          alt: `Professional End of Lease Cleaning Services ${capitalizedSuburb}`,
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${capitalizedSuburb} End of Lease Cleaners | Local Bond Back Experts`,
      description: `Top-rated end of lease cleaning service in ${capitalizedSuburb}. | Local experts | Fixed prices | REIV-compliant | Bond back guaranteed`,
      images: ['/images/end-of-lease-cleaning-melbourne.jpg'],
    },
    alternates: {
      canonical: `/locations/${slugSuburb}/end-of-lease-cleaning/`,
    },
    authors: [{ name: 'Cleaning Professionals Melbourne' }],
    generator: 'Next.js',
    applicationName: `${capitalizedSuburb} End of Lease Cleaning Services`,
    referrer: 'origin-when-cross-origin',
    creator: 'Cleaning Professionals Melbourne',
    publisher: 'Cleaning Professionals Melbourne',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    verification: {
      google: 'G-W87SXGYKC1',
    },
    category: 'End of Lease Cleaning Services',
    other: {
      'geo.region': 'AU-VIC',
      'geo.placename': capitalizedSuburb,
      'geo.position': '-37.8136;144.9631',
      'ICBM': '-37.8136, 144.9631',
      'og:price:amount': '289',
      'og:price:currency': 'AUD',
      'business:contact_data:locality': capitalizedSuburb,
      'business:contact_data:region': 'Victoria',
      'business:contact_data:country': 'Australia',
      'og:availability': 'in stock',
      'business:hours:day': 'Mon-Sun 7:00-20:00',
      'og:service:type': 'End of Lease Cleaning',
      'og:service:guarantee': '72hr Bond Back Guarantee',
      'og:service:compliance': 'REIV-approved',
      'og:service:area': capitalizedSuburb
    }
  }
} 