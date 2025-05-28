'use client'

import { Check } from 'lucide-react'
import BookNowButton from '../../components/BookNowButton'
import { ServiceBase } from '@/app/quick-book/types/service'

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
  return (
    <section id="pricing-section" className="pt-8 md:pt-8 pb-12 md:pb-20">
      <div className="container mx-auto px-4">
        {/* Hourly Rates Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">
            Spring & Deep Cleaning Service Rates
          </h2>
          <h3 className="text-xl font-bold text-center mb-8 text-gray-600">
            Professional Spring & Deep Cleaning Hourly Rates
          </h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {([
              {
                title: 'Hourly Rate',
                price: '53.07',
                priceLabel: '/hour',
                description: 'Minimum 3 hours',
                features: [
                  'Professional spring & deep cleaning',
                  'All cleaning supplies included',
                  'Professional equipment',
                  'Trained & experienced cleaners',
                  'Perfect for small jobs'
                ]
              },
              {
                title: '4-Hour Package',
                price: '212',
                priceLabel: 'total',
                isPopular: true,
                description: 'Most Popular',
                features: [
                  'Professional spring & deep cleaning',
                  'All cleaning supplies included',
                  'Professional equipment',
                  'Trained & experienced cleaners',
                  'Ideal for apartments'
                ]
              },
              {
                title: '6-Hour Package',
                price: '318',
                priceLabel: 'total',
                description: 'Best for homes',
                features: [
                  'Professional spring & deep cleaning',
                  'All cleaning supplies included',
                  'Professional equipment',
                  'Trained & experienced cleaners',
                  'Perfect for larger homes'
                ]
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
      </div>
    </section>
  )
} 