'use client'

import { Check, BedDouble, Sofa, Armchair, Layers } from 'lucide-react'
import BookNowButton from '../../components/BookNowButton'
import { ServiceBase } from '@/app/quick-book/types/service'

interface PricingSectionProps {
  service: ServiceBase;
  suburb: string;
}

const categories = [
  {
    key: 'carpet',
    icon: <Layers className="w-8 h-8 text-[#1E3D8F]" />, 
    title: 'Carpet Cleaning',
    subtitle: 'Deep steam cleaning for your carpets',
    popular: true,
    features: [
      'Pre-inspection & vacuuming',
      'Spot & stain treatment',
      'Hot water extraction',
      'Deodorizing & neutralizing odors'
    ],
    items: [
      { title: 'Bedrooms', price: '$35', unit: 'per room', highlight: true },
      { title: 'Living/Lounge Rooms', price: '$35', unit: 'per room' },
      { title: 'Study Rooms', price: '$30', unit: 'per room' },
      { title: 'Hallways', price: '$25', unit: 'per area' },
      { title: 'Stairs', price: '$50', unit: 'per each level' },
    ]
  },
  {
    key: 'rug',
    icon: <Layers className="w-8 h-8 text-[#1E3D8F]" />, 
    title: 'Rug Cleaning',
    subtitle: 'Professional rug cleaning service',
    features: [
      'All rug sizes & types',
      'Gentle, safe cleaning',
      'Stain & odor removal'
    ],
    items: [
      { title: 'Large Rugs', price: '$50', unit: 'per rug (3x4m or larger)', highlight: true },
      { title: 'Medium Rugs', price: '$40', unit: 'per rug (2x3m)' },
      { title: 'Small Rugs', price: '$35', unit: 'per rug (up to 1.5x2m)' },
    ]
  },
  {
    key: 'sofa',
    icon: <Sofa className="w-8 h-8 text-[#1E3D8F]" />, 
    title: 'Sofa/Couch Cleaning',
    subtitle: 'Clean and sanitize your sofas',
    features: [
      'Steam or dry cleaning',
      'Sanitizing & deodorizing',
      'Safe for all fabrics'
    ],
    items: [
      { title: 'Large Sofa', price: '$120', unit: '4+ seater', highlight: true },
      { title: 'Medium Sofa', price: '$90', unit: '3 seater' },
      { title: 'Small Sofa', price: '$70', unit: '2 seater' },
    ]
  },
  {
    key: 'chair',
    icon: <Armchair className="w-8 h-8 text-[#1E3D8F]" />, 
    title: 'Chair Cleaning',
    subtitle: 'Clean and sanitize your chairs',
    features: [
      'Recliners, armchairs, stools',
      'Spot & stain removal',
      'Quick drying'
    ],
    items: [
      { title: 'Recliner Chair', price: '$60', unit: 'per chair', highlight: true },
      { title: 'Day Chair', price: '$45', unit: 'per chair' },
      { title: 'Arm Chair', price: '$35', unit: 'per chair' },
      { title: 'Ottoman/Fabric Stool', price: '$25', unit: 'per piece' },
    ]
  },
  {
    key: 'mattress',
    icon: <BedDouble className="w-8 h-8 text-[#1E3D8F]" />, 
    title: 'Mattress Cleaning',
    subtitle: 'Clean and sanitize your mattresses',
    features: [
      'Steam cleaning',
      'Dust mite & allergen removal',
      'Safe for all mattress types'
    ],
    items: [
      { title: 'Large Mattress', price: '$80', unit: 'King/Queen', highlight: true },
      { title: 'Medium Mattress', price: '$60', unit: 'Double' },
      { title: 'Small Mattress', price: '$40', unit: 'Single' },
    ]
  },
]

export default function PricingSection({ service, suburb }: PricingSectionProps) {
  return (
    <section id="pricing-section" className="pt-8 md:pt-8 pb-12 md:pb-20">
      <div className="container mx-auto px-4">
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">
            Carpet Cleaning Pricing in {suburb}
          </h2>
          <h3 className="text-xl font-bold text-center mb-8 text-gray-600">
            Transparent, Upfront Prices – No Hidden Fees
          </h3>

          {/* Modern Pricing Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {categories.map((cat) => (
              <div
                key={cat.key}
                className={`relative bg-white rounded-2xl shadow-xl p-7 flex flex-col h-full border border-gray-100 hover:shadow-2xl transition-shadow duration-300 ${cat.popular ? 'ring-2 ring-[#FFA500]' : ''}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  {cat.icon}
                  <h3 className="text-xl font-bold text-[#1E3D8F]">{cat.title}</h3>
                  {cat.popular && (
                    <span className="ml-2 px-2 py-1 text-xs rounded bg-[#FFA500] text-white font-semibold">Most Popular</span>
                  )}
                </div>
                <div className="text-gray-600 mb-2 text-sm">{cat.subtitle}</div>
                <ul className="mb-4 space-y-1">
                  {cat.features.map((f, i) => (
                    <li key={i} className="flex items-center text-gray-500 text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-1" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex-1">
                  <ul className="divide-y divide-gray-100">
                    {cat.items.map((item) => (
                      <li key={item.title} className={`flex justify-between items-center py-2 ${item.highlight ? 'font-bold text-[#1E3D8F]' : ''}`}>
                        <span>{item.title}</span>
                        <span className="text-2xl font-bold">{item.price}</span>
                        <span className="text-xs text-gray-500 ml-2">{item.unit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <BookNowButton service={service} />
                </div>
              </div>
            ))}
          </div>
        
        </div>
      </div>
    </section>
  )
} 