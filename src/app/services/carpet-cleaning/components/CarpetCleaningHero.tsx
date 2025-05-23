'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, Calendar, Leaf, Shield, Phone } from 'lucide-react'

export default function CarpetCleaningHero() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] py-12 md:py-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/carpet-cleaning (1).png"
          alt="Professional Carpet Cleaning Services Melbourne"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-left">
          {/* Feature Badges */}
          <div className="flex flex-wrap gap-4 mb-6 md:mb-8 justify-center">
            <div className="hidden md:flex bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full items-center">
              <Leaf className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-white text-sm font-medium">Eco-Friendly Solutions</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-white text-sm font-medium">5-Star Rated Service</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <Calendar className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-white text-sm font-medium">Same Day Service</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <Shield className="w-5 h-5 text-white mr-2" />
              <span className="text-white text-sm font-medium">Fully Insured</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Carpet, Couch, Mattress & Rug Cleaning<br />
            <span className="text-3xl md:text-4xl font-medium">Melbourne&apos;s Trusted Carpet Cleaners</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Deep steam cleaning, stain removal, and sanitization for carpets, couches, mattresses, and rugs. Transparent pricing, eco-friendly products, and 100% satisfaction guarantee.
          </p>

          {/* Standard Prices Row */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="bg-white/20 border border-white/20 rounded-lg px-4 py-4 min-w-[140px] max-w-xs flex-1">
              <div className="text-white text-lg font-semibold mb-1">Carpet Room</div>
              <div className="text-2xl font-bold text-[#FFA500]">from $35</div>
              <div className="hidden md:block text-white/80 text-xs mt-1">Deep steam cleaning per room</div>
            </div>
            <div className="bg-white/20 border border-white/20 rounded-lg px-4 py-4 min-w-[140px] max-w-xs flex-1">
              <div className="text-white text-lg font-semibold mb-1">Couch</div>
              <div className="text-2xl font-bold text-[#FFA500]">from $70</div>
              <div className="hidden md:block text-white/80 text-xs mt-1">2-seater sofa or larger, stain & odour removal</div>
            </div>
            <div className="bg-white/20 border border-white/20 rounded-lg px-4 py-4 min-w-[140px] max-w-xs flex-1">
              <div className="text-white text-lg font-semibold mb-1">Mattress</div>
              <div className="text-2xl font-bold text-[#FFA500]">from $40</div>
              <div className="hidden md:block text-white/80 text-xs mt-1">Sanitization & deep clean, all sizes</div>
            </div>
            <div className="bg-white/20 border border-white/20 rounded-lg px-4 py-4 min-w-[140px] max-w-xs flex-1">
              <div className="text-white text-lg font-semibold mb-1">Rug</div>
              <div className="text-2xl font-bold text-[#FFA500]">from $35</div>
              <div className="hidden md:block text-white/80 text-xs mt-1">Professional rug cleaning, all types</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/get-quote"
              className="inline-flex items-center justify-center bg-[#FFA500] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all group text-lg"
            >
              Request a Quote
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