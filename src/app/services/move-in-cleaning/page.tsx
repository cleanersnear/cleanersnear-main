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
  
export const metadata: Metadata = {
  title: "Move In Cleaning Melbourne | Pre-Move Cleaning Service | Cleaning Professionals",
  description:
    "Professional move-in cleaning service in Melbourne. Ensure your new home is spotless before you move in. Same-day service available with experienced cleaners.",
  keywords: [
    "move in cleaning melbourne",
    "pre move in cleaning melbourne", 
    "new home cleaning melbourne",
    "move in cleaning service $161",
    "professional move in cleaning",
    "cleaning before moving in melbourne",
    "home cleaning before move in",
    "move in house cleaning melbourne",
    "pre occupancy cleaning",
    "new property cleaning melbourne",
    "melbourne move in cleaning company",
    "trusted move in cleaners melbourne",
    "insured move in cleaners melbourne"
  ].join(", "),
  alternates: { canonical: "https://www.cleaningprofessionals.com.au/services/move-in-cleaning" },
  openGraph: {
    title: "Move In Cleaning Melbourne | Pre-Move Cleaning Service | Cleaning Professionals",
    description:
      "Professional move-in cleaning service in Melbourne. Ensure your new home is spotless before you move in with experienced cleaners.",
    url: "https://www.cleaningprofessionals.com.au/services/move-in-cleaning",
    type: "website",
    images: [
      {
        url: "/images/move-in-cleaning.png",
        width: 1200,
        height: 630,
        alt: "Professional Move In Cleaning Service Melbourne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Move In Cleaning Melbourne | Pre-Move Cleaning Service",
    description:
      "Professional move-in cleaning service in Melbourne by Cleaning Professionals.",
    images: ["/images/move-in-cleaning.png"],
  },
};

export default function MoveInCleaningPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.cleaningprofessionals.com.au/services/move-in-cleaning#service",
    "name": "Move In Cleaning Service Melbourne",
    "description": "Professional move-in cleaning service in Melbourne. Ensure your new home is spotless before you move in. Starting from $161 for 3 hours.",
    "serviceType": "Move In Cleaning",
    "provider": { "@id": "https://www.cleaningprofessionals.com.au/#localbusiness" },
    "areaServed": {
      "@type": "City",
      "name": "Melbourne",
      "containedInPlace": {
        "@type": "State",
        "name": "Victoria"
      }
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://www.cleaningprofessionals.com.au/book",
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
        "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Move%20In%20Cleaning",
        "availability": "https://schema.org/InStock",
        "eligibleRegion": "Melbourne",
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
        "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Move%20In%20Cleaning",
        "availability": "https://schema.org/InStock",
        "eligibleRegion": "Melbourne",
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
          "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Move%20In%20Cleaning",
          "description": "Comprehensive move-in cleaning for most homes"
        },
        { 
          "@type": "Offer", 
          "name": "Premium Move In Clean", 
          "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Move%20In%20Cleaning",
          "description": "Extensive cleaning for large homes"
        },
      ],
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "itemReviewed": {
        "@type": "Service",
        "name": "Move In Cleaning Service Melbourne",
        "@id": "https://www.cleaningprofessionals.com.au/services/move-in-cleaning#service"
      },
      "ratingValue": "4.9",
      "reviewCount": "1200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.cleaningprofessionals.com.au/services/move-in-cleaning"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cleaningprofessionals.com.au" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://www.cleaningprofessionals.com.au/services" },
      { "@type": "ListItem", position: 3, name: "Move In Cleaning", item: "https://www.cleaningprofessionals.com.au/services/move-in-cleaning" },
    ],
  };
   
  

  return (
    <MainLayout>
      <div className="mt-28">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <MoveInCleaningHero />
        <BeforeAfterGallery serviceSlug="move-in-cleaning" />
        <PricingStructure />
        <WhatsIncluded />
         {/* <FAQs /> */}
         <ReviewsSection />
        <FAQSection />
        <HomeLatestBlogs />
       
        {/* <RequestCallback service={service} /> */}
        
         <Subscription />
      </div>
    </MainLayout>
  );
}
