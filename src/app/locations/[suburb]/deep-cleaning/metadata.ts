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
    `deep cleaning near me ${suburb.toLowerCase()}`,
    `deep house cleaning near me ${suburb.toLowerCase()}`,
    `sanitization service near me ${suburb.toLowerCase()}`,
    `intensive cleaning near me ${suburb.toLowerCase()}`,
    `thorough house cleaning near me ${suburb.toLowerCase()}`,
    `house cleaners near me ${suburb.toLowerCase()}`,
    
    // Location-specific variations
    `deep cleaning in ${suburb.toLowerCase()}`,
    `deep cleaning ${suburb.toLowerCase()}`,
    `deep house cleaning ${suburb.toLowerCase()}`,
    `sanitization service ${suburb.toLowerCase()}`,
    `intensive cleaning ${suburb.toLowerCase()}`,
    `thorough house cleaning ${suburb.toLowerCase()}`,
    `deep clean experts ${suburb.toLowerCase()}`,
    `detailed house cleaning ${suburb.toLowerCase()}`,
    `move out deep clean ${suburb.toLowerCase()}`,
    `spring cleaning service ${suburb.toLowerCase()}`,
    
    // Near [location] variations
    `cleaners near ${suburb.toLowerCase()}`,
    `deep cleaning near ${suburb.toLowerCase()}`,
    `cleaning services near ${suburb.toLowerCase()}`,
    `house cleaning near ${suburb.toLowerCase()}`,
    `professional cleaners near ${suburb.toLowerCase()}`,
    
    // Local service variations
    `local deep cleaners ${suburb.toLowerCase()}`,
    `local cleaning services ${suburb.toLowerCase()}`,
    `${suburb.toLowerCase()} deep cleaning service`,
    `${suburb.toLowerCase()} house cleaning service`,
    `${suburb.toLowerCase()} local cleaners`,
    
    // Additional service-specific variations
    `deep cleaning services ${suburb.toLowerCase()}`,
    `affordable deep cleaning ${suburb.toLowerCase()}`,
    `thorough cleaning service ${suburb.toLowerCase()}`,
    `best deep cleaners ${suburb.toLowerCase()}`,
    `professional deep cleaners ${suburb.toLowerCase()}`,
    `expert house cleaning ${suburb.toLowerCase()}`,
    `detailed cleaning service ${suburb.toLowerCase()}`
  ].join(', ')

  const slugSuburb = suburb.toLowerCase().replace(/ /g, '-')

  return {
    title: `Deep Cleaning Services ${capitalizedSuburb} | From $53.07/hr | Professional Deep Clean`,
    description: `Expert deep cleaning services in ${capitalizedSuburb} starting from $53.07/hr. Professional equipment & eco-friendly products. Thorough sanitization of all surfaces. Book online or call +61450124086 for a quote!`,
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
      title: `${capitalizedSuburb} Deep Cleaning Services | From $53.07/hr | Book Online`,
      description: `Transform your home with our professional deep cleaning service in ${capitalizedSuburb}. Thorough sanitization, detailed cleaning of all surfaces, and intensive cleaning using professional-grade equipment. Book your deep clean today!`,
      url: `https://www.cleaningprofessionals.com.au/locations/${slugSuburb}/deep-cleaning/`,
      siteName: 'Cleaning Professionals Melbourne',
      images: [
        {
          url: '/images/deep-cleaning-melbourne.jpg',
          width: 1200,
          height: 630,
          alt: `Professional Deep Cleaning Services ${capitalizedSuburb}`,
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${capitalizedSuburb} Deep Cleaning Services | From $53.07/hr | Book Online`,
      description: `Expert deep cleaning in ${capitalizedSuburb}. | Professional equipment | Thorough sanitization | Detailed cleaning | Eco-friendly products | Book now!`,
      images: ['/images/deep-cleaning-melbourne.jpg'],
    },
    alternates: {
      canonical: `/locations/${slugSuburb}/deep-cleaning/`,
    },
    authors: [{ name: 'Cleaning Professionals Melbourne' }],
    generator: 'Next.js',
    applicationName: `${capitalizedSuburb} Deep Cleaning Services`,
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
    category: 'Deep Cleaning Services',
    other: {
      'geo.region': 'AU-VIC',
      'geo.placename': capitalizedSuburb,
      'geo.position': '-37.8136;144.9631',
      'ICBM': '-37.8136, 144.9631',
      'og:price:amount': '53.07',
      'og:price:currency': 'AUD',
      'business:contact_data:locality': capitalizedSuburb,
      'business:contact_data:region': 'Victoria',
      'business:contact_data:country': 'Australia',
      'og:availability': 'in stock',
      'business:hours:day': 'Mon-Sun 7:00-20:00',
      'og:service:type': 'Deep Cleaning',
      'og:service:features': 'Sanitization, Intensive Cleaning, Detailed Clean',
      'og:service:pricing': 'From $53.07/hr',
      'og:service:area': capitalizedSuburb
    }
  }
}
