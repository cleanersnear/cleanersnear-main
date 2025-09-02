import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Airbnb Cleaning Pricing Melbourne | Transparent Pricing for All Property Sizes',
  description: 'Clear and transparent Airbnb cleaning pricing for all property sizes in Melbourne. Studio, 1-2 bedroom, 3+ bedroom pricing. No hidden fees, competitive rates, same-day service available.',
  keywords: 'airbnb cleaning pricing, airbnb cleaning prices, airbnb cleaning cost, airbnb cleaning rates, airbnb cleaning price melbourne, airbnb cleaning cost melbourne, airbnb cleaning pricing melbourne, airbnb cleaning rates melbourne, airbnb cleaning price per hour, airbnb cleaning hourly rate, airbnb cleaning studio price, airbnb cleaning 1 bedroom price, airbnb cleaning 2 bedroom price, airbnb cleaning 3 bedroom price, airbnb cleaning 4 bedroom price, airbnb cleaning pricing calculator, airbnb cleaning quote, airbnb cleaning estimate, airbnb cleaning fees, airbnb cleaning charges',
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
    title: 'Airbnb Cleaning Pricing Melbourne | Transparent Pricing for All Property Sizes',
    description: 'Clear and transparent Airbnb cleaning pricing for all property sizes in Melbourne. Studio, 1-2 bedroom, 3+ bedroom pricing. No hidden fees, competitive rates.',
    url: 'https://www.cleaningprofessionals.com.au/services/airbnb-cleaning/pricing/',
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/images/airbnb-cleaning-melbourne.jpg',
        width: 1200,
        height: 630,
        alt: 'Airbnb Cleaning Pricing Melbourne - Transparent Pricing for All Property Sizes',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airbnb Cleaning Pricing Melbourne | Transparent Pricing',
    description: 'Clear and transparent Airbnb cleaning pricing for all property sizes in Melbourne. No hidden fees, competitive rates.',
    images: ['/images/airbnb-cleaning-melbourne.jpg'],
  },
  alternates: {
    canonical: '/services/airbnb-cleaning/pricing/',
  },
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  generator: 'Next.js',
  applicationName: 'Melbourne Airbnb Cleaning Pricing',
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
  category: 'Airbnb Cleaning Pricing',
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
    'og:service:type': 'Airbnb Cleaning Pricing',
    'og:service:guarantee': 'Transparent Pricing',
    'og:service:compliance': 'No Hidden Fees'
  }
}
