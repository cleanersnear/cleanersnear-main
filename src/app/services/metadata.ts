import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cleaning Services Melbourne | Professional Cleaners from $53.07/hr',
  description: 'Looking for reliable cleaning services in Melbourne? Expert residential & commercial cleaners, specializing in end of lease, regular house cleaning, carpet cleaning, NDIS & commercial cleaning. Professional service from $53.07/hr with satisfaction guarantee.',
  keywords: 'cleaning services melbourne, melbourne cleaning services, professional cleaners melbourne, end of lease cleaning, house cleaning melbourne, carpet cleaning melbourne, commercial cleaning melbourne, ndis cleaning services, office cleaning melbourne, residential cleaning, local cleaners melbourne',
  alternates: {
    canonical: '/services/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au/services/',
    title: 'Cleaning Services Melbourne | Top-Rated Local Cleaning Company',
    description: 'Melbourne\'s trusted cleaning services from $53.07/hr | End of lease cleaning | Regular house cleaning | Carpet cleaning | NDIS cleaning | Commercial cleaning | Book online today!',
    images: [
      {
        url: '/images/services-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Cleaning Services Melbourne',
      }
    ],
    siteName: 'Cleaning Professionals Melbourne'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleaning Services Melbourne | Professional Cleaners from $53.07/hr',
    description: 'Melbourne\'s trusted cleaning services. Professional cleaners for homes & offices | End of lease | Regular cleaning | Carpet cleaning | Book today!',
    images: ['/images/services-hero.jpg'],
  },
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
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  generator: 'Next.js',
  applicationName: 'Melbourne Cleaning Services',
  referrer: 'origin-when-cross-origin',
  creator: 'Cleaning Professionals Melbourne',
  publisher: 'Cleaning Professionals Melbourne',
  category: 'Cleaning Services',
  other: {
    'geo.region': 'AU-VIC',
    'geo.placename': 'Melbourne',
    'geo.position': '-37.8136;144.9631',
    'ICBM': '-37.8136, 144.9631',
    'business:contact_data:locality': 'Melbourne',
    'business:contact_data:region': 'Victoria',
    'business:contact_data:country': 'Australia',
    'og:price:amount': '53.07',
    'og:price:currency': 'AUD',
    'business:hours:day': 'Mon-Sun 7:00-20:00',
    'og:phone_number': '0450124086'
  }
} 