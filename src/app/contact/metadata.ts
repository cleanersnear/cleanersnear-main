import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Cleaning Professionals Melbourne',
  description: 'Get in touch with Melbourne\'s leading cleaning service. Available 7 days, servicing all suburbs. Call 0450 124 086 for immediate assistance or book online.',
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au/contact/',
    title: 'Contact Cleaning Professionals Melbourne | Professional Cleaning Services',
    description: 'Need professional cleaning services in Melbourne? Contact us today. Available 7 days, all suburbs. Quick response, free quotes. Call 0450 124 086.',
    images: [
      {
        url: '/images/contact-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Cleaning Professionals Melbourne',
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
  keywords: 'cleaning services contact, melbourne cleaners contact, book cleaning service, cleaning quote melbourne, professional cleaners melbourne contact, cleaning professionals contact',
} 