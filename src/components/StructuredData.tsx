import Script from 'next/script'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Cleaning Professionals Australia",
    "image": "https://cleaningprofessionals.com.au/images/logo.png",
    "@id": "https://cleaningprofessionals.com.au",
    "url": "https://cleaningprofessionals.com.au",
    "telephone": "0450124086",
    "description": "Professional cleaning services in Melbourne including end of lease cleaning, deep cleaning, NDIS cleaning, and regular cleaning services. Servicing all Melbourne suburbs.",
    
    // Mobile business - no physical address
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Melbourne",
      "addressRegion": "VIC",
      "addressCountry": "AU"
    },
    
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -37.8136,
        "longitude": 144.9631
      },
      "geoRadius": "50000" // 50km radius covering Melbourne suburbs
    },
    
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],

    "priceRange": "$$",
    
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "End of Lease Cleaning",
          "description": "Comprehensive end of lease cleaning service with 100% bond back guarantee"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": 260,
          "maxPrice": 890,
          "priceCurrency": "AUD",
          "description": "Prices range from $260 for studios to $890 for 4 bedrooms"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Regular House Cleaning",
          "description": "Weekly, fortnightly, or monthly cleaning services"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": 48.50,
          "priceCurrency": "AUD",
          "description": "Starting from $48.50 per hour with weekly discounts available"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "NDIS Cleaning",
          "description": "Specialized cleaning services for NDIS participants"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": 45,
          "maxPrice": 55,
          "priceCurrency": "AUD",
          "description": "NDIS approved rates between $45-$55 per hour"
        }
      },
      {
        "@type": "Offer",
        "name": "Weekly Cleaning Discount",
        "description": "Save 10% on weekly cleaning services",
        "discount": 10,
        "availabilityStarts": "2024-01-01",
        "availabilityEnds": "2024-12-31"
      },
      {
        "@type": "Offer",
        "name": "Fortnightly Cleaning Discount",
        "description": "Save 5% on fortnightly cleaning services",
        "discount": 5,
        "availabilityStarts": "2024-01-01",
        "availabilityEnds": "2024-12-31"
      },
      {
        "@type": "Offer",
        "name": "3-Weekly Cleaning Discount",
        "description": "Save 3% on 3-weekly cleaning services",
        "discount": 3,
        "availabilityStarts": "2024-01-01",
        "availabilityEnds": "2024-12-31"
      }
    ]
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 
