'use client'

import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function MobileWhatsIncluded() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }))
  }

  const sections = [
    {
      title: "What's Included",
      items: [
        "Pre-inspection of carpets",
        "High-powered vacuuming",
        "Spot & stain treatment",
        "Deep steam cleaning (hot water extraction)",
        "Deodorizing & neutralizing odors",
        
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

  return (
    <section className="md:hidden py-8 pb-4 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#1E3D8F] mb-6 text-center">
          What&apos;s Included in Carpet Cleaning
        </h2>
        <div className="space-y-4">
          {sections.map((section, index) => (
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