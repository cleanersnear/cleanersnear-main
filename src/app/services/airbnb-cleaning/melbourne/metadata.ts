import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Airbnb Cleaning Melbourne | Professional Short Stay Cleaning Service in Melbourne',
  description: 'Professional Airbnb cleaning service in Melbourne CBD, South Yarra, St Kilda, Richmond & all Melbourne suburbs. Expert turnover cleaning for short stay properties. Same-day service available.',
  keywords: 'airbnb cleaning melbourne, airbnb cleaning near me, air b and b cleaners melbourne, airbnb cleaning service melbourne, airbnb house cleaning melbourne, short stay cleaning melbourne, holiday rental cleaning melbourne, vacation rental cleaning melbourne, airbnb host cleaning melbourne, airbnb property management cleaning melbourne, turnover cleaning melbourne, airbnb cleaning services near me melbourne, best airbnb cleaning service melbourne, melbourne cbd airbnb cleaning, south yarra airbnb cleaning, st kilda airbnb cleaning, richmond airbnb cleaning',
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
    description: 'Expert Airbnb cleaning service in Melbourne CBD, South Yarra, St Kilda, Richmond & all Melbourne suburbs. Professional turnover cleaning for short stay properties.',
    url: 'https://www.cleaningprofessionals.com.au/services/airbnb-cleaning/melbourne/',
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/images/airbnb-cleaning-melbourne.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Airbnb Cleaning Services Melbourne CBD and Suburbs',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airbnb Cleaning Melbourne | Professional Short Stay Cleaning',
    description: 'Expert Airbnb cleaning service in Melbourne CBD, South Yarra, St Kilda, Richmond & all Melbourne suburbs. Same-day service available.',
    images: ['/images/airbnb-cleaning-melbourne.jpg'],
  },
  alternates: {
    canonical: '/services/airbnb-cleaning/melbourne/',
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
  category: 'Airbnb Cleaning Services Melbourne',
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
    'og:service:type': 'Airbnb Cleaning Melbourne',
    'og:service:guarantee': 'Same Day Service Melbourne',
    'og:service:compliance': 'Airbnb Host Approved Melbourne'
  }
}
