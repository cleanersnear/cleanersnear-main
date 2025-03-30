'use client'

import { Check } from 'lucide-react'
import BookNowButton from '../../components/BookNowButton'
import { ServiceBase } from '@/app/quick-book/types/service'
import { useEffect, useRef, useState } from 'react'

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
  type: 'move-in' | 'move-out'
}

export default function PricingSection({ service }: PricingSectionProps) {
  const [activeTab, setActiveTab] = useState('move-in')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="pricing-section" className="pt-8 md:pt-8 pb-12 md:pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Service Type Tabs */}
        <div 
          ref={tabsRef} 
          className={`flex mb-8 border-b border-gray-200 w-full transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={() => setActiveTab('move-in')}
            className={`flex-1 text-center py-3 border-b-2 transition-all duration-300 text-base md:text-lg ${
              activeTab === 'move-in' 
                ? 'border-blue-500 text-blue-500 relative' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            } font-semibold ${
              isVisible && activeTab === 'move-in' 
                ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:animate-pulse' 
                : ''
            }`}
          >
            Move In Service
          </button>
          <button
            onClick={() => setActiveTab('move-out')}
            className={`flex-1 text-center py-3 border-b-2 transition-all duration-300 text-base md:text-lg ${
              activeTab === 'move-out' 
                ? 'border-blue-500 text-blue-500' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            } font-semibold`}
          >
            Move Out Service
          </button>
        </div>

        {/* Pricing Content Container */}
        <div className="relative">
          {/* Move In Service Section */}
          <div 
            className={`w-full transition-all duration-500 ease-in-out absolute ${
              activeTab === 'move-in' 
                ? 'translate-x-0 opacity-100 relative' 
                : 'translate-x-full opacity-0 absolute'
            }`}
          >
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Move In Cleaning Service
              </h2>
              <h3 className="text-xl font-bold text-gray-600 mb-4">
                Start Fresh in Your New Home
              </h3>
              <p className="text-gray-600 px-4 hidden md:block">
                Professional cleaning service to ensure your new home is perfectly clean and ready for you to move in.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {([
                {
                  title: 'Standard Move In',
                  price: '48.50',
                  priceLabel: '/hour',
                  description: 'Minimum 3 hours',
                  type: 'move-in',
                  features: [
                    'Professional cleaning team',
                    'All cleaning supplies included',
                    'Thorough kitchen cleaning',
                    'Complete bathroom sanitization',
                    'Perfect for apartments'
                  ]
                },
                {
                  title: '4-Hour Move In',
                  price: '194',
                  priceLabel: 'total',
                  isPopular: true,
                  type: 'move-in',
                  description: 'Most Popular',
                  features: [
                    'Professional cleaning team',
                    'All cleaning supplies included',
                    'Deep clean all rooms',
                    'Inside cabinet cleaning',
                    'Ideal for 1-2 bedroom homes'
                  ]
                },
                {
                  title: '6-Hour Move In',
                  price: '291',
                  priceLabel: 'total',
                  type: 'move-in',
                  description: 'Best for larger homes',
                  features: [
                    'Professional cleaning team',
                    'All cleaning supplies included',
                    'Comprehensive cleaning',
                    'Perfect for 3+ bedrooms',
                    'Extra attention to details'
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

          {/* Move Out Service Section */}
          <div 
            className={`w-full transition-all duration-500 ease-in-out absolute ${
              activeTab === 'move-out' 
                ? 'translate-x-0 opacity-100 relative' 
                : '-translate-x-full opacity-0 absolute'
            }`}
          >
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Move Out Cleaning Service
              </h2>
              <h3 className="text-xl font-bold text-gray-600 mb-4">
                Leave Your Property Spotless
              </h3>
              <p className="text-gray-600 px-4 hidden md:block">
                End of lease cleaning service with bond back guarantee to ensure you get your deposit back.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {([
                {
                  title: 'Standard Move Out',
                  price: '63.05',
                  priceLabel: '/hour',
                  description: 'Minimum 3 hours',
                  type: 'move-out',
                  features: [
                    'Bond back guarantee',
                    'All cleaning supplies included',
                    'Detailed kitchen cleaning',
                    'Complete bathroom sanitization',
                    'Perfect for apartments'
                  ]
                },
                {
                  title: '4-Hour Move Out',
                  price: '252.20',
                  priceLabel: 'total',
                  isPopular: true,
                  type: 'move-out',
                  description: 'Most Popular',
                  features: [
                    'Bond back guarantee',
                    'All cleaning supplies included',
                    'Deep clean all rooms',
                    'Inside cabinet cleaning',
                    'Ideal for 1-2 bedroom homes'
                  ]
                },
                {
                  title: '6-Hour Move Out',
                  price: '378.30',
                  priceLabel: 'total',
                  type: 'move-out',
                  description: 'Best for larger homes',
                  features: [
                    'Bond back guarantee',
                    'All cleaning supplies included',
                    'Comprehensive cleaning',
                    'Perfect for 3+ bedrooms',
                    'Extra attention to details'
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
      </div>
    </section>
  )
} 