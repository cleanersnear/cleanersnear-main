import type { Metadata } from "next";
import { GeneralCleaningHero } from "./components/GeneralCleaningHero";
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
    title: `General House Cleaning ${capitalizedSuburb} | Professional Home Cleaning | Cleaning Professionals`,
    description: `Professional general house cleaning service in ${capitalizedSuburb}. Regular maintenance cleaning to keep your home spotless. Experienced cleaners with flexible scheduling. Starting from $92 for 2 hours.`,
    keywords: [
      `general house cleaning ${capitalizedSuburb}`,
      `home cleaning ${capitalizedSuburb}`, 
      `house cleaning service ${capitalizedSuburb}`,
      `general cleaning ${capitalizedSuburb} $92`,
      `professional house cleaning ${capitalizedSuburb}`,
      `home cleaning service ${capitalizedSuburb}`,
      `house cleaning ${capitalizedSuburb}`,
      `general cleaning service ${capitalizedSuburb}`,
      `regular house cleaning ${capitalizedSuburb}`,
      `${capitalizedSuburb} cleaning company`,
      `trusted cleaners ${capitalizedSuburb}`,
      `insured cleaners ${capitalizedSuburb}`,
      `best cleaners ${capitalizedSuburb}`,
      `affordable cleaning ${capitalizedSuburb}`,
      `${capitalizedSuburb} house cleaning near me`,
      `local cleaners ${capitalizedSuburb}`,
      `professional cleaners ${capitalizedSuburb}`,
      `reliable cleaning ${capitalizedSuburb}`
    ].join(", "),
    alternates: { 
      canonical: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/general-cleaning` 
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
      title: `General House Cleaning ${capitalizedSuburb} | Professional Home Cleaning | Cleaning Professionals`,
      description: `Professional general house cleaning service in ${capitalizedSuburb}. Regular maintenance cleaning to keep your home spotless with experienced cleaners. Starting from $92 for 2 hours.`,
      url: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/general-cleaning`,
      siteName: 'Cleaning Professionals',
      locale: 'en_AU',
      type: "website",
      images: [
        {
          url: "https://www.cleaningprofessionals.com.au/images/general-cleaning.png",
          width: 1200,
          height: 630,
          alt: `Professional General House Cleaning Service in ${capitalizedSuburb}, Victoria`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `General House Cleaning ${capitalizedSuburb} | Professional Home Cleaning`,
      description: `Professional general house cleaning service in ${capitalizedSuburb} by Cleaning Professionals. Starting from $92 for 2 hours.`,
      images: ["https://www.cleaningprofessionals.com.au/images/general-cleaning.png"],
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

export default async function GeneralCleaningPage({ params }: PageProps) {
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
    "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/general-cleaning#service`,
    "name": `General House Cleaning ${capitalizeFirstLetter(locationData.name)}`,
    "description": `Professional general house cleaning service in ${capitalizeFirstLetter(locationData.name)}. Regular maintenance cleaning to keep your home spotless. Starting from $92 for 2 hours.`,
    "serviceType": "General House Cleaning",
    "provider": { "@id": "https://www.cleaningprofessionals.com.au/#localbusiness" },
    "image": "https://www.cleaningprofessionals.com.au/images/general-cleaning.png",
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
      "name": "General Cleaning Packages",
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
        { "@type": "ListItem", position: 4, name: "General Cleaning", item: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/general-cleaning` },
      ],
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/general-cleaning`
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What's included in general house cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "General cleaning includes essential maintenance tasks like dusting, vacuuming, mopping, kitchen and bathroom cleaning, window cleaning, and general tidying to keep your home consistently clean and well-maintained."
        }
      },
      {
        "@type": "Question",
        "name": `How often should I book general cleaning in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "General cleaning is perfect for weekly, fortnightly, or monthly maintenance. The frequency depends on your lifestyle and preferences. We can work with you to create a schedule that keeps your home consistently clean."
        }
      },
      {
        "@type": "Question",
        "name": "How long does general cleaning take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "General cleaning typically takes 2-4 hours depending on home size and requirements. We start with a 2-hour minimum for standard homes and add time as needed for larger properties or additional tasks."
        }
      },
      {
        "@type": "Question",
        "name": `How much does general cleaning cost in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `General cleaning in ${capitalizeFirstLetter(locationData.name)} starts from $92 for 2 hours, then $38/hour thereafter. This provides excellent value for regular maintenance cleaning. Get an instant quote when you book online based on your home size and requirements.`
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between general and deep cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "General cleaning focuses on regular maintenance and essential tasks, while deep cleaning is more thorough and includes inside appliances, detailed scrubbing, and areas often missed in routine cleaning."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to provide cleaning supplies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, we bring all necessary cleaning supplies and equipment. Our team arrives fully prepared with professional-grade cleaning products and tools to ensure the best results for your home."
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
        "name": "General Cleaning",
        "item": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/general-cleaning`
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
    "description": `Professional cleaning services in ${capitalizeFirstLetter(locationData.name)}, Victoria. General house cleaning, regular cleaning, and more.`,
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
        <GeneralCleaningHero locationData={locationData} suburbSlug={resolvedParams.suburb} />
        <BeforeAfterGallery serviceSlug="general-cleaning" />
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