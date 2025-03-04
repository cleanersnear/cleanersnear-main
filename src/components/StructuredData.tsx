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
    
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "250",
      "bestRating": "5",
      "worstRating": "1"
    },

    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "datePublished": "2024-02-15",
        "reviewBody": "Excellent end of lease cleaning service. Got my full bond back!"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Michael Chen"
        },
        "datePublished": "2024-02-10",
        "reviewBody": "Very professional NDIS cleaning service. Highly recommended!"
      }
    ],
    
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Melbourne",
      "addressRegion": "VIC",
      "addressCountry": "AU",
      "postalCode": "3000"
    },

    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -37.8136,
      "longitude": 144.9631
    },

    "hasMap": "https://www.google.com/maps?cid=YourGoogleBusinessID",
    
    "areaServed": [
      {
        "@type": "City",
        "name": "Melbourne",
        "containsPlace": [
          // Inner City & CBD
          {
            "@type": "Suburb",
            "name": "CBD"
          },
          {
            "@type": "Suburb",
            "name": "Carlton"
          },
          {
            "@type": "Suburb",
            "name": "Docklands"
          },
          {
            "@type": "Suburb",
            "name": "Southbank"
          },
          // Inner South East
          {
            "@type": "Suburb",
            "name": "South Yarra"
          },
          {
            "@type": "Suburb",
            "name": "Richmond"
          },
          {
            "@type": "Suburb",
            "name": "Toorak"
          },
          {
            "@type": "Suburb",
            "name": "Hawthorn"
          },
          {
            "@type": "Suburb",
            "name": "Camberwell"
          },
          // Inner South
          {
            "@type": "Suburb",
            "name": "St Kilda"
          },
          {
            "@type": "Suburb",
            "name": "South Melbourne"
          },
          {
            "@type": "Suburb",
            "name": "Port Melbourne"
          },
          // Inner North
          {
            "@type": "Suburb",
            "name": "Brunswick"
          },
          {
            "@type": "Suburb",
            "name": "Northcote"
          },
          {
            "@type": "Suburb",
            "name": "Fitzroy"
          },
          // Inner West
          {
            "@type": "Suburb",
            "name": "Footscray"
          },
          {
            "@type": "Suburb",
            "name": "Yarraville"
          },
          {
            "@type": "Suburb",
            "name": "Williamstown"
          },
          // Eastern Suburbs
          {
            "@type": "Suburb",
            "name": "Box Hill"
          },
          {
            "@type": "Suburb",
            "name": "Balwyn"
          },
          {
            "@type": "Suburb",
            "name": "Kew"
          },
          // South Eastern
          {
            "@type": "Suburb",
            "name": "Caulfield"
          },
          {
            "@type": "Suburb",
            "name": "Glen Waverley"
          },
          {
            "@type": "Suburb",
            "name": "Mount Waverley"
          },
          // Northern
          {
            "@type": "Suburb",
            "name": "Preston"
          },
          {
            "@type": "Suburb",
            "name": "Reservoir"
          },
          {
            "@type": "Suburb",
            "name": "Heidelberg"
          },
          // Western
          {
            "@type": "Suburb",
            "name": "Essendon"
          },
          {
            "@type": "Suburb",
            "name": "Moonee Ponds"
          },
          {
            "@type": "Suburb",
            "name": "Caroline Springs"
          }
        ]
      }
    ],
    
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
        "itemOffered": {
          "@type": "Service",
          "name": "Weekly Cleaning Service",
          "description": "Regular weekly cleaning service"
        },
        "name": "Weekly Cleaning Special Offer",
        "description": "Save 10% on weekly cleaning services",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": 43.65,
          "priceCurrency": "AUD",
          "description": "10% off regular rate of $48.50"
        },
        "availabilityStarts": "2024-01-01",
        "availabilityEnds": "2024-12-31"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fortnightly Cleaning Service",
          "description": "Regular fortnightly cleaning service"
        },
        "name": "Fortnightly Cleaning Special Offer",
        "description": "Save 5% on fortnightly cleaning services",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": 55.58,
          "priceCurrency": "AUD",
          "description": "5% off regular rate of $58.50"
        },
        "availabilityStarts": "2024-01-01",
        "availabilityEnds": "2024-12-31"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "3-Weekly Cleaning Service",
          "description": "Regular 3-weekly cleaning service"
        },
        "name": "3-Weekly Cleaning Special Offer",
        "description": "Save 3% on 3-weekly cleaning services",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": 61.16,
          "priceCurrency": "AUD",
          "description": "3% off regular rate of $63.05"
        },
        "availabilityStarts": "2024-01-01",
        "availabilityEnds": "2024-12-31"
      }
    ],

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
    },

    "additionalType": [
      "https://schema.org/CleaningService",
      "https://schema.org/HousekeepingService",
      "https://schema.org/HomeAndConstructionBusiness"
    ],

    "sameAs": [
      "https://www.facebook.com/people/Cleaning-Professionals/61572518431848/",
      "https://www.instagram.com/cleaning__professionals/",
      "https://www.linkedin.com/company/cleaning-professionals-melbourne/"
    ],

    "paymentAccepted": [
      "Cash",
      "Credit Card",
      "Debit Card",
      "Bank Transfer",
      "EFTPOS"
    ],

    "currenciesAccepted": "AUD",

    "keywords": [
      "end of lease cleaning melbourne",
      "house cleaning melbourne",
      "ndis cleaning services",
      "bond cleaning melbourne",
      "regular cleaning service",
      "deep cleaning melbourne",
      "professional cleaners melbourne"
    ],

    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "End of Lease Cleaning",
          "description": "Professional end of lease cleaning with bond back guarantee"
        },
        {
          "@type": "OfferCatalog",
          "name": "Regular House Cleaning",
          "description": "Weekly, fortnightly, and monthly cleaning services"
        },
        {
          "@type": "OfferCatalog",
          "name": "NDIS Cleaning",
          "description": "Specialized cleaning services for NDIS participants"
        }
      ]
    },

    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://cleaningprofessionals.com.au"
    },

    "slogan": "Professional Cleaning Services in Melbourne",

    "faqPage": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you provide a bond back guarantee?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we provide a 100% bond back guarantee with our end of lease cleaning service. If your real estate agent is not satisfied, we'll return to clean again at no extra cost."
          }
        },
        {
          "@type": "Question",
          "name": "What areas do you service in Melbourne?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We service all Melbourne suburbs including CBD, South Yarra, Richmond, Toorak, St Kilda, Brunswick, and surrounding areas. Our professional cleaners are available across inner, eastern, western, northern and southern suburbs."
          }
        },
        {
          "@type": "Question",
          "name": "What is included in your regular cleaning service?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our regular cleaning service includes thorough cleaning of all rooms, bathrooms, kitchen, dusting, vacuuming, mopping, and surface sanitization. We can customize the service based on your specific needs."
          }
        },
        {
          "@type": "Question",
          "name": "Are you an NDIS registered provider?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we are an NDIS registered provider offering specialized cleaning services for NDIS participants at approved rates."
          }
        },
        {
          "@type": "Question",
          "name": "How much does end of lease cleaning cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our end of lease cleaning prices start from $260 for studios and range up to $890 for 4-bedroom homes. The exact price depends on the property size, condition, and specific requirements. All prices include our bond back guarantee."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide all cleaning supplies and equipment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our professional cleaners bring all necessary cleaning supplies, equipment, and eco-friendly products. You don't need to provide anything. We use professional-grade equipment and environmentally friendly cleaning solutions."
          }
        },
        {
          "@type": "Question",
          "name": "How do I book a cleaning service?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can easily book online through our website, call us at 0450124086, or send us a message. We'll confirm your booking within minutes and send you a detailed confirmation email with all the necessary information."
          }
        },
        {
          "@type": "Question",
          "name": "What payment methods do you accept?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We accept multiple payment methods including cash, credit cards, debit cards, bank transfers, and EFTPOS. Payment is typically required after the service is completed and you're satisfied with the results."
          }
        },
        {
          "@type": "Question",
          "name": "Are your cleaners insured and police checked?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all our cleaners are fully insured, police checked, and professionally trained. We maintain public liability insurance and ensure our team follows strict safety and quality standards."
          }
        },
        {
          "@type": "Question",
          "name": "What if I need to reschedule my booking?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We understand plans can change. You can reschedule your booking with at least 24 hours notice without any fee. Please contact us as soon as possible if you need to make any changes to your booking."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer special discounts for regular cleaning?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer discounts for regular cleaning services: 10% off for weekly cleaning, 5% off for fortnightly cleaning, and 3% off for 3-weekly cleaning services. The more frequent the service, the better the discount."
          }
        },
        {
          "@type": "Question",
          "name": "What's your satisfaction guarantee?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer a 100% satisfaction guarantee on all our services. If you're not completely satisfied with any aspect of our service, we'll return to address any issues at no additional cost within 24 hours."
          }
        }
      ]
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
