import type { Metadata } from "next";
import { RegularCleaningHero } from "./components/RegularCleaningHero";
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
    title: `Regular House Cleaning ${capitalizedSuburb} | Weekly & Fortnightly Cleaners | Cleaning Professionals`,
    description: `Trusted regular house cleaning in ${capitalizedSuburb}. Weekly or fortnightly schedules with the same vetted, insured cleaner. Easy online booking and flexible times. Starting from $92 for 2 hours.`,
    keywords: [
      `regular house cleaning ${capitalizedSuburb}`,
      `weekly cleaning service ${capitalizedSuburb}`, 
      `fortnightly cleaning ${capitalizedSuburb}`,
      `house cleaning ${capitalizedSuburb} $92`,
      `same cleaner every week ${capitalizedSuburb}`,
      `vetted cleaners ${capitalizedSuburb}`,
      `professional house cleaning ${capitalizedSuburb}`,
      `cleaning service ${capitalizedSuburb}`,
      `home cleaning ${capitalizedSuburb}`,
      `house cleaners ${capitalizedSuburb}`,
      `regular cleaning service ${capitalizedSuburb}`,
      `weekly house cleaning ${capitalizedSuburb}`,
      `fortnightly house cleaning ${capitalizedSuburb}`,
      `${capitalizedSuburb} cleaning company`,
      `trusted cleaners ${capitalizedSuburb}`,
      `insured cleaners ${capitalizedSuburb}`,
      `best cleaners ${capitalizedSuburb}`,
      `affordable cleaning ${capitalizedSuburb}`,
      `${capitalizedSuburb} house cleaning near me`,
      `local cleaners ${capitalizedSuburb}`
    ].join(", "),
    alternates: { 
      canonical: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/regular-cleaning` 
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
      title: `Regular House Cleaning ${capitalizedSuburb} | Weekly & Fortnightly Cleaners | Cleaning Professionals`,
      description: `Trusted regular house cleaning in ${capitalizedSuburb}. Same cleaner each visit, flexible schedules and easy online booking. Starting from $92 for 2 hours.`,
      url: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/regular-cleaning`,
      siteName: 'Cleaning Professionals',
      locale: 'en_AU',
      type: "website",
      images: [
        {
          url: "https://www.cleaningprofessionals.com.au/images/general-cleaning.jpg",
          width: 1200,
          height: 630,
          alt: `Professional Regular House Cleaning Service in ${capitalizedSuburb}, Victoria`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Regular House Cleaning ${capitalizedSuburb} | Weekly & Fortnightly Cleaners`,
      description: `Trusted regular house cleaning in ${capitalizedSuburb} by Cleaning Professionals. From $92 for 2 hours.`,
      images: ["https://www.cleaningprofessionals.com.au/images/general-cleaning.jpg"],
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

export default async function RegularCleaningPage({ params }: PageProps) {
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
    "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/regular-cleaning#service`,
    "name": `Regular House Cleaning ${capitalizeFirstLetter(locationData.name)}`,
    "description": `Professional regular house cleaning service in ${capitalizeFirstLetter(locationData.name)}. Weekly and fortnightly cleaning schedules with the same trusted cleaner every visit. Starting from $92 for 2 hours.`,
    "serviceType": "Regular House Cleaning",
    "provider": { "@id": "https://www.cleaningprofessionals.com.au/#localbusiness" },
    "image": "https://www.cleaningprofessionals.com.au/images/general-cleaning.jpg",
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
      "serviceUrl": `https://www.cleaningprofessionals.com.au/book?selectedServices=Regular%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
      "serviceSmsNumber": process.env.NEXT_PUBLIC_CONTACT_PHONE,
      "availableLanguage": "English"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Weekly Regular Cleaning",
        "description": "Weekly house cleaning service with same cleaner every visit",
        "priceCurrency": "AUD",
        "price": "92.05",
        "priceValidUntil": "2025-12-31",
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Regular%20Cleaning&frequency=Weekly&location=${encodeURIComponent(locationData.name)}`,
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
            "value": "38"
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
        "name": "Fortnightly Regular Cleaning", 
        "description": "Fortnightly house cleaning service with same cleaner every visit",
        "priceCurrency": "AUD",
        "price": "130.05",
        "priceValidUntil": "2025-12-31",
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Regular%20Cleaning&frequency=Fortnightly&location=${encodeURIComponent(locationData.name)}`,
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
            "value": "38"
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
      "name": "Regular Cleaning Packages",
      "itemListElement": [
        { 
          "@type": "Offer", 
          "name": "Weekly Regular Cleaning", 
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Regular%20Cleaning&frequency=Weekly&location=${encodeURIComponent(locationData.name)}`,
          "description": `Weekly house cleaning with dedicated cleaner in ${capitalizeFirstLetter(locationData.name)}`
        },
        { 
          "@type": "Offer", 
          "name": "Fortnightly Regular Cleaning", 
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Regular%20Cleaning&frequency=Fortnightly&location=${encodeURIComponent(locationData.name)}`,
          "description": `Fortnightly house cleaning with dedicated cleaner in ${capitalizeFirstLetter(locationData.name)}`
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
        { "@type": "ListItem", position: 4, name: "Regular Cleaning", item: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/regular-cleaning` },
      ],
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/regular-cleaning`
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What's the difference between weekly and fortnightly cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Weekly cleaning provides consistent maintenance with the same cleaner visiting every week. Fortnightly cleaning is perfect for smaller homes or those who prefer less frequent service. Both include the same comprehensive cleaning tasks."
        }
      },
      {
        "@type": "Question",
        "name": `Will I get the same cleaner every time in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We assign you a dedicated cleaner for consistency. They'll learn your preferences, home layout, and specific requirements to provide the best service possible."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in a regular cleaning service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our regular cleaning includes dusting, vacuuming, mopping, bathroom cleaning, kitchen cleaning, tidying, bed making, and basic organization. We also clean appliances like fridges and ovens as needed. All services are performed by our professional ${capitalizeFirstLetter(locationData.name)} cleaners.`
        }
      },
      {
        "@type": "Question",
        "name": `How much does regular cleaning cost in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Regular cleaning in ${capitalizeFirstLetter(locationData.name)} starts from $92 for 2 hours, then $38/hour thereafter. The total cost depends on your home size and specific requirements. Get an instant quote when you book online.`
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize my regular cleaning schedule?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Absolutely! You can choose weekly or fortnightly frequency, select your preferred day and time, and specify any additional tasks. We'll create a cleaning plan tailored to your ${capitalizeFirstLetter(locationData.name)} home needs.`
        }
      },
      {
        "@type": "Question",
        "name": "What if I need to skip or reschedule a cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No problem! You can reschedule or skip cleanings with 24 hours' notice through your booking confirmation or by contacting us. We're flexible with your schedule changes."
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
        "name": "Regular Cleaning",
        "item": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/regular-cleaning`
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
    "description": `Professional cleaning services in ${capitalizeFirstLetter(locationData.name)}, Victoria. Regular house cleaning, deep cleaning, and more.`,
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
        <RegularCleaningHero locationData={locationData} suburbSlug={resolvedParams.suburb} />
        <BeforeAfterGallery serviceSlug="regular-cleaning" />
        <PricingStructure locationData={locationData} />
        <WhatsIncluded />
         {/* <FAQs /> */}
         <ReviewsSection locationData={locationData} />
        <FAQSection locationData={locationData} />
        <HomeLatestBlogs />
       
        {/* <RequestCallback service={service} /> */}
        
         <Subscription />
      </div>
    </MainLayout>
  );
}
