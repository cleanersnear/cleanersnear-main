import type { Metadata } from "next";
import { CommercialCleaningHero } from "./components/CommercialCleaningHero";
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import { WhatsIncluded } from "./components/WhatsIncluded";
import { PricingStructure } from "./components/PricingStructure";
import { Subscription } from "../components/Subscription";
import HomeLatestBlogs from "@/components/Home/HomeBlogs/HomeLatestBlogs";
import MainLayout from "@/components/layout/MainLayout";
import ReviewsSection from "./components/ReviewsSection";
import FAQSection from "./components/FAQSection";
export const metadata: Metadata = {
  title: "Commercial Cleaning Melbourne | Offices, Retail & Strata | Cleaning Professionals",
  description:
    "Professional commercial cleaning in Melbourne for offices, retail spaces, and businesses. Flexible scheduling, experienced teams, and reliable service. From $50/hour.",
  keywords: [
    "commercial cleaning Melbourne",
    "office cleaning Melbourne",
    "retail cleaning Melbourne",
    "business cleaning services",
    "professional cleaners Melbourne",
    "commercial cleaning companies",
    "office maintenance cleaning",
    "retail space cleaning",
    "business cleaning contractors",
    "Melbourne commercial cleaners"
  ],
  alternates: { canonical: "https://www.cleaningprofessionals.com.au/services/commercial-cleaning" },
  openGraph: {
    title: "Commercial Cleaning Melbourne | Offices, Retail & Strata | Cleaning Professionals",
    description:
      "Professional commercial cleaning in Melbourne for offices, retail spaces, and businesses. Flexible scheduling, experienced teams, and reliable service.",
    url: "https://www.cleaningprofessionals.com.au/services/commercial-cleaning",
    type: "article",
    images: [
      {
        url: "https://www.cleaningprofessionals.com.au/images/commercial-cleaning.png",
        width: 1200,
        height: 630,
        alt: "Professional commercial cleaning service in Melbourne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Cleaning Melbourne | Offices, Retail & Strata | Cleaning Professionals",
    description:
      "Professional commercial cleaning in Melbourne for offices, retail spaces, and businesses. Flexible scheduling, experienced teams, and reliable service.",
    images: ["https://www.cleaningprofessionals.com.au/images/commercial-cleaning.png"],
  },
};

export default function CommercialCleaningPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.cleaningprofessionals.com.au/services/commercial-cleaning#service",
    name: "Commercial Cleaning Service",
    description: "Professional commercial cleaning for offices, retail spaces, and businesses in Melbourne",
    serviceType: "Commercial Cleaning",
    provider: { "@id": "https://www.cleaningprofessionals.com.au/#localbusiness" },
    areaServed: "Melbourne, VIC",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://www.cleaningprofessionals.com.au/book",
      serviceSmsNumber: "+611300886119"
    },
    offers: [
      {
        "@type": "Offer",
        name: "Once-off Commercial Cleaning",
        description: "One-time commercial cleaning service",
        price: "60",
        priceCurrency: "AUD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "60",
          priceCurrency: "AUD",
          unitText: "hour"
        },
        url: "https://www.cleaningprofessionals.com.au/book?selectedServices=Commercial%20Cleaning",
        availability: "https://schema.org/InStock",
        eligibleRegion: "Melbourne"
      },
      {
        "@type": "Offer", 
        name: "Regular Commercial Cleaning",
        description: "Ongoing commercial cleaning with frequency discounts",
        price: "50",
        priceCurrency: "AUD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "50",
          priceCurrency: "AUD",
          unitText: "hour"
        },
        url: "https://www.cleaningprofessionals.com.au/book?selectedServices=Commercial%20Cleaning",
        availability: "https://schema.org/InStock",
        eligibleRegion: "Melbourne"
      }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Commercial Cleaning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Once-off Commercial Cleaning",
            description: "Perfect for one-time deep cleaning or special events"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service", 
            name: "Regular Commercial Cleaning",
            description: "Ongoing maintenance cleaning with frequency discounts"
          }
        }
      ]
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1200",
      bestRating: "5",
      worstRating: "1"
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.cleaningprofessionals.com.au/services/commercial-cleaning"
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cleaningprofessionals.com.au" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.cleaningprofessionals.com.au/services" },
        { "@type": "ListItem", position: 3, name: "Commercial Cleaning", item: "https://www.cleaningprofessionals.com.au/services/commercial-cleaning" },
      ],
    },
  };

  return (
    <MainLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mt-28">
        <CommercialCleaningHero />
        <BeforeAfterGallery serviceSlug="commercial-cleaning" />
        <PricingStructure />
        <WhatsIncluded />
        <ReviewsSection />
        <FAQSection />
        <HomeLatestBlogs />
        <Subscription />
       {/* <RequestCallback service="Commercial Cleaning" /> */}
      </div>
    </MainLayout>
  );
}
