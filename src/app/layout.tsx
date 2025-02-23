import { Roboto } from "next/font/google"
import { Metadata } from "next"
import "./globals.css"

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    preload: true,
    fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cleaningprofessionals.com.au'),
  title: {
    default: 'Cleaning Professionals Australia | Professional Cleaning Services Melbourne',
    template: '%s | Cleaning Professionals Australia'
  },
  description: 'Melbourne\'s trusted cleaning service. End of lease, carpet, NDIS, and commercial cleaning. Professional cleaners, guaranteed results. Book online today!',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://cleaningprofessionals.com.au',
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cleaning Professionals Melbourne',
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Cleaning Professionals Melbourne',
    description: "Melbourne's trusted cleaning service",
    images: ['/images/twitter-image.jpg'],
  },

  // Additional Important Metadata
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
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://cleaningprofessionals.com.au',
  },
  keywords: 'cleaning services melbourne, house cleaning, commercial cleaning, carpet cleaning',
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  creator: 'Cleaning Professionals Melbourne',
  publisher: 'Cleaning Professionals Melbourne',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  )
}
