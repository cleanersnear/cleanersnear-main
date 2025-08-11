// /app/locations/epping/end-of-lease-cleaning/page.tsx
import React from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import EOLHero from "@/app/locations/epping/end-of-lease-cleaning/components/Hero"
import Testimonials from "@/app/locations/epping/end-of-lease-cleaning/components/Testimonials"
import MainLayout from '@/components/layout/MainLayout'
import BeforeAfterGallery from '@/app/locations/[suburb]/components/BeforeAfterGallery'
// ... existing code ...


const suburb = "Epping";
const SUBURB = "Epping";
const SERVICE = "End of Lease Cleaning";
const SERVICE_SLUG = "end-of-lease-cleaning";
const SITE_URL = "https://www.cleaningprofessionals.com.au";
const CANONICAL = `${SITE_URL}/locations/epping/${SERVICE_SLUG}/`;

export const metadata: Metadata = {
  title: `End of Lease Cleaning ${SUBURB} VIC | Bond Back Guarantee | From $260`,
  description: `Professional end of lease cleaning in ${SUBURB}, VIC. 100% bond back guarantee | Real estate approved | Same-day service | Eco-friendly | Book online in 60 seconds`,
  keywords: `end of lease cleaning ${SUBURB}, bond cleaning ${SUBURB}, vacate cleaning ${SUBURB}, end of lease cleaners ${SUBURB}, bond back cleaning ${SUBURB}, end of tenancy cleaning ${SUBURB}, exit clean ${SUBURB}, move out cleaning ${SUBURB}, cleaners near ${SUBURB}, local cleaners ${SUBURB}, bond cleaners ${SUBURB}, best end of lease cleaners ${SUBURB}, affordable end of lease cleaning ${SUBURB}, professional cleaners ${SUBURB}, end of lease cleaning services ${SUBURB}`,
  openGraph: {
    title: `${SUBURB} End of Lease Cleaners | Local Bond Cleaning Experts | 100% Guarantee`,
    description: `Looking for end of lease cleaners in ${SUBURB}? Local bond cleaning experts | Fixed prices | Same-day service | 100% bond back guarantee | Book trusted local cleaners today`,
    url: CANONICAL,
    siteName: 'Cleaning Professionals Melbourne',
    images: [
      {
        url: '/epping/endleaseofcleaning/end_of_lease_Epping_Tiles.jpg',
        width: 1200,
        height: 630,
        alt: `End of Lease Cleaning ${SUBURB} — Before & After`,
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SUBURB} End of Lease Cleaners | Local Bond Back Experts`,
    description: `Top-rated end of lease cleaning service in ${SUBURB}. Local experts | Fixed prices | REIV-compliant | Bond back guaranteed`,
    images: ['/epping/endleaseofcleaning/end_of_lease_Epping_Tiles.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: CANONICAL,
  },
  authors: [{ name: 'Cleaning Professionals Melbourne' }],
  generator: 'Next.js',
  applicationName: `${SUBURB} End of Lease Cleaning Services`,
  referrer: 'origin-when-cross-origin',
  creator: 'Cleaning Professionals Melbourne',
  publisher: 'Cleaning Professionals Melbourne',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // verification: {
  //   google: 'YOUR_SEARCH_CONSOLE_VERIFICATION_TOKEN_HERE', // Not needed - domain already verified
  // },
  category: 'End of Lease Cleaning Services',
  other: {
    'geo.region': 'AU-VIC',
    'geo.placename': SUBURB,
    'geo.position': '-37.8136;144.9631',
    'ICBM': '-37.8136, 144.9631',
    'og:price:amount': '260',
    'og:price:currency': 'AUD',
    'business:contact_data:locality': SUBURB,
    'business:contact_data:region': 'Victoria',
    'business:contact_data:country': 'Australia',
    'og:availability': 'in stock',
    'business:hours:day': 'Mon-Sun 7:00-20:00',
    'og:service:type': 'End of Lease Cleaning',
    'og:service:guarantee': '100% Bond Back Guarantee',
    'og:service:compliance': 'REIV-approved',
    'og:service:area': SUBURB
  }
};

function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#brand`,
    "name": `Cleaning Professionals Melbourne`,
    "image": `${SITE_URL}/epping/endleaseofcleaning/end_of_lease_Epping_Tiles.jpg`,
    "description": `Professional end of lease cleaning service in ${SUBURB} with 100% bond back support. Real estate approved, same‑day service available.`,
    "url": SITE_URL,
    "telephone": "+61450124086",
    "inLanguage": "en-AU",
    "email": 'account@cleaningprofessionals.com.au',
    "priceRange": '$$',
    "address": {
      "@type": "PostalAddress",
      "addressLocality": SUBURB,
      "addressRegion": 'VIC',
      "postalCode": '3076',
      "addressCountry": 'AU'
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": '-37.6539',
      "longitude": '145.0064'
    },
    "servesLocation": { "@type": "City", "name": SUBURB },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        "opens": '07:00',
        "closes": '20:00'
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ['Saturday', 'Sunday'],
        "opens": '07:00',
        "closes": '20:00'
      }
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": '-37.8136',
        "longitude": '144.9631'
      },
      "geoRadius": '50000'
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `End of Lease Cleaning Services in ${SUBURB}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": '1 Bedroom/Studio Apartment Cleaning',
            "price": '260.00',
            "priceCurrency": 'AUD'
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": '2 Bedroom Apartment Cleaning',
            "price": '287.00',
            "priceCurrency": 'AUD'
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": '3 Bedroom House Cleaning',
            "price": '359.00',
            "priceCurrency": 'AUD'
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": '4.9',
      "reviewCount": '5000',
      "bestRating": '5',
      "worstRating": '1'
    },
    "sameAs": [
      'https://www.facebook.com/people/Cleaning-Professionals/61572518431848/',
      'https://www.instagram.com/cleaning__professionals/',
      'https://www.linkedin.com/company/cleaning-professionals-melbourne/'
    ]
  };
}

export default function Page() {
  const schema = getLocalBusinessSchema();

  return (
    <MainLayout>
      <>
        {/* JSON-LD Schema */}
        <Script id="local-business-schema" type="application/ld+json">
          {JSON.stringify(schema)}
        </Script>
        {/* Service schema for richer eligibility */}
        <Script id="service-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": `End of Lease Cleaning in ${SUBURB}`,
            "serviceType": "End of Lease Cleaning",
            "areaServed": { "@type": "City", "name": SUBURB },
            "provider": { "@id": `${SITE_URL}/#brand` },
            "inLanguage": "en-AU",
            "offers": [
              { "@type": "Offer", "price": "260", "priceCurrency": "AUD", "category": "1 Bedroom / Studio" },
              { "@type": "Offer", "price": "287", "priceCurrency": "AUD", "category": "2 Bedrooms" },
              { "@type": "Offer", "price": "359", "priceCurrency": "AUD", "category": "3 Bedrooms" },
              { "@type": "Offer", "price": "545", "priceCurrency": "AUD", "category": "4 Bedrooms" }
            ],
            "image": `${SITE_URL}/epping/endleaseofcleaning/end_of_lease_Epping_Tiles.jpg`,
            "url": CANONICAL
          })}
        </Script>
        {/* ImageObject for OG asset */}
        <Script id="imageobject-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "contentUrl": `${SITE_URL}/epping/endleaseofcleaning/end_of_lease_Epping_Tiles.jpg`,
            "caption": `End of Lease Cleaning in ${SUBURB} — Tile and floor detailing`,
            "representativeOfPage": true
          })}
        </Script>
        <Script id="faq-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `Do you guarantee bond back in ${SUBURB}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes — we offer a 100% bond back guarantee. If the property manager rejects the clean due to tasks on our checklist, we'll return and fix the issues free of charge (terms apply)."
                }
              },
              {
                "@type": "Question",
                "name": "How long does an end of lease clean take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Typical times vary by property size: 1-2 hours for studios, 3-5 hours for medium homes, and up to a full day for larger properties or when add-ons are included."
                }
              },
              {
                "@type": "Question",
                "name": `What's included in the ${SUBURB} end of lease clean?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our comprehensive checklist covers all standard areas. We also offer optional add-ons such as carpet steam cleaning, external windows and wall spot cleaning."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to be present during cleaning?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No — many clients provide keys or meet at checkout. We can also coordinate with your property manager if needed."
                }
              },
              {
                "@type": "Question",
                "name": "When should I book?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Book as soon as your move date is set. We often fill up on weekends and end-of-month dates, so early booking is recommended."
                }
              }
            ]
          })}
        </Script>
        <div className="hidden md:block">
          <EOLHero suburb={suburb} />
        </div>
        {/* Breadcrumbs Schema for better indexing */}
        <Script id="breadcrumbs" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type":"ListItem","position":1,"name":"Home","item":"https://www.cleaningprofessionals.com.au/"},
              {"@type":"ListItem","position":2,"name":"Locations","item":"https://www.cleaningprofessionals.com.au/locations/"},
              {"@type":"ListItem","position":3,"name":"Epping","item":"https://www.cleaningprofessionals.com.au/locations/epping/"},
              {"@type":"ListItem","position":4,"name":"End of Lease Cleaning","item": CANONICAL}
            ]
          })}
        </Script>
        <div className="flex flex-col sm:flex-row pt-12"></div>
        <main className="min-h-screen bg-white">




          <div className="hidden md:block">
            <BeforeAfterGallery serviceSlug="end-of-lease-cleaning" />
          </div>

          {/* HERO SECTION - High Converting */}
          <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative container mx-auto px-4 py-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                  {/* Trust Badge */}
                  <div className="inline-flex items-center bg-amber-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold">
                    <span className="mr-2">⭐</span>
                    100% Bond Back Guarantee
                  </div>

                  {/* Main Headline */}
                  <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                    End of Lease Cleaning<br />
                    <span className="text-amber-400">{SUBURB}, VIC</span>
                  </h2>

                  {/* Sub-headline */}
                  <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                    Get your full bond back with our professional cleaning service.
                    <span className="font-semibold"> Real estate approved, same-day available.</span>
                  </p>

                  {/* Trust Signals */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="mr-2">🔒</span>
                      Police Checked
                    </div>
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="mr-2">✅</span>
                      Fully Insured
                    </div>
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="mr-2">🌿</span>
                      Eco-Friendly
                    </div>
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="mr-2">⚡</span>
                      Instant Online Booking
                    </div>
                  </div>

                  {/* High-Converting CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    {/* Primary CTA - Most Converting */}
                    <Link
                      href="/quick-book/location"
                      className="group bg-gradient-to-r from-0466c8 to-orange-500 text-white-900 px-8 py-4 rounded-lg text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
                    >
                      🚀 Get Instant Pricing
                      <span className="block text-sm font-normal opacity-90">Book in 60 seconds</span>
                    </Link>


                  </div>

                  {/* Phone CTA */}
                  <div className="text-center sm:text-left">
                    <a
                      href="tel:0450124086"
                      className="inline-flex items-center text-lg text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      Call 0450 124 086
                      <span className="ml-2 text-sm text-blue-200">(Available 7 days)</span>
                    </a>
                  </div>


                  <div className="align-center">
                    <div className="flex text-amber-400 mr-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs md:text-sm font-medium">Trusted by 100+ customers in Epping</span>
                  </div>
                </div>

                {/* Right Side - Trust Box */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                    Why Choose Our {SUBURB} Service?
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="text-green-500 text-2xl mr-3">✓</span>
                      <div>
                        <strong className="text-blue-900">Same-Day Service</strong>
                        <p className="text-gray-600 text-sm">Available 7 days a week</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="text-green-500 text-2xl mr-3">✓</span>
                      <div>
                        <strong className="text-blue-900">100% Bond Back</strong>
                        <p className="text-gray-600 text-sm">7-day re-clean guarantee</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="text-green-500 text-2xl mr-3">✓</span>
                      <div>
                        <strong className="text-blue-900">Real Estate Approved</strong>
                        <p className="text-gray-600 text-sm">Follows REIV standards</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <span className="text-green-500 text-2xl mr-3">✓</span>
                      <div>
                        <strong className="text-blue-900">Eco-Friendly Products</strong>
                        <p className="text-gray-600 text-sm">Safe for pets & children</p>
                      </div>
                    </div>
                  </div>

                  {/* Mini CTA in Trust Box */}
                  <div className="mt-6 text-center">
                    <Link
                      href="/quick-book/location"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 block"
                    >
                      🎯 See Live Pricing Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BEFORE AFTER GALLERY */}
          <div className="block md:hidden">
            <BeforeAfterGallery serviceSlug="end-of-lease-cleaning" />
          </div>


          {/* QUICK STATS SECTION */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">5000+</div>
                  <div className="text-gray-600 font-medium">Happy Customers</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">100%</div>
                  <div className="text-gray-600 font-medium">Bond Back Rate</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl lg:text-4xl font-bold text-amber-600 mb-2">4.9/5</div>
                  <div className="text-gray-600 font-medium">Average Rating</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-gray-600 font-medium">Support Available</div>
                </div>
              </div>
            </div>
          </section>

          {/* PRICING SECTION - High Converting */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Transparent Pricing - No Hidden Fees
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Fixed prices with everything included. Get your bond back guaranteed or we&apos;ll re-clean for free.
                </p>
              </div>

              <div className="grid lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {/* 1 Bedroom */}
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-500">
                  <div className="text-center mb-6">
                    <h3 className="text-1xl font-bold text-gray-900 mb-2">1 Bedroom / Studio</h3>
                    <div className="text-4xl font-bold text-blue-600">$260 - $315</div>
                    <div className="text-gray-500">Price Range</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      Bond back guarantee
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      All supplies included
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      Professional equipment
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      Same-day service available
                    </li>
                  </ul>

                  {/* High-Converting CTA */}
                  <Link
                    href="/quick-book/location"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-bold text-md hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 block text-center"
                  >
                    🚀 Book Now - Get Instant Price
                  </Link>
                </div>

                {/* 2 Bedrooms - Featured */}
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-500">

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">2 Bedrooms</h3>
                    <div className="text-4xl font-bold text-blue-600">$287 - $408</div>
                    <div className="text-gray-500">Price Range</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="text-amber-400 mr-3">✓</span>
                      Bond back guarantee
                    </li>
                    <li className="flex items-center">
                      <span className="text-amber-400 mr-3">✓</span>
                      All supplies included
                    </li>
                    <li className="flex items-center">
                      <span className="text-amber-400 mr-3">✓</span>
                      Professional equipment
                    </li>
                    <li className="flex items-center">
                      <span className="text-amber-400 mr-3">✓</span>
                      Same-day service available
                    </li>
                  </ul>

                  {/* High-Converting CTA */}
                  <Link
                    href="/quick-book/location"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-bold text-md hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 block text-center"
                  >
                    🚀 Book Now - Get Instant Price
                  </Link>
                </div>

                {/* 3 Bedrooms */}
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-500">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">3 Bedrooms</h3>
                    <div className="text-4xl font-bold text-blue-600">$359 - $650</div>
                    <div className="text-gray-500">Price Range</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      Bond back guarantee
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      All supplies included
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      Professional equipment
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      Same-day service available
                    </li>
                  </ul>
                  {/* High-Converting CTA */}
                  <Link
                    href="/quick-book/location"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-bold text-md hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 block text-center"
                  >
                    🚀 Book Now - Get Instant Price
                  </Link>
                </div>

                {/* 3 Bedrooms */}
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-500">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">4 Bedrooms</h3>
                    <div className="text-4xl font-bold text-blue-600">$545 - $890</div>
                    <div className="text-gray-500">Price Range</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      Bond back guarantee
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      All supplies included
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      Professional equipment
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      Same-day service available
                    </li>
                  </ul>



                  {/* High-Converting CTA */}
                  <Link
                    href="/quick-book/location"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-bold text-md hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 block text-center"
                  >
                    🚀 Book Now - Get Instant Price
                  </Link>
                </div>
              </div>

              {/* Additional CTA */}
              <div className="text-center mt-12">
                <p className="text-gray-600 mb-6">Need a custom quote or have questions?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/quick-book/location"
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-bold text-xsm hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300"
                  >
                    🎯 Get Custom Quote
                  </Link>
                  <a
                    href="tel:0450124086"
                    className="bg-gray-800 text-white px-8 py-4 rounded-lg font-bold text-md hover:bg-gray-900 transform hover:scale-105 transition-all duration-300"
                  >
                    📞 Call Now
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* SERVICE DETAILS */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  What&apos;s Included in Your {SUBURB} End of Lease Clean?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our comprehensive cleaning checklist ensures you get your full bond back.
                  Real estate approved standards followed to the letter.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🏠</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Living Areas & Bedrooms</h3>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Remove cobwebs from walls and ceilings</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Clean all skirting boards and window sills</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Wipe doors and door frames</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Clean switches and power points</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Vacuum and mop all floors</li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🍳</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Kitchen</h3>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Deep clean stovetop and rangehood</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Clean and sanitize all benchtops</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Clean and polish sink area</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Clean inside/outside microwave</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Deep clean oven (inside and out)</li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🚿</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Bathrooms & Toilets</h3>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Deep clean shower and screens</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Clean and sanitize vanity area</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Thorough toilet cleaning</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Wall tiles and grout (conditions apply)</li>
                    <li className="flex items-start"><span className="text-green-500 mr-3 mt-1">✓</span>Clean exhaust fans</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* LOCAL INSIGHTS */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-8">
                  Why We Love Working in {SUBURB}
                </h2>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-600 mb-4">Local Community</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {SUBURB} is a vibrant, family-friendly suburb with diverse communities.
                      We understand the local real estate market and what property managers expect.
                      Our team has been serving {SUBURB} residents for years, building trust and relationships.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-600 mb-4">Convenient Location</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Located near Pacific {SUBURB} shopping centre and Cooper Street Station,
                      we can quickly respond to urgent cleaning requests. Our local knowledge
                      helps us navigate the area efficiently, ensuring timely service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <Testimonials suburb={SUBURB} />
          

          {/* LOCAL CONTENT: NEED-BASED + E-E-A-T (hard-coded) */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
                {/* Left: Editorial content */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Need End of Lease Cleaners in {SUBURB}?
                  </h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Book today for a sparkling, inspection‑ready home. Our local team delivers
                    professional End of Lease Cleaning across {SUBURB} VIC 3076—covering apartments,
                    townhouses and family homes. Instant online booking in 60 seconds, transparent
                    pricing, and no hidden fees.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    End of Lease Cleaning in {SUBURB} VIC 3076 you can rely on
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Based in the City of Whittlesea, our cleaners understand the standards local
                    property managers expect. From homes near Pacific {SUBURB} to streets off Cooper
                    Street and Dalton Road, we work to REIV‑aligned checklists with a 7‑day re‑clean
                    guarantee for complete peace of mind.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Booking is easy. Choose a time that suits you, and our insured, police‑checked
                    team arrives fully equipped and ready to go. We use eco‑friendly products that are
                    safe for families and pets, and we communicate clearly from start to finish.
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-3 mb-6 text-gray-800">
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> 100% Bond Back support (7‑day re‑clean guarantee)</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> Real estate approved checklist (REIV aligned)</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> Transparent pricing with no hidden fees</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> Instant online booking and fast confirmations</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> Insured and police‑checked local cleaners</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> Eco‑friendly products; equipment supplied</li>
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/quick-book/location" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 text-center">
                      Book Online in 60 Seconds
                    </Link>
                    <a href="tel:0450124086" className="border border-gray-300 px-6 py-3 rounded-lg font-semibold text-gray-800 hover:bg-gray-50 text-center">
                      Call 0450 124 086
                    </a>
                  </div>
                </div>

                {/* Right: Local images */}
                <div className="grid gap-4">
                  <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow">
                    <Image
                      src="/epping/endleaseofcleaning/end_of_lease_Epping_bathroom.jpg"
                      alt={`End of Lease Cleaning in ${SUBURB} — Bathroom cleaned to inspection standard`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={false}
                    />
                  </div>
                  <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden shadow">
                    <Image
                      src="/epping/endleaseofcleaning/end_of_lease_Epping_Tiles.jpg"
                      alt={`End of Lease Cleaning in ${SUBURB} — Tile and floor detailing`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-600">
                  Everything you need to know about end of lease cleaning in {SUBURB}
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Do you guarantee bond back in {SUBURB}?
                  </h3>
                  <p className="text-gray-600">
                    Yes — we offer a 100% bond back guarantee. If the property manager rejects the
                    clean due to tasks on our checklist, we&apos;ll return and fix the issues free of charge
                    (terms apply).
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    How long does an end of lease clean take?
                  </h3>
                  <p className="text-gray-600">
                    Typical times vary by property size: 1-2 hours for studios, 3-5 hours for medium
                    homes, and up to a full day for larger properties or when add-ons are included.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    What&apos;s included in the {SUBURB} end of lease clean?
                  </h3>
                  <p className="text-gray-600">
                    Our comprehensive checklist covers all standard areas. We also offer optional add-ons
                    such as carpet steam cleaning, external windows and wall spot cleaning.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Do I need to be present during cleaning?
                  </h3>
                  <p className="text-gray-600">
                    No — many clients provide keys or meet at checkout. We can also coordinate with your
                    property manager if needed.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    When should I book?
                  </h3>
                  <p className="text-gray-600">
                    Book as soon as your move date is set. We often fill up on weekends and end-of-month
                    dates, so early booking is recommended.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FINAL CTA SECTION - High Converting */}
          <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to Get Your Bond Back?
              </h2>
              <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join hundreds of satisfied customers in {SUBURB} who got their full bond back with our service.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                {/* Primary CTA */}
                <Link
                  href="/quick-book/location"
                  className="group bg-gradient-to-r from-amber-400 to-orange-500 text-blue-900 px-10 py-5 rounded-xl text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
                >
                  🚀 Get Instant Pricing Now
                  <span className="block text-lg font-normal opacity-90 mt-1">
                    Book in 60 seconds - No commitment
                  </span>
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/get-quote"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-xl text-2xl font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300"
                >
                  💬 Request Custome Quote
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-200">
                <div className="flex items-center">
                  <span className="mr-2">🔒</span>
                  Police Checked Team
                </div>
                <div className="flex items-center">
                  <span className="mr-2">✅</span>
                  100% Bond Back Guarantee
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🌿</span>
                  Eco-Friendly Products
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📱</span>
                  Instant Online Booking
                </div>
              </div>
            </div>
          </section>




          {/* LOCAL SERVICES SECTION (hard-coded) */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
                {/* Left: Content + Services list */}
                <div className="lg:col-span-2">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center lg:text-left">
                    Professional Cleaning Services in {SUBURB}
                  </h2>
                  <div className="h-1.5 w-20 bg-amber-400 rounded mx-auto lg:mx-0 mt-3 mb-8"></div>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mb-4">
                    Looking for reliable cleaning services in {SUBURB}? Our professional cleaning team delivers exceptional results
                    for homes and businesses in {SUBURB} and surrounding areas including Mill Park, South Morang, and Mernda.
                  </p>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mb-8">
                    As trusted cleaners in the City of Whittlesea, we understand the unique needs of {SUBURB} residents and provide
                    customized cleaning solutions that exceed expectations.
                  </p>

                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Our Services in {SUBURB}</h3>
                  <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
                    <Link href="/locations/epping/ndis-cleaning/" className="flex items-start gap-3 text-gray-800 hover:text-blue-700">
                      <span className="text-amber-500 mt-1">✔</span>
                      <span>NDIS Cleaning</span>
                    </Link>
                    <Link href="/locations/epping/general-cleaning/" className="flex items-start gap-3 text-gray-800 hover:text-blue-700">
                      <span className="text-amber-500 mt-1">✔</span>
                      <span>Regular House Cleaning</span>
                    </Link>
                    <Link href="/locations/epping/deep-cleaning/" className="flex items-start gap-3 text-gray-800 hover:text-blue-700">
                      <span className="text-amber-500 mt-1">✔</span>
                      <span>Deep Cleaning</span>
                    </Link>
                    <Link href="/locations/epping/carpet-cleaning/" className="flex items-start gap-3 text-gray-800 hover:text-blue-700">
                      <span className="text-amber-500 mt-1">✔</span>
                      <span>Carpet Cleaning</span>
                    </Link>
                    <Link href="/locations/epping/move-in-cleaning/" className="flex items-start gap-3 text-gray-800 hover:text-blue-700">
                      <span className="text-amber-500 mt-1">✔</span>
                      <span>Move In Cleaning</span>
                    </Link>
                  </div>
                </div>

                {/* Right: Coverage card */}
                <aside className="bg-gray-100 rounded-2xl p-6 lg:p-8">
                  <h4 className="text-xl font-bold text-blue-900 mb-6">Service Coverage Information</h4>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-[#FFA500] mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 3.05a7 7 0 119.9 9.9L10 18.9l-4.95-5.95a7 7 0 010-9.9zM10 11a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-semibold text-gray-900">Region:</span>
                        <div className="text-gray-700">Metropolitan North</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-[#FFA500] mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <div>
                        <span className="font-semibold text-gray-900">Council:</span>
                        <div className="text-gray-700">City of Whittlesea</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-[#FFA500] mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-semibold text-gray-900">Postcode:</span>
                        <div className="text-gray-700">3076</div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </main>
      </>
    </MainLayout>);
}