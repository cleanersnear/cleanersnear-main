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

export const metadata: Metadata = {
  title: "End of Lease Cleaning Melbourne | Bond Cleaning Guaranteed | Cleaning Professionals",
  description:
    "Professional end of lease cleaning in Melbourne with bond back guarantee. REIV checklist compliant from $205. Get your full bond back with our guaranteed service.",
  keywords: [
    "end of lease cleaning Melbourne",
    "bond cleaning Melbourne",
    "move out cleaning Melbourne",
    "REIV checklist cleaning",
    "bond back guarantee Melbourne",
    "professional end of lease cleaning",
    "rental cleaning Melbourne",
    "property cleaning Melbourne",
    "bond cleaning service",
    "end of lease cleaners Melbourne",
    "move out cleaning service",
    "rental property cleaning",
    "bond cleaning guarantee",
    "Melbourne bond cleaners",
    "end of lease cleaning prices"
  ],
  alternates: { canonical: "https://www.cleaningprofessionals.com.au/services/end-of-lease-cleaning" },
  openGraph: {
    title: "End of Lease Cleaning Melbourne | Bond Cleaning Guaranteed | Cleaning Professionals",
    description:
      "Professional end of lease cleaning in Melbourne with bond back guarantee. REIV checklist compliant from $205. Get your full bond back with our guaranteed service.",
    url: "https://www.cleaningprofessionals.com.au/services/end-of-lease-cleaning",
    type: "article",
    images: [
      {
        url: "https://www.cleaningprofessionals.com.au/images/end-of-lease-cleaning.png",
        width: 1200,
        height: 630,
        alt: "Professional end of lease cleaning service in Melbourne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "End of Lease Cleaning Melbourne | Bond Cleaning Guaranteed | Cleaning Professionals",
    description:
      "Professional end of lease cleaning in Melbourne with bond back guarantee. REIV checklist compliant from $205.",
    images: ["https://www.cleaningprofessionals.com.au/images/end-of-lease-cleaning.png"],
  },
};

export default function EndOfLeaseCleaningPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.cleaningprofessionals.com.au/services/end-of-lease-cleaning#service",
    name: "End of Lease Cleaning Service",
    description: "Professional end of lease cleaning for rental properties in Melbourne with bond back guarantee",
    serviceType: "End of Lease Cleaning",
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
        name: "Studio End of Lease Cleaning",
        description: "End of lease cleaning for studio apartments",
        price: "205",
        priceCurrency: "AUD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "205",
          priceCurrency: "AUD",
          unitText: "fixed price"
        },
        url: "https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning",
        availability: "https://schema.org/InStock",
        eligibleRegion: "Melbourne"
      },
      {
        "@type": "Offer",
        name: "1 Bedroom End of Lease Cleaning",
        description: "End of lease cleaning for 1 bedroom properties",
        price: "255",
        priceCurrency: "AUD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "255",
          priceCurrency: "AUD",
          unitText: "fixed price"
        },
        url: "https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning",
        availability: "https://schema.org/InStock",
        eligibleRegion: "Melbourne"
      },
      {
        "@type": "Offer",
        name: "2 Bedroom End of Lease Cleaning",
        description: "End of lease cleaning for 2 bedroom properties",
        price: "310",
        priceCurrency: "AUD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "310",
          priceCurrency: "AUD",
          unitText: "fixed price"
        },
        url: "https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning",
        availability: "https://schema.org/InStock",
        eligibleRegion: "Melbourne"
      },
      {
        "@type": "Offer",
        name: "3 Bedroom End of Lease Cleaning",
        description: "End of lease cleaning for 3 bedroom properties",
        price: "450",
        priceCurrency: "AUD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "450",
          priceCurrency: "AUD",
          unitText: "fixed price"
        },
        url: "https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning",
        availability: "https://schema.org/InStock",
        eligibleRegion: "Melbourne"
      },
      {
        "@type": "Offer",
        name: "4 Bedroom End of Lease Cleaning",
        description: "End of lease cleaning for 4 bedroom properties",
        price: "625",
        priceCurrency: "AUD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "625",
          priceCurrency: "AUD",
          unitText: "fixed price"
        },
        url: "https://www.cleaningprofessionals.com.au/book?selectedServices=End%20of%20Lease%20Cleaning",
        availability: "https://schema.org/InStock",
        eligibleRegion: "Melbourne"
      }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "End of Lease Cleaning Packages",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Studio End of Lease Cleaning",
            description: "Perfect for studio apartments and small spaces"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "1 Bedroom End of Lease Cleaning",
            description: "Ideal for 1 bedroom apartments and units"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "2 Bedroom End of Lease Cleaning",
            description: "Perfect for 2 bedroom homes and apartments"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "3 Bedroom End of Lease Cleaning",
            description: "Ideal for 3 bedroom houses and larger apartments"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "4 Bedroom End of Lease Cleaning",
            description: "Perfect for large 4 bedroom houses"
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
      "@id": "https://www.cleaningprofessionals.com.au/services/end-of-lease-cleaning"
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cleaningprofessionals.com.au" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.cleaningprofessionals.com.au/services" },
        { "@type": "ListItem", position: 3, name: "End of Lease Cleaning", item: "https://www.cleaningprofessionals.com.au/services/end-of-lease-cleaning" },
      ],
    },
  };

  return (
    <MainLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mt-28">
        <EOLCleaningHero />
        <BeforeAfterGallery serviceSlug="end-of-lease-cleaning" />
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
