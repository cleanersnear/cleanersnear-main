'use client'

import { Check } from 'lucide-react'
import BookNowButton from '../../components/BookNowButton'
import { ServiceBase } from '@/app/quick-book/types/service'
import { useState } from 'react'

interface PricingSectionProps {
  service: ServiceBase
}

interface PricingPlan {
  title: string
  price: string
  priceLabel: string
  description: string
  features: string[]
  isPopular?: boolean
}

export default function PricingSection({ service }: PricingSectionProps) {
  const [activeFreq, setActiveFreq] = useState<number | null>(null)

  return (
    <section id="pricing-section" className="pt-8 md:pt-8 pb-12 md:pb-20">
      <div className="container mx-auto px-4">
        {/* Hourly Rates Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">
            Commercial Cleaning Service Rates
          </h2>
          <h3 className="text-xl font-bold text-center mb-8 text-gray-600">
            Professional Commercial Cleaning Hourly Rates
          </h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {([
              {
                title: '3 Hours Once-off Clean',
                price: '195',
                priceLabel: 'total',
                description: '$65/hr (min. 3 hrs)',
                features: [
                  'Professional commercial cleaning',
                  'All cleaning supplies included',
                  'Professional equipment',
                  'Trained & experienced cleaners',
                  'Perfect for one-time or special cleans'
                ]
              },
              {
                title: '3 Hours Regular Clean',
                price: '132',
                priceLabel: 'total',
                description: 'from $44/hr (min. 3 hrs)',
                features: [
                  'Professional commercial cleaning',
                  'All cleaning supplies included',
                  'Professional equipment',
                  'Trained & experienced cleaners',
                  'Best value for ongoing service'
                ],
                isPopular: true
              }
            ] as PricingPlan[]).map((plan) => (
              <div 
                key={plan.title}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.isPopular ? 'border-2 border-blue-500' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular Choice
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-[#1E3D8F]">${plan.price}</span>
                      <span className="text-gray-500">{plan.priceLabel}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <BookNowButton service={service} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regular Clean Frequency Rates Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200 p-6 md:p-10">
            <h3 className="text-2xl font-bold text-center mb-8">Regular Clean Frequency Rates</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  label: 'Daily',
                  price: '$44',
                  discount: '20% OFF',
                  badgeClass: 'bg-blue-500 text-white animate-pulse-badge',
                },
                {
                  label: 'Weekly',
                  price: '$46.75',
                  discount: '15% OFF',
                  badgeClass: 'bg-green-500 text-white animate-pulse-badge',
                },
                {
                  label: 'Fortnightly',
                  price: '$49.50',
                  discount: '10% OFF',
                  badgeClass: 'bg-yellow-500 text-white animate-pulse-badge',
                },
                {
                  label: 'Monthly',
                  price: '$55',
                  discount: 'No discount',
                  badgeClass: 'bg-gray-300 text-gray-700',
                },
              ].map((freq, idx) => (
                <div
                  key={freq.label}
                  className={`bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col items-center transition-all duration-200 cursor-pointer w-full
                    ${activeFreq === idx ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg bg-blue-50' : ''}
                    hover:shadow-lg hover:border-blue-400`}
                  onClick={() => setActiveFreq(idx)}
                >
                  <div className="font-semibold text-lg mb-1">{freq.label}</div>
                  <div className="text-3xl font-bold text-[#1E3D8F] mb-1">{freq.price}</div>
                  <div className="text-gray-600 text-base mb-2">per hour</div>
                  <div className={`${freq.badgeClass} text-xs px-3 py-1 rounded-full font-semibold mt-2 mb-1 text-center`}>{freq.discount}</div>
                  {activeFreq === idx && (
                    <div className="w-full mt-4">
                      <div className="w-full"><BookNowButton service={service} /></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 