'use client'

import { Check, Phone } from 'lucide-react'
import BookNowButton from '../../components/BookNowButton'
import { ServiceBase } from '@/app/quick-book/types/service'
import Link from 'next/link'

interface PricingSectionProps {
  service: ServiceBase
}

export default function PricingSection({ service }: PricingSectionProps) {
  const regularPricingCards = [
    {
      title: 'Regular Support',
      price: '45.18',
      discount: '10% OFF',
      isPopular: true,
      features: [
        'NDIS plan billing available',
        'Consistent cleaning team',
        'All cleaning supplies included',
        'Minimum 2 hours for weekly service'
      ],
      showBookNow: true
    },
    {
      title: 'One-Time Service',
      price: '50.20',
      features: [
        'NDIS plan billing available',
        'Flexible scheduling',
        'Professional NDIS cleaners',
        'All cleaning supplies included',
        'No commitment required',
        'Minimum 3 hours required'
      ],
      showBookNow: true
    }
  ]

  return (
    <section id="pricing-section" className="pt-8 md:pt-8 pb-12 md:pb-20">
      <div className="container mx-auto px-4">
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">
            NDIS Cleaning Services
          </h2>
          <h3 className="text-xl font-bold text-center mb-8 text-gray-600">
            NDIS Approved Rates
          </h3>

          {/* Main Pricing Grid */}
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {/* Regular Pricing Cards */}
            {regularPricingCards.map((plan) => (
              <div 
                key={plan.title}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.isPopular ? 'border-2 border-green-500' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="bg-green-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular Choice
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-[#1E3D8F]">${plan.price}</span>
                      <span className="text-gray-500">/hour</span>
                    </div>
                    {plan.discount && (
                      <div className="text-green-500 font-medium mt-1">{plan.discount}</div>
                    )}
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

            {/* Specialized Support Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-[#1E3D8F]">
              <div className="bg-[#1E3D8F] text-white text-center py-2 text-sm font-medium">
                Specialized Support
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Specialized Support</h3>
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[#1E3D8F]">$55.70</span>
                    <span className="text-gray-500">/hour</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Specialized cleaning support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Extra time and attention</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Trained support workers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Customized cleaning plan</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Regular progress reports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Minimum 3 hours required</span>
                  </li>
                </ul>
                <Link
                  href="tel:0450124086"
                  className="flex items-center justify-center gap-2 w-full bg-[#1E3D8F] text-white px-4 py-3 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call to Discuss</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Regular Clean Frequency Rates Section */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
              <div className="p-4 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Regular Clean Frequency Rates</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                  <div>
                    <div className="text-center">
                      <div className="font-medium text-base md:text-lg">Weekly</div>
                      <div className="text-2xl md:text-3xl font-bold text-[#1E3D8F] mt-1 md:mt-2">$45.18</div>
                      <div className="text-sm md:text-base text-gray-500">per hour</div>
                      <div className="text-sm md:text-base text-green-500 font-medium mt-1 md:mt-2">Save 10%</div>
                      <div className="text-xs md:text-base text-gray-600 mt-1 md:mt-2">Minimum 2 hours per visit</div>
                    </div>
                  </div>
                  <div className="md:border-x border-gray-200 md:px-8">
                    <div className="text-center">
                      <div className="font-medium text-base md:text-lg">Fortnightly</div>
                      <div className="text-2xl md:text-3xl font-bold text-[#1E3D8F] mt-1 md:mt-2">$47.19</div>
                      <div className="text-sm md:text-base text-gray-500">per hour</div>
                      <div className="text-sm md:text-base text-green-500 font-medium mt-1 md:mt-2">Save 6%</div>
                      <div className="text-xs md:text-base text-gray-600 mt-1 md:mt-2">Minimum 3 hours per visit</div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-center">
                      <div className="font-medium text-lg">Monthly</div>
                      <div className="text-3xl font-bold text-[#1E3D8F] mt-2">$48.69</div>
                      <div className="text-base text-gray-500">per hour</div>
                      <div className="text-base text-green-500 font-medium mt-2">Save 3%</div>
                      <div className="text-base text-gray-600 mt-2">Minimum 3 hours per visit</div>
                    </div>
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