import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Commercial Cleaning Services Melbourne | From $44/hr | Professional Office Clean',
  description: 'Expert commercial cleaning services in Melbourne. Once-off cleans from $195 (3 hrs, $65/hr), regular cleans from $132 (3 hrs, from $44/hr). Professional equipment & eco-friendly products. Thorough sanitization of all surfaces. Book online or call +61450124086 for a quote!',
  keywords: 'commercial cleaning melbourne, office cleaning melbourne, professional office clean, commercial cleaning services, sanitization service melbourne, intensive cleaning melbourne, thorough office cleaning, commercial clean experts melbourne, detailed office cleaning, move out cleaning melbourne, spring cleaning service melbourne, once-off clean, regular clean, daily clean, weekly clean, fortnightly clean, monthly clean',
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
    title: 'Melbourne Commercial Cleaning Services | From $44/hr | Book Online',
    description: 'Transform your office with our professional commercial cleaning service in Melbourne. Once-off cleans from $195 (3 hrs, $65/hr), regular cleans from $132 (3 hrs, from $44/hr). Thorough sanitization, detailed cleaning of all surfaces, and intensive cleaning using professional-grade equipment. Book your commercial clean today!',
    url: 'https://www.cleaningprofessionals.com.au/services/commercial-cleaning/',
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/images/commercial-cleaning-melbourne.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Commercial Cleaning Services Melbourne',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melbourne Commercial Cleaning Services | From $44/hr | Book Online',
    description: 'Expert commercial cleaning in Melbourne. Once-off cleans from $195 (3 hrs, $65/hr), regular cleans from $132 (3 hrs, from $44/hr). | Professional equipment | Thorough sanitization | Detailed cleaning | Eco-friendly products | Book now!',
    images: ['/images/commercial-cleaning-melbourne.jpg'],
  },
  alternates: {
    canonical: '/services/commercial-cleaning/',
  },
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  generator: 'Next.js',
  applicationName: 'Melbourne Commercial Cleaning Services',
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
  category: 'Commercial Cleaning Services',
  other: {
    'geo.region': 'AU-VIC',
    'geo.placename': 'Melbourne',
    'geo.position': '-37.8136;144.9631',
    'ICBM': '-37.8136, 144.9631',
    'og:price:amount': '132',
    'og:price:currency': 'AUD',
    'business:contact_data:locality': 'Melbourne',
    'business:contact_data:region': 'Victoria',
    'business:contact_data:country': 'Australia',
    'og:availability': 'in stock',
    'business:hours:day': 'Mon-Sun 7:00-20:00',
    'og:service:type': 'Commercial Cleaning',
    'og:phone_number': '0450124086'
  }
}
