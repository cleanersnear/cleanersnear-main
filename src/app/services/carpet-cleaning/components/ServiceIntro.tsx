'use client'

import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { ServiceBase } from '@/app/quick-book/types/service'
import BookNowButton from '../../components/BookNowButton'
import { useState } from 'react'

interface ServiceIntroProps {
  service: ServiceBase
}

export default function ServiceIntro({ service }: ServiceIntroProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }))
  }

  const handleScrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sections = [
    {
      title: "What's Included",
      items: [
        "Pre-inspection of carpets",
        "High-powered vacuuming",
        "Spot & stain treatment",
        "Deep steam cleaning (hot water extraction)",
        "Deodorizing & neutralizing odors"
      ]
    },
    {
      title: "Optional Add-ons",
      items: [
        "Rug cleaning",
        "Upholstery cleaning",
        "Mattress cleaning",
        "Stain protection treatment",
        "Pet stain & odor removal"
      ]
    },
    {
      title: "Why Choose Us",
      items: [
        "Eco-friendly, non-toxic products",
        "Safe for kids & pets",
        "Experienced, fully insured team",
        "Satisfaction guarantee",
        "Flexible scheduling",
        "Transparent pricing"
      ]
    }
  ]

  const renderSection = (section: { title: string; items: string[] }) => (
    <div key={section.title} className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="font-bold text-xl mb-4">{section.title}</h3>
      <ul className="space-y-3">
        {section.items.slice(0, expandedSections[section.title] ? undefined : 4).map((item) => (
          <li key={item} className="flex items-start">
            <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {section.items.length > 4 && (
        <button
          onClick={() => toggleSection(section.title)}
          className="mt-4 flex items-center gap-2 text-[#1E3D8F] font-medium hover:text-opacity-80 transition-colors"
        >
          {expandedSections[section.title] ? (
            <>
              Show Less
              <ChevronUp className="w-5 h-5" />
            </>
          ) : (
            <>
              Read More
              <ChevronDown className="w-5 h-5" />
            </>
          )}
        </button>
      )}
    </div>
  )

  return (
    <section className="md:py-12 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Content Area */}
          <div className="lg:col-span-2 hidden md:block">
            <div className="prose prose-lg max-w-none">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold text-[#1E3D8F] m-0">
                  Professional Carpet Cleaning Services in Melbourne
                </h2>
              </div>
              <p className="text-gray-600 mb-8">
                Our professional carpet cleaning service uses advanced hot water extraction technology and eco-friendly products to deep clean your carpets, remove stains, and eliminate odors. We provide comprehensive cleaning solutions for both residential and commercial spaces, ensuring your carpets look and feel fresh while maintaining their quality and longevity.
              </p>

              {/* Service Features */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {sections.slice(0, 2).map(renderSection)}
              </div>

              <div className="grid md:grid-cols-1 gap-6">
                {sections.slice(2).map(renderSection)}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 hidden md:block">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32">
              <h3 className="text-2xl font-bold mb-4">Book Carpet Cleaning</h3>
              
              {/* Standard Room Price */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 font-medium">Standard Room</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-bold text-[#1E3D8F]">$35</div>
                  <div className="text-gray-500">/room</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">Starting price per room</div>
              </div>

              {/* Additional Services */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 font-medium">Additional Services</div>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span>Couch Cleaning</span>
                    <span>From $70</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mattress Cleaning</span>
                    <span>From $40</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rug Cleaning</span>
                    <span>From $35</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <BookNowButton service={service} />
              </div>
              <button
                onClick={handleScrollToPricing}
                className="block w-full border-2 border-[#1E3D8F] text-[#1E3D8F] text-center py-3 rounded-md hover:bg-[#1E3D8F] hover:text-white transition-all"
              >
                View Full Pricing
              </button>

              {/* Operating Hours */}
              <div className="mt-8">
                <h4 className="font-bold mb-4">Service Hours</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>7am – 8pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>8am - 6pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>8am - 5pm</span>
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