'use client'

import MainLayout from '@/components/layout/MainLayout'
import { useState, useEffect } from 'react'
import DefaultHero from '@/components/Home/HeroSection/DefaultHero'
import DynamicHero from '@/components/Home/HeroSection/DynamicHero'
import { useLocation } from '@/utils/location/useLocation'
import AboutCompany from '@/components/Home/AboutSection/AboutCompany'
import HowItWorks from '@/components/Home/HowItWorks/HowItWorks'
import Whychooseus from '@/components/Home/Whychooseus/Whychooseus'
import { ServicesSection } from '@/app/services/components/ServicesSection'
import TrustedOrganizations from '@/app/services/components/TrustedOrganizations'
import HomeReviewsGrid from '@/components/Home/ReviewsSection/HomeReviewsGrid'
import HomeLatestBlogs from '@/components/Home/HomeBlogs/HomeLatestBlogs'
import Foundersmsg from '@/components/Home/Foundersmsg/Foundersmsg'
import BookingDialog from '@/components/BookingDialog/BookingDialog'
import { WhatsIncluded } from './services/components/WhatsIncluded'
import { CTABooking } from '@/components/Home/CTABooking'

export default function HomePageClient() {
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
      // Check if dialog has been shown in this session
      const hasSeenDialog = sessionStorage.getItem('bookingDialogShown');

      if (!hasSeenDialog) {
        const timer = setTimeout(() => {
          setShowBookingDialog(true);
          // Mark dialog as shown in this session
          sessionStorage.setItem('bookingDialogShown', 'true');
        }, 3000);
        return () => clearTimeout(timer);
      }
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
      <div className='mt-16 bg-white'>
        <ServicesSection />
      </div>
      <HomeReviewsGrid />
      <WhatsIncluded />
      <AboutCompany />
      <HowItWorks />
      <TrustedOrganizations />
      <Foundersmsg />
      <Whychooseus />
      <HomeLatestBlogs />
      
      <CTABooking />
      {/* <Subscription /> */}
    </MainLayout>
  )
}

