'use client'

import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import Link from 'next/link'
import { services } from '@/data/services'
import { ArrowRight, Check } from 'lucide-react'
import { useBookingStore } from '@/app/quick-book/store/bookingStore'
import type { ServiceType } from '@/app/quick-book/types'

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="mt-32">
        {/* Hero Section */}
        <section className="relative py-20">
          {/* Background image and gradient overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/images/services-hero.jpg')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E3D8F]/90 via-[#1E3D8F]/70 to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[1px] bg-white/60"></div>
                <span className="text-sm uppercase tracking-wider text-white/80">OUR SERVICES</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Professionals cleaning<br />
                services for your homes<br />
                and offices
              </h1>
              <p className="text-lg text-white/90 mb-8 max-w-2xl">
                We are a professionals cleaning company and providing leading commercial and residential cleaning solutions in the Australia. When it comes to maintaining the cleanliness of your property, you deserve a service that stands out for its quality, reliability, and professionalism.
              </p>

              {/* Key Features - Hidden on mobile */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3 text-white bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="font-medium">Experienced Staff</span>
                </div>
                <div className="flex items-center gap-3 text-white bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="font-medium">Guaranteed Results</span>
                </div>
                <div className="flex items-center gap-3 text-white bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="font-medium">Affordable Rates</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/get-quote"
                  className="inline-flex items-center justify-center bg-[#FFA500] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all group"
                >
                  Get a Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-[#1E3D8F] px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Title Section */}
        <div className="py-16 text-center">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gray-300"></div>
              <span className="text-sm uppercase tracking-wider text-gray-600">OUR SERVICES</span>
              <div className="w-12 h-[1px] bg-gray-300"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D8F]">
              We are providing all kind<br />
              of cleaning services
            </h2>
          </div>
        </div>

        {/* Services Grid Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {service.isPopular && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Popular
                    </div>
                  )}
                  <div className="relative h-64">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[#1E3D8F] font-bold text-xl">
                          {service.price}
                        </span>
                        <Link 
                          href={`/services/${service.id}`}
                          className="text-[#1E3D8F] hover:text-opacity-80 transition-all duration-200"
                        >
                          Learn More
                        </Link>
                      </div>
                      <div className="pt-3 border-t">
                        <Link 
                          href="/quick-book/location"
                          onClick={() => {
                            useBookingStore.getState().setService({
                              id: service.id as ServiceType,
                              title: service.title,
                              category: service.isPopular ? 'popular' : 'other',
                              type: service.id as ServiceType
                            });
                          }}
                          className="block w-full text-center bg-[#1E3D8F] text-white py-3 rounded-md hover:bg-opacity-90 transition-all duration-200"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 