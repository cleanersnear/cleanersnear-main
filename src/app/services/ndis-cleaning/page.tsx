import type { Metadata } from "next";
// import { NdisCleaningHero } from "./components/NdisCleaningHero";
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import { WhatsIncluded } from "./components/WhatsIncluded";
import { PricingStructure } from "./components/PricingStructure";
import { Subscription } from "../components/Subscription";
import HomeLatestBlogs from "@/components/Home/HomeBlogs/HomeLatestBlogs";
import MainLayout from "@/components/layout/MainLayout";
import ReviewsSection from "./components/ReviewsSection";
import FAQSection from "./components/FAQSection";

export const metadata: Metadata = {
  title: "NDIS Cleaning Melbourne | Registered NDIS House Cleaning | Cleaning Professionals",
  description:
    "Compassionate, reliable NDIS cleaning in Melbourne by Cleaning Professionals. Flexible support for participants with tailored house cleaning services.",
  keywords: 'ndis cleaning melbourne, ndis house cleaning, disability support cleaning, ndis registered cleaners, ndis cleaning services melbourne, disability cleaning melbourne, ndis home cleaning, support worker cleaning',
  alternates: { canonical: "https://www.cleaningprofessionals.com.au/services/ndis-cleaning" },
  openGraph: {
    title: "NDIS Cleaning Melbourne | Registered NDIS House Cleaning | Cleaning Professionals",
    description:
      "Compassionate, reliable NDIS cleaning in Melbourne by Cleaning Professionals. Flexible support for participants with tailored house cleaning services.",
    url: "https://www.cleaningprofessionals.com.au/services/ndis-cleaning",
    type: "article",
    images: [
      {
        url: 'https://www.cleaningprofessionals.com.au/images/ndis-cleaning.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional NDIS Cleaning Service Melbourne',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NDIS Cleaning Melbourne | Registered NDIS House Cleaning | Cleaning Professionals",
    description:
      "Compassionate, reliable NDIS cleaning in Melbourne. Flexible support for participants with tailored house cleaning services.",
    images: ['https://www.cleaningprofessionals.com.au/images/ndis-cleaning.jpg'],
  },
};

export default function NDISCleaningPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.cleaningprofessionals.com.au/services/ndis-cleaning#service",
    "name": "NDIS Cleaning Service Melbourne",
    "description": "Professional NDIS cleaning service in Melbourne. Compassionate, reliable support for NDIS participants with flexible weekly or fortnightly cleaning schedules. Starting from $112 for 2 hours.",
    "serviceType": "NDIS Cleaning",
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
        "name": "Weekly NDIS Cleaning",
        "description": "Weekly house cleaning service for NDIS participants with same cleaner every visit",
        "priceCurrency": "AUD",
        "price": "112.00",
        "priceValidUntil": "2025-12-31",
        "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=NDIS%20Cleaning&frequency=Weekly",
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
        "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=NDIS%20Cleaning&frequency=Fortnightly",
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
          "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=NDIS%20Cleaning&frequency=Weekly",
          "description": "Weekly house cleaning with dedicated cleaner for NDIS participants"
        },
        { 
          "@type": "Offer", 
          "name": "Fortnightly NDIS Cleaning", 
          "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=NDIS%20Cleaning&frequency=Fortnightly",
          "description": "Fortnightly house cleaning with dedicated cleaner for NDIS participants"
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
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.cleaningprofessionals.com.au/services" },
        { "@type": "ListItem", position: 3, name: "NDIS Cleaning", item: "https://www.cleaningprofessionals.com.au/services/ndis-cleaning" },
      ],
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.cleaningprofessionals.com.au/services/ndis-cleaning"
    }
  };
   
  

  return (
    <MainLayout>
      <div className="mt-28">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* <NdisCleaningHero /> */}
        <BeforeAfterGallery serviceSlug="ndis-cleaning" />
        <PricingStructure />
        <WhatsIncluded />
        <ReviewsSection />
        <FAQSection />
        <HomeLatestBlogs />
        <Subscription />
      </div>
    </MainLayout>
  );
}
