'use client'

import Image from 'next/image'

export default function HowItWorks() {
  return (
    <section className="bg-white py-2 md:py-10" aria-label="How it works">
      <div className="container mx-auto px-4">
        <div className=" text-center mb-12 md:mb-16">
          <h3 className="text-xs md:text-sm font-semibold tracking-wider uppercase text-[#1E3D8F]">Book online in minutes</h3>
          <h2 className="mt-2 text-2xl md:text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Choose your service, pick a time and confirm — that’s it. Our vetted team
            arrives on schedule with all essentials, keeps you updated, and leaves your
            home spotless. Simple, transparent and reliable from start to finish.
          </p>
        </div>

        <div className=" grid md:grid-cols-12 gap-8 md:gap-12 items-start max-w-6xl mx-auto">
          {/* Left rail steps */}
          <div className="md:col-span-6">
            <ol className="space-y-6">
              {[
                { n: 1, t: 'Choose your service', d: 'Regular, Once‑off, End of Lease, NDIS or Commercial.' },
                { n: 2, t: 'Enter details', d: 'Address, access and preferred day/time.' },
                { n: 3, t: 'Instant pricing', d: 'Transparent quote with any extras you select.' },
                { n: 4, t: 'We clean — you relax', d: 'Police‑checked, insured cleaners. Satisfaction guaranteed.' },
              ].map((s) => (
                <li key={s.n} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1E3D8F] text-white flex items-center justify-center font-semibold shadow">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">{s.t}</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right content with image (smaller) */}
          <div className="md:col-span-6">
            <div className="relative rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white md:max-w-md md:ml-auto">
              <Image
                src="/images/about-hero.jpg"
                alt="Booking flow preview"
                width={900}
                height={520}
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


