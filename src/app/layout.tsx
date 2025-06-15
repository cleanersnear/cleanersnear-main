import { Roboto } from "next/font/google"
import { Metadata } from "next"
import "./globals.css"
import Script from 'next/script'
import { getOrganizationSchema } from '@/config/schema'
import { siteConfig } from '@/config/site'

// Google Analytics Measurement ID (GA4)
const GA_MEASUREMENT_ID = 'G-W87SXGYKC1'
const AW_MEASUREMENT_ID = 'AW-16653720077' // Google Ads Conversion Tracking ID

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    preload: true,
    fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.cleaningprofessionals.com.au'),
  title: {
    template: siteConfig.title.template,
    default: siteConfig.title.default,
  },
  description: 'Melbourne\'s Trusted Cleaning Service | Police Cleared | Trained Professionals | Fully Insured Teams. Professional house cleaning, end of lease, NDIS & commercial cleaning. Servicing All Melbourne Suburbs.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au',
    title: 'Cleaning Professionals Melbourne | Professional House & Commercial Cleaning',
    description: 'Melbourne\'s Trusted Cleaning Service | Police Cleared | Trained Professionals | Fully Insured Teams. Professional house cleaning, end of lease, NDIS & commercial cleaning. Servicing All Melbourne Suburbs.',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Cleaning Professionals Melbourne | Professional Cleaning Services',
    description: 'Melbourne\'s Trusted Cleaning Service | Police Cleared | Reference Checked | Fully Insured Teams. Servicing All Melbourne Suburbs.',
    images: ['/images/twitter-image.jpg'],
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
  keywords: [
    // Primary Service Keywords
    'house cleaning melbourne',
    'end of lease cleaning melbourne',
    'deep cleaning melbourne',
    'move in cleaning melbourne',
    'move out cleaning melbourne',
    'ndis cleaning melbourne',
    'bond cleaning melbourne',
    'commercial cleaning melbourne',
    // Service Types
    'regular house cleaning',
    'one-time cleaning service',
    'weekly cleaning service',
    'fortnightly cleaning',
    'deep cleaning service',
    'move in out cleaning',
    // Action Keywords
    'book cleaning service melbourne',
    'cleaning quote melbourne',
    'instant booking cleaning',
    'same day cleaning service',
    // Location Keywords
    'melbourne cleaning services',
    'local cleaners melbourne',
    'cleaning company melbourne',
    'professional cleaners melbourne',
    // Additional Keywords
    'house cleaning',
    'cleaning services melbourne',
    'cleaning services near me',
    'house cleaners near me',
    'home cleaning services melbourne',
    'house cleaners',
    'residential cleaning brisbane',
    'house cleaning house',
    'home cleaning home',
    'and cleaning services',
    'cleaning jobs perth wa',
    'housework cleaning',
    'a cleaning services',
    'cleaning svc',
    'maid service perth',
    'cleaning jobs in australia melbourne',
    'cleaning firm',
    'near me cleaners',
    'cleaning housekeeping services',
    'service house cleaning',
    'clean cleaning company',
    'cleaning service services',
    'cleaners to clean house',
    'home cleaners adelaide',
    'maid service melbourne',
    'ndis cleaning service',
    'maid service cleaning',
    'home cleaners perth',
    'move in move out cleaners',
    'home cleaners melbourne',
    'household cleaners near me',
    'move in and move out cleaning',
    'maid cleaner',
    'household cleaning services near me',
    'residential cleaning service near me',
    'home cleaning services melbourne',
    'house cleaning melbourne',
    'maid to clean'
  ].join(', '),
  verification: {
    // This should be your Google Search Console verification code
    // Get this from Google Search Console > Settings > Ownership verification > HTML tag
    // Should look like: google-site-verification=xxxxxxxxxxxxxx
    google: '',  // Leave empty until you get the verification code
  },
  alternates: {
    canonical: 'https://www.cleaningprofessionals.com.au',
  },
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  creator: 'Cleaning Professionals Melbourne',
  publisher: 'Cleaning Professionals Melbourne',
  other: {
    // Same as above - leave empty until you get the verification code
    'google-site-verification': '',
    'msvalidate.01': '',  // Bing verification code
    'format-detection': 'telephone=no'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
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
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        {/* Google Ads Conversion Tracking Script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${AW_MEASUREMENT_ID}`}
        />
        <Script
          id="google-ads-conversion"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${AW_MEASUREMENT_ID}');
            `,
          }}
        />
        <Script
          id="ahrefs-analytics"
          strategy="afterInteractive"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="JYH3/BMc5iSMglfPgKQ4AQ"
        />
        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema())
          }}
        />
      </head>
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  )
}
