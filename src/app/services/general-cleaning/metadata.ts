import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'House Cleaning Services Melbourne | From $76 | Professional Cleaners',
  description: 'Expert house cleaning services in Melbourne. | Weekly cleaning from $76 | Fortnightly from $86 | One-off cleaning from $90 | Professional cleaners | All supplies included | Satisfaction guaranteed. Book your local cleaners today!',
  keywords: 'house cleaning melbourne, house cleaners melbourne, regular cleaning service, professional house cleaners, domestic cleaning melbourne, home cleaning service, weekly house cleaning, fortnightly cleaning, one-off cleaning, local house cleaners, residential cleaning melbourne',
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
    title: 'Melbourne House Cleaning Services | Professional & Reliable Cleaners',
    description: 'Looking for professional house cleaning in Melbourne? | Weekly from $76 | Fortnightly from $86 | One-off from $90 | All cleaning supplies included | Experienced cleaners | Satisfaction guaranteed',
    url: 'https://www.cleaningprofessionals.com.au/services/general-cleaning/',
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/images/general-cleaning-melbourne.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional House Cleaning Services Melbourne',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melbourne House Cleaning Services | From $76 | Book Today',
    description: 'Professional house cleaning in Melbourne. | Weekly, fortnightly & one-off services | Experienced cleaners | All supplies included | 100% satisfaction guaranteed',
    images: ['/images/general-cleaning-melbourne.jpg'],
  },
  alternates: {
    canonical: '/services/general-cleaning/',
  },
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  generator: 'Next.js',
  applicationName: 'Melbourne House Cleaning Services',
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
  category: 'House Cleaning Services',
  other: {
    'geo.region': 'AU-VIC',
    'geo.placename': 'Melbourne',
    'geo.position': '-37.8136;144.9631',
    'ICBM': '-37.8136, 144.9631',
    'og:price:amount': '76',
    'og:price:currency': 'AUD',
    'business:contact_data:locality': 'Melbourne',
    'business:contact_data:region': 'Victoria',
    'business:contact_data:country': 'Australia',
    'og:availability': 'in stock',
    'og:price:standard_amount': '90',
    'business:hours:day': 'Mon-Sun 7:00-20:00'
  }
} 