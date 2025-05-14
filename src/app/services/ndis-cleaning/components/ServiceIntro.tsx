'use client'

import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { ServiceBase } from '@/app/quick-book/types/service'
import BookNowButton from '../../components/BookNowButton'
import { useState } from 'react'
import Image from 'next/image'

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

  const includedSections = [
    {
      title: "Standard Support",
      items: [
        "Regular house cleaning",
        "Bathroom and toilet cleaning",
        "Kitchen cleaning and organization",
        "Vacuuming and mopping",
        "Dusting and surface cleaning",
        "Laundry assistance",
        "Bed making",
        "Basic organization",
        "Waste management"
      ]
    },
    {
      title: "Specialized Support",
      items: [
        "Customized cleaning plans",
        "Disability-friendly equipment",
        "Sensory-considerate cleaning",
        "Safe cleaning products",
        "Flexible scheduling",
        "Progress reporting",
        "Support coordination",
        "Regular cleaner assignment",
        "NDIS plan management"
      ]
    }
  ]

  const additionalSections = [
    {
      title: "Additional Support",
      items: [
        "Deep cleaning services",
        "Organizing assistance",
        "Window cleaning",
        "Outdoor area cleaning",
        "Special event preparation",
        "Post-event cleanup",
        "Seasonal cleaning"
      ]
    },
    {
      title: "Support Features",
      items: [
        "NDIS registered cleaners",
        "Trained support workers",
        "Regular service reviews",
        "Quality assurance checks",
        "Feedback integration",
        "Continuous support"
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
                  NDIS Registered Cleaning Services in Melbourne
                </h2>
                <Image
                  src="/logos/National_Disability_Insurance_Scheme_logo.svg"
                  alt="NDIS Registered Provider"
                  width={100}
                  height={53}
                  className="flex-shrink-0"
                />
              </div>
              <p className="text-gray-600 mb-8">
                Our NDIS cleaning service is designed to support participants in maintaining a clean, healthy, and organized living environment. We understand the unique needs of NDIS participants and provide flexible, person-centered cleaning support that aligns with your NDIS plan goals.
              </p>

              {/* Service Features */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {includedSections.map(renderSection)}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {additionalSections.map(renderSection)}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 hidden md:block">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32">
              <h3 className="text-2xl font-bold mb-4">Book NDIS Cleaning</h3>
              
              {/* Regular Support Price */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 font-medium">Regular Support</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-bold text-[#1E3D8F]">$45.18</div>
                  <div className="text-gray-500">/hour</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">Save 10% with regular support</div>
              </div>

              {/* One-Time Service Price */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 font-medium">One-Time Service</div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-bold text-[#1E3D8F]">$50.20</div>
                  <div className="text-gray-500">/hour</div>
                </div>
                <div className="text-sm text-gray-500 mt-1">Flexible support when needed</div>
              </div>

              <div className="mb-4">
                <BookNowButton service={service} />
              </div>
              <button
                onClick={handleScrollToPricing}
                className="block w-full border-2 border-[#1E3D8F] text-[#1E3D8F] text-center py-3 rounded-md hover:bg-[#1E3D8F] hover:text-white transition-all"
              >
                See NDIS Rates
              </button>

              {/* Operating Hours */}
              <div className="mt-8">
                <h4 className="font-bold mb-4">Support Hours</h4>
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