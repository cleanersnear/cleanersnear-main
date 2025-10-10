import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cleaning Service Prices Melbourne | Transparent Pricing | Cleaning Professionals',
  description: 'View our transparent cleaning service prices in Melbourne. Regular cleaning from $92, once-off cleaning from $161, NDIS cleaning from $112, Airbnb cleaning from $118, commercial cleaning from $50/hour, and end of lease cleaning from $205. No hidden fees, guaranteed quality.',
  alternates: {
    canonical: '/pricing/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au/pricing/',
    title: 'Cleaning Service Prices Melbourne | Professional Cleaning Rates',
    description: 'Transparent pricing for all cleaning services in Melbourne. Regular cleaning, once-off cleaning, NDIS cleaning, Airbnb cleaning, commercial cleaning, and end of lease cleaning. Competitive prices, no hidden fees.',
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
  keywords: 'cleaning service prices melbourne, regular cleaning prices, once off cleaning cost, ndis cleaning rates, airbnb cleaning price, commercial cleaning rates, end of lease cleaning cost, cleaning professionals rates melbourne',
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 