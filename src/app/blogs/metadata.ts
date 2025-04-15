import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "Professional Cleaning Services Melbourne | Expert Tips & Guides 2025",
    template: "%s | Melbourne's Leading Cleaning Experts"
  },
  description: "| Expert cleaning guides | Professional tips | Maintenance advice | Industry insights from Melbourne's top cleaning professionals. Comprehensive resources for residential & commercial cleaning.",
  metadataBase: new URL('https://www.cleaningprofessionals.com.au'),
  alternates: {
    canonical: '/blogs/',
  },
  openGraph: {
    title: "Melbourne Cleaning Blog | Cleaning Tips & Expert Guides",
    description: "Access expert cleaning guides, professional tips, and industry insights from Melbourne's most trusted cleaning service. Updated weekly with latest cleaning trends and solutions.",
    url: 'https://www.cleaningprofessionals.com.au/blogs/',
    type: 'website',
    siteName: 'Cleaning Professionals Melbourne',
    locale: 'en_AU',
    images: [
      {
        url: 'https://www.cleaningprofessionals.com.au/images/blog-header.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Cleaning Tips & Guides'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Cleaning Blog | Expert Tips & Guides',
    description: 'Expert cleaning guides and professional tips from Melbourne\'s leading cleaning experts',
    creator: '@CleaningProfessionals',
    images: ['https://www.cleaningprofessionals.com.au/images/blog-header.jpg']
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
  keywords: [
    'cleaning blog melbourne',
    'professional cleaning tips',
    'cleaning guides australia',
    'house cleaning advice',
    'commercial cleaning tips',
    'melbourne cleaning experts',
    'cleaning best practices',
    'professional cleaning blog',
    'cleaning maintenance guides',
    'eco-friendly cleaning tips',
    'office cleaning advice',
    'residential cleaning guides',
    'cleaning industry insights',
    'cleaning service blog melbourne',
    'expert cleaning recommendations'
  ].join(', '),
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  category: 'Professional Cleaning',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code'
  }
} 