'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'

export default function MobileWhatsIncluded() {
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>({})
  
  const handleToggleSection = (index: number) => {
    setExpandedSections((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const includedItems = [
    {
      category: 'Living Areas & Bedrooms',
      items: [
        'Remove cobwebs from walls and ceilings',
        'Clean all skirting boards and window sills',
        'Wipe doors and door frames',
        'Clean switches and power points',
        'Vacuum and mop all floors',
        'Make beds with fresh linen (if provided)'
      ]
    },
    {
      category: 'Kitchen',
      items: [
        'Clean stovetop and rangehood',
        'Clean and sanitize all benchtops',
        'Clean and polish sink area',
        'Clean inside/outside microwave',
        'Empty all the bins and replace bin-liners',
        'Empty and clean refrigerator'
      ]
    },
    {
      category: 'Bathrooms and Toilets',
      items: [
        'Deep clean shower and screens',
        'Clean and sanitize vanity area',
        'Thorough toilet cleaning',
        'Replace towels and amenities (if requested)'
      ]
    }
  ]

  return (
    <section className="md:hidden py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#1E3D8F] mb-6 text-center">
          What&apos;s Included in Your Airbnb Cleaning
        </h2>
        
        <div className="space-y-6">
          {includedItems.map((section, idx) => {
            const expanded = expandedSections[idx]
            const itemsToShow = expanded ? section.items : section.items.slice(0, 4)
            return (
              <div key={section.category} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-lg mb-4 text-[#1E3D8F]">
                  {section.category}
                </h3>
                <ul className="space-y-3">
                  {itemsToShow.map((item) => (
                    <li key={item} className="flex items-start">
                      <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                {section.items.length > 4 && (
                  <button
                    className="mt-3 text-blue-600 underline text-sm"
                    onClick={() => handleToggleSection(idx)}
                  >
                    {expanded ? 'Read Less' : 'More'}
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Guarantee Section */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-bold text-lg mb-4 text-[#1E3D8F]">
            Our Guarantee
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">100% Satisfaction Guarantee</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">Airbnb Host Approved Service</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">Professional Equipment Used</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">Experienced Cleaning Team</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">Public Liability Insured</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-700">Same Day Service Available</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
