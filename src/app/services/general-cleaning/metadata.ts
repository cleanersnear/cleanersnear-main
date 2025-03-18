import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'General Cleaning Services Melbourne | From $89 | Professional Cleaners',
  description: 'Expert general cleaning services in Melbourne. Professional house cleaners, competitive rates, and guaranteed satisfaction. Book local cleaners for regular house cleaning today.',
  keywords: 'general cleaning melbourne, house cleaning melbourne, regular cleaning service, professional house cleaners, house cleaning near me, general cleaning cost, general cleaning price, house cleaning service, regular house cleaning, domestic cleaning',
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
    title: 'Melbourne General Cleaning Services | Professional House Cleaners',
    description: 'Looking for general cleaning services near me? ✓ Fixed cleaning prices ✓ Professional house cleaners ✓ Flexible scheduling ✓ Satisfaction guaranteed',
    url: 'https://www.cleaningprofessionals.com.au/services/general-cleaning/',
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/images/general-cleaning-melbourne.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional General Cleaning Services Melbourne',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melbourne General Cleaning Services | Professional House Cleaners',
    description: 'Top-rated general cleaning service in Melbourne. Fixed price cleaning, professional house cleaners. Satisfaction guaranteed!',
    images: ['/images/general-cleaning-melbourne.jpg'],
  },
  alternates: {
    canonical: '/services/general-cleaning/',
  },
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  generator: 'Next.js',
  applicationName: 'Melbourne General Cleaning Services',
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
  category: 'General Cleaning Services',
  other: {
    'geo.region': 'AU-VIC',
    'geo.placename': 'Melbourne',
    'geo.position': '-37.8136;144.9631',
    'ICBM': '-37.8136, 144.9631',
    'og:price:amount': '89',
    'og:price:currency': 'AUD',
    'business:contact_data:locality': 'Melbourne',
    'business:contact_data:region': 'Victoria',
    'business:contact_data:country': 'Australia'
  }
} 