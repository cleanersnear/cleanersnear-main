import type { Metadata } from "next";
import { DeepCleaningHero } from "./components/DeepCleaningHero";
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import { WhatsIncluded } from "./components/WhatsIncluded";
import { PricingStructure } from "./components/PricingStructure";
import { Subscription } from "../components/Subscription";
import HomeLatestBlogs from "@/components/Home/HomeBlogs/HomeLatestBlogs";
import MainLayout from "@/components/layout/MainLayout";
import ReviewsSection from "./components/ReviewsSection";
import FAQSection from "./components/FAQSection";
  
export const metadata: Metadata = {
  title: "Deep Cleaning Melbourne | Professional Deep House Clean | Cleaning Professionals",
  description:
    "Professional deep cleaning service in Melbourne. Thorough cleaning for every corner of your home. Experienced cleaners with quality guarantee and same-day availability.",
  keywords: [
    "deep cleaning melbourne",
    "professional deep cleaning melbourne", 
    "thorough house cleaning melbourne",
    "deep clean melbourne $161",
    "professional house cleaning",
    "deep cleaning service melbourne",
    "home deep cleaning melbourne",
    "house deep cleaning melbourne",
    "deep clean service",
    "thorough cleaning melbourne",
    "melbourne deep cleaning company",
    "trusted deep cleaners melbourne",
    "insured deep cleaners melbourne"
  ].join(", "),
  alternates: { canonical: "https://www.cleaningprofessionals.com.au/services/deep-cleaning" },
  openGraph: {
    title: "Deep Cleaning Melbourne | Professional Deep House Clean | Cleaning Professionals",
    description:
      "Professional deep cleaning service in Melbourne. Thorough cleaning for every corner of your home with experienced cleaners.",
    url: "https://www.cleaningprofessionals.com.au/services/deep-cleaning",
    type: "website",
    images: [
      {
        url: "/images/deep-cleaning.png",
        width: 1200,
        height: 630,
        alt: "Professional Deep Cleaning Service Melbourne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Cleaning Melbourne | Professional Deep House Clean",
    description:
      "Professional deep cleaning service in Melbourne by Cleaning Professionals.",
    images: ["/images/deep-cleaning.png"],
  },
};

export default function DeepCleaningPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.cleaningprofessionals.com.au/services/deep-cleaning#service",
    "name": "Deep Cleaning Service Melbourne",
    "description": "Professional deep cleaning service in Melbourne. Thorough cleaning that reaches every corner of your home. Starting from $161 for 3 hours.",
    "serviceType": "Deep Cleaning",
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
        "name": "Standard Deep Clean",
        "description": "Comprehensive deep cleaning for most homes and apartments",
        "priceCurrency": "AUD",
        "price": "161.00",
        "priceValidUntil": "2025-12-31",
        "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Deep%20Cleaning",
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
        "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Deep%20Cleaning",
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
            "value": "Premium Deep Cleaning"
          }
        ]
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Deep Cleaning Packages",
      "itemListElement": [
        { 
          "@type": "Offer", 
          "name": "Standard Deep Clean", 
          "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Deep%20Cleaning",
          "description": "Comprehensive deep cleaning for most homes"
        },
        { 
          "@type": "Offer", 
          "name": "Premium Deep Clean", 
          "url": "https://www.cleaningprofessionals.com.au/book?selectedServices=Deep%20Cleaning",
          "description": "Extensive cleaning for large homes"
        },
      ],
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "itemReviewed": {
        "@type": "Service",
        "name": "Deep Cleaning Service Melbourne",
        "@id": "https://www.cleaningprofessionals.com.au/services/deep-cleaning#service"
      },
      "ratingValue": "4.9",
      "reviewCount": "1200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.cleaningprofessionals.com.au/services/deep-cleaning"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cleaningprofessionals.com.au" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://www.cleaningprofessionals.com.au/services" },
      { "@type": "ListItem", position: 3, name: "Deep Cleaning", item: "https://www.cleaningprofessionals.com.au/services/deep-cleaning" },
    ],
  };
   
  

  return (
    <MainLayout>
      <div className="mt-28">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <DeepCleaningHero />
        <BeforeAfterGallery serviceSlug="deep-cleaning" />
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
