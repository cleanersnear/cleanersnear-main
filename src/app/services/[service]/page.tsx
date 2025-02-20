'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { services, Service } from '@/data/services'
import CostCalculator from '@/components/features/CostCalculator'
import { useBookingStore } from '@/app/quick-book/store/bookingStore'
import type { ServiceType } from '@/app/quick-book/types'

export default function ServicePage() {
  const params = useParams()
  const [service, setService] = useState<Service | null>(null)
  const setBookingService = useBookingStore(state => state.setService)

  useEffect(() => {
    const serviceId = params?.service as string
    const foundService = services.find(s => s.id === serviceId)
    setService(foundService || null)
  }, [params])

  const handleBookNow = () => {
    if (service) {
      setBookingService({
        id: service.id as ServiceType,
        title: service.title,
        category: service.isPopular ? 'popular' : 'other',
        type: service.id as ServiceType
      })
    }
  }

  if (!service) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 mt-32">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Service not found</h1>
            <Link 
              href="/services" 
              className="text-[#1E3D8F] hover:text-[#FFA500] mt-4 inline-block"
            >
              View All Services
            </Link>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="mt-32">
        {/* Hero Section */}
        <div className="relative h-[400px]">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {service.title}
                </h1>
                <p className="text-xl text-white/90">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {service.features && (
                  <>
                <h2 className="text-3xl font-bold mb-8">What&apos;s Included</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                  </>
                )}

                {service.includes && (
                <div className="mt-12">
                  <h2 className="text-3xl font-bold mb-8">Service Benefits</h2>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-center mb-4 last:mb-0">
                        <Check className="text-green-500 mr-2" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                )}

                {service.faqs && (
                <div className="mt-12">
                  <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {service.faqs.map((faq) => (
                      <div key={faq.question} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32">
                  <h3 className="text-2xl font-bold mb-4">Book This Service</h3>
                  <div className="mb-6">
                    <div className="text-sm text-gray-500">Starting from</div>
                    <div className="text-3xl font-bold text-[#1E3D8F]">{service.price}</div>
                  </div>
                  <Link
                    href="/quick-book/location"
                    onClick={handleBookNow}
                    className="block w-full bg-[#1E3D8F] text-white text-center py-3 rounded-md hover:bg-opacity-90 transition-all mb-4"
                  >
                    Book Now
                  </Link>
                  <Link
                    href="/get-quote"
                    className="block w-full border-2 border-[#1E3D8F] text-[#1E3D8F] text-center py-3 rounded-md hover:bg-[#1E3D8F] hover:text-white transition-all"
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Calculator Section */}
        <div className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Calculate Your Cost</h2>
              <p className="text-gray-600">
                Get an instant estimate for your cleaning service
              </p>
            </div>
            <CostCalculator />
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 