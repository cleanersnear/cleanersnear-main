import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cleaning Services Melbourne | Professional House & Office Cleaners',
  description:
    "Book trusted cleaners in Melbourne for regular house cleaning, deep/spring cleans, end of lease bond cleaning, NDIS support and commercial office cleaning. Fair pricing, flexible scheduling and friendly local teams.",
  alternates: { canonical: '/services' },
  keywords: [
    'cleaning services melbourne', 'cleaners melbourne', 'house cleaning melbourne', 'home cleaning melbourne',
    'regular cleaning melbourne', 'weekly cleaning', 'fortnightly cleaning', 'deep cleaning melbourne',
    'spring cleaning melbourne', 'end of lease cleaning melbourne', 'bond cleaning melbourne', 'vacate cleaning',
    'move out cleaning', 'move in cleaning melbourne', 'ndis cleaning melbourne', 'disability cleaning support',
    'office cleaning melbourne', 'commercial cleaning melbourne', 'apartment cleaning', 'unit cleaning',
    'trusted cleaners', 'local cleaners', 'professional cleaners', 'book cleaners online'
  ],
  openGraph: {
    type: 'website',
    url: 'https://www.cleaningprofessionals.com.au/services',
    title: 'Cleaning Services Melbourne | Professional House & Office Cleaners | Cleaning Professionals - Melbourne&apos;s Trusted Cleaning Service',
    description:
      "Regular house cleaning, deep cleans, end of lease, NDIS and commercial cleaning in Melbourne. Book online in minutes.",
    images: [
      { url: '/images/services-hero.jpg', width: 1200, height: 630, alt: 'Professional Cleaning Services in Melbourne' },
    ],
    siteName: 'Cleaning Professionals Melbourne',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleaning Services Melbourne | Professional Cleaners',
    description:
      'Trusted house, bond, deep and office cleaning across Melbourne. Get an instant quote today.',
    images: ['/images/services-hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'Cleaning Services',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


