import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Cleaning Services Melbourne | Residential & Commercial Cleaners',
  description: 'Top-rated cleaning services in Melbourne. Specializing in end of lease, regular house cleaning, carpet cleaning, NDIS & commercial cleaning. | Professional cleaners | Affordable rates | Same-day service available | 100% satisfaction guaranteed',
  keywords: 'cleaning services melbourne, professional cleaners melbourne, end of lease cleaning, house cleaning melbourne, carpet cleaning melbourne, commercial cleaning melbourne, ndis cleaning services, office cleaning melbourne, residential cleaning, local cleaners melbourne',
  alternates: {
    canonical: '/services/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au/services/',
    title: 'Melbourne Professional Cleaning Services | Trusted Local Cleaners',
    description: '| End of lease cleaning | Regular house cleaning | Carpet cleaning | NDIS cleaning | Commercial cleaning | Melbourne\'s most trusted cleaning service. Book online today!',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Melbourne Professional Cleaning Services | Expert Cleaners',
    description: 'Melbourne\'s trusted cleaning service. | End of lease | Regular cleaning | Carpet cleaning & more | Professional cleaners | Competitive rates | Book today!',
    images: ['/images/services-hero.jpg'],
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
  applicationName: 'Melbourne Professional Cleaning Services',
  referrer: 'origin-when-cross-origin',
  creator: 'Cleaning Professionals Melbourne',
  publisher: 'Cleaning Professionals Melbourne',
  category: 'Cleaning Services',
  other: {
    'geo.region': 'AU-VIC',
    'geo.placename': 'Melbourne',
    'geo.position': '-37.8136;144.9631',
    'ICBM': '-37.8136, 144.9631',
    'business:contact_data:locality': 'Melbourne',
    'business:contact_data:region': 'Victoria',
    'business:contact_data:country': 'Australia',
    'og:price:currency': 'AUD'
  }
} 