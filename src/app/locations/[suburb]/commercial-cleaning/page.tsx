import type { Metadata } from "next";
import { CommercialCleaningHero } from "./components/CommercialCleaningHero";
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
    title: `Commercial Cleaning ${capitalizedSuburb} | Office & Retail Cleaning | Cleaning Professionals`,
    description: `Professional commercial cleaning in ${capitalizedSuburb}. Office, retail, and business cleaning services with flexible scheduling. From $50/hour for regular service, $60/hour once-off.`,
    keywords: [
      `commercial cleaning ${capitalizedSuburb}`,
      `office cleaning ${capitalizedSuburb}`,
      `retail cleaning ${capitalizedSuburb}`,
      `business cleaning ${capitalizedSuburb}`,
      `professional cleaners ${capitalizedSuburb}`,
      `commercial cleaning companies ${capitalizedSuburb}`,
      `office maintenance cleaning ${capitalizedSuburb}`,
      `retail space cleaning ${capitalizedSuburb}`,
      `business cleaning contractors ${capitalizedSuburb}`,
      `${capitalizedSuburb} commercial cleaners`,
      `strata cleaning ${capitalizedSuburb}`,
      `after hours cleaning ${capitalizedSuburb}`,
      `workplace cleaning ${capitalizedSuburb}`,
      `commercial cleaners near me ${capitalizedSuburb}`,
      `best office cleaners ${capitalizedSuburb}`,
      `affordable commercial cleaning ${capitalizedSuburb}`
    ],
    alternates: { 
      canonical: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/commercial-cleaning` 
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
      title: `Commercial Cleaning ${capitalizedSuburb} | Office & Retail Cleaning | Cleaning Professionals`,
      description: `Professional commercial cleaning in ${capitalizedSuburb}. Flexible scheduling for offices, retail spaces, and businesses. From $50/hour.`,
      url: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/commercial-cleaning`,
      siteName: 'Cleaning Professionals',
      locale: 'en_AU',
      type: "website",
      images: [
        {
          url: "https://www.cleaningprofessionals.com.au/images/commercial-cleaning.png",
          width: 1200,
          height: 630,
          alt: `Professional Commercial Cleaning Service in ${capitalizedSuburb}, Victoria`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Commercial Cleaning ${capitalizedSuburb} | Office & Retail Cleaning`,
      description: `Professional commercial cleaning in ${capitalizedSuburb} by Cleaning Professionals. From $50/hour.`,
      images: ["https://www.cleaningprofessionals.com.au/images/commercial-cleaning.png"],
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

export default async function CommercialCleaningPage({ params }: PageProps) {
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
    "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/commercial-cleaning#service`,
    "name": `Commercial Cleaning Service ${capitalizeFirstLetter(locationData.name)}`,
    "description": `Professional commercial cleaning for offices, retail spaces, and businesses in ${capitalizeFirstLetter(locationData.name)}. Flexible scheduling from $50/hour for regular service, $60/hour for once-off cleaning.`,
    "serviceType": "Commercial Cleaning",
    "provider": { "@id": "https://www.cleaningprofessionals.com.au/#localbusiness" },
    "image": "https://www.cleaningprofessionals.com.au/images/commercial-cleaning.png",
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
      "serviceUrl": `https://www.cleaningprofessionals.com.au/book?selectedServices=Commercial%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
      "serviceSmsNumber": process.env.NEXT_PUBLIC_CONTACT_PHONE,
      "availableLanguage": "English"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Once-off Commercial Cleaning",
        "description": "One-time commercial cleaning service for special events or deep cleans",
        "priceCurrency": "AUD",
        "price": "60",
        "priceValidUntil": "2025-12-31",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "60",
          "priceCurrency": "AUD",
          "unitText": "HOUR"
        },
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Commercial%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
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
            "name": "Service Type",
            "value": "Once-off Cleaning"
          }
        ]
      },
      {
        "@type": "Offer", 
        "name": "Regular Commercial Cleaning",
        "description": "Ongoing commercial cleaning with frequency discounts",
        "priceCurrency": "AUD",
        "price": "50",
        "priceValidUntil": "2025-12-31",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "50",
          "priceCurrency": "AUD",
          "unitText": "HOUR"
        },
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Commercial%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
        "availability": "https://schema.org/InStock",
        "eligibleRegion": capitalizeFirstLetter(locationData.name),
        "validFrom": "2024-01-01",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Service Type",
            "value": "Regular Cleaning"
          },
          {
            "@type": "PropertyValue",
            "name": "Frequency Options",
            "value": "Weekly, Fortnightly, Monthly"
          }
        ]
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Commercial Cleaning Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Once-off Commercial Cleaning",
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Commercial%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
          "description": `Perfect for one-time deep cleaning or special events in ${capitalizeFirstLetter(locationData.name)}`
        },
        {
          "@type": "Offer",
          "name": "Regular Commercial Cleaning",
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Commercial%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
          "description": `Ongoing maintenance cleaning with frequency discounts in ${capitalizeFirstLetter(locationData.name)}`
        }
      ]
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
        { "@type": "ListItem", position: 4, name: "Commercial Cleaning", item: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/commercial-cleaning` },
      ],
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/commercial-cleaning`
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What's the difference between once-off and regular commercial cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once-off cleaning is perfect for special events, move-ins, or one-time deep cleans. Regular cleaning provides ongoing maintenance with consistent scheduling and frequency discounts for weekly, fortnightly, or monthly service."
        }
      },
      {
        "@type": "Question",
        "name": `How many staff do you send for commercial cleaning in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We can provide 1-4 cleaning staff depending on your space size and requirements. For larger offices, we typically send 2-3 staff to ensure efficient and thorough cleaning within your preferred timeframe."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in your commercial cleaning service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our commercial cleaning in ${capitalizeFirstLetter(locationData.name)} includes office desk cleaning, floor mopping & vacuuming, restroom sanitization, kitchen/break room cleaning, window cleaning, trash removal, and common area maintenance to keep your workplace spotless.`
        }
      },
      {
        "@type": "Question",
        "name": `How much does commercial cleaning cost in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Commercial cleaning in ${capitalizeFirstLetter(locationData.name)} starts at $50/hour for regular service and $60/hour for once-off cleaning. We offer flexible scheduling and frequency discounts for ongoing contracts. Get an instant quote based on your space size and requirements.`
        }
      },
      {
        "@type": "Question",
        "name": "Can you work outside business hours?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer flexible scheduling including evenings, weekends, and early mornings to minimize disruption to your business operations. We can work around your business hours for maximum convenience."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide your own cleaning supplies and equipment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we bring all professional cleaning supplies, equipment, and eco-friendly products. We're fully equipped with commercial-grade cleaning tools to ensure the highest quality results for your business."
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
        "name": "Commercial Cleaning",
        "item": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/commercial-cleaning`
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
    "description": `Professional commercial cleaning services in ${capitalizeFirstLetter(locationData.name)}, Victoria. Office and retail cleaning solutions.`,
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
        <CommercialCleaningHero locationData={locationData} suburbSlug={resolvedParams.suburb} />
        <BeforeAfterGallery serviceSlug="commercial-cleaning" />
        <PricingStructure locationData={locationData} />
        <WhatsIncluded />
        <ReviewsSection locationData={locationData} />
        <FAQSection locationData={locationData} />
        <HomeLatestBlogs />
        <Subscription />
       {/* <RequestCallback service="Commercial Cleaning" /> */}
      </div>
    </MainLayout>
  );
}
