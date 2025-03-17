import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customer Reviews | Cleaning Professionals Melbourne | 99% Satisfaction Rate',
  description: 'Read authentic customer reviews of Cleaning Professionals Melbourne. 99% satisfaction rate, 10k+ happy customers. Real feedback from our valued clients about our cleaning services.',
  alternates: {
    canonical: '/reviews/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au/reviews/',
    title: 'Customer Reviews | Cleaning Professionals Melbourne | Trusted Cleaners',
    description: 'See what our customers say about our cleaning services. Real reviews from Melbourne residents and businesses. 99% satisfaction rate, professional service, and exceptional results.',
    images: [
      {
        url: '/images/reviews-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Customer Reviews - Cleaning Professionals Melbourne',
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
  keywords: 'cleaning professionals reviews melbourne, melbourne cleaning service reviews, cleaning company reviews, customer feedback cleaning melbourne, cleaning service ratings melbourne, cleaning professionals testimonials',
} 