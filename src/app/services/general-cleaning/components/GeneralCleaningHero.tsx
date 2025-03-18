'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, Star, Calendar, Phone } from 'lucide-react'

export default function GeneralCleaningHero() {
  return (
    <section className="relative min-h-[500px] md:min-h-[400px] py-12 md:py-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/general-cleaning.jpg"
          alt="General Cleaning"
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
              <span className="text-white text-sm font-medium">Satisfaction Guaranteed</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-white text-sm font-medium">Professional Cleaners</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
              <Calendar className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-white text-sm font-medium">Flexible Scheduling</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Professional General Cleaning<br />
            <span className="text-3xl md:text-4xl font-medium">Melbourne&apos;s Trusted Service</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">
            Experience the difference with our professional general cleaning service. 
            Tailored to your needs with flexible scheduling and guaranteed satisfaction.
          </p>

          {/* Price Indicators */}
          <div className="flex gap-4 mb-6 md:mb-8">
            {/* Weekly Clean Price */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="text-white/80 text-sm mb-1">Weekly Clean</div>
              <div className="text-4xl font-bold text-white">$76</div>
              <div className="text-white/80 text-sm">Per Clean</div>
            </div>

            {/* Once-off Clean Price */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="text-white/80 text-sm mb-1">Once-off Clean</div>
              <div className="text-4xl font-bold text-white">$90</div>
              <div className="text-white/80 text-sm">Per Clean</div>
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