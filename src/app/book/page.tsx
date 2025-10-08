import type { Metadata } from "next";
import BookingPageWrapper from "./components/BookingPageWrapper";

export const metadata: Metadata = {
  title: "Book House Cleaning Melbourne | Instant Quote & Online Booking | Cleaning Professionals",
  description:
    "Get an instant quote and book professional house cleaning in Melbourne online in 60 seconds. Secure booking, upfront pricing with Cleaning Professionals.",
  alternates: { canonical: "https://www.cleaningprofessionals.com.au/book" },
  openGraph: {
    title: "Book House Cleaning Melbourne | Instant Quote & Online Booking | Cleaning Professionals",
    description:
      "Get an instant quote and book professional house cleaning in Melbourne online in 60 seconds. Secure booking, upfront pricing with Cleaning Professionals.",
    url: "https://www.cleaningprofessionals.com.au/book",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book House Cleaning Melbourne | Instant Quote & Online Booking | Cleaning Professionals",
    description:
      "Get an instant quote and book professional house cleaning in Melbourne online in 60 seconds. Secure booking, upfront pricing with Cleaning Professionals.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.cleaningprofessionals.com.au/book#webpage",
    name: "Book House Cleaning Melbourne",
    description:
      "Get an instant quote and book professional house cleaning in Melbourne online in 60 seconds. Secure booking, upfront pricing with Cleaning Professionals.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cleaningprofessionals.com.au" },
        { "@type": "ListItem", position: 2, name: "Book", item: "https://www.cleaningprofessionals.com.au/book" },
      ],
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: "https://www.cleaningprofessionals.com.au/book",
      result: {
        "@type": "Reservation",
        name: "Cleaning Reservation",
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BookingPageWrapper />
    </>
  );
}