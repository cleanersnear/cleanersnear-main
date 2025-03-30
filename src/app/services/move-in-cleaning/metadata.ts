import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Move In Cleaning Melbourne | Moving In & Out Cleaning from $48.50/hr',
  description: 'Professional move in & move out cleaning services in Melbourne. Moving in from $48.50/hr & moving out from $63.05/hr. Expert cleaners, all supplies included. Book your move cleaning service today!',
  keywords: 'move in cleaning melbourne, move out cleaning melbourne, moving house cleaning, pre move cleaning, post move cleaning, new home cleaning melbourne, moving cleaning service melbourne, house move cleaners melbourne, moving day cleaning, professional move in cleaning',
  alternates: {
    canonical: '/services/move-in-cleaning/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au/services/move-in-cleaning/',
    title: 'Melbourne Move In & Out Cleaning Services | Professional Cleaners',
    description: 'Expert move in & out cleaning in Melbourne | Moving in from $48.50/hr | Moving out from $63.05/hr | Professional cleaners | All supplies included | Book today!',
    images: [
      {
        url: '/images/move-in-cleaning-melbourne.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Move In Cleaning Services Melbourne',
      }
    ],
    siteName: 'Cleaning Professionals Melbourne'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Move In & Out Cleaning Melbourne | From $48.50/hr',
    description: 'Professional move in & out cleaning services in Melbourne. Expert cleaners for moving day | All supplies included | Book now!',
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
  applicationName: 'Melbourne Move In Cleaning Services',
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
    'og:price:amount': '48.50',
    'og:price:currency': 'AUD',
    'business:hours:day': 'Mon-Sun 7:00-20:00',
    'og:phone_number': '0450124086',
    'og:service:type': 'Move In Cleaning'
  }
}
