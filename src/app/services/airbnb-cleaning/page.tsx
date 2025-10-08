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

export const metadata: Metadata = {
  title: "Airbnb Cleaning Melbourne | Short‑Stay Turnover Cleaners | Cleaning Professionals",
  description:
    "Fast, reliable Airbnb cleaning in Melbourne by Cleaning Professionals. Turnover service with linen change, restocking and hotel‑standard presentation.",
  keywords: 'airbnb cleaning melbourne, short stay cleaning melbourne, turnover cleaning melbourne, holiday rental cleaning melbourne, airbnb host cleaning melbourne, vacation rental cleaning melbourne, short term rental cleaning melbourne, hotel standard cleaning melbourne',
  alternates: { canonical: "https://www.cleaningprofessionals.com.au/services/airbnb-cleaning" },
  openGraph: {
    title: "Airbnb Cleaning Melbourne | Short‑Stay Turnover Cleaners | Cleaning Professionals",
    description:
      "Fast, reliable Airbnb cleaning in Melbourne by Cleaning Professionals. Turnover service with linen change, restocking and hotel‑standard presentation.",
    url: "https://www.cleaningprofessionals.com.au/services/airbnb-cleaning",
    type: "article",
    images: [
      {
        url: 'https://www.cleaningprofessionals.com.au/images/airbnb-cleaning-melbourne.png',
        width: 1200,
        height: 630,
        alt: 'Professional Airbnb Cleaning Melbourne',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Airbnb Cleaning Melbourne | Short‑Stay Turnover Cleaners | Cleaning Professionals",
    description:
      "Fast, reliable Airbnb cleaning in Melbourne. Turnover service with linen change, restocking and hotel‑standard presentation.",
    images: ['https://www.cleaningprofessionals.com.au/images/airbnb-cleaning-melbourne.png'],
  },
};

export default function AirbnbCleaningPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.cleaningprofessionals.com.au/services/airbnb-cleaning#service",
    "name": "Airbnb Cleaning Service Melbourne",
    "description": "Professional Airbnb cleaning service in Melbourne. Fast turnovers with hotel-standard presentation for your short-term rental. Starting from $118 for 2 hours.",
    "serviceType": "Airbnb Cleaning",
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
        "name": "Regular Airbnb Cleaning",
        "description": "Regular cleaning service for Airbnb properties",
        "priceCurrency": "AUD",
        "price": "118.00",
        "priceValidUntil": "2025-12-31",
        "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Airbnb%20Cleaning",
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
        "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Airbnb%20Cleaning",
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
          "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Airbnb%20Cleaning",
          "description": "Regular cleaning for Airbnb properties"
        },
        { 
          "@type": "Offer", 
          "name": "Once-off Airbnb Cleaning", 
          "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Airbnb%20Cleaning",
          "description": "One-time deep cleaning for Airbnb properties"
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
        { "@type": "ListItem", position: 3, name: "Airbnb Cleaning", item: "https://www.cleaningprofessionals.com.au/services/airbnb-cleaning" },
      ],
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.cleaningprofessionals.com.au/services/airbnb-cleaning"
    }
  };
   
 

  return (
    <MainLayout>
      <div className="mt-28">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <AirbnbCleaningHero />
        
        <PricingStructure />
        <WhatsIncluded />
        <ReviewsSection />
        <AirbnbImageGallery />
        <FAQSection />
        <HomeLatestBlogs />
        <Subscription />
      </div>
    </MainLayout>
  );
}
