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
  
export const metadata: Metadata = {
  title: "Regular House Cleaning Melbourne | Weekly & Fortnightly Cleaners | Cleaning Professionals",
  description:
    "Trusted regular house cleaning in Melbourne. Weekly or fortnightly schedules with the same vetted, insured cleaner. Easy online booking and flexible times.",
  keywords: [
    "regular house cleaning melbourne",
    "weekly cleaning service melbourne", 
    "fortnightly cleaning melbourne",
    "house cleaning melbourne $92",
    "same cleaner every week",
    "vetted cleaners melbourne",
    "professional house cleaning",
    "cleaning service melbourne",
    "home cleaning melbourne",
    "house cleaners melbourne",
    "regular cleaning service",
    "weekly house cleaning",
    "fortnightly house cleaning",
    "melbourne cleaning company",
    "trusted cleaners melbourne",
    "insured cleaners melbourne"
  ].join(", "),
  alternates: { canonical: "https://www.cleaningprofessionals.com.au/services/regular-cleaning" },
  openGraph: {
    title: "Regular House Cleaning Melbourne | Weekly & Fortnightly Cleaners | Cleaning Professionals",
    description:
      "Trusted regular house cleaning in Melbourne. Same cleaner each visit, flexible schedules and easy online booking.",
    url: "https://www.cleaningprofessionals.com.au/services/regular-cleaning",
    type: "website",
    images: [
      {
        url: "/images/general-cleaning.jpg",
        width: 1200,
        height: 630,
        alt: "Professional Regular House Cleaning Service Melbourne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regular House Cleaning Melbourne | Weekly & Fortnightly Cleaners",
    description:
      "Trusted regular house cleaning in Melbourne by Cleaning Professionals.",
    images: ["/images/general-cleaning.jpg"],
  },
};

export default function RegularCleaningPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.cleaningprofessionals.com.au/services/regular-cleaning#service",
    "name": "Regular House Cleaning Melbourne",
    "description": "Professional regular house cleaning service in Melbourne. Weekly and fortnightly cleaning schedules with the same trusted cleaner every visit. Starting from $92 for 2 hours.",
    "serviceType": "Regular House Cleaning",
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
        "name": "Weekly Regular Cleaning",
        "description": "Weekly house cleaning service with same cleaner every visit",
        "priceCurrency": "AUD",
        "price": "92.05",
        "priceValidUntil": "2025-12-31",
        "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Regular%20Cleaning&frequency=Weekly",
        "availability": "https://schema.org/InStock",
        "eligibleRegion": "Melbourne",
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
        "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Regular%20Cleaning&frequency=Fortnightly",
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
          "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Regular%20Cleaning&frequency=Weekly",
          "description": "Weekly house cleaning with dedicated cleaner"
        },
        { 
          "@type": "Offer", 
          "name": "Fortnightly Regular Cleaning", 
          "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Regular%20Cleaning&frequency=Fortnightly",
          "description": "Fortnightly house cleaning with dedicated cleaner"
        },
      ],
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "itemReviewed": {
        "@type": "Service",
        "name": "Regular House Cleaning Melbourne",
        "@id": "https://www.cleaningprofessionals.com.au/services/regular-cleaning#service"
      },
      "ratingValue": "4.9",
      "reviewCount": "1200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.cleaningprofessionals.com.au/services/regular-cleaning"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cleaningprofessionals.com.au" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://www.cleaningprofessionals.com.au/services" },
      { "@type": "ListItem", position: 3, name: "Regular Cleaning", item: "https://www.cleaningprofessionals.com.au/services/regular-cleaning" },
    ],
  };
   
  

  return (
    <MainLayout>
      <div className="mt-28">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <RegularCleaningHero />
        <BeforeAfterGallery serviceSlug="regular-cleaning" />
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
