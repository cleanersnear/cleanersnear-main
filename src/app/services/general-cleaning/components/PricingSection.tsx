'use client'

import { Check, Clock } from 'lucide-react'
import BookNowButton from '../../components/BookNowButton'
import { ServiceBase } from '@/app/quick-book/types/service'

interface PricingSectionProps {
  service: ServiceBase
}

export default function PricingSection({ service }: PricingSectionProps) {
  
  return (
    <section id="pricing-section" className="pt-8 md:pt-8 pb-12 md:pb-20">
      <div className="container mx-auto px-4">
        {/* Hourly Rates Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">
            General House Cleaning
          </h2>
          <h3 className="text-xl font-bold text-center mb-8 text-gray-600">
            Hourly Rates
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Weekly Service',
                price: '38',
                discount: '15% OFF',
                isPopular: true,
                features: [
                  'All cleaning products included',
                  'Professional cleaning equipment',
                  'Trained & experienced cleaners',
                  'Regular scheduled cleaning'
                ]
              },
              {
                title: 'Fortnightly Service',
                price: '43',
                discount: '5% OFF',
                features: [
                  'All cleaning products included',
                  'Professional cleaning equipment',
                  'Trained & experienced cleaners',
                  'Flexible scheduling',
                  'Weekend availability'

                ]
              },
              {
                title: 'Monthly / One-Time',
                price: '45',
                features: [
                  'All cleaning products included',
                  'Professional cleaning equipment',
                  'Trained & experienced cleaners',                  
                  'Flexible scheduling',
                  'Weekend availability',
                  'No commitment required'
                ]
              }
            ].map((plan) => (
              <div 
                key={plan.title}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  plan.isPopular ? 'border-2 border-blue-500' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                    Popular Choice
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
          </div>
        </div>

        {/* Flat Rates Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">
            Flat-Rates for a Complete Home Cleaning
          </h2>
          <h3 className="text-xl text-center mb-4 text-gray-600">
            One-Time House Cleaning, Fixed Rates for a Full Home Clean
          </h3>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Our one-time cleaning service is perfect for those who need a thorough clean without any ongoing commitment. 
            Prices are based on the size of your home and include all cleaning supplies and equipment.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: '1 Bedroom/Studio Apartment',
                description: 'Perfect for small homes and studio apartments',
                price: '178',
                duration: '2-4 hours',
                features: [
                  'Complete home cleaning',
                  'All cleaning supplies included',
                  'Professional equipment used',
                  'Trained & experienced cleaners',
                  'Detailed cleaning checklist'
                ]
              },
              {
                title: '2 Bedrooms',
                description: 'Ideal for small to medium-sized homes',
                price: '212',
                duration: '3-4 hours',
                features: [
                  'Complete home cleaning',
                  'All cleaning supplies included',
                  'Professional equipment used',
                  'Trained & experienced cleaners',
                  'Detailed cleaning checklist'
                ]
              },
              {
                title: '3 Bedrooms',
                description: 'Perfect for medium to large homes',
                price: '309',
                duration: '4-6 hours',
                features: [
                  'Complete home cleaning',
                  'All cleaning supplies included',
                  'Professional equipment used',
                  'Trained & experienced cleaners',
                  'Detailed cleaning checklist'
                ]
              },
              {
                title: '4 Bedrooms',
                description: 'Ideal for larger family homes',
                price: '395',
                duration: '5-8 hours',
                features: [
                  'Complete home cleaning',
                  'All cleaning supplies included',
                  'Professional equipment used',
                  'Trained & experienced cleaners',
                  'Detailed cleaning checklist'
                ]
              }
            ].map((plan) => (
              <div 
                key={plan.title}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{plan.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <div className="text-sm text-gray-500">Starting from</div>
                    <div className="text-3xl font-bold text-[#1E3D8F]">${plan.price}</div>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>Duration: {plan.duration}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
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