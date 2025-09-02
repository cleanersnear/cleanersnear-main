'use client'

import MainLayout from '@/components/layout/MainLayout'
import AirbnbCleaningHero from './components/AirbnbCleaningHero'
import QuickStats from './components/QuickStats'
import ServiceIntro from './components/ServiceIntro'
import PricingSection from './components/PricingSection'
import MobileWhatsIncluded from './components/MobileWhatsIncluded'
import AirbnbImageGallery from './components/AirbnbImageGallery'
import ReviewsSection from './components/ReviewsSection'
import FAQSection from './components/FAQSection'
import RequestCallback from '../components/RequestCallback'
//import FloatingBookNow from '../components/FloatingBookNow'

import HomeLatestBlogs from '@/components/Home/HomeBlogs/HomeLatestBlogs'
import Link from 'next/link'
import { MapPin, Star, Home, DollarSign, Users } from 'lucide-react'

export default function AirbnbCleaning() {
  const service = {
    id: 'airbnb-cleaning',
    title: 'Airbnb Cleaning',
    category: 'popular',
    type: 'airbnb-cleaning'
  } as const

  return (
    <MainLayout>
      {/*<FloatingBookNow service={service} />*/}
      <div className="mt-32">
        <AirbnbCleaningHero />
        <QuickStats /> 
        <MobileWhatsIncluded />
        <ServiceIntro service={service} />
        <AirbnbImageGallery />
        <PricingSection service={service} />
        <ReviewsSection />
        <FAQSection />
        
      {/* Blog Section with Dynamic Data */}
      <HomeLatestBlogs />

      {/* Internal Linking Section for SEO */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                Explore Our Airbnb Cleaning Services
              </h2>
              <p className="text-lg text-gray-600">
                Discover comprehensive cleaning solutions for your short stay property
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Melbourne Service */}
              <Link href="/services/airbnb-cleaning/melbourne" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-8 h-8 text-[#1E3D8F] mr-3" />
                    <h3 className="text-xl font-bold text-[#1E3D8F]">Melbourne Service</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Professional Airbnb cleaning across all Melbourne suburbs with local expertise
                  </p>
                  <div className="text-[#1E3D8F] font-semibold group-hover:underline">
                    Explore Melbourne Areas →
                  </div>
                </div>
              </Link>

              {/* Best Service */}
              <Link href="/services/airbnb-cleaning/best-service" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center mb-4">
                    <Star className="w-8 h-8 text-[#1E3D8F] mr-3" />
                    <h3 className="text-xl font-bold text-[#1E3D8F]">Best Service</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Why we&apos;re Melbourne&apos;s top choice for Airbnb cleaning excellence
                  </p>
                  <div className="text-[#1E3D8F] font-semibold group-hover:underline">
                    Learn Why We&apos;re #1 →
                  </div>
                </div>
              </Link>

              {/* House Cleaning */}
              <Link href="/services/airbnb-cleaning/house-cleaning" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center mb-4">
                    <Home className="w-8 h-8 text-[#1E3D8F] mr-3" />
                    <h3 className="text-xl font-bold text-[#1E3D8F]">House Cleaning</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Complete house cleaning services for all property types and sizes
                  </p>
                  <div className="text-[#1E3D8F] font-semibold group-hover:underline">
                    View House Services →
                  </div>
                </div>
              </Link>

              {/* Near Me */}
              <Link href="/services/airbnb-cleaning/near-me" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-8 h-8 text-[#1E3D8F] mr-3" />
                    <h3 className="text-xl font-bold text-[#1E3D8F]">Near Me</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Find local Airbnb cleaning services in your specific area
                  </p>
                  <div className="text-[#1E3D8F] font-semibold group-hover:underline">
                    Find Local Service →
                  </div>
                </div>
              </Link>

              {/* Service Areas */}
              <Link href="/services/airbnb-cleaning/service-areas" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center mb-4">
                    <Users className="w-8 h-8 text-[#1E3D8F] mr-3" />
                    <h3 className="text-xl font-bold text-[#1E3D8F]">Service Areas</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Comprehensive coverage across Melbourne and surrounding suburbs
                  </p>
                  <div className="text-[#1E3D8F] font-semibold group-hover:underline">
                    View All Areas →
                  </div>
                </div>
              </Link>

              {/* Pricing */}
              <Link href="/services/airbnb-cleaning/pricing" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center mb-4">
                    <DollarSign className="w-8 h-8 text-[#1E3D8F] mr-3" />
                    <h3 className="text-xl font-bold text-[#1E3D8F]">Pricing</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Transparent pricing for all our Airbnb cleaning services
                  </p>
                  <div className="text-[#1E3D8F] font-semibold group-hover:underline">
                    View Pricing →
                  </div>
                </div>
              </Link>
            </div>

            {/* Additional Internal Links */}
            <div className="mt-12 text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-4">
                  Quick Navigation
                </h3>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <Link href="/services/airbnb-cleaning/book" className="text-[#1E3D8F] hover:underline font-medium">
                    Book Now
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/services/airbnb-cleaning/melbourne" className="text-[#1E3D8F] hover:underline font-medium">
                    Melbourne Service
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/services/airbnb-cleaning/best-service" className="text-[#1E3D8F] hover:underline font-medium">
                    Best Service
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/services/airbnb-cleaning/house-cleaning" className="text-[#1E3D8F] hover:underline font-medium">
                    House Cleaning
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/services/airbnb-cleaning/near-me" className="text-[#1E3D8F] hover:underline font-medium">
                    Near Me
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/services/airbnb-cleaning/service-areas" className="text-[#1E3D8F] hover:underline font-medium">
                    Service Areas
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link href="/services/airbnb-cleaning/pricing" className="text-[#1E3D8F] hover:underline font-medium">
                    Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        <RequestCallback service={service} />
      </div>
    </MainLayout>
  )
}
