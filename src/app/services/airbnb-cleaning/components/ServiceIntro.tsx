'use client'

import { Check } from 'lucide-react'
import { ServiceBase } from '@/app/quick-book/types/service'
import AirbnbBookNowButton from './AirbnbBookNowButton'
import { useState } from 'react'

interface ServiceIntroProps {
  service: ServiceBase
}

export default function ServiceIntro({ service }: ServiceIntroProps) {
  const [expandedIncluded, setExpandedIncluded] = useState<{ [key: number]: boolean }>({})
  const [expandedAdditional, setExpandedAdditional] = useState<{ [key: number]: boolean }>({})
  
  const handleToggleIncluded = (index: number) => {
    setExpandedIncluded((prev) => ({ ...prev, [index]: !prev[index] }))
  }
  
  const handleToggleAdditional = (index: number) => {
    setExpandedAdditional((prev) => ({ ...prev, [index]: !prev[index] }))
  }

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
        "Vacuum and mop all floors",
        "Make beds with fresh linen (if provided)"
      ]
    },
    {
      title: "Kitchen",
      items: [
        "Clean stovetop and rangehood",
        "Clean and sanitize all benchtops",
        "Clean and polish sink area",
        "Clean inside/outside microwave",
        "Empty all the bins and replace bin-liners",
        "Empty and clean refrigerator"
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
        "Replace towels and amenities (if requested)"
      ]
    },
    {
      title: "Our Guarantee",
      items: [
        "100% Satisfaction Guarantee",
        "Airbnb Host Approved Service",
        "Professional Equipment Used",
        "Experienced Cleaning Team",
        "Public Liability Insured",
        "Same Day Service Available"
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
                Melbourne&apos;s Most Trusted Airbnb Cleaning Service
              </h2>
              <p className="text-gray-600 mb-8">
                Keep your Airbnb property spotless and your guests happy with our professional Airbnb cleaning service. 
                We understand the unique needs of short stay properties and provide reliable turnover cleaning that meets 
                the highest standards expected by your guests.
              </p>

              {/* Service Features */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {includedSections.map((section, idx) => {
                  const expanded = expandedIncluded[idx]
                  const itemsToShow = expanded ? section.items : section.items.slice(0, 4)
                  return (
                    <div key={section.title} className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="font-bold text-xl mb-4">{section.title}</h3>
                      <ul className="space-y-3">
                        {itemsToShow.map((item) => (
                          <li key={item} className="flex items-start">
                            <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {section.items.length > 4 && (
                        <button
                          className="mt-3 text-blue-600 underline text-sm"
                          onClick={() => handleToggleIncluded(idx)}
                        >
                          {expanded ? 'Read Less' : 'More'}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {additionalSections.map((section, idx) => {
                  const expanded = expandedAdditional[idx]
                  const itemsToShow = expanded ? section.items : section.items.slice(0, 4)
                  return (
                    <div key={section.title} className="bg-white p-6 rounded-lg shadow-sm">
                      <h3 className="font-bold text-xl mb-4">{section.title}</h3>
                      <ul className="space-y-3">
                        {itemsToShow.map((item) => (
                          <li key={item} className="flex items-start">
                            <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {section.items.length > 4 && (
                        <button
                          className="mt-3 text-blue-600 underline text-sm"
                          onClick={() => handleToggleAdditional(idx)}
                        >
                          {expanded ? 'Read Less' : 'More'}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 hidden md:block">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32">
              <h3 className="text-2xl font-bold mb-4">Book Your Clean</h3>
              <div className="mb-6">
                <div className="text-sm text-gray-500">Starting from</div>
                <div className="text-3xl font-bold text-[#1E3D8F]">$149</div>
                <div className="text-sm text-gray-500">Studio/1 Bedroom</div>
              </div>
              <div className="mb-4">
                <AirbnbBookNowButton service={service} />
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
