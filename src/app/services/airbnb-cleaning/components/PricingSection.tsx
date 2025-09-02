'use client'

import { Check } from 'lucide-react'
import { ServiceBase } from '@/app/quick-book/types/service'
import AirbnbBookNowButton from './AirbnbBookNowButton'

interface PricingSectionProps {
  service: ServiceBase
}

export default function PricingSection({ service }: PricingSectionProps) {
  const pricingPlans = [
    {
      name: 'Studio/1 Bedroom',
      price: '$149',
      description: 'Perfect for studio apartments and 1-bedroom properties',
      features: [
        'Complete kitchen cleaning',
        'Bathroom sanitization',
        'Living area cleaning',
        'Bedroom cleaning',
        'Floor mopping and vacuuming',
        'Window and mirror cleaning',
        'Same day service available'
      ],
      popular: false
    },
    {
      name: '2 Bedroom',
      price: '$189',
      description: 'Ideal for 2-bedroom apartments and small houses',
      features: [
        'All 1-bedroom features',
        'Second bedroom cleaning',
        'Additional bathroom (if applicable)',
        'Extended living area cleaning',
        'Balcony/patio cleaning',
        'Linen replacement service',
        'Priority booking available'
      ],
      popular: true
    },
    {
      name: '3 Bedroom',
      price: '$298',
      description: 'Comprehensive cleaning for larger properties',
      features: [
        'All 2-bedroom features',
        'Additional bedrooms',
        'Multiple bathrooms',
        'Large living areas',
        'Storage areas',
        'Garage cleaning (if applicable)',
        'Premium service guarantee'
      ],
      popular: false
    },
    {
      name: '4+ Bedroom',
      price: '$310',
      description: 'Full-service cleaning for large properties',
      features: [
        'All 3-bedroom features',
        'Multiple bedrooms',
        'Multiple bathrooms',
        'Large living areas',
        'Storage areas',
        'Garage cleaning (if applicable)',
        'Premium service guarantee'
      ],
      popular: false
    }
  ]

  return (
    <section id="pricing-section" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
            Transparent Airbnb Cleaning Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Competitive pricing for professional Airbnb cleaning service. 
            No hidden fees, no surprises. Choose the plan that fits your property size.
          </p>
          <div className="mt-6 bg-blue-50 p-4 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-gray-700">
              <strong>Hourly Rate:</strong> $49.89 per hour (minimum 2 hours: $119.12)
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-[#FFA500] relative' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#FFA500] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#1E3D8F] mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-[#1E3D8F] mb-2">
                  {plan.price}
                </div>
                <p className="text-gray-600 text-sm">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <AirbnbBookNowButton service={service} />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-[#1E3D8F] mb-4">
              What&apos;s Included in Every Airbnb Cleaning Service
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-lg mb-3">Standard Inclusions:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Professional cleaning equipment and supplies</li>
                  <li>• Eco-friendly cleaning products</li>
                  <li>• Experienced cleaning team</li>
                  <li>• Public liability insurance</li>
                  <li>• Satisfaction guarantee</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">Additional Services:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Linen replacement (extra charge)</li>
                  <li>• Deep oven cleaning (extra charge)</li>
                  <li>• Carpet cleaning (extra charge)</li>
                  <li>• Window cleaning (extra charge)</li>
                  <li>• Express service (extra charge)</li>
                  <li>• Accessories replacement (custom pricing)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
