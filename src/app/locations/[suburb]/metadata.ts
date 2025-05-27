import type { Metadata } from "next"

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ suburb: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const suburb = resolvedParams.suburb.replace(/-/g, ' ')
  
  return {
    title: `House Cleaning & Cleaners Near Me in ${suburb} | Professional Home Cleaning ${suburb}`,
    description: `Need house cleaning services near you in ${suburb}? Our trusted house cleaners provide professional home cleaning, end of lease, carpet, and NDIS cleaning in ${suburb} and nearby suburbs. Book your local cleaner today!`,
    keywords: [
      `house cleaning near me ${suburb}`,
      `house cleaning services near me ${suburb}`,
      `house cleaners near me ${suburb}`,
      `home cleaning near me ${suburb}`,
      `cleaning services ${suburb}`,
      `house cleaning ${suburb}`,
      `end of lease cleaning ${suburb}`,
      `carpet cleaning ${suburb}`,
      `commercial cleaning ${suburb}`,
      `NDIS cleaning ${suburb}`,
      'melbourne cleaners',
      'professional cleaning melbourne',
      'local house cleaners',
      'residential cleaning',
      'cleaners near me',
      'maid service near me'
    ],
    alternates: {
      canonical: `/locations/${resolvedParams.suburb}/`,
    },
    openGraph: {
      title: `House Cleaning & Cleaners in ${suburb} | Near Me | Cleaning Professionals Melbourne`,
      description: `Professional house cleaning and cleaners near you in ${suburb}. Trusted local cleaners for homes and businesses.`,
      url: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/`,
      type: 'website',
      images: [
        {
          url: '/images/location-hero.jpg',
          width: 1200,
          height: 630,
          alt: `House Cleaning Services in ${suburb}, Melbourne`,
        }
      ],
      siteName: 'Cleaning Professionals Melbourne'
    },
    twitter: {
      card: 'summary_large_image',
      title: `House Cleaning & Cleaners in ${suburb} | Near Me | Melbourne`,
      description: `Professional house cleaning and cleaners near you in ${suburb}. Trusted local cleaners for homes and businesses.`,
      images: ['/images/location-hero.jpg'],
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
      'structured-data': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': `Cleaning Professionals - House Cleaning in ${suburb}`,
        'image': 'https://www.cleaningprofessionals.com.au/images/logo.png',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': suburb,
          'addressRegion': 'VIC',
          'addressCountry': 'AU'
        },
        'telephone': '0450124086',
        'url': `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/`,
        'description': `Professional house cleaning, end of lease, carpet, and NDIS cleaning in ${suburb} and nearby suburbs. Trusted local cleaners near you.`
      })
    }
  }
} 
