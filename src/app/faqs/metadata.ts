import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Cleaning Services Melbourne | Cleaning Professionals',
  description: 'Find answers to common questions about our cleaning services in Melbourne. Learn about our booking process, pricing, service areas, and cleaning methods. Expert answers from professional cleaners.',
  alternates: {
    canonical: '/faqs/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au/faqs/',
    title: 'Cleaning Services FAQ | Melbourne Cleaning Professionals',
    description: 'Get answers to frequently asked questions about our cleaning services. Learn about booking, pricing, service areas, and cleaning methods from Melbourne\'s trusted cleaning professionals.',
    images: [
      {
        url: '/images/faq-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Cleaning Services FAQ Melbourne',
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
  keywords: 'cleaning services faq, cleaning questions melbourne, cleaning service answers, cleaning professionals faq, house cleaning questions, cleaning service information, cleaning booking faq',
} 