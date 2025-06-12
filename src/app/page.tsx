'use client'

import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import Link from 'next/link'
import SubscriptionSection from '@/components/features/SubscriptionSection'
import AnimatedCounter from '@/components/features/AnimatedCounter'
import { useState, useEffect } from 'react'
import DefaultHero from '@/components/Home/HeroSection/DefaultHero'
import DynamicHero from '@/components/Home/HeroSection/DynamicHero'
import { useLocation } from '@/utils/location/useLocation'
import AboutCompany from '@/components/Home/AboutSection/AboutCompany'
import HowItWorks from '@/components/Home/HowItWorks/HowItWorks'
import ServicesGrid from '@/components/Home/ServicesGrid/ServicesGrid'
import TrustedOrganizations from '@/components/Home/TrustedOrganizations/TrustedOrganizations'
import HomeReviewsGrid from '@/components/Home/ReviewsSection/HomeReviewsGrid'
import InstantCost from '@/components/instant-cost/instantcost'
import HomeLatestBlogs from '@/components/Home/HomeBlogs/HomeLatestBlogs'
import BookingDialog from '@/components/BookingDialog/BookingDialog'

export default function HomePage() {
  const { loading, error, location } = useLocation();
  const [isClient, setIsClient] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    console.log('Location state:', { loading, error, location });
  }, [loading, error, location]);

  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => setShowBookingDialog(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isClient]);

    

  // Show minimal loading state during SSR
  if (!isClient) {
    return (
      <MainLayout>
        <DefaultHero />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {showBookingDialog && (
        <BookingDialog onClose={() => setShowBookingDialog(false)} />
      )}
      {(loading || error || !location?.found) ? (
        <DefaultHero />
      ) : (
        <DynamicHero 
          location={{
            city: location.suburb || 'Melbourne',
            region: 'VIC',
            mainSuburbs: location.nearestSuburb ? [location.nearestSuburb] : []
          }}
          businessInfo={{
            yearsInBusiness: 4,
            totalCleaners: 35,
            insuranceInfo: 'Public Liability Insurance'
          }}
        />
      )}


      <HomeReviewsGrid />
      <AboutCompany />
      <HowItWorks />
      <ServicesGrid />
      
      <TrustedOrganizations />        
      
      

      {/* Founder's Message Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image with improved overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/founder-bg.jpg"
            alt="Cleaning Professionals Team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#1E3D8F]/95 to-[#1E3D8F]/80" />
        </div>

        <div className="container mx-auto px-4 relative max-w-6xl">
          {/* Content */}
          <div className="ml-auto lg:w-1/2">
            <div className="mb-8">
              <span className="inline-block border-b-2 border-white pb-1 text-xs md:text-sm uppercase tracking-wider font-semibold text-white">
                FOUNDER&apos;S MESSAGE
              </span>
            </div>

            <blockquote className="text-base md:text-lg italic font-light leading-relaxed mb-6 md:mb-8 text-white">
              &quot;As people are getting busy in their work life, it is so difficult for them to manage time for cleaning their spaces by own. So here we understand people&apos;s problems and help them with cleanings.&quot;
            </blockquote>

            <div className="mb-12 md:mb-16">
              <p className="text-lg md:text-xl font-bold text-white">Priti Ale</p>
              <p className="text-sm md:text-base text-white/90">Founder, Cleaning Professionals</p>
            </div>

            {/* Stats Section - 2x2 Grid on Mobile */}
            <div className="grid grid-cols-2 md:flex md:justify-between items-center text-white gap-8 md:gap-0">
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">
                  <AnimatedCounter end={740} />
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider font-medium">
                  CLEAN HOMES
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">
                  <AnimatedCounter end={35} />
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider font-medium">
                  PROFESSIONAL STAFFS
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">
                  <AnimatedCounter end={100} suffix="%" />
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider font-medium">
                  HAPPY CLIENTS
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">
                  <AnimatedCounter end={4} />
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider font-medium">
                  YEARS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <div className="pricing-calculators">
        <InstantCost service="end-of-lease" />
      </div>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <div className="mb-8">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                  <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
                  <span className="text-xs md:text-sm uppercase tracking-wider text-center md:text-left">
                    WHY CHOOSE US
                  </span>
                  <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
                </div>
                <h2 className="text-xl md:text-4xl font-bold text-center md:text-left mb-12">
                  Why Choose Cleaning<br className="hidden md:block" />
                  Professionals?
                </h2>
              </div>
              <p className="text-gray-600 mb-8">
                At Cleaning Professionals Australia, we believe that a clean space is essential for both comfort and well-being. With years of experience serving homes and businesses across Australia, we have built a reputation for excellence, reliability, and a commitment to customer satisfaction. Our skilled team of cleaning experts uses top-of-the-line equipment and eco-friendly products to deliver the best possible results for our clients.
              </p>
              <Link href="/about" className="text-[#1E3D8F] hover:underline">
                Read More About Cleaning Professionals
              </Link>
            </div>

            {/* Right Content - Features */}
            <div className="lg:w-1/2">
              <div className="grid gap-8 mt-[52px]">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Experienced and Trained Cleaners:</h3>
                    <p className="text-gray-600">All our professionals are thoroughly vetted and highly trained, ensuring the highest standards of cleanliness.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Flexible Scheduling:</h3>
                    <p className="text-gray-600">We offer flexible cleaning schedules, allowing you to book services at times that suit you.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6c0 1.1.9 2 2 2h14a2 2 0 002-2v0a2 2 0 00-2-2H5a2 2 0 00-2 2v0zm3 6h14M6 18h14" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Eco-Friendly Solutions:</h3>
                    <p className="text-gray-600">We prioritize using environmentally friendly products that are safe for you, your family, and the environment.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Comprehensive Services:</h3>
                    <p className="text-gray-600">We provide a wide array of cleaning services for residential, commercial, and specialized needs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    
     

      {/* Blog Section with Dynamic Data */}
      <HomeLatestBlogs />

      <SubscriptionSection />

      
    </MainLayout>
  )
}