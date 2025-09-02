import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Airbnb Cleaning Near Me Melbourne | Find Local Airbnb Cleaning Services',
  description: 'Find professional Airbnb cleaning services near you in Melbourne. Local Airbnb cleaners available in your area with same-day service. Search by suburb or postcode.',
  keywords: 'airbnb cleaning near me, airbnb cleaning services near me, air b and b cleaners near me, airbnb cleaning near me melbourne, local airbnb cleaning service, airbnb cleaners near me, airbnb cleaning service near me, find airbnb cleaning near me, airbnb cleaning local, airbnb cleaning in my area, airbnb cleaning nearby, airbnb cleaning close to me, airbnb cleaning near my location, airbnb cleaning service near my area',
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
    title: 'Airbnb Cleaning Near Me Melbourne | Find Local Airbnb Cleaning Services',
    description: 'Find professional Airbnb cleaning services near you in Melbourne. Local Airbnb cleaners available in your area with same-day service.',
    url: 'https://www.cleaningprofessionals.com.au/services/airbnb-cleaning/near-me/',
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/images/airbnb-cleaning-melbourne.jpg',
        width: 1200,
        height: 630,
        alt: 'Find Local Airbnb Cleaning Services Near You in Melbourne',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airbnb Cleaning Near Me Melbourne | Local Services',
    description: 'Find professional Airbnb cleaning services near you in Melbourne. Local cleaners with same-day service available.',
    images: ['/images/airbnb-cleaning-melbourne.jpg'],
  },
  alternates: {
    canonical: '/services/airbnb-cleaning/near-me/',
  },
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  generator: 'Next.js',
  applicationName: 'Melbourne Local Airbnb Cleaning Services',
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
  category: 'Local Airbnb Cleaning Services',
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
    'og:service:type': 'Local Airbnb Cleaning Service',
    'og:service:guarantee': 'Same Day Local Service',
    'og:service:compliance': 'Airbnb Host Approved Local Service'
  }
}
