import { Metadata } from 'next'

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
    // Near me variations
    `move in cleaning near me ${suburb.toLowerCase()}`,
    `move out cleaning near me ${suburb.toLowerCase()}`,
    `moving cleaners near me ${suburb.toLowerCase()}`,
    `end of lease cleaners near me ${suburb.toLowerCase()}`,
    `house cleaners near me ${suburb.toLowerCase()}`,
    
    // Location-specific variations
    `move in cleaning in ${suburb.toLowerCase()}`,
    `move out cleaning in ${suburb.toLowerCase()}`,
    `move in cleaning ${suburb.toLowerCase()}`,
    `move out cleaning ${suburb.toLowerCase()}`,
    `moving house cleaning ${suburb.toLowerCase()}`,
    `pre move cleaning ${suburb.toLowerCase()}`,
    `post move cleaning ${suburb.toLowerCase()}`,
    `new home cleaning ${suburb.toLowerCase()}`,
    `moving cleaning service ${suburb.toLowerCase()}`,
    `house move cleaners ${suburb.toLowerCase()}`,
    `moving day cleaning ${suburb.toLowerCase()}`,
    `professional move in cleaning ${suburb.toLowerCase()}`,
    
    // Near [location] variations
    `cleaners near ${suburb.toLowerCase()}`,
    `cleaning services near ${suburb.toLowerCase()}`,
    `house cleaning near ${suburb.toLowerCase()}`,
    `move in cleaners near ${suburb.toLowerCase()}`,
    
    // Local service variations
    `local move in cleaners ${suburb.toLowerCase()}`,
    `local cleaning services ${suburb.toLowerCase()}`,
    `${suburb.toLowerCase()} move in cleaning service`,
    `${suburb.toLowerCase()} move out cleaning service`,
    `${suburb.toLowerCase()} local cleaners`,
    
    // Additional service-specific variations
    `moving services ${suburb.toLowerCase()}`,
    `affordable move cleaning ${suburb.toLowerCase()}`,
    `reliable moving cleaners ${suburb.toLowerCase()}`,
    `best move in cleaners ${suburb.toLowerCase()}`,
    `professional moving cleaners ${suburb.toLowerCase()}`
  ].join(', ')

  const slugSuburb = suburb.toLowerCase().replace(/ /g, '-')

  return {
    title: `Move In Cleaning ${capitalizedSuburb} | Moving In & Out Cleaning from $48.50/hr`,
    description: `Professional move in & move out cleaning services in ${capitalizedSuburb}. Moving in from $48.50/hr & moving out from $63.05/hr. Expert cleaners, all supplies included. Book your move cleaning service today!`,
    keywords: locationKeywords,
    alternates: {
      canonical: `/locations/${slugSuburb}/move-in-cleaning/`,
    },
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      url: `https://www.cleaningprofessionals.com.au/locations/${slugSuburb}/move-in-cleaning/`,
      title: `${capitalizedSuburb} Move In & Out Cleaning Services | Professional Cleaners`,
      description: `Expert move in & out cleaning in ${capitalizedSuburb} | Moving in from $48.50/hr | Moving out from $63.05/hr | Professional cleaners | All supplies included | Book today!`,
      images: [
        {
          url: '/images/move-in-cleaning-melbourne.jpg',
          width: 1200,
          height: 630,
          alt: `Professional Move In Cleaning Services ${capitalizedSuburb}`,
        }
      ],
      siteName: 'Cleaning Professionals Melbourne'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Move In & Out Cleaning ${capitalizedSuburb} | From $48.50/hr`,
      description: `Professional move in & out cleaning services in ${capitalizedSuburb}. Expert cleaners for moving day | All supplies included | Book now!`,
      images: ['/images/move-in-cleaning-melbourne.jpg'],
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
    authors: [{ name: 'Cleaning Professionals Melbourne' }],
    generator: 'Next.js',
    applicationName: `${capitalizedSuburb} Move In Cleaning Services`,
    referrer: 'origin-when-cross-origin',
    creator: 'Cleaning Professionals Melbourne',
    publisher: 'Cleaning Professionals Melbourne',
    category: 'Cleaning Services',
    other: {
      'geo.region': 'AU-VIC',
      'geo.placename': capitalizedSuburb,
      'geo.position': '-37.8136;144.9631',
      'ICBM': '-37.8136, 144.9631',
      'business:contact_data:locality': capitalizedSuburb,
      'business:contact_data:region': 'Victoria',
      'business:contact_data:country': 'Australia',
      'og:price:amount': '48.50',
      'og:price:currency': 'AUD',
      'business:hours:day': 'Mon-Sun 7:00-20:00',
      'og:phone_number': '0450124086',
      'og:service:type': 'Move In Cleaning',
      'og:service:features': 'Moving In, Moving Out, Pre-Move Cleaning, Post-Move Cleaning',
      'og:service:pricing': 'From $48.50/hr',
      'og:service:area': capitalizedSuburb
    }
  }
}
