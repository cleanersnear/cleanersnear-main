import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Airbnb House Cleaning Melbourne | Professional Short Stay House Cleaning',
  description: 'Professional Airbnb house cleaning service in Melbourne. Expert house cleaning for short stay properties, vacation rentals, and holiday homes. Same-day service available.',
  keywords: 'airbnb house cleaning, air b and b house cleaning, airbnb house cleaning melbourne, airbnb house cleaning service, short stay house cleaning, vacation rental house cleaning, holiday home cleaning, airbnb property cleaning, short stay property cleaning, airbnb house cleaners, house cleaning for airbnb, airbnb house cleaning near me, professional house cleaning airbnb, airbnb house cleaning service melbourne',
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
    title: 'Airbnb House Cleaning Melbourne | Professional Short Stay House Cleaning',
    description: 'Professional Airbnb house cleaning service in Melbourne. Expert house cleaning for short stay properties, vacation rentals, and holiday homes.',
    url: 'https://www.cleaningprofessionals.com.au/services/airbnb-cleaning/house-cleaning/',
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/images/airbnb-cleaning-melbourne.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Airbnb House Cleaning Services Melbourne',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airbnb House Cleaning Melbourne | Professional House Cleaning',
    description: 'Professional Airbnb house cleaning service in Melbourne. Expert house cleaning for short stay properties and vacation rentals.',
    images: ['/images/airbnb-cleaning-melbourne.jpg'],
  },
  alternates: {
    canonical: '/services/airbnb-cleaning/house-cleaning/',
  },
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  generator: 'Next.js',
  applicationName: 'Melbourne Airbnb House Cleaning Services',
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
  category: 'Airbnb House Cleaning Services',
  other: {
    'geo.region': 'AU-VIC',
    'geo.placename': 'Melbourne',
    'geo.position': '-37.8136;144.9631',
    'ICBM': '-37.8136, 144.9631',
    'og:price:amount': '149',
    'og:price:currency': 'AUD',
    'business:contact_data:locality': 'Melbourne',
    'business:contact_data:region': 'Victoria',
    'business:contact_data:country': 'Australia',
    'og:availability': 'in stock',
    'business:hours:day': 'Mon-Sun 7:00-20:00',
    'og:service:type': 'Airbnb House Cleaning',
    'og:service:guarantee': 'Same Day House Cleaning Service',
    'og:service:compliance': 'Airbnb Host Approved House Cleaning'
  }
}
