import type { Metadata } from "next";
import NDISServiceHero from "./components/NDISServiceHero";
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import { WhatsIncluded } from "./components/WhatsIncluded";
import { PricingStructure } from "./components/PricingStructure";
import { Subscription } from "../components/Subscription";
import HomeLatestBlogs from "@/components/Home/HomeBlogs/HomeLatestBlogs";
import MainLayout from "@/components/layout/MainLayout";
import ReviewsSection from "./components/ReviewsSection";
import FAQSection from "./components/FAQSection";
import { MELBOURNE_REGIONS } from '@/utils/location/regions';

interface LocationData {
  name: string;
  region: string;
  council: string;
  mainSuburbs: string[];
  postcode: string;
}

interface PageProps {
  params: Promise<{ suburb: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const suburb = resolvedParams.suburb.replace(/-/g, ' ');
  
  // Capitalize first letter of suburb name
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  const capitalizedSuburb = capitalizeFirstLetter(suburb);
  
  return {
    title: `NDIS Cleaning ${capitalizedSuburb} | Registered NDIS House Cleaning | Cleaning Professionals`,
    description: `Compassionate, reliable NDIS cleaning in ${capitalizedSuburb}. Flexible support for NDIS participants with tailored house cleaning services. From $112 for 2 hours.`,
    keywords: [
      `ndis cleaning ${capitalizedSuburb}`,
      `ndis house cleaning ${capitalizedSuburb}`,
      `disability support cleaning ${capitalizedSuburb}`,
      `ndis registered cleaners ${capitalizedSuburb}`,
      `ndis cleaning services ${capitalizedSuburb}`,
      `disability cleaning ${capitalizedSuburb}`,
      `ndis home cleaning ${capitalizedSuburb}`,
      `support worker cleaning ${capitalizedSuburb}`,
      `${capitalizedSuburb} ndis cleaning`,
      `ndis cleaner near me ${capitalizedSuburb}`,
      `ndis approved cleaning ${capitalizedSuburb}`,
      `ndis cleaning plan ${capitalizedSuburb}`,
      `ndis daily living support ${capitalizedSuburb}`,
      `ndis core supports cleaning ${capitalizedSuburb}`,
      `compassionate cleaners ${capitalizedSuburb}`,
      `disability friendly cleaning ${capitalizedSuburb}`
    ].join(", "),
    alternates: { 
      canonical: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/ndis-cleaning` 
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
    openGraph: {
      title: `NDIS Cleaning ${capitalizedSuburb} | Registered NDIS House Cleaning | Cleaning Professionals`,
      description: `Compassionate, reliable NDIS cleaning in ${capitalizedSuburb}. Flexible support for NDIS participants. From $112 for 2 hours.`,
      url: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/ndis-cleaning`,
      siteName: 'Cleaning Professionals',
      locale: 'en_AU',
      type: "website",
      images: [
        {
          url: "https://www.cleaningprofessionals.com.au/images/ndis-cleaning.jpg",
          width: 1200,
          height: 630,
          alt: `Professional NDIS Cleaning Service in ${capitalizedSuburb}, Victoria`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `NDIS Cleaning ${capitalizedSuburb} | Registered NDIS House Cleaning`,
      description: `Compassionate, reliable NDIS cleaning in ${capitalizedSuburb} by Cleaning Professionals. From $112 for 2 hours.`,
      images: ["https://www.cleaningprofessionals.com.au/images/ndis-cleaning.jpg"],
      creator: '@CleaningProsAU',
      site: '@CleaningProsAU',
    },
    other: {
      'geo.region': 'AU-VIC',
      'geo.placename': capitalizedSuburb,
      'format-detection': 'telephone=yes',
    },
  };
}

export default async function NDISCleaningPage({ params }: PageProps) {
  const resolvedParams = await params;
  const suburb = resolvedParams.suburb.replace(/-/g, ' ');
  
  // Capitalize first letter of suburb name
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  let locationData: LocationData | undefined;
  
  // Search through regions to find the suburb
  Object.values(MELBOURNE_REGIONS).forEach(region => {
    region.councils.forEach(council => {
      const suburbIndex = council.key_suburbs
        .findIndex(s => s.toLowerCase() === suburb.toLowerCase())
      
      if (suburbIndex !== -1) {
        locationData = {
          name: suburb,
          region: region.name,
          council: council.name,
          mainSuburbs: council.key_suburbs.filter(s => 
            s.toLowerCase() !== suburb.toLowerCase()
          ),
          postcode: council.postcodes[suburbIndex]
        }
      }
    })
  })

  if (!locationData) {
    return (
      <MainLayout>
        <div className="mt-28 container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-[#1E3D8F] mb-6">Location Not Found</h1>
            <p className="text-lg mb-8">We couldn&apos;t find information about this specific location.</p>
          </div>
        </div>
      </MainLayout>
    )
  }
  
  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/ndis-cleaning#service`,
    "name": `NDIS Cleaning Service ${capitalizeFirstLetter(locationData.name)}`,
    "description": `Professional NDIS cleaning service in ${capitalizeFirstLetter(locationData.name)}. Compassionate, reliable support for NDIS participants with flexible weekly or fortnightly cleaning schedules. Starting from $112 for 2 hours.`,
    "serviceType": "NDIS Cleaning",
    "provider": { "@id": "https://www.cleaningprofessionals.com.au/#localbusiness" },
    "image": "https://www.cleaningprofessionals.com.au/images/ndis-cleaning.jpg",
    "areaServed": {
      "@type": "City",
      "name": capitalizeFirstLetter(locationData.name),
      "containedInPlace": {
        "@type": "State",
        "name": "Victoria"
      }
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `https://www.cleaningprofessionals.com.au/book?selectedServices=NDIS%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
      "serviceSmsNumber": process.env.NEXT_PUBLIC_CONTACT_PHONE,
      "availableLanguage": "English"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Weekly NDIS Cleaning",
        "description": "Weekly house cleaning service for NDIS participants with same cleaner every visit",
        "priceCurrency": "AUD",
        "price": "112.00",
        "priceValidUntil": "2025-12-31",
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=NDIS%20Cleaning&frequency=Weekly&location=${encodeURIComponent(locationData.name)}`,
        "availability": "https://schema.org/InStock",
        "eligibleRegion": capitalizeFirstLetter(locationData.name),
        "validFrom": "2024-01-01",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Minimum Duration",
            "value": "2 hours"
          },
          {
            "@type": "PropertyValue", 
            "name": "Hourly Rate After Minimum",
            "value": "56"
          },
          {
            "@type": "PropertyValue",
            "name": "Frequency",
            "value": "Weekly"
          }
        ]
      },
      {
        "@type": "Offer",
        "name": "Fortnightly NDIS Cleaning", 
        "description": "Fortnightly house cleaning service for NDIS participants with same cleaner every visit",
        "priceCurrency": "AUD",
        "price": "168.00",
        "priceValidUntil": "2025-12-31",
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=NDIS%20Cleaning&frequency=Fortnightly&location=${encodeURIComponent(locationData.name)}`,
        "availability": "https://schema.org/InStock",
        "eligibleRegion": capitalizeFirstLetter(locationData.name),
        "validFrom": "2024-01-01",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Minimum Duration",
            "value": "3 hours"
          },
          {
            "@type": "PropertyValue",
            "name": "Hourly Rate After Minimum", 
            "value": "56"
          },
          {
            "@type": "PropertyValue",
            "name": "Frequency",
            "value": "Fortnightly"
          }
        ]
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "NDIS Cleaning Packages",
      "itemListElement": [
        { 
          "@type": "Offer", 
          "name": "Weekly NDIS Cleaning", 
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=NDIS%20Cleaning&frequency=Weekly&location=${encodeURIComponent(locationData.name)}`,
          "description": `Weekly house cleaning with dedicated cleaner for NDIS participants in ${capitalizeFirstLetter(locationData.name)}`
        },
        { 
          "@type": "Offer", 
          "name": "Fortnightly NDIS Cleaning", 
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=NDIS%20Cleaning&frequency=Fortnightly&location=${encodeURIComponent(locationData.name)}`,
          "description": `Fortnightly house cleaning with dedicated cleaner for NDIS participants in ${capitalizeFirstLetter(locationData.name)}`
        },
      ],
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cleaningprofessionals.com.au" },
        { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.cleaningprofessionals.com.au/locations" },
        { "@type": "ListItem", position: 3, name: capitalizeFirstLetter(locationData.name), item: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}` },
        { "@type": "ListItem", position: 4, name: "NDIS Cleaning", item: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/ndis-cleaning` },
      ],
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/ndis-cleaning`
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are your cleaners NDIS registered?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our cleaners are experienced in working with NDIS participants and understand the specific needs and requirements. We provide compassionate, professional cleaning services tailored to support your independence and comfort."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between weekly and fortnightly NDIS cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Weekly cleaning provides consistent support with the same cleaner visiting every week in ${capitalizeFirstLetter(locationData.name)}, perfect for those who need regular assistance. Fortnightly cleaning is ideal for participants who prefer less frequent service while maintaining a clean home.`
        }
      },
      {
        "@type": "Question",
        "name": "What's included in NDIS cleaning service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our NDIS cleaning in ${capitalizeFirstLetter(locationData.name)} includes dusting, vacuuming, mopping, bathroom cleaning, kitchen cleaning, tidying, bed making, and basic organization. We can also assist with light tasks like organizing and can accommodate specific needs you may have.`
        }
      },
      {
        "@type": "Question",
        "name": `How much does NDIS cleaning cost in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `NDIS cleaning in ${capitalizeFirstLetter(locationData.name)} starts from $112 for 2 hours (weekly) or $168 for 3 hours (fortnightly), then $56/hour thereafter. The cost depends on your home size and specific requirements. We can work with your NDIS plan coordinator.`
        }
      },
      {
        "@type": "Question",
        "name": "Can I use my NDIS funding for cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our cleaning services can be funded through your NDIS plan under Core Supports - Assistance with Daily Life. We can work with your plan coordinator to ensure proper invoicing and payment arrangements."
        }
      },
      {
        "@type": "Question",
        "name": "Will I get the same cleaner each visit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! We assign you a dedicated cleaner who will learn your preferences, home layout, and any specific needs you may have. This consistency helps build trust and ensures the best possible service."
        }
      }
    ]
  };

  // BreadcrumbList Schema (separate for better SEO)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.cleaningprofessionals.com.au"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": "https://www.cleaningprofessionals.com.au/locations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": capitalizeFirstLetter(locationData.name),
        "item": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "NDIS Cleaning",
        "item": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/ndis-cleaning`
      }
    ]
  };

  // LocalBusiness Schema for location-specific business info
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}#localbusiness`,
    "name": `Cleaning Professionals - ${capitalizeFirstLetter(locationData.name)}`,
    "image": "https://www.cleaningprofessionals.com.au/images/logo.png",
    "description": `Professional NDIS cleaning services in ${capitalizeFirstLetter(locationData.name)}, Victoria. Compassionate support for NDIS participants.`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": capitalizeFirstLetter(locationData.name),
      "addressRegion": "VIC",
      "postalCode": locationData.postcode,
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressLocality": capitalizeFirstLetter(locationData.name)
    },
    "telephone": process.env.NEXT_PUBLIC_CONTACT_PHONE,
    "priceRange": "$$",
    "areaServed": {
      "@type": "City",
      "name": capitalizeFirstLetter(locationData.name)
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1200",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <MainLayout>
      <div className="mt-28">
        {/* Service Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        
        {/* FAQ Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        
        {/* LocalBusiness Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <NDISServiceHero locationData={locationData} suburbSlug={resolvedParams.suburb} />
        <BeforeAfterGallery serviceSlug="ndis-cleaning" />
        <PricingStructure locationData={locationData} />
        <WhatsIncluded />
        <ReviewsSection locationData={locationData} />
        <FAQSection locationData={locationData} />
        <HomeLatestBlogs />
        <Subscription />
      </div>
    </MainLayout>
  );
}
