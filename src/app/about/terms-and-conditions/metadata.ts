import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions | Cleaning Professionals Melbourne",
  description: "Read our terms and conditions to understand the rules and guidelines for using our cleaning services in Melbourne. Clear information about service agreements and policies.",
  alternates: {
    canonical: '/terms-and-conditions/',
  },
  openGraph: {
    title: "Terms and Conditions | Cleaning Professionals Melbourne",
    description: "Understand our service terms, conditions, and policies. Clear guidelines for booking and using our professional cleaning services in Melbourne.",
    url: 'https://www.cleaningprofessionals.com.au/terms-and-conditions/',
    type: 'website',
    images: [
      {
        url: '/images/terms-conditions.jpg',
        width: 1200,
        height: 630,
        alt: 'Terms and Conditions - Cleaning Professionals Melbourne',
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
  keywords: 'terms and conditions cleaning service, cleaning service agreement, cleaning service policies, cleaning service rules, cleaning service guidelines melbourne',
} 