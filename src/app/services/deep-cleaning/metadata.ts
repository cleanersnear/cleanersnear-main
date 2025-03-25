import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deep Cleaning Services Melbourne | From $53.07/hr | Professional Deep Clean',
  description: 'Expert deep cleaning services in Melbourne starting from $53.07/hr. Professional equipment & eco-friendly products. Thorough sanitization of all surfaces. Book online or call +61450124086 for a quote!',
  keywords: 'deep cleaning melbourne, professional deep clean, deep house cleaning, sanitization service melbourne, intensive cleaning melbourne, thorough house cleaning, deep clean experts melbourne, detailed house cleaning, move out deep clean melbourne, spring cleaning service melbourne',
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
    title: 'Melbourne Deep Cleaning Services | From $53.07/hr | Book Online',
    description: 'Transform your home with our professional deep cleaning service in Melbourne. Thorough sanitization, detailed cleaning of all surfaces, and intensive cleaning using professional-grade equipment. Book your deep clean today!',
    url: 'https://www.cleaningprofessionals.com.au/services/deep-cleaning/',
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/images/deep-cleaning-melbourne.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Deep Cleaning Services Melbourne',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melbourne Deep Cleaning Services | From $53.07/hr | Book Online',
    description: 'Expert deep cleaning in Melbourne. | Professional equipment | Thorough sanitization | Detailed cleaning | Eco-friendly products | Book now!',
    images: ['/images/deep-cleaning-melbourne.jpg'],
  },
  alternates: {
    canonical: '/services/deep-cleaning/',
  },
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  generator: 'Next.js',
  applicationName: 'Melbourne Deep Cleaning Services',
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
  category: 'Deep Cleaning Services',
  other: {
    'geo.region': 'AU-VIC',
    'geo.placename': 'Melbourne',
    'geo.position': '-37.8136;144.9631',
    'ICBM': '-37.8136, 144.9631',
    'og:price:amount': '53.07',
    'og:price:currency': 'AUD',
    'business:contact_data:locality': 'Melbourne',
    'business:contact_data:region': 'Victoria',
    'business:contact_data:country': 'Australia',
    'og:availability': 'in stock',
    'business:hours:day': 'Mon-Sun 7:00-20:00',
    'og:service:type': 'Deep Cleaning',
    'og:phone_number': '0450124086'
  }
}
