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
    // Near me variations
    `house cleaning near me ${suburb.toLowerCase()}`,
    `regular cleaning near me ${suburb.toLowerCase()}`,
    `domestic cleaning near me ${suburb.toLowerCase()}`,
    `home cleaning near me ${suburb.toLowerCase()}`,
    `house cleaners near me ${suburb.toLowerCase()}`,
    `residential cleaning near me ${suburb.toLowerCase()}`,
    
    // Location-specific variations
    `house cleaning in ${suburb.toLowerCase()}`,
    `regular cleaning ${suburb.toLowerCase()}`,
    `domestic cleaning ${suburb.toLowerCase()}`,
    `home cleaning ${suburb.toLowerCase()}`,
    `house cleaners ${suburb.toLowerCase()}`,
    `residential cleaning ${suburb.toLowerCase()}`,
    `weekly cleaning ${suburb.toLowerCase()}`,
    `fortnightly cleaning ${suburb.toLowerCase()}`,
    `one-off cleaning ${suburb.toLowerCase()}`,
    
    // Near [location] variations
    `cleaners near ${suburb.toLowerCase()}`,
    `cleaning services near ${suburb.toLowerCase()}`,
    `house cleaning near ${suburb.toLowerCase()}`,
    `domestic cleaners near ${suburb.toLowerCase()}`,
    `professional cleaners near ${suburb.toLowerCase()}`,
    
    // Local service variations
    `local house cleaners ${suburb.toLowerCase()}`,
    `local cleaning services ${suburb.toLowerCase()}`,
    `${suburb.toLowerCase()} house cleaning service`,
    `${suburb.toLowerCase()} domestic cleaning`,
    `${suburb.toLowerCase()} local cleaners`,
    
    // Additional service-specific variations
    `house cleaning services ${suburb.toLowerCase()}`,
    `affordable house cleaning ${suburb.toLowerCase()}`,
    `reliable cleaners ${suburb.toLowerCase()}`,
    `regular house cleaning ${suburb.toLowerCase()}`,
    `best house cleaners ${suburb.toLowerCase()}`,
    `professional house cleaning ${suburb.toLowerCase()}`,
    `expert cleaning service ${suburb.toLowerCase()}`,
    `domestic cleaning service ${suburb.toLowerCase()}`
  ].join(', ')

  const slugSuburb = suburb.toLowerCase().replace(/ /g, '-')

  return {
    title: `House Cleaning ${capitalizedSuburb} | Professional Cleaners Near ${capitalizedSuburb} | From $76`,
    description: `Expert house cleaning in ${capitalizedSuburb}. Local cleaners | Weekly from $76 | Fortnightly from $86 | One-off from $90 | Professional service | All supplies included | Book trusted local cleaners today`,
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
      title: `${capitalizedSuburb} House Cleaners | Local Professional Cleaning Experts`,
      description: `Looking for house cleaners in ${capitalizedSuburb}? | Local cleaning experts | Fixed prices | Weekly, fortnightly & one-off services | Satisfaction guaranteed`,
      url: `https://www.cleaningprofessionals.com.au/locations/${slugSuburb}/general-cleaning/`,
      siteName: 'Cleaning Professionals Melbourne',
      images: [
        {
          url: '/images/house-cleaning-melbourne.jpg',
          width: 1200,
          height: 630,
          alt: `Professional House Cleaning Services ${capitalizedSuburb}`,
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${capitalizedSuburb} House Cleaners | Local Professional Cleaners`,
      description: `Top-rated house cleaning service in ${capitalizedSuburb}. | Local experts | Fixed prices | Regular & one-off cleaning | Satisfaction guaranteed`,
      images: ['/images/house-cleaning-melbourne.jpg'],
    },
    alternates: {
      canonical: `/locations/${slugSuburb}/general-cleaning/`,
    },
    authors: [{ name: 'Cleaning Professionals Melbourne' }],
    generator: 'Next.js',
    applicationName: `${capitalizedSuburb} House Cleaning Services`,
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
    category: 'House Cleaning Services',
    other: {
      'geo.region': 'AU-VIC',
      'geo.placename': capitalizedSuburb,
      'geo.position': '-37.8136;144.9631',
      'ICBM': '-37.8136, 144.9631',
      'og:price:amount': '76',
      'og:price:currency': 'AUD',
      'business:contact_data:locality': capitalizedSuburb,
      'business:contact_data:region': 'Victoria',
      'business:contact_data:country': 'Australia',
      'og:availability': 'in stock',
      'business:hours:day': 'Mon-Sun 7:00-20:00',
      'og:service:type': 'House Cleaning',
      'og:service:frequency': 'Weekly, Fortnightly, One-off',
      'og:service:pricing': 'From $76/week',
      'og:service:area': capitalizedSuburb
    }
  }
} 