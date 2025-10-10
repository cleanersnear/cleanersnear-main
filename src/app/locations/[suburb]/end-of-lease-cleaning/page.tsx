import type { Metadata } from "next";
import { EOLCleaningHero } from "./components/EOLCleaningHero";
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import { WhatsIncluded } from "./components/WhatsIncluded";
import { PricingStructure } from "./components/PricingSection";
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
    title: `End of Lease Cleaning ${capitalizedSuburb} | Bond Back Guarantee | Cleaning Professionals`,
    description: `Professional end of lease cleaning in ${capitalizedSuburb} with bond back guarantee. REIV checklist compliant from $205 for studios. Get your full bond back with our guaranteed service.`,
    keywords: [
      `end of lease cleaning ${capitalizedSuburb}`,
      `bond cleaning ${capitalizedSuburb}`,
      `move out cleaning ${capitalizedSuburb}`,
      `REIV checklist cleaning ${capitalizedSuburb}`,
      `bond back guarantee ${capitalizedSuburb}`,
      `professional end of lease cleaning ${capitalizedSuburb}`,
      `rental cleaning ${capitalizedSuburb}`,
      `property cleaning ${capitalizedSuburb}`,
      `bond cleaning service ${capitalizedSuburb}`,
      `end of lease cleaners ${capitalizedSuburb}`,
      `move out cleaning service ${capitalizedSuburb}`,
      `rental property cleaning ${capitalizedSuburb}`,
      `bond cleaning guarantee ${capitalizedSuburb}`,
      `${capitalizedSuburb} bond cleaners`,
      `end of lease cleaning prices ${capitalizedSuburb}`,
      `vacate cleaning ${capitalizedSuburb}`
    ],
    alternates: { 
      canonical: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/end-of-lease-cleaning` 
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
      title: `End of Lease Cleaning ${capitalizedSuburb} | Bond Back Guarantee | Cleaning Professionals`,
      description: `Professional end of lease cleaning in ${capitalizedSuburb} with bond back guarantee. REIV checklist compliant from $205. Get your full bond back.`,
      url: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/end-of-lease-cleaning`,
      siteName: 'Cleaning Professionals',
      locale: 'en_AU',
      type: "website",
      images: [
        {
          url: "https://www.cleaningprofessionals.com.au/images/end-of-lease-cleaning.png",
          width: 1200,
          height: 630,
          alt: `Professional End of Lease Cleaning Service in ${capitalizedSuburb}, Victoria`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `End of Lease Cleaning ${capitalizedSuburb} | Bond Back Guarantee`,
      description: `Professional end of lease cleaning in ${capitalizedSuburb} by Cleaning Professionals. From $205.`,
      images: ["https://www.cleaningprofessionals.com.au/images/end-of-lease-cleaning.png"],
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

export default async function EndOfLeaseCleaningPage({ params }: PageProps) {
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
    "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/end-of-lease-cleaning#service`,
    "name": `End of Lease Cleaning Service ${capitalizeFirstLetter(locationData.name)}`,
    "description": `Professional end of lease cleaning for rental properties in ${capitalizeFirstLetter(locationData.name)} with bond back guarantee. REIV checklist compliant with packages from $205 for studios to $625 for 4 bedroom properties.`,
    "serviceType": "End of Lease Cleaning",
    "provider": { "@id": "https://www.cleaningprofessionals.com.au/#localbusiness" },
    "image": "https://www.cleaningprofessionals.com.au/images/end-of-lease-cleaning.png",
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
      "serviceUrl": `https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
      "serviceSmsNumber": process.env.NEXT_PUBLIC_CONTACT_PHONE,
      "availableLanguage": "English"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Studio End of Lease Cleaning",
        "description": "REIV compliant end of lease cleaning for studio apartments with bond back guarantee",
        "priceCurrency": "AUD",
        "price": "205.00",
        "priceValidUntil": "2025-12-31",
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
        "availability": "https://schema.org/InStock",
        "eligibleRegion": capitalizeFirstLetter(locationData.name),
        "validFrom": "2024-01-01",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Property Size",
            "value": "Studio"
          },
          {
            "@type": "PropertyValue",
            "name": "Bond Back Guarantee",
            "value": "Yes"
          }
        ]
      },
      {
        "@type": "Offer",
        "name": "1 Bedroom End of Lease Cleaning",
        "description": "REIV compliant end of lease cleaning for 1 bedroom properties with bond back guarantee",
        "priceCurrency": "AUD",
        "price": "255.00",
        "priceValidUntil": "2025-12-31",
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
        "availability": "https://schema.org/InStock",
        "eligibleRegion": capitalizeFirstLetter(locationData.name),
        "validFrom": "2024-01-01",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Property Size",
            "value": "1 Bedroom"
          },
          {
            "@type": "PropertyValue",
            "name": "Bond Back Guarantee",
            "value": "Yes"
          }
        ]
      },
      {
        "@type": "Offer",
        "name": "2 Bedroom End of Lease Cleaning",
        "description": "REIV compliant end of lease cleaning for 2 bedroom properties with bond back guarantee",
        "priceCurrency": "AUD",
        "price": "310.00",
        "priceValidUntil": "2025-12-31",
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
        "availability": "https://schema.org/InStock",
        "eligibleRegion": capitalizeFirstLetter(locationData.name),
        "validFrom": "2024-01-01",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Property Size",
            "value": "2 Bedrooms"
          },
          {
            "@type": "PropertyValue",
            "name": "Bond Back Guarantee",
            "value": "Yes"
          }
        ]
      },
      {
        "@type": "Offer",
        "name": "3 Bedroom End of Lease Cleaning",
        "description": "REIV compliant end of lease cleaning for 3 bedroom properties with bond back guarantee",
        "priceCurrency": "AUD",
        "price": "450.00",
        "priceValidUntil": "2025-12-31",
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
        "availability": "https://schema.org/InStock",
        "eligibleRegion": capitalizeFirstLetter(locationData.name),
        "validFrom": "2024-01-01",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Property Size",
            "value": "3 Bedrooms"
          },
          {
            "@type": "PropertyValue",
            "name": "Bond Back Guarantee",
            "value": "Yes"
          }
        ]
      },
      {
        "@type": "Offer",
        "name": "4 Bedroom End of Lease Cleaning",
        "description": "REIV compliant end of lease cleaning for 4 bedroom properties with bond back guarantee",
        "priceCurrency": "AUD",
        "price": "625.00",
        "priceValidUntil": "2025-12-31",
        "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
        "availability": "https://schema.org/InStock",
        "eligibleRegion": capitalizeFirstLetter(locationData.name),
        "validFrom": "2024-01-01",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Property Size",
            "value": "4 Bedrooms"
          },
          {
            "@type": "PropertyValue",
            "name": "Bond Back Guarantee",
            "value": "Yes"
          }
        ]
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "End of Lease Cleaning Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Studio End of Lease Cleaning",
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
          "description": `Perfect for studio apartments in ${capitalizeFirstLetter(locationData.name)} - $205`
        },
        {
          "@type": "Offer",
          "name": "1 Bedroom End of Lease Cleaning",
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
          "description": `Ideal for 1 bedroom apartments in ${capitalizeFirstLetter(locationData.name)} - $255`
        },
        {
          "@type": "Offer",
          "name": "2 Bedroom End of Lease Cleaning",
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
          "description": `Perfect for 2 bedroom homes in ${capitalizeFirstLetter(locationData.name)} - $310`
        },
        {
          "@type": "Offer",
          "name": "3 Bedroom End of Lease Cleaning",
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
          "description": `Ideal for 3 bedroom houses in ${capitalizeFirstLetter(locationData.name)} - $450`
        },
        {
          "@type": "Offer",
          "name": "4 Bedroom End of Lease Cleaning",
          "url": `https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`,
          "description": `Perfect for large 4 bedroom houses in ${capitalizeFirstLetter(locationData.name)} - $625`
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
        { "@type": "ListItem", position: 4, name: "End of Lease Cleaning", item: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/end-of-lease-cleaning` },
      ],
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/end-of-lease-cleaning`
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What's included in your end of lease cleaning service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our end of lease cleaning in ${capitalizeFirstLetter(locationData.name)} includes complete kitchen deep clean, bathroom sanitization, inside all appliances, window cleaning, floor mopping & vacuuming, cabinet cleaning, light fixtures, baseboards, and door & frame cleaning. Everything needed to meet real estate standards.`
        }
      },
      {
        "@type": "Question",
        "name": "Do you guarantee bond back with your end of lease cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer a bond back guarantee. Our cleaning meets REIV checklist standards and real estate requirements. If there are any issues, we'll return to fix them at no extra cost to ensure you get your full bond back."
        }
      },
      {
        "@type": "Question",
        "name": `How much does end of lease cleaning cost in ${capitalizeFirstLetter(locationData.name)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `End of lease cleaning in ${capitalizeFirstLetter(locationData.name)} starts from $205 for studio apartments, $255 for 1 bedroom, $310 for 2 bedrooms, $450 for 3 bedrooms, and $625 for 4 bedrooms. All prices include our bond back guarantee and professional equipment.`
        }
      },
      {
        "@type": "Question",
        "name": "How long does end of lease cleaning take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cleaning time depends on property size and condition. Studio apartments typically take 2-3 hours, while larger properties can take 4-8 hours. We work efficiently to complete the job thoroughly while meeting your timeline requirements."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide your own cleaning supplies and equipment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we bring all professional cleaning supplies, equipment, and eco-friendly products. We're fully equipped with commercial-grade cleaning tools to ensure the highest quality results that meet real estate standards."
        }
      },
      {
        "@type": "Question",
        "name": "Can you work around my move-out schedule?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! We offer flexible scheduling including evenings and weekends to fit your move-out timeline. We can often provide same-day service and work around your schedule to ensure the property is ready for your final inspection."
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
        "name": "End of Lease Cleaning",
        "item": `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/end-of-lease-cleaning`
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
    "description": `Professional end of lease cleaning services in ${capitalizeFirstLetter(locationData.name)}, Victoria. Bond back guarantee for all rental properties.`,
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
    "priceRange": "$$-$$$",
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
        <EOLCleaningHero locationData={locationData} suburbSlug={resolvedParams.suburb} />
        <BeforeAfterGallery serviceSlug="end-of-lease-cleaning" />
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
