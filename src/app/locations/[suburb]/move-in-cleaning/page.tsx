import type { Metadata } from "next";
import { MoveInCleaningHero } from "./components/MoveInCleaningHero";
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
    title: `Move In Cleaning ${capitalizedSuburb} | Pre-Move Cleaning Service | Cleaning Professionals`,
    description: `Professional move-in cleaning service in ${capitalizedSuburb}. Ensure your new home is spotless before you move in. Same-day service available with experienced cleaners. Starting from $161 for 3 hours.`,
    keywords: [
      `move in cleaning ${capitalizedSuburb}`,
      `pre move in cleaning ${capitalizedSuburb}`, 
      `new home cleaning ${capitalizedSuburb}`,
      `move in cleaning service ${capitalizedSuburb} $161`,
      `professional move in cleaning ${capitalizedSuburb}`,
      `cleaning before moving in ${capitalizedSuburb}`,
      `home cleaning before move in ${capitalizedSuburb}`,
      `move in house cleaning ${capitalizedSuburb}`,
      `pre occupancy cleaning ${capitalizedSuburb}`,
      `new property cleaning ${capitalizedSuburb}`,
      `${capitalizedSuburb} move in cleaning company`,
      `trusted move in cleaners ${capitalizedSuburb}`,
      `insured move in cleaners ${capitalizedSuburb}`,
      `best move in cleaners ${capitalizedSuburb}`,
      `affordable move in cleaning ${capitalizedSuburb}`,
      `${capitalizedSuburb} move in cleaning near me`,
      `local move in cleaners ${capitalizedSuburb}`,
      `professional move in cleaners ${capitalizedSuburb}`,
      `reliable move in cleaning ${capitalizedSuburb}`
    ].join(", "),
    alternates: { 
      canonical: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/move-in-cleaning` 
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
      title: `Move In Cleaning ${capitalizedSuburb} | Pre-Move Cleaning Service | Cleaning Professionals`,
      description: `Professional move-in cleaning service in ${capitalizedSuburb}. Ensure your new home is spotless before you move in with experienced cleaners. Starting from $161 for 3 hours.`,
      url: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/move-in-cleaning`,
      siteName: 'Cleaning Professionals',
      locale: 'en_AU',
      type: "website",
      images: [
        {
          url: "https://www.cleaningprofessionals.com.au/images/move-in-cleaning.png",
          width: 1200,
          height: 630,
          alt: `Professional Move In Cleaning Service in ${capitalizedSuburb}, Victoria`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Move In Cleaning ${capitalizedSuburb} | Pre-Move Cleaning Service`,
      description: `Professional move-in cleaning service in ${capitalizedSuburb} by Cleaning Professionals. Starting from $161 for 3 hours.`,
      images: ["https://www.cleaningprofessionals.com.au/images/move-in-cleaning.png"],
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

export default async function MoveInCleaningPage({ params }: PageProps) {
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
    "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/move-in-cleaning#service`,
    "name": `Move In Cleaning ${capitalizeFirstLetter(locationData.name)}`,
    "description": `Professional move-in cleaning service in ${capitalizeFirstLetter(locationData.name)}. Ensure your new home is spotless before you move in. Starting from $161 for 3 hours.`,
    "serviceType": "Move In Cleaning",
    "provider": { "@id": "https://www.cleaningprofessionals.com.au/#localbusiness" },
    "image": "https://www.cleaningprofessionals.com.au/images/move-in-cleaning.png",
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
        "name": "Standard Move In Clean",
        "description": "Comprehensive move-in cleaning for most homes and apartments",
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
            "value": "Move In Cleaning"
          }
        ]
      },
      {
        "@type": "Offer",
        "name": "Premium Move In Clean", 
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
            "value": "Premium Move In Cleaning"
          }
        ]
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Move In Cleaning Packages",
      "itemListElement": [
        { 
          "@type": "Offer", 
          "name": "Standard Move In Clean", 
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=Once-Off%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
          "description": `Comprehensive move-in cleaning for most homes in ${capitalizeFirstLetter(locationData.name)}`
        },
        { 
          "@type": "Offer", 
          "name": "Premium Move In Clean", 
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
        { "@type": "ListItem", position: 4, name: "Move In Cleaning", item: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/move-in-cleaning` },
      ],
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/move-in-cleaning`
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When should I book move-in cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Book your move-in cleaning 1-2 days before your actual move-in date. This ensures the property is spotless and ready when you arrive with your belongings."
        }
      },
      {
        "@type": "Question",
        "name": `How long does move-in cleaning take in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Move-in cleaning typically takes 3-6 hours depending on home size and condition. We start with a 3-hour minimum for standard homes and add time as needed for larger properties."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in move-in cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our move-in cleaning includes comprehensive dusting, floor cleaning, inside appliances, window cleaning, light fixtures, cabinets, baseboards, and detailed bathroom/kitchen cleaning to ensure your new ${capitalizeFirstLetter(locationData.name)} home is move-in ready.`
        }
      },
      {
        "@type": "Question",
        "name": `How much does move-in cleaning cost in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Move-in cleaning in ${capitalizeFirstLetter(locationData.name)} starts from $161 for 3 hours, then $45/hour thereafter. Premium packages with additional services start from $296. Get an instant quote when you book online based on your home size and requirements.`
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to be present during move-in cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you don't need to be present. Our team can access the property with keys or codes provided. We'll clean thoroughly and leave everything ready for your arrival."
        }
      },
      {
        "@type": "Question",
        "name": "What if I find issues after move-in cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a 100% satisfaction guarantee. If you're not completely satisfied with any aspect of the cleaning, contact us within 24 hours and we'll return to fix it at no extra cost."
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
        "name": "Move In Cleaning",
        "item": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/move-in-cleaning`
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
    "description": `Professional cleaning services in ${capitalizeFirstLetter(locationData.name)}, Victoria. Move-in cleaning, deep cleaning, and more.`,
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
        <MoveInCleaningHero locationData={locationData} suburbSlug={resolvedParams.suburb} />
        <BeforeAfterGallery serviceSlug="move-in-cleaning" />
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