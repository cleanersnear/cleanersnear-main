import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cleaning Service Prices Melbourne | Transparent Pricing | Cleaning Professionals',
  description: 'View our transparent cleaning service prices in Melbourne. Hourly rates from $48.50, flat rates for homes, end of lease cleaning, and specialized services. No hidden fees, guaranteed quality.',
  alternates: {
    canonical: '/pricing/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au/pricing/',
    title: 'Cleaning Service Prices Melbourne | Professional Cleaning Rates',
    description: 'Transparent pricing for all cleaning services in Melbourne. Hourly rates, flat rates, end of lease cleaning, and specialized services. Competitive prices, no hidden fees.',
    images: [
      {
        url: '/images/pricing-hero-ai.webp',
        width: 1200,
        height: 630,
        alt: 'Cleaning Service Prices Melbourne',
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
  keywords: 'cleaning service prices melbourne, cleaning rates melbourne, house cleaning cost, end of lease cleaning price, carpet cleaning cost, commercial cleaning rates, cleaning service pricing, cleaning professionals rates',
} 