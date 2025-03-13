import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cleaning Services Coverage Areas in Melbourne | Service Locations',
  description: 'Find professional cleaning services in your area. We cover all major suburbs across Melbourne\'s metropolitan region including CBD, South Yarra, Richmond, and more.',
  keywords: 'cleaning services melbourne, melbourne cleaning locations, house cleaning melbourne suburbs, end of lease cleaning melbourne areas, cleaning service areas',
  alternates: {
    canonical: '/locations/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au/locations/',
    title: 'Melbourne Cleaning Service Areas | Cleaning Professionals',
    description: 'Find professional cleaning services in your area. We cover all major suburbs across Melbourne\'s metropolitan region.',
    images: [
      {
        url: '/images/melbourne-map.jpg',
        width: 1200,
        height: 630,
        alt: 'Melbourne Cleaning Service Areas Map',
      }
    ],
    siteName: 'Cleaning Professionals Melbourne'
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
  }
} 