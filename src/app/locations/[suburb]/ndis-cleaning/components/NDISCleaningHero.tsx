'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, Calendar, Phone, Check } from 'lucide-react'

interface NDISCleaningHeroProps {
  suburb: string;
}

export default function NDISCleaningHero({ suburb = 'melbourne' }: NDISCleaningHeroProps) {
  const capitalizedSuburb = (suburb || 'melbourne').split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  return (
    <section className="relative min-h-[500px] md:min-h-[400px] py-12 md:py-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/ndis-cleaning.jpg"
          alt={`NDIS Cleaning Services ${capitalizedSuburb}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl">
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 mb-6 md:mb-8">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <Image
                src="/logos/National_Disability_Insurance_Scheme_logo.svg"
                alt="NDIS Logo"
                width={50}
                height={30}
                className="mr-2"
              />
              <span className="text-white text-sm font-medium">NDIS Registered Provider</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-white text-sm font-medium">Specialized NDIS Cleaners</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <Calendar className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-white text-sm font-medium">Flexible Support Hours</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            NDIS Cleaning Services<br />
            <span className="text-3xl md:text-4xl font-medium">in {capitalizedSuburb}</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">
            Professional cleaning services tailored for NDIS participants in {capitalizedSuburb}. 
            Experienced and trained cleaners providing support to maintain a clean and healthy living environment.
          </p>

          {/* Price Indicators */}
          <div className="grid md:grid-cols-2 gap-4 mb-6 md:mb-8">
            {/* Once-off Clean Price */}
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg border border-white/20">
              <div className="flex justify-between items-center mb-3">
                <div className="text-white text-lg font-semibold">Once-off Clean</div>
                <div className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">No Commitment</div>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <div className="text-4xl font-bold text-white">$50.20</div>
                <div className="text-white/80 text-sm">per hour</div>
              </div>
              <div className="text-white/80 text-sm mb-4">Single cleaning service without any commitment</div>
              <ul className="space-y-2">
                <li className="flex items-center text-white/90 text-sm">
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  <span>Flexible scheduling</span>
                </li>
                <li className="flex items-center text-white/90 text-sm">
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  <span>All cleaning supplies included</span>
                </li>
              </ul>
            </div>

            {/* Regular Clean Price */}
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-lg border border-white/20 relative">
              {/* Best Value Label */}
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-sm px-4 py-1 rounded ">
                Best Value
              </div>
              <div className="flex justify-between items-center mb-3">
                <div className="text-white text-lg font-semibold">Regular Clean</div>
                <div className="bg-white-500/50 border border-green-500 text-green-400 text-sm px-3 py-1 rounded-full">Save 10%</div>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <div className="text-4xl font-bold text-white">$45.18</div>
                <div className="text-white/80 text-sm">per hour</div>
              </div>
              <div className="text-white/80 text-sm mb-4">Scheduled cleaning with NDIS plan support</div>
              <ul className="space-y-2">
                <li className="flex items-center text-white/90 text-sm">
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  <span>Regular scheduled cleaning</span>
                </li>
                <li className="flex items-center text-white/90 text-sm">
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  <span>NDIS plan billing</span>
                </li>
                <li className="flex items-center text-white/90 text-sm">
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                  <span>Consistent cleaning team</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/get-quote"
              className="inline-flex items-center justify-center bg-[#FFA500] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all group text-lg"
            >
              Request NDIS Quote
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="tel:0450124086"
              className="inline-flex items-center justify-center bg-white text-[#1E3D8F] px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all text-lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              0450 124 086
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 