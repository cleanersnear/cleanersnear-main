import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Airbnb Cleaning Service Areas Melbourne | All Melbourne Suburbs Covered',
  description: 'Complete list of Melbourne suburbs where we provide Airbnb cleaning services. Professional cleaning for short stay properties across all Melbourne areas including CBD, South Yarra, St Kilda, Richmond and more.',
  keywords: 'airbnb cleaning service areas, airbnb cleaning melbourne suburbs, airbnb cleaning areas covered, airbnb cleaning service coverage, airbnb cleaning melbourne cbd, airbnb cleaning south yarra, airbnb cleaning st kilda, airbnb cleaning richmond, airbnb cleaning brunswick, airbnb cleaning carlton, airbnb cleaning docklands, airbnb cleaning northcote, airbnb cleaning fitzroy, airbnb cleaning collingwood, airbnb cleaning preston, airbnb cleaning thornbury, airbnb cleaning coburg, airbnb cleaning essendon, airbnb cleaning moonee ponds, airbnb cleaning ascot vale, airbnb cleaning footscray, airbnb cleaning yarraville, airbnb cleaning williamstown, airbnb cleaning port melbourne, airbnb cleaning albert park, airbnb cleaning middle park, airbnb cleaning west melbourne, airbnb cleaning north melbourne, airbnb cleaning kensington, airbnb cleaning flemington',
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
  openGraph: {
    title: 'Airbnb Cleaning Service Areas Melbourne | All Melbourne Suburbs Covered',
    description: 'Complete list of Melbourne suburbs where we provide Airbnb cleaning services. Professional cleaning for short stay properties across all Melbourne areas.',
    url: 'https://www.cleaningprofessionals.com.au/services/airbnb-cleaning/service-areas/',
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/images/airbnb-cleaning-melbourne.jpg',
        width: 1200,
        height: 630,
        alt: 'Airbnb Cleaning Service Areas Melbourne - All Suburbs Covered',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airbnb Cleaning Service Areas Melbourne | All Suburbs',
    description: 'Complete list of Melbourne suburbs where we provide Airbnb cleaning services. Professional cleaning across all Melbourne areas.',
    images: ['/images/airbnb-cleaning-melbourne.jpg'],
  },
  alternates: {
    canonical: '/services/airbnb-cleaning/service-areas/',
  },
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  generator: 'Next.js',
  applicationName: 'Melbourne Airbnb Cleaning Service Areas',
  referrer: 'origin-when-cross-origin',
  creator: 'Cleaning Professionals Melbourne',
  publisher: 'Cleaning Professionals Melbourne',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'G-W87SXGYKC1',
  },
  category: 'Airbnb Cleaning Service Areas',
  other: {
    'geo.region': 'AU-VIC',
    'geo.placename': 'Melbourne',
    'geo.position': '-37.8136;144.9631',
    'ICBM': '-37.8136, 144.9631',
    'og:price:amount': '149',
    'og:price:currency': 'AUD',
    'business:contact_data:locality': 'Melbourne',
    'business:contact_data:region': 'Victoria',
    'business:contact_data:country': 'Australia',
    'og:availability': 'in stock',
    'business:hours:day': 'Mon-Sun 7:00-20:00',
    'og:service:type': 'Airbnb Cleaning Service Areas',
    'og:service:guarantee': 'All Melbourne Areas Covered',
    'og:service:compliance': 'Airbnb Host Approved All Areas'
  }
}
