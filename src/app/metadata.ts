import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cleaning Professionals - Melbourne\'s Leading Cleaning Service',
  description: 'Melbourne\'s Trusted Cleaning Service ✓ Police Cleared ✓ Trained Professionals ✓ Fully Insured Teams. Professional house cleaning, end of lease & commercial cleaning. Servicing All Melbourne Suburbs.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au',
    title: 'Cleaning Professionals Melbourne | Professional House & Commercial Cleaning | #1 End of Lease & House Cleaning',
    description: 'Melbourne\'s Trusted Cleaning Service ✓ Police Cleared ✓ Trained Professionals ✓ Fully Insured Teams. Professional house cleaning, end of lease & commercial cleaning. Servicing All Melbourne Suburbs.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cleaning Professionals Melbourne - Professional Cleaning Services',
      }
    ],
    siteName: 'Cleaning Professionals Melbourne'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleaning Professionals Melbourne | Professional Cleaning Services',
    description: 'Melbourne\'s Trusted Cleaning Service ✓ Police Cleared ✓ Reference Checked ✓ Fully Insured Teams. Servicing All Melbourne Suburbs.',
    images: ['/images/twitter-image.jpg'],
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
  keywords: 'house cleaning melbourne, end of lease cleaning melbourne, bond cleaning melbourne, commercial cleaning melbourne, ndis cleaning melbourne, carpet cleaning melbourne, domestic cleaning, office cleaning',
} 