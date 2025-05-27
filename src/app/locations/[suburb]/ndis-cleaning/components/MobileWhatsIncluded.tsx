'use client'

import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export default function MobileWhatsIncluded() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }))
  }

  return (
    <section className="md:hidden py-8 pb-4 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* NDIS Logo and Pricing Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#1E3D8F]">NDIS Registered Provider</h3>
              <p className="text-sm text-gray-500">Approved cleaning support services</p>
            </div>
            <Image
              src="/logos/National_Disability_Insurance_Scheme_logo.svg"
              alt="NDIS Registered Provider"
              width={80}
              height={42}
              className="flex-shrink-0"
            />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-8 space-y-4">
          {/* Regular Support Price */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 font-medium">Regular Support</div>
            <div className="flex items-baseline gap-1 mt-1">
              <div className="text-3xl font-bold text-[#1E3D8F]">$45.18</div>
              <div className="text-gray-500">/hour</div>
            </div>
            <div className="text-sm text-gray-500 mt-1">Save 10% with regular support</div>
          </div>

          {/* One-Time Service Price */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm text-gray-500 font-medium">One-Time Service</div>
            <div className="flex items-baseline gap-1 mt-1">
              <div className="text-3xl font-bold text-[#1E3D8F]">$50.20</div>
              <div className="text-gray-500">/hour</div>
            </div>
            <div className="text-sm text-gray-500 mt-1">Flexible support when needed</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-[#1E3D8F] mb-6 text-center">
          NDIS Support Services Included
        </h2>

        <div className="space-y-4">
          {[
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
            },
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
            },
            {
              title: "Additional Services Available",
              items: [
                "High support needs cleaning",
                "Specialized equipment cleaning",
                "Sensory room cleaning",
                "Mobility aid cleaning",
                "Medical equipment cleaning",
                "Specialized surface cleaning",
                "Allergen control cleaning",
                "Environmental modifications"
              ]
            }
          ].map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4 text-[#1E3D8F]">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.slice(0, expandedSections[section.title] ? undefined : 4).map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              {section.items.length > 4 && (
                <button
                  onClick={() => toggleSection(section.title)}
                  className="mt-4 flex items-center gap-2 text-[#1E3D8F] font-medium w-full justify-center"
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
          ))}
        </div>
      </div>
    </section>
  )
} 