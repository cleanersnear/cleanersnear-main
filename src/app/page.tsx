import type { Metadata } from "next";
import HomePageClient from '@/app/HomePageClient'

export const metadata: Metadata = {
  title: "House Cleaning Melbourne | Professional Cleaning Services | Cleaning Professionals",
  description: "Melbourne's most trusted cleaning service with police cleared, trained professionals. Professional house cleaning, end of lease, NDIS & commercial cleaning. Servicing all Melbourne suburbs with 4+ years experience.",
  keywords: "house cleaning melbourne, end of lease cleaning melbourne, deep cleaning melbourne, ndis cleaning melbourne, bond cleaning melbourne, professional cleaners melbourne, cleaning services melbourne, house cleaners near me, police cleared cleaners, trained cleaning professionals",
  openGraph: {
    title: "House Cleaning Melbourne | Professional Cleaning Services | Cleaning Professionals",
    description: "Melbourne's most trusted cleaning service with police cleared, trained professionals. Professional house cleaning, end of lease, NDIS & commercial cleaning. Servicing all Melbourne suburbs with 4+ years experience.",
    url: "https://www.cleaningprofessionals.com.au",
    siteName: "Cleaning Professionals",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cleaning Professionals - Professional House Cleaning Services Melbourne",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "House Cleaning Melbourne | Professional Cleaning Services | Cleaning Professionals",
    description: "Melbourne's most trusted cleaning service with police cleared, trained professionals. Professional house cleaning, end of lease, NDIS & commercial cleaning. Servicing all Melbourne suburbs with 4+ years experience.",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.cleaningprofessionals.com.au",
  },
};

export default function HomePage() {
  const homePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.cleaningprofessionals.com.au/#webpage",
    "url": "https://www.cleaningprofessionals.com.au",
    "name": "House Cleaning Melbourne | Professional Cleaning Services | Cleaning Professionals",
    "description": "Melbourne's most trusted cleaning service with police cleared, trained professionals. Professional house cleaning, end of lease, NDIS & commercial cleaning. Servicing all Melbourne suburbs with 4+ years experience.",
    "isPartOf": {
      "@id": "https://www.cleaningprofessionals.com.au/#website"
    },
    "about": {
      "@id": "https://www.cleaningprofessionals.com.au/#organization"
    },
    "mainEntity": {
      "@id": "https://www.cleaningprofessionals.com.au/#localbusiness"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.cleaningprofessionals.com.au"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <HomePageClient />
    </>
  );
}