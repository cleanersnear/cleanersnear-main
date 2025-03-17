import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Professional Cleaning Services Melbourne | Cleaning Professionals',
  description: 'Melbourne\'s trusted cleaning service provider with 4+ years experience, 10k+ happy customers, and 99% satisfaction rate. Eco-friendly cleaning solutions, experienced team, and state-of-the-art equipment.',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au/about/',
    title: 'About Cleaning Professionals Melbourne | Your Trusted Cleaning Partner',
    description: 'Learn about Melbourne\'s leading cleaning service. 4+ years experience, 10k+ happy customers, eco-friendly solutions, and professional team. Available 24/7 for all your cleaning needs.',
    images: [
      {
        url: '/images/about-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'About Cleaning Professionals Melbourne',
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
  keywords: 'about cleaning professionals melbourne, melbourne cleaning company, professional cleaners melbourne, cleaning service provider melbourne, trusted cleaning company, eco friendly cleaning melbourne',
} 