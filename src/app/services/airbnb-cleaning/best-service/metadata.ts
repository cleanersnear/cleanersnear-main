import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Airbnb Cleaning Service Melbourne | Why We\'re #1 Choice',
  description: 'Discover why we\'re Melbourne\'s best Airbnb cleaning service. Professional turnover cleaning, same-day service, competitive pricing, and 100% satisfaction guarantee. Compare with other services.',
  keywords: 'best airbnb cleaning service, best air b and b cleaners, best airbnb cleaning service melbourne, top airbnb cleaning service, best airbnb cleaners melbourne, best short stay cleaning service, best holiday rental cleaning, best vacation rental cleaning, best airbnb host cleaning service, best turnover cleaning service, best airbnb cleaning company, best airbnb cleaning melbourne, top rated airbnb cleaning, best airbnb cleaning reviews',
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
    title: 'Best Airbnb Cleaning Service Melbourne | Why We\'re #1 Choice',
    description: 'Discover why we\'re Melbourne\'s best Airbnb cleaning service. Professional turnover cleaning, same-day service, competitive pricing, and 100% satisfaction guarantee.',
    url: 'https://www.cleaningprofessionals.com.au/services/airbnb-cleaning/best-service/',
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/images/airbnb-cleaning-melbourne.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Airbnb Cleaning Service Melbourne - Professional Turnover Cleaning',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Airbnb Cleaning Service Melbourne | #1 Choice',
    description: 'Discover why we\'re Melbourne\'s best Airbnb cleaning service. Professional turnover cleaning, same-day service, competitive pricing.',
    images: ['/images/airbnb-cleaning-melbourne.jpg'],
  },
  alternates: {
    canonical: '/services/airbnb-cleaning/best-service/',
  },
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  generator: 'Next.js',
  applicationName: 'Best Melbourne Airbnb Cleaning Services',
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
  category: 'Best Airbnb Cleaning Services',
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
    'og:service:type': 'Best Airbnb Cleaning Service',
    'og:service:guarantee': '100% Satisfaction Guarantee',
    'og:service:compliance': 'Airbnb Host Approved - Best Service'
  }
}
