import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Select Service - Quick Book Cleaning | Professional Cleaning Services Melbourne",
  description: "Choose from our range of professional cleaning services in Melbourne. End of lease, carpet cleaning, general cleaning, deep cleaning, and more. Easy online booking.",
  alternates: {
    canonical: '/quick-book/service/',
  },
  openGraph: {
    title: "Select Cleaning Service | Professional Cleaning Melbourne",
    description: "Book professional cleaning services in Melbourne. Choose from end of lease, carpet cleaning, general cleaning, deep cleaning, and more. Guaranteed quality service.",
    url: 'https://www.cleaningprofessionals.com.au/quick-book/service/',
    type: 'website',
    images: [
      {
        url: '/images/booking-service.jpg',
        width: 1200,
        height: 630,
        alt: 'Select Cleaning Service - Melbourne',
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
  keywords: 'cleaning service selection melbourne, professional cleaning services, end of lease cleaning, carpet cleaning, general cleaning, deep cleaning, cleaning service booking, melbourne cleaners',
} 