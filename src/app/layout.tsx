import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: {
    default: "House Cleaning Melbourne | Professional Cleaning Services | Cleaning Professionals",
    template: "%s | Cleaning Professionals - Melbourne's Trusted Cleaning Service"
  },
  description: "Melbourne's most trusted cleaning service with police cleared, trained professionals. Professional house cleaning, end of lease, NDIS & commercial cleaning. Servicing all Melbourne suburbs with 4+ years experience.",
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
    'maid service melbourne',
    'ndis cleaning service',
    'home cleaners melbourne',
    'household cleaners near me',
    'move in and move out cleaning',
    'household cleaning services near me',
    'residential cleaning service near me',
    'maid to clean',
    'police cleared cleaners',
    'trained cleaning professionals',
    'fully insured cleaners'
  ].join(', '),
  authors: [{ name: "Cleaning Professionals Team" }],
  creator: "Cleaning Professionals",
  publisher: "Cleaning Professionals",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.cleaningprofessionals.com.au'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.cleaningprofessionals.com.au',
    siteName: 'Cleaning Professionals',
    title: 'House Cleaning Melbourne | Professional Cleaning Services | Cleaning Professionals',
    description: 'Melbourne\'s most trusted cleaning service with police cleared, trained professionals. Professional house cleaning, end of lease, NDIS & commercial cleaning. Servicing all Melbourne suburbs with 4+ years experience.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cleaning Professionals - Professional House Cleaning Services Melbourne',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House Cleaning Melbourne | Professional Cleaning Services | Cleaning Professionals',
    description: 'Melbourne\'s most trusted cleaning service with police cleared, trained professionals. Professional house cleaning, end of lease, NDIS & commercial cleaning. Servicing all Melbourne suburbs with 4+ years experience.',
    images: ['/images/og-image.jpg'],
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
  verification: {
    google: '', // Add your Google Search Console verification code here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.cleaningprofessionals.com.au/#organization",
        "name": "Cleaning Professionals",
        "url": "https://www.cleaningprofessionals.com.au",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.cleaningprofessionals.com.au/logos/logo.png",
          "width": 300,
          "height": 100
        },
        "description": "Professional house cleaning services in Melbourne. End of lease cleaning, deep cleaning, NDIS cleaning, and regular cleaning services with police cleared, trained professionals.",
        "foundingDate": "2020",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Melbourne",
          "addressRegion": "VIC",
          "addressCountry": "AU"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+61-000-000-000",
          "contactType": "customer service",
          "areaServed": "AU",
          "availableLanguage": "English"
        },
        "sameAs": [
          "https://www.facebook.com/cleaningprofessionals",
          "https://www.instagram.com/cleaningprofessionals",
          "https://www.linkedin.com/company/cleaningprofessionals"
        ],
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": -37.8136,
            "longitude": 144.9631
          },
          "geoRadius": "50000"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.cleaningprofessionals.com.au/#localbusiness",
        "name": "Cleaning Professionals - House Cleaning Melbourne",
        "image": "https://www.cleaningprofessionals.com.au/images/og-image.jpg",
        "telephone": "+61-000-000-000",
        "email": "info@cleaningprofessionals.com.au",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Melbourne",
          "addressRegion": "VIC",
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -37.8136,
          "longitude": 144.9631
        },
        "url": "https://www.cleaningprofessionals.com.au",
        "priceRange": "$$",
        "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-17:00",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Cleaning Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "House Cleaning",
                "description": "Regular house cleaning services with trained professionals"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "End of Lease Cleaning",
                "description": "Professional bond cleaning services for rental properties"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Deep Cleaning",
                "description": "Comprehensive deep cleaning services for thorough results"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "NDIS Cleaning",
                "description": "Specialized NDIS cleaning services for participants"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial Cleaning",
                "description": "Professional commercial cleaning services for businesses"
              }
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "740",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.cleaningprofessionals.com.au/#website",
        "url": "https://www.cleaningprofessionals.com.au",
        "name": "Cleaning Professionals",
        "description": "Melbourne's most trusted cleaning service with police cleared, trained professionals. Professional house cleaning, end of lease, NDIS & commercial cleaning. Servicing all Melbourne suburbs with 4+ years experience.",
        "publisher": {
          "@id": "https://www.cleaningprofessionals.com.au/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.cleaningprofessionals.com.au/book?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "SiteNavigationElement",
              "name": "Regular Cleaning",
              "url": "https://www.cleaningprofessionals.com.au/services/regular-cleaning",
              "description": "Weekly or fortnightly cleans from $92 for 2 hours, $38/hour thereafter. Police checked cleaners, flexible scheduling, same cleaner every visit. Perfect for busy Melbourne households."
            },
            {
              "@type": "SiteNavigationElement",
              "name": "Get Instant Quote - Book Now!",
              "url": "https://www.cleaningprofessionals.com.au/book",
              "description": "Know your cleaning cost instantly! Get an accurate quote online and book your Melbourne home clean in seconds—simple, quick, and hassle-free."
            },
            {
              "@type": "SiteNavigationElement",
              "name": "Contact Us",
              "url": "https://www.cleaningprofessionals.com.au/contact",
              "description": "Have questions or need a custom clean? Reach out to our friendly Melbourne team and we'll make your cleaning experience easy and stress-free."
            },
            {
              "@type": "SiteNavigationElement",
              "name": "See Our Pricing",
              "url": "https://www.cleaningprofessionals.com.au/services",
              "description": "Transparent, fair pricing for all your cleaning needs. Check our Melbourne cleaning rates and find a plan that suits your home and schedule."
            },
            {
              "@type": "SiteNavigationElement",
              "name": "End of Lease Cleaning",
              "url": "https://www.cleaningprofessionals.com.au/services/end-of-lease-cleaning",
              "description": "Get your bond back guaranteed! Our thorough end of lease cleaning in Melbourne ensures your rental property meets all inspection standards."
            },
            {
              "@type": "SiteNavigationElement",
              "name": "Move In Clean",
              "url": "https://www.cleaningprofessionals.com.au/services/once-off-cleaning",
              "description": "Start fresh in your new Melbourne home! Our move-in cleaning service ensures every corner is spotless before you unpack your belongings."
            },
            {
              "@type": "SiteNavigationElement",
              "name": "Deep Cleaning",
              "url": "https://www.cleaningprofessionals.com.au/services/once-off-cleaning",
              "description": "When your Melbourne home needs more than regular cleaning, our deep clean service tackles every detail—from baseboards to ceiling fans and everything in between."
            },
            {
              "@type": "SiteNavigationElement",
              "name": "NDIS Cleaning",
              "url": "https://www.cleaningprofessionals.com.au/services/ndis-cleaning",
              "description": "Specialized cleaning for NDIS participants from $112 for 2 hours, $56/hour thereafter. Police checked team, tailored to needs, public liability insurance."
            },
            {
              "@type": "SiteNavigationElement",
              "name": "Airbnb Cleaning",
              "url": "https://www.cleaningprofessionals.com.au/services/airbnb-cleaning",
              "description": "Professional turnover cleaning from $118 for 2 hours, $45/hour thereafter. Sanitisation of high-touch areas, bed linen changes, restocking essentials."
            },
            {
              "@type": "SiteNavigationElement",
              "name": "Commercial Cleaning",
              "url": "https://www.cleaningprofessionals.com.au/services/commercial-cleaning",
              "description": "Professional office and commercial cleaning in Melbourne. Keep your workplace spotless and productive with our reliable business cleaning services."
            },
            {
              "@type": "SiteNavigationElement",
              "name": "Reviews",
              "url": "https://www.cleaningprofessionals.com.au/reviews",
              "description": "See why Melbourne homeowners trust Cleaning Professionals. Honest reviews from real clients show our commitment to thorough, reliable cleaning every time."
            },
            {
              "@type": "SiteNavigationElement",
              "name": "About Us",
              "url": "https://www.cleaningprofessionals.com.au/about",
              "description": "Meet the team behind Melbourne's most trusted cleaning service. Learn about our police-cleared staff, comprehensive training, and 4+ years of local experience."
            },
            {
              "@type": "SiteNavigationElement",
              "name": "Book Online",
              "url": "https://www.cleaningprofessionals.com.au/book",
              "description": "Get instant quote and book your Melbourne home clean online. Choose from regular, once-off, NDIS, Airbnb, commercial, or end of lease cleaning services."
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.cleaningprofessionals.com.au/#faqpage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does house cleaning cost in Melbourne?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our house cleaning services are competitively priced based on the size of your home, frequency of cleaning, and specific services required. We offer transparent pricing with no hidden fees. Contact us for a personalized quote for your Melbourne home."
            }
          },
          {
            "@type": "Question",
            "name": "Are your cleaners police cleared and trained?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all our cleaners are police cleared, thoroughly trained, and professionally vetted. We ensure the highest standards of security and professionalism for your peace of mind."
            }
          },
          {
            "@type": "Question",
            "name": "What areas of Melbourne do you service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We service all major Melbourne suburbs including inner city, eastern, western, northern, and southern regions. Our service area covers 200+ suburbs across Melbourne. Contact us to confirm service availability in your area."
            }
          },
          {
            "@type": "Question",
            "name": "What cleaning services do you offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer regular house cleaning, deep cleaning, end of lease cleaning, NDIS cleaning, commercial cleaning, and one-time cleaning services. Each service is tailored to meet your specific needs and schedule."
            }
          },
          {
            "@type": "Question",
            "name": "How quickly can I book a cleaning service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can book our cleaning services quickly and easily online or by phone. We offer flexible scheduling including same-day and next-day availability for most Melbourne areas, subject to availability."
            }
          },
          {
            "@type": "Question",
            "name": "Are you fully insured?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we are fully insured with comprehensive public liability insurance. Your home and belongings are protected, and we guarantee the quality of our work."
            }
          }
        ]
      },
      {
        "@type": "Review",
        "@id": "https://www.cleaningprofessionals.com.au/#review",
        "itemReviewed": {
          "@type": "LocalBusiness",
          "name": "Cleaning Professionals",
          "@id": "https://www.cleaningprofessionals.com.au/#localbusiness"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah M."
        },
        "reviewBody": "Absolutely fantastic service! The team arrived on time, was incredibly thorough, and left our Melbourne home spotless. The cleaners were professional, polite, and clearly well-trained. I was impressed by their attention to detail and the quality of their work. Highly recommend Cleaning Professionals for anyone looking for reliable, professional cleaning services.",
        "datePublished": "2024-01-15"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className={roboto.className}>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WP9W8MHP');
            `,
          }}
        />
        
        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-W87SXGYKC1"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W87SXGYKC1', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />

        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WP9W8MHP"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {children}
      </body>
    </html>
  );
}
