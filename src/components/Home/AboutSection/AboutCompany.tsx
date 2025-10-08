'use client'
import Link from 'next/link'
import AnimatedCounter from '@/components/features/AnimatedCounter'
import GoogleIcon from '@/app/services/components/GoogleIcon'

export default function AboutCompany() {
  return (
    <>
    {/* About Company Section with Quick Enquiry Form */}
    <section className="bg-gray-50 py-12 md:py-20">
    <div className="container mx-auto px-4">

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
        {/* Left: Copy */}
        <div className="w-full lg:w-7/12">
          <div className="mb-6 md:mb-8">
            <span className="text-xs md:text-sm uppercase tracking-wider text-gray-600">ABOUT COMPANY</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-2 text-gray-900">
              Committed to Keeping Your Home Squeaky Clean
            </h2>
          </div>

          <div className="max-w-3xl">
            <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
              Cleaning Professionals delivers reliable, high‑quality residential and light commercial cleaning across Melbourne. We tailor every clean to your space and schedule, with friendly, police‑checked cleaners and full public liability insurance.
            </p>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
              From regular weekly/fortnightly cleans to deep once‑off, Airbnb turnarounds, NDIS supports and end‑of‑lease cleans, our methods are efficient, eco‑conscious and results‑driven—so you can enjoy a spotless space without the stress.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-gray-700 text-sm md:text-base">Police‑checked, insured local cleaners</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-gray-700 text-sm md:text-base">Eco‑friendly products on request</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-gray-700 text-sm md:text-base">Flexible scheduling; reliable reminders</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-gray-700 text-sm md:text-base">4.9★ average rating from Melbourne clients</span>
              </li>
            </ul>
<div className='mt-8 mb-6' >  
            <GoogleIcon />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link 
                href="/book" 
                className="inline-flex items-center justify-center bg-[#1E3D8F] text-white px-5 md:px-6 py-3 rounded-md text-sm md:text-base font-semibold hover:bg-[#1E3D8F]/90 transition-colors"
              >
                Get Instant Pricing
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center border-2 border-[#1E3D8F] text-[#1E3D8F] px-5 md:px-6 py-3 rounded-md text-sm md:text-base font-semibold hover:bg-[#1E3D8F] hover:text-white transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Stats */}
        <div className=" w-full lg:w-5/12 lg:self-center">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-8 bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6 md:p-8">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-[#1E3D8F]">
                <AnimatedCounter end={740} />
              </div>
              <div className="text-[11px] md:text-xs uppercase tracking-wider font-medium text-gray-600 mt-1">
                CLEAN HOMES
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-[#1E3D8F]">
                <AnimatedCounter end={35} />
              </div>
              <div className="text-[11px] md:text-xs uppercase tracking-wider font-medium text-gray-600 mt-1">
                PROFESSIONAL STAFFS
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-[#1E3D8F]">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <div className="text-[11px] md:text-xs uppercase tracking-wider font-medium text-gray-600 mt-1">
                HAPPY CLIENTS
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-[#1E3D8F]">
                <AnimatedCounter end={4} />
              </div>
              <div className="text-[11px] md:text-xs uppercase tracking-wider font-medium text-gray-600 mt-1">
                YEARS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  )
} 