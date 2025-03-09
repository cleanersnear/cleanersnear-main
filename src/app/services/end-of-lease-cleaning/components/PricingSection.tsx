'use client'

import Link from 'next/link'
import { Check, ChevronDown, Phone} from 'lucide-react'
import { useState } from 'react'
import BookNowButton from '../../components/BookNowButton'
import { ServiceBase } from '@/app/quick-book/types/service'

interface PricingSectionProps {
  service: ServiceBase
}

export default function PricingSection({ service }: PricingSectionProps) {
  const [showCallButtons, setShowCallButtons] = useState<{ [key: string]: boolean }>({})
  
  return (
    <section id="pricing-section" className="pt-8 md:pt-8 pb-12 md:pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          End of Lease Cleaning Packages
        </h1>
        <h2 className="text-1xl font-bold text-center mb-4">
          Professional Bond Cleaning Services
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Our end of lease cleaning service is designed to help you get your bond back. We follow a comprehensive checklist that meets real estate standards and includes all the necessary cleaning tasks required by property managers.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {[
            {
              title: '1 Bedroom/Studio Apartment',
              description: 'Perfect for small rentals and studio apartments',
              priceRange: '260 - 315',
              features: [
                'Bond back guarantee',
                'Real estate standard cleaning',
                'Professional equipment used',
                'All cleaning supplies included',
                'Detailed cleaning checklist'
              ],
              buttonText: 'Book Now',
              callText: 'Need a custom quote? Call us for the best price'
            },
            {
              title: '2 Bedrooms',
              description: 'Ideal for small to medium rental properties',
              priceRange: '287 - 408',
              features: [
                'Bond back guarantee',
                'Real estate standard cleaning',
                'Professional equipment used',
                'All cleaning supplies included',
                'Detailed cleaning checklist'
              ],
              buttonText: 'Book Now',
              callText: 'Need a custom quote? Call us for the best price'
            },
            {
              title: '3 Bedrooms',
              description: 'Perfect for medium to large rental homes',
              priceRange: '359 - 650',
              features: [
                'Bond back guarantee',
                'Real estate standard cleaning',
                'Professional equipment used',
                'All cleaning supplies included',
                'Detailed cleaning checklist'
              ],
              buttonText: 'Book Now'
            },
            {
              title: '4 Bedrooms',
              description: 'Ideal for larger rental properties',
              priceRange: '545 - 890',
              features: [
                'Bond back guarantee',
                'Real estate standard cleaning',
                'Professional equipment used',
                'All cleaning supplies included',
                'Detailed cleaning checklist'
              ],
              buttonText: 'Book Now'
            }
          ].map((rate) => {
            return (
              <div 
                key={rate.title}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
              >
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold mb-2">{rate.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">{rate.description}</p>
                    <div className="mb-6">
                      <div className="text-sm text-gray-500">Price Range</div>
                      <div className="text-3xl font-bold">${rate.priceRange}</div>
                      <button 
                        onClick={() => setShowCallButtons(prev => ({
                          ...prev,
                          [rate.title]: !prev[rate.title]
                        }))}
                        className="text-sm text-blue-600 hover:text-blue-700 mt-2 flex items-center gap-1 transition-colors"
                      >
                        Not sure about the price? 
                        <ChevronDown 
                          size={16} 
                          className={`transform transition-transform duration-200 ${
                            showCallButtons[rate.title] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {rate.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <BookNowButton service={service} />
                    <div className={`transform transition-all duration-200 overflow-hidden ${
                      showCallButtons[rate.title] ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <Link
                        href="tel:0450124086"
                        className="mx-auto w-full bg-green-500 text-white text-center py-3 rounded-lg hover:bg-opacity-90 transition-all text-base gap-2 flex items-center justify-center font-medium"
                      >
                        <Phone size={18} />
                        Call for Best Price
                      </Link>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        We can provide a custom quote based on your specific needs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
} 