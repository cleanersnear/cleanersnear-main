import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Cleaning Professionals Melbourne",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal information when you use our cleaning services in Melbourne.",
  alternates: {
    canonical: '/about/privacy-policy/',
  },
  openGraph: {
    title: "Privacy Policy | Cleaning Professionals Melbourne",
    description: "Learn how we handle and protect your personal information. Our privacy policy outlines our commitment to data security and your privacy rights.",
    url: 'https://www.cleaningprofessionals.com.au/about/privacy-policy/',
    type: 'website',
    images: [
      {
        url: '/images/privacy-policy.jpg',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy - Cleaning Professionals Melbourne',
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
  keywords: 'privacy policy cleaning professionals, data protection cleaning service, personal information cleaning, privacy rights cleaning service, data security cleaning melbourne',
} 