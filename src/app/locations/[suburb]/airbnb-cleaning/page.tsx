import type { Metadata } from "next";
import { AirbnbCleaningHero } from "./components/AirbnbCleaningHero";
import AirbnbImageGallery from "./components/AirbnbImageGallery";
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
    title: `Airbnb Cleaning ${capitalizedSuburb} | Short-Stay Turnover Cleaners | Cleaning Professionals`,
    description: `Fast, reliable Airbnb cleaning in ${capitalizedSuburb}. Turnover service with linen change, restocking and hotel-standard presentation. From $118 for 2 hours.`,
    keywords: [
      `airbnb cleaning ${capitalizedSuburb}`,
      `short stay cleaning ${capitalizedSuburb}`,
      `turnover cleaning ${capitalizedSuburb}`,
      `holiday rental cleaning ${capitalizedSuburb}`,
      `airbnb host cleaning ${capitalizedSuburb}`,
      `vacation rental cleaning ${capitalizedSuburb}`,
      `short term rental cleaning ${capitalizedSuburb}`,
      `hotel standard cleaning ${capitalizedSuburb}`,
      `${capitalizedSuburb} airbnb cleaners`,
      `airbnb turnover service ${capitalizedSuburb}`,
      `guest ready cleaning ${capitalizedSuburb}`,
      `airbnb linen service ${capitalizedSuburb}`,
      `fast turnover cleaning ${capitalizedSuburb}`,
      `airbnb cleaning near me ${capitalizedSuburb}`,
      `best airbnb cleaners ${capitalizedSuburb}`,
      `professional airbnb cleaning ${capitalizedSuburb}`
    ],
    alternates: { 
      canonical: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/airbnb-cleaning` 
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
      title: `Airbnb Cleaning ${capitalizedSuburb} | Short-Stay Turnover Cleaners | Cleaning Professionals`,
      description: `Fast, reliable Airbnb cleaning in ${capitalizedSuburb}. Turnover service with linen change and hotel-standard presentation. From $118 for 2 hours.`,
      url: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/airbnb-cleaning`,
      siteName: 'Cleaning Professionals',
      locale: 'en_AU',
      type: "website",
      images: [
        {
          url: "https://www.cleaningprofessionals.com.au/images/airbnb-cleaning-melbourne.png",
          width: 1200,
          height: 630,
          alt: `Professional Airbnb Cleaning Service in ${capitalizedSuburb}, Victoria`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Airbnb Cleaning ${capitalizedSuburb} | Short-Stay Turnover Cleaners`,
      description: `Fast, reliable Airbnb cleaning in ${capitalizedSuburb} by Cleaning Professionals. From $118 for 2 hours.`,
      images: ["https://www.cleaningprofessionals.com.au/images/airbnb-cleaning-melbourne.png"],
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

export default async function AirbnbCleaningPage({ params }: PageProps) {
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
    "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/airbnb-cleaning#service`,
    "name": `Airbnb Cleaning Service ${capitalizeFirstLetter(locationData.name)}`,
    "description": `Professional Airbnb cleaning service in ${capitalizeFirstLetter(locationData.name)}. Fast turnovers with hotel-standard presentation for your short-term rental. Starting from $118 for 2 hours.`,
    "serviceType": "Airbnb Cleaning",
    "provider": { "@id": "https://www.cleaningprofessionals.com.au/#localbusiness" },
    "image": "https://www.cleaningprofessionals.com.au/images/airbnb-cleaning-melbourne.png",
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
      "serviceUrl": `https://www.cleaningprofessionals.com.au/book?selectedServices=Airbnb%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
      "serviceSmsNumber": process.env.NEXT_PUBLIC_CONTACT_PHONE,
      "availableLanguage": "English"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Regular Airbnb Cleaning",
        "description": "Regular cleaning service for Airbnb properties",
        "priceCurrency": "AUD",
        "price": "118.00",
        "priceValidUntil": "2025-12-31",
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Airbnb%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
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
            "value": "45"
          },
          {
            "@type": "PropertyValue",
            "name": "Service Type",
            "value": "Regular Cleaning"
          }
        ]
      },
      {
        "@type": "Offer",
        "name": "Once-off Airbnb Cleaning", 
        "description": "One-time deep cleaning for Airbnb properties",
        "priceCurrency": "AUD",
        "price": "198.00",
        "priceValidUntil": "2025-12-31",
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Airbnb%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
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
            "value": "50"
          },
          {
            "@type": "PropertyValue",
            "name": "Service Type",
            "value": "Once-off Cleaning"
          }
        ]
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Airbnb Cleaning Packages",
      "itemListElement": [
        { 
          "@type": "Offer", 
          "name": "Regular Airbnb Cleaning", 
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Airbnb%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
          "description": `Regular turnover cleaning for Airbnb properties in ${capitalizeFirstLetter(locationData.name)}`
        },
        { 
          "@type": "Offer", 
          "name": "Once-off Airbnb Cleaning", 
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Airbnb%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
          "description": `One-time deep cleaning for Airbnb properties in ${capitalizeFirstLetter(locationData.name)}`
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
        { "@type": "ListItem", position: 4, name: "Airbnb Cleaning", item: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/airbnb-cleaning` },
      ],
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/airbnb-cleaning`
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What's the difference between regular and once-off Airbnb cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Regular Airbnb cleaning is for ongoing turnover service between guests, focusing on quick, efficient cleaning with linen changes. Once-off cleaning is for deep cleaning after renovations, move-ins/outs, or when your property needs extensive attention."
        }
      },
      {
        "@type": "Question",
        "name": `How fast can you turn around my Airbnb property in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We specialize in fast turnovers! Our regular cleaning typically takes 2-3 hours depending on property size. We can often accommodate same-day bookings and work around your guest check-in/out schedules."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in Airbnb cleaning service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our Airbnb cleaning in ${capitalizeFirstLetter(locationData.name)} includes complete linen change, bathroom deep clean, kitchen sanitization, floor cleaning, surface dusting, amenity restocking, trash removal, and guest-ready presentation with quality inspection.`
        }
      },
      {
        "@type": "Question",
        "name": `How much does Airbnb cleaning cost in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Regular Airbnb cleaning in ${capitalizeFirstLetter(locationData.name)} starts from $118 for 2 hours, then $45/hour thereafter. Once-off deep cleaning starts from $198 for 3 hours, then $50/hour thereafter. Pricing depends on property size and specific requirements.`
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide your own cleaning supplies and linens?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We bring all cleaning supplies and equipment. For linens, we can either use your existing stock or coordinate with your linen service. We'll discuss your preferences during booking to ensure everything is ready for your guests."
        }
      },
      {
        "@type": "Question",
        "name": "What if there are issues after cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We guarantee our work! If you're not satisfied with any aspect of the cleaning, contact us within 24 hours and we'll return to fix it at no additional cost. Your guest experience is our priority."
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
        "name": "Airbnb Cleaning",
        "item": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/airbnb-cleaning`
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
    "description": `Professional Airbnb cleaning services in ${capitalizeFirstLetter(locationData.name)}, Victoria. Fast turnovers for short-term rentals.`,
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
        <AirbnbCleaningHero locationData={locationData} suburbSlug={resolvedParams.suburb} />
        
        <PricingStructure locationData={locationData} />
        <WhatsIncluded />
        <ReviewsSection locationData={locationData} />
        <AirbnbImageGallery locationData={locationData} />
        <FAQSection locationData={locationData} />
        <HomeLatestBlogs />
        <Subscription />
      </div>
    </MainLayout>
  );
}
