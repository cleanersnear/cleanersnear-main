import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Careers | Cleaning Professionals Melbourne | Join Our Team",
  description: "Join Melbourne's leading cleaning service provider. Explore career opportunities with Cleaning Professionals Melbourne. Competitive pay, flexible hours, and growth opportunities.",
  alternates: {
    canonical: '/career/',
  },
  openGraph: {
    title: "Careers | Cleaning Professionals Melbourne | Join Our Team",
    description: "Build your career with Melbourne's trusted cleaning service. Join our team of professional cleaners. Great pay, flexible hours, and career growth opportunities.",
    url: 'https://www.cleaningprofessionals.com.au/career/',
    type: 'website',
    images: [
      {
        url: '/images/career-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Careers at Cleaning Professionals Melbourne',
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
  keywords: 'cleaning jobs melbourne, cleaning careers melbourne, cleaning job opportunities, professional cleaner jobs, cleaning service careers, cleaning industry jobs melbourne',
} 