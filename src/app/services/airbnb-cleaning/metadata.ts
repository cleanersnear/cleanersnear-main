import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Airbnb Cleaning Melbourne | Professional Short Stay Cleaning Service',
  description: 'Professional Airbnb cleaning service in Melbourne. Expert turnover cleaning for short stay properties. Same-day service, competitive pricing, trusted by hosts. Book your Airbnb cleaner today.',
  keywords: 'airbnb cleaning melbourne, airbnb cleaning service, air b and b cleaners, airbnb cleaning near me, airbnb house cleaning, short stay cleaning melbourne, holiday rental cleaning, vacation rental cleaning, airbnb host cleaning, airbnb property management cleaning, turnover cleaning melbourne, airbnb cleaning services near me, best airbnb cleaning service',
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
    title: 'Airbnb Cleaning Melbourne | Professional Short Stay Cleaning Service',
    description: 'Expert Airbnb cleaning service in Melbourne. Professional turnover cleaning for short stay properties. Same-day service, competitive pricing, trusted by hosts.',
    url: 'https://www.cleaningprofessionals.com.au/services/airbnb-cleaning/',
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/images/airbnb-cleaning-melbourne.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Airbnb Cleaning Services Melbourne',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airbnb Cleaning Melbourne | Professional Short Stay Cleaning',
    description: 'Expert Airbnb cleaning service in Melbourne. Professional turnover cleaning for short stay properties. Same-day service, competitive pricing.',
    images: ['/images/airbnb-cleaning-melbourne.jpg'],
  },
  alternates: {
    canonical: '/services/airbnb-cleaning/',
  },
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  generator: 'Next.js',
  applicationName: 'Melbourne Airbnb Cleaning Services',
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
  category: 'Airbnb Cleaning Services',
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
    'og:service:type': 'Airbnb Cleaning',
    'og:service:guarantee': 'Same Day Service',
    'og:service:compliance': 'Airbnb Host Approved'
  }
}
