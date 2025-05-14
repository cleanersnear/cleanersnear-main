import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NDIS Cleaning Services Melbourne | From $45.18/hr | NDIS Registered',
  description: 'Professional NDIS cleaning services in Melbourne. NDIS registered cleaners | Weekly from $45.18/hr | One-off from $50.20/hr | Specialized support $55.70/hr | All cleaning supplies included | Trained support workers. Book your NDIS cleaning today!',
  keywords: 'ndis cleaning melbourne, ndis registered cleaners, ndis house cleaning, disability support cleaning, ndis support services melbourne, ndis approved cleaners, ndis cleaning provider, disability cleaning services, ndis home maintenance, ndis domestic assistance',
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
    title: 'NDIS Cleaning Services Melbourne | NDIS Registered Cleaners',
    description: 'Professional NDIS cleaning services in Melbourne | Regular support from $45.18/hr | Specialized support available | NDIS registered cleaners | Trained support workers | Flexible scheduling',
    url: 'https://www.cleaningprofessionals.com.au/services/ndis-cleaning/',
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/images/ndis-cleaning-melbourne.jpg',
        width: 1200,
        height: 630,
        alt: 'NDIS House Cleaning Services Melbourne',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NDIS Cleaning Melbourne | From $45.18/hr | Book Today',
    description: 'NDIS registered cleaning services in Melbourne. Professional cleaners | Regular & specialized support | Trained staff | NDIS plan billing available',
    images: ['/images/ndis-cleaning-melbourne.jpg'],
  },
  alternates: {
    canonical: '/services/ndis-cleaning/',
  },
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  generator: 'Next.js',
  applicationName: 'NDIS Cleaning Services Melbourne',
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
  category: 'NDIS Cleaning Services',
  other: {
    'geo.region': 'AU-VIC',
    'geo.placename': 'Melbourne',
    'geo.position': '-37.8136;144.9631',
    'ICBM': '-37.8136, 144.9631',
    'og:price:amount': '45.18',
    'og:price:currency': 'AUD',
    'business:contact_data:locality': 'Melbourne',
    'business:contact_data:region': 'Victoria',
    'business:contact_data:country': 'Australia',
    'og:availability': 'in stock',
    'business:hours:day': 'Mon-Sun 7:00-20:00',
    'og:service:type': 'NDIS Cleaning',
    'og:price:standard_amount': '50.20',
    'og:phone_number': '0450124086'
  }
} 