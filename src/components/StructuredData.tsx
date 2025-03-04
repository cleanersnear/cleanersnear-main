import Script from 'next/script'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Cleaning Professionals Melbourne",
    "image": "https://cleaningprofessionals.com.au/images/logo.png",
    "url": "https://cleaningprofessionals.com.au",
    "@id": "https://cleaningprofessionals.com.au/#organization",
    "description": "Melbourne's Most Trusted Cleaning Service. Professional house cleaning, end of lease & NDIS cleaning services with 100% satisfaction guarantee.",
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
    "telephone": "your-phone-number",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://facebook.com/cleaningprofessionals",
      "https://instagram.com/cleaningprofessionals"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "End of Lease Cleaning",
            "description": "Comprehensive end of lease cleaning with 100% bond back guarantee"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "House Cleaning",
            "description": "Professional house cleaning services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "NDIS Cleaning",
            "description": "NDIS registered cleaning provider"
          }
        }
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://cleaningprofessionals.com.au",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://cleaningprofessionals.com.au"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://cleaningprofessionals.com.au/services"
          }
        ]
      }
    },
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://cleaningprofessionals.com.au/book-now",
        "inLanguage": "en-AU",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/IOSPlatform",
          "http://schema.org/AndroidPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Book Cleaning Service"
      }
    }
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 
