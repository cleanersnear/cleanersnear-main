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
  
export const metadata: Metadata = {
  title: "General House Cleaning Melbourne | Professional Home Cleaning | Cleaning Professionals",
  description:
    "Professional general house cleaning service in Melbourne. Regular maintenance cleaning to keep your home spotless. Experienced cleaners with flexible scheduling.",
  keywords: [
    "general house cleaning melbourne",
    "home cleaning melbourne", 
    "house cleaning service melbourne",
    "general cleaning melbourne $92",
    "professional house cleaning",
    "home cleaning service melbourne",
    "house cleaning melbourne",
    "general cleaning service",
    "regular house cleaning melbourne",
    "melbourne cleaning company",
    "trusted cleaners melbourne",
    "insured cleaners melbourne"
  ].join(", "),
  alternates: { canonical: "https://www.cleaningprofessionals.com.au/services/general-cleaning" },
  openGraph: {
    title: "General House Cleaning Melbourne | Professional Home Cleaning | Cleaning Professionals",
    description:
      "Professional general house cleaning service in Melbourne. Regular maintenance cleaning to keep your home spotless with experienced cleaners.",
    url: "https://www.cleaningprofessionals.com.au/services/general-cleaning",
    type: "website",
    images: [
      {
        url: "/images/general-cleaning.png",
        width: 1200,
        height: 630,
        alt: "Professional General House Cleaning Service Melbourne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "General House Cleaning Melbourne | Professional Home Cleaning",
    description:
      "Professional general house cleaning service in Melbourne by Cleaning Professionals.",
    images: ["/images/general-cleaning.png"],
  },
};

export default function GeneralCleaningPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.cleaningprofessionals.com.au/services/general-cleaning#service",
    "name": "General House Cleaning Service Melbourne",
    "description": "Professional general house cleaning service in Melbourne. Regular maintenance cleaning to keep your home spotless. Starting from $92 for 2 hours.",
    "serviceType": "General House Cleaning",
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
        "name": "General House Cleaning",
        "description": "Regular maintenance cleaning for most homes and apartments",
        "priceCurrency": "AUD",
        "price": "92.05",
        "priceValidUntil": "2025-12-31",
        "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=General%20Cleaning",
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
            "name": "Service Type",
            "value": "General Cleaning"
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
          "name": "General House Cleaning", 
          "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=General%20Cleaning",
          "description": "Regular maintenance cleaning for most homes"
        },
      ],
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "itemReviewed": {
        "@type": "Service",
        "name": "General House Cleaning Service Melbourne",
        "@id": "https://www.cleaningprofessionals.com.au/services/general-cleaning#service"
      },
      "ratingValue": "4.9",
      "reviewCount": "1200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.cleaningprofessionals.com.au/services/general-cleaning"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cleaningprofessionals.com.au" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://www.cleaningprofessionals.com.au/services" },
      { "@type": "ListItem", position: 3, name: "General Cleaning", item: "https://www.cleaningprofessionals.com.au/services/general-cleaning" },
    ],
  };
   
  

  return (
    <MainLayout>
      <div className="mt-28">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <GeneralCleaningHero />
        <BeforeAfterGallery serviceSlug="general-cleaning" />
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
