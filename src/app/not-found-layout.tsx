import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | Cleaning Professionals Melbourne',
  description: "Sorry, the page you're looking for doesn't exist. Explore our professional cleaning services in Melbourne including regular cleaning, once-off cleaning, NDIS cleaning, Airbnb cleaning, commercial cleaning, and end of lease cleaning.",
  keywords: [
    'cleaning services melbourne',
    'professional cleaners melbourne',
    'house cleaning melbourne',
    'regular cleaning melbourne',
    'once-off cleaning melbourne',
    'NDIS cleaning melbourne',
    'airbnb cleaning melbourne',
    'commercial cleaning melbourne',
    'end of lease cleaning melbourne',
    'bond cleaning melbourne',
    'melbourne cleaning company'
  ].join(', '),
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    }
  },
  openGraph: {
    title: 'Page Not Found | Cleaning Professionals Melbourne',
    description: "Sorry, the page you're looking for doesn't exist. Explore our professional cleaning services in Melbourne.",
    type: 'website',
    siteName: 'Cleaning Professionals',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary',
    title: 'Page Not Found | Cleaning Professionals Melbourne',
    description: "Sorry, the page you're looking for doesn't exist. Explore our professional cleaning services in Melbourne.",
  }
}

export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 