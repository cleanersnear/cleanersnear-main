import type { Metadata } from "next"


export async function generateMetadata({ 
  params 
}: { 
  params: { suburb: string } 
}): Promise<Metadata> {
  // Normalize suburb name from URL
  const suburb = params.suburb.replace(/-/g, ' ')
  
  return {
    title: `Professional Cleaning Services in ${suburb} | Melbourne Cleaners`,
    description: `Expert cleaning services in ${suburb}, Melbourne. End of lease, carpet cleaning, NDIS, commercial & more. Trusted professionals, affordable rates. Book today!`,
    keywords: [
      `cleaning services ${suburb}`,
      `house cleaning ${suburb}`,
      `end of lease cleaning ${suburb}`,
      `carpet cleaning ${suburb}`,
      `commercial cleaning ${suburb}`,
      `NDIS cleaning ${suburb}`,
      'melbourne cleaners',
      'professional cleaning melbourne'
    ],
    alternates: {
      canonical: `/locations/${params.suburb}/`,
    },
    openGraph: {
      title: `${suburb} Cleaning Services | Cleaning Professionals Melbourne`,
      description: `Professional cleaning services in ${suburb}. Trusted local cleaners for homes and businesses.`,
      url: `https://www.cleaningprofessionals.com.au/locations/${params.suburb}/`,
      type: 'website',
      images: [
        {
          url: '/images/location-hero.jpg',
          width: 1200,
          height: 630,
          alt: `Cleaning Services in ${suburb}, Melbourne`,
        }
      ],
      siteName: 'Cleaning Professionals Melbourne'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${suburb} Cleaning Services | Melbourne Cleaners`,
      description: `Professional cleaning services in ${suburb}. Trusted local cleaners for homes and businesses.`,
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
    }
  }
} 
