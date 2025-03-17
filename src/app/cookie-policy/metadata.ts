import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Cleaning Professionals Melbourne",
  description: "Learn about how we use cookies and similar technologies on our website. Understand our cookie policy and how it affects your browsing experience.",
  alternates: {
    canonical: '/cookie-policy/',
  },
  openGraph: {
    title: "Cookie Policy | Cleaning Professionals Melbourne",
    description: "Information about our use of cookies and similar technologies. Learn how we enhance your browsing experience while respecting your privacy.",
    url: 'https://www.cleaningprofessionals.com.au/cookie-policy/',
    type: 'website',
    images: [
      {
        url: '/images/cookie-policy.jpg',
        width: 1200,
        height: 630,
        alt: 'Cookie Policy - Cleaning Professionals Melbourne',
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
  keywords: 'cookie policy cleaning website, website cookies cleaning service, cookie usage cleaning website, cookie settings cleaning service, website tracking cleaning melbourne',
} 