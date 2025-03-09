'use client'

import { Check } from 'lucide-react'


import { ServiceBase } from '@/app/quick-book/types/service'
import BookNowButton from '../../components/BookNowButton'

interface ServiceIntroProps {
  service: ServiceBase
}

export default function ServiceIntro({ service }: ServiceIntroProps) {
  
  

  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const includedSections = [
    {
      title: "Living Areas & Bedrooms",
      items: [
        "Remove cobwebs from walls and ceilings",
        "Clean all skirting boards and window sills",
        "Wipe doors and door frames",
        "Clean switches and power points",
        "Vacuum and mop all floors"
      ]
    },
    {
      title: "Kitchen",
      items: [
        "Deep clean stovetop and rangehood",
        "Clean and sanitize all benchtops",
        "Clean and polish sink area",
        "Clean inside/outside microwave",
        "Deep clean oven (inside and out)"
      ]
    }
  ]

  const additionalSections = [
    {
      title: "Bathrooms and Toilets",
      items: [
        "Deep clean shower and screens",
        "Clean and sanitize vanity area",
        "Thorough toilet cleaning",
        "Wall tiles and grout (conditions apply)",
        "Clean exhaust fans"
      ]
    },
    {
      title: "Our Guarantee",
      items: [
        "100% Bond Back Guarantee",
        "Real Estate Approved Service",
        "Professional Equipment Used",
        "Experienced Cleaning Team",
        "Public Liability Insured"
      ]
    }
  ]

  return (
    <section className="md:py-12 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Content Area */}
          <div className="lg:col-span-2 hidden md:block">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-6">
                Melbourne&apos;s Most Trusted End of Lease Cleaning Service
              </h2>
              <p className="text-gray-600 mb-8">
                Moving out? Let us handle the cleaning while you focus on your move. Our end of lease cleaning service is designed to meet and exceed real estate agents&apos; expectations, ensuring you get your bond back.
              </p>

              {/* Service Features */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {includedSections.map((section) => (
                  <div key={section.title} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-xl mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start">
                          <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {additionalSections.map((section) => (
                  <div key={section.title} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-xl mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start">
                          <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 hidden md:block">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32">
              <h3 className="text-2xl font-bold mb-4">Book Your Clean</h3>
              <div className="mb-6">
                <div className="text-sm text-gray-500">Starting from</div>
                <div className="text-3xl font-bold text-[#1E3D8F]">$299</div>
                <div className="text-sm text-gray-500">Complete Service</div>
              </div>
              <div className="mb-4">
                <BookNowButton service={service} />
              </div>
              <button
                onClick={handleScrollToPricing}
                className="block w-full border-2 border-[#1E3D8F] text-[#1E3D8F] text-center py-3 rounded-md hover:bg-[#1E3D8F] hover:text-white transition-all"
              >
                See Detailed Pricing
              </button>

              {/* Operating Hours */}
              <div className="mt-8">
                <h4 className="font-bold mb-4">Operating Hours</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8am – 8pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9am - 7pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>9am - 8pm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 