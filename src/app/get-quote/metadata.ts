import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a Free Cleaning Quote | Cleaning Professionals Melbourne',
  description: 'Get an instant quote for professional cleaning services in Melbourne. Residential & commercial cleaning, end of lease, carpet cleaning & more. Easy 4-step booking process.',
  alternates: {
    canonical: '/get-quote/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au/get-quote/',
    title: 'Get a Free Cleaning Quote | Professional Cleaning Services Melbourne',
    description: 'Request a quote for professional cleaning services in Melbourne. Residential, commercial, end of lease, carpet cleaning & more. Quick 4-step process, instant pricing.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Get a Quote - Cleaning Professionals Melbourne',
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
  },
  keywords: 'cleaning quote melbourne, cleaning service quote, end of lease cleaning quote, carpet cleaning quote, commercial cleaning quote, house cleaning quote, cleaning cost calculator',
} 