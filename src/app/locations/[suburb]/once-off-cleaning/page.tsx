import type { Metadata } from "next";
import { OnceoffCleaningHero } from "./components/OnceoffCleaningHero";
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
    title: `Once-Off Deep Cleaning ${capitalizedSuburb} | Spring Clean & Move-In/Out | Cleaning Professionals`,
    description: `Professional once-off deep cleaning in ${capitalizedSuburb}. Perfect for move-in/out, spring cleans, or post-renovation. Thorough cleaning from $161 for 3 hours.`,
    keywords: [
      `once off cleaning ${capitalizedSuburb}`,
      `deep cleaning ${capitalizedSuburb}`,
      `spring cleaning ${capitalizedSuburb}`,
      `move in cleaning ${capitalizedSuburb}`,
      `move out cleaning ${capitalizedSuburb}`,
      `post renovation cleaning ${capitalizedSuburb}`,
      `one time cleaning ${capitalizedSuburb}`,
      `thorough cleaning ${capitalizedSuburb}`,
      `${capitalizedSuburb} deep cleaning service`,
      `professional deep clean ${capitalizedSuburb}`,
      `end of lease cleaning ${capitalizedSuburb}`,
      `bond cleaning ${capitalizedSuburb}`,
      `spring clean ${capitalizedSuburb}`,
      `house deep clean ${capitalizedSuburb}`,
      `apartment deep cleaning ${capitalizedSuburb}`,
      `deep cleaning near me ${capitalizedSuburb}`,
      `best deep cleaners ${capitalizedSuburb}`,
      `affordable deep cleaning ${capitalizedSuburb}`
    ].join(", "),
    alternates: { 
      canonical: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/once-off-cleaning` 
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
      title: `Once-Off Deep Cleaning ${capitalizedSuburb} | Spring Clean & Move-In/Out | Cleaning Professionals`,
      description: `Professional once-off deep cleaning in ${capitalizedSuburb}. Perfect for move-in/out, spring cleans, or post-renovation. From $161 for 3 hours.`,
      url: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/once-off-cleaning`,
      siteName: 'Cleaning Professionals',
      locale: 'en_AU',
      type: "website",
      images: [
        {
          url: "https://www.cleaningprofessionals.com.au/images/deep-cleaning.png",
          width: 1200,
          height: 630,
          alt: `Professional Once-Off Deep Cleaning Service in ${capitalizedSuburb}, Victoria`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Once-Off Deep Cleaning ${capitalizedSuburb} | Spring Clean & Move-In/Out`,
      description: `Professional once-off deep cleaning in ${capitalizedSuburb} by Cleaning Professionals. From $161 for 3 hours.`,
      images: ["https://www.cleaningprofessionals.com.au/images/deep-cleaning.png"],
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

export default async function OnceOffCleaningPage({ params }: PageProps) {
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
    "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/once-off-cleaning#service`,
    "name": `Once-Off Deep Cleaning ${capitalizeFirstLetter(locationData.name)}`,
    "description": `Professional once-off deep cleaning service in ${capitalizeFirstLetter(locationData.name)}. Perfect for move-in/out, spring cleans, or post-renovation cleaning. Starting from $161 for 3 hours.`,
    "serviceType": "Once-Off Deep Cleaning",
    "provider": { "@id": "https://www.cleaningprofessionals.com.au/#localbusiness" },
    "image": "https://www.cleaningprofessionals.com.au/images/deep-cleaning.png",
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
      "serviceUrl": `https://www.cleaningprofessionals.com.au/book?selectedServices=Once-Off%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
      "serviceSmsNumber": process.env.NEXT_PUBLIC_CONTACT_PHONE,
      "availableLanguage": "English"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Standard Deep Clean",
        "description": "Comprehensive deep cleaning for most homes and apartments",
        "priceCurrency": "AUD",
        "price": "161.00",
        "priceValidUntil": "2025-12-31",
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Once-Off%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
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
            "value": "45"
          },
          {
            "@type": "PropertyValue",
            "name": "Service Type",
            "value": "Deep Cleaning"
          }
        ]
      },
      {
        "@type": "Offer",
        "name": "Premium Deep Clean", 
        "description": "Extensive cleaning for large homes or heavy-duty requirements",
        "priceCurrency": "AUD",
        "price": "296.00",
        "priceValidUntil": "2025-12-31",
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Once-Off%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
        "availability": "https://schema.org/InStock",
        "eligibleRegion": capitalizeFirstLetter(locationData.name),
        "validFrom": "2024-01-01",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Minimum Duration",
            "value": "6 hours"
          },
          {
            "@type": "PropertyValue",
            "name": "Hourly Rate After Minimum", 
            "value": "45"
          },
          {
            "@type": "PropertyValue",
            "name": "Service Type",
            "value": "Premium Deep Cleaning"
          }
        ]
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Once-Off Cleaning Packages",
      "itemListElement": [
        { 
          "@type": "Offer", 
          "name": "Standard Deep Clean", 
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Once-Off%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
          "description": `Comprehensive deep cleaning for most homes in ${capitalizeFirstLetter(locationData.name)}`
        },
        { 
          "@type": "Offer", 
          "name": "Premium Deep Clean", 
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Once-Off%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
          "description": `Extensive cleaning for large homes in ${capitalizeFirstLetter(locationData.name)}`
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
        { "@type": "ListItem", position: 4, name: "Once-Off Cleaning", item: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/once-off-cleaning` },
      ],
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/once-off-cleaning`
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What's the difference between regular and once-off deep cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once-off deep cleaning is more thorough than regular cleaning, focusing on areas often missed in routine maintenance. It includes inside appliances, detailed scrubbing, window cleaning, and deep sanitizing perfect for move-in/out or post-renovation."
        }
      },
      {
        "@type": "Question",
        "name": `How long does a once-off deep clean take in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Deep cleaning typically takes 4-8 hours depending on home size and requirements. We start with a 4-hour minimum for standard homes and add time as needed for larger properties or additional services."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in a once-off deep cleaning service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our deep cleaning includes comprehensive dusting, carpet cleaning, floor scrubbing, inside appliances, window cleaning, light fixtures, cabinets, baseboards, and detailed bathroom/kitchen cleaning to restore your ${capitalizeFirstLetter(locationData.name)} home to pristine condition.`
        }
      },
      {
        "@type": "Question",
        "name": `How much does once-off deep cleaning cost in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Deep cleaning in ${capitalizeFirstLetter(locationData.name)} starts from $161 for 3 hours, then $45/hour thereafter. Premium packages with additional services start from $296. Get an instant quote when you book online based on your home size and requirements.`
        }
      },
      {
        "@type": "Question",
        "name": "When is the best time for a deep clean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Perfect for move-in/out, spring cleaning, post-renovation, or when your home needs a thorough refresh. We can schedule same-day or advance bookings to fit your timeline."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to prepare anything before the deep clean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Just clear surfaces and move valuable items. Our team brings all supplies and equipment. We'll handle everything from moving furniture (with permission) to detailed cleaning of every surface."
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
        "name": "Once-Off Cleaning",
        "item": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/once-off-cleaning`
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
    "description": `Professional deep cleaning services in ${capitalizeFirstLetter(locationData.name)}, Victoria. Once-off cleaning, move-in/out cleaning, and more.`,
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
        <OnceoffCleaningHero locationData={locationData} suburbSlug={resolvedParams.suburb} />
        <BeforeAfterGallery serviceSlug="once-off-cleaning" />
        <PricingStructure locationData={locationData} />
        <WhatsIncluded />
        <ReviewsSection locationData={locationData} />
        <FAQSection locationData={locationData} />
        <HomeLatestBlogs />
       
        {/* <RequestCallback service={service} /> */}
        
        <Subscription />
      </div>
    </MainLayout>
  );
}
