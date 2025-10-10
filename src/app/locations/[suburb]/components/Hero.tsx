'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react'

export default function Hero() {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '1300 886 119'
  const phoneHref = `tel:${phone.replace(/\s+/g, '')}`
  return (
    <section className="py-16 md:py-20 bg-[#FBFDFF]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3D8F] mb-3 sm:mb-4">
              Cleaning Service in Melbourne
            </h1>
            <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl">
              Book trusted cleaners for regular, deep or end‑of‑lease cleaning.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {[
                'Regular house cleaning',
                'Deep cleaning & spring cleans',
                'End of lease & bond cleans',
                'NDIS & commercial cleaning',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-800 text-sm sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#1E3D8F] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center bg-[#1E3D8F] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all group"
              >
                Get instant quote
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center border border-[#1E3D8F] text-[#1E3D8F] px-8 py-4 rounded-lg font-semibold hover:bg-[#1E3D8F]/10 transition-all"
              >
                <Phone className="mr-2 h-5 w-5" /> Call {phone}
              </a>
            </div>
            <div className="mt-4 flex items-center gap-2 text-gray-700">
              <Image src="/icons/google-icon.png" alt="Google icon" width={20} height={20} />
              <span className="text-sm">4.7</span>
              <div className="flex">
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-gray-300">★</span>
              </div>
              <span className="text-sm text-gray-500">(2,76)</span>
            </div>
        
          </div>

          {/* Right: Image card */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="relative aspect-[16/10] md:aspect-[16/9]">
                <Image
                  src={'/images/services-hero.jpg'}
                  alt="Cleaning professional wiping bench"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


