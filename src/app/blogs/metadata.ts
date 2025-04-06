import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cleaning Tips & Advice Blog | Professional Cleaning Services Melbourne",
  description: "Expert cleaning tips, advice, and guides from Melbourne's leading cleaning professionals. Learn about cleaning techniques, maintenance, and best practices for your home or business.",
  alternates: {
    canonical: '/blogs/',
  },
  openGraph: {
    title: "Cleaning Tips & Advice Blog | Melbourne Cleaning Professionals",
    description: "Discover expert cleaning tips, guides, and advice from Melbourne's trusted cleaning service. Stay updated with the latest cleaning trends and best practices.",
    url: 'https://www.cleaningprofessionals.com.au/blogs/',
    type: 'website',
    images: [
      {
        url: '/images/blog-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Cleaning Tips & Advice Blog',
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
  keywords: 'cleaning tips blog, cleaning advice melbourne, cleaning guides, professional cleaning tips, house cleaning advice, cleaning best practices, cleaning professionals blog',
} 