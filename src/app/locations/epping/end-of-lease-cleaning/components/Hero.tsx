'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, Star, Calendar, Phone } from 'lucide-react'

interface EOLHeroProps {
  suburb: string;
}

export default function EOLHero({ suburb }: EOLHeroProps) {
  // Capitalize suburb name
  const capitalizedSuburb = suburb.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] py-12 md:py-16 overflow-hidden">
      {/* Background Image - 100% Visible */}
      <div className="absolute inset-0">
        <Image
          src="/images/homepage/Cleaning Professionals Desktop Hero.png"
          alt={`Professional End of Lease Cleaning ${capitalizedSuburb}`}
          fill
          className="object-cover object-center"
          priority
          quality={95}
        />
        {/* Professional overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-slate-900/20 to-transparent"></div>
      </div>

      {/* Hero Content Container - Left Side Professional Container */}
      <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-20">
        <div className="max-w-xl">
          {/* Professional Container with Clean Design */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-600/50 p-6 md:p-8">
            
            {/* Main Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
              End of Lease Cleaning<br />
              <span className="text-orange-400">{capitalizedSuburb}, VIC</span>
            </h1>
            
            {/* Professional Bond Back Guarantee */}
            <div className="mb-5 md:mb-6">
              <div className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-full shadow-lg">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-base font-semibold">100% Bond Back Guarantee</span>
              </div>
            </div>
            
            {/* Sub-headline */}
            <p className="text-base md:text-lg text-slate-200 mb-5 md:mb-6 max-w-2xl leading-relaxed font-medium">
              Get your full bond back with our professional cleaning service. Real estate approved, same-day available.
            </p>

            {/* Updated Trust Indicators with Professional Colors */}
            <div className="flex flex-wrap gap-3 mb-5 md:mb-6">
              <div className="flex items-center bg-slate-700/50 backdrop-blur-sm rounded-full px-3 py-2 border border-slate-500/50">
                <Shield className="w-3 h-3 mr-2 text-blue-400" />
                <span className="text-slate-200 text-xs font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center bg-slate-700/50 backdrop-blur-sm rounded-full px-3 py-2 border border-slate-500/50">
                <Star className="w-3 h-3 mr-2 text-amber-400" />
                <span className="text-slate-200 text-xs font-medium">Real Estate Approved</span>
              </div>
              <div className="flex items-center bg-slate-700/50 backdrop-blur-sm rounded-full px-3 py-2 border border-slate-500/50">
                <Calendar className="w-3 h-3 mr-2 text-green-400" />
                <span className="text-slate-200 text-xs font-medium">Same Day Service</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons and Trust Signal - Outside Container Below */}
          <div className="mt-6 md:mt-8">
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-5">
              <Link 
                href="/quick-book/location"
                className="inline-flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 group text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105 border border-blue-500/30"
              >
                <span className="flex items-center">
                  🚀 Get Instant Pricing
                  <ArrowRight className="ml-2 h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-xs font-normal opacity-90 mt-1">Book in 60 seconds</span>
              </Link>
              
              <Link
                href="tel:0450124086"
                className="inline-flex flex-col items-center justify-center bg-black/100 backdrop-blur-md text-white border-2 border-white/30 px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center">
                  <Phone className="mr-2 h-3 w-3" />
                  0450 124 086
                </span>
                <span className="text-xs font-normal opacity-90 mt-1">Available 7 days</span>
              </Link>
            </div>

            {/* Additional Trust Signal with Sharp Stars - Black Text */}
            <div className="flex items-center text-black">
              <div className="flex text-amber-400 mr-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-xs md:text-sm font-medium">Trusted by 100+ customers in {capitalizedSuburb}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}