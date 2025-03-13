import { Roboto } from "next/font/google"
import { Metadata } from "next"
import "./globals.css"
import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/utils/analytics'

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
    default: 'Cleaning Professionals - Melbourne\'s Leading Cleaning Service',
    template: '%s | Cleaning Professionals Melbourne'
  },
  description: 'Melbourne\'s Trusted Cleaning Service ✓ Police Cleared ✓ Trained Professionals ✓ Fully Insured Teams. Professional house cleaning, end of lease & commercial cleaning. Servicing All Melbourne Suburbs.',
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://cleaningprofessionals.com.au',
    title: 'Cleaning Professionals Melbourne | Professional House & Commercial Cleaning | #1 End of Lease & House Cleaning',
    description: 'Melbourne\'s Trusted Cleaning Service ✓ Police Cleared ✓ Trained Professionals ✓ Fully Insured Teams. Professional house cleaning, end of lease & commercial cleaning. Servicing All Melbourne Suburbs.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cleaning Professionals Melbourne - Professional Cleaning Services',
      }
    ],
    siteName: 'Cleaning Professionals Melbourne'
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Cleaning Professionals Melbourne | Professional Cleaning Services',
    description: 'Melbourne\'s Trusted Cleaning Service ✓ Police Cleared ✓ Reference Checked ✓ Fully Insured Teams. Servicing All Melbourne Suburbs.',
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
    google: 'G-W87SXGYKC1',
  },
  alternates: {
    canonical: 'https://cleaningprofessionals.com.au',
  },
  keywords: 'house cleaning melbourne, end of lease cleaning melbourne, bond cleaning melbourne, commercial cleaning melbourne, ndis cleaning melbourne, carpet cleaning melbourne, domestic cleaning, office cleaning',
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
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                debug_mode: true
              });
            `,
          }}
        />
      </head>
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  )
}
