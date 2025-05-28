'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, Star, Calendar, Phone } from 'lucide-react'

interface DeepCleaningHeroProps {
  suburb: string;
}

export default function DeepCleaningHero({ suburb = 'melbourne' }: DeepCleaningHeroProps) {
  // Capitalize suburb name with fallback
  const capitalizedSuburb = (suburb || 'melbourne').split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  return (
    <section className="relative min-h-[500px] md:min-h-[400px] py-12 md:py-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/deep-cleaning.jpg"
          alt={`Spring & Deep Cleaning ${capitalizedSuburb}`}
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
              <Shield className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-white text-sm font-medium">100% Satisfaction Guaranteed</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-white text-sm font-medium">Expert Spring & Deep Clean Specialists</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <Calendar className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-white text-sm font-medium">Professional Equipment</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Spring Cleaning {capitalizedSuburb}<br />
            <span className="text-3xl md:text-4xl font-medium">Thorough & Detailed Service</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">
            Transform your space with our comprehensive spring and deep cleaning service in {capitalizedSuburb}. 
            Professional-grade equipment and expert techniques for a thorough clean.
          </p>

          {/* Price Indicators */}
          <div className="flex gap-4 mb-6 md:mb-8">
            {/* Standard Spring & Deep Clean */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="text-white/80 text-sm mb-1">3 Hours Spring & Deep Clean</div>
              <div className="text-4xl font-bold text-white">$159</div>
              <div className="text-white/80 text-sm">Professional Service</div>
            </div>

            {/* Premium Spring & Deep Clean */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="text-white/80 text-sm mb-1">6 Hours Spring & Deep Clean</div>
              <div className="text-4xl font-bold text-white">$318</div>
              <div className="text-white/80 text-sm">Comprehensive Clean</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/get-quote"
              className="inline-flex items-center justify-center bg-[#FFA500] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all group text-lg"
            >
              Request Quote
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
