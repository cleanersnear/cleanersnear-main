'use client'
import Image from 'next/image'

export default function Foundersmsg() {
  return (
    <section aria-label="Founder message" className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Left copy (1/4) */}
          <div className="md:col-span-3">
          <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-[#1E3D8F]">Our Promise</p>
          <h2 className="mt-2 text-2xl md:text-4xl font-bold text-gray-900">A message from our founder</h2>

          <div className="mt-6 md:mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 md:p-6">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              As life gets busier, finding time to clean can be tough. We built Cleaning Professionals to make premium
              cleaning simple, dependable and friendly. Our vetted team shows up on time, treats your home with care
              and leaves it truly spotless — every single visit.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1E3D8F] text-white flex items-center justify-center text-sm md:text-base font-semibold">
              AD
            </div>
            <div>
              <p className="text-gray-900 text-base md:text-lg font-semibold">Ashish D</p>
              <p className="text-gray-600 text-xs md:text-sm">Founder, Cleaning Professionals</p>
            </div>
          </div>
          </div>
          {/* Right image (3/4) */}
          <div className="md:col-span-9">
            <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <Image
                src="/Professional Cleaner in Modern Kitchen.png"
                alt="Professional cleaner in modern kitchen"
                width={1536}
                height={1024}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


