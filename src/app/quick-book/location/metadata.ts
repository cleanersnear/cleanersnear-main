import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Select Location - Quick Book Cleaning | Cleaning Professionals Melbourne",
  description: "Choose your location for professional cleaning services in Melbourne. Book your cleaning service quickly and easily. Available in all Melbourne suburbs with flexible scheduling.",
  alternates: {
    canonical: '/quick-book/location/',
  },
  openGraph: {
    title: "Select Location - Quick Book Cleaning | Melbourne Cleaning Services",
    description: "Book professional cleaning services in your Melbourne suburb. Easy online booking, flexible scheduling, and guaranteed quality service. Available 7 days a week.",
    url: 'https://www.cleaningprofessionals.com.au/quick-book/location/',
    type: 'website',
    images: [
      {
        url: '/images/booking-location.jpg',
        width: 1200,
        height: 630,
        alt: 'Select Location - Cleaning Services Melbourne',
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
  keywords: 'cleaning service location melbourne, book cleaning service, melbourne cleaning booking, cleaning service suburbs, cleaning professionals location, quick book cleaning, cleaning service booking',
} 