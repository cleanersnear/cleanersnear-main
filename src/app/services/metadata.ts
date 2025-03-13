import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Cleaning Services Melbourne | Residential & Commercial',
  description: 'Expert cleaning services in Melbourne. End of lease, carpet cleaning, NDIS, commercial & more. Trusted professionals, affordable rates. Book your service today!',
  keywords: 'cleaning services melbourne, professional cleaners, end of lease cleaning, carpet cleaning, commercial cleaning, ndis cleaning, house cleaning, office cleaning',
  alternates: {
    canonical: '/services/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au/services/',
    title: 'Professional Cleaning Services Melbourne | Residential & Commercial',
    description: 'Expert cleaning services in Melbourne. End of lease, carpet cleaning, NDIS, commercial & more. Trusted professionals, affordable rates. Book your service today!',
    images: [
      {
        url: '/images/services-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Cleaning Services Melbourne',
      }
    ],
    siteName: 'Cleaning Professionals Melbourne'
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