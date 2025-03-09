'use client'


import MainLayout from '@/components/layout/MainLayout'
import EOLHero from './components/EOLHero'
import QuickStats from './components/QuickStats'
import ServiceIntro from './components/ServiceIntro'
import PricingSection from './components/PricingSection'
import MobileWhatsIncluded from './components/MobileWhatsIncluded'
import BeforeAfterGallery from './components/BeforeAfterGallery'
import ReviewsSection from './components/ReviewsSection'
import FAQSection from './components/FAQSection'
import RequestCallback from './components/RequestCallback'
import FloatingBookNow from './components/FloatingBookNow'


export default function EndOfLeaseCleaning() {
  

  const service = {
    id: 'end-of-lease-cleaning',
    title: 'End of Lease Cleaning',
    category: 'popular',
    type: 'end-of-lease-cleaning'
  } as const

 

  return (
    <MainLayout>
      <FloatingBookNow />
      <div className="mt-32">
        <EOLHero />
        <QuickStats />
        <MobileWhatsIncluded />
        <ServiceIntro service={service} />
        <BeforeAfterGallery />
        <PricingSection service={service} />
        <ReviewsSection />
        <FAQSection />
        <RequestCallback />
      </div>
    </MainLayout>
  )
} 