'use client'

import Link from 'next/link'

export default function Whychooseus() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <div className="mb-8">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
                <span className="text-xs md:text-sm uppercase tracking-wider text-center md:text-left">
                  WHY CHOOSE US
                </span>
                <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
              </div>
              <h2 className="text-xl md:text-4xl font-bold text-center md:text-left mb-12">
                Why Choose Cleaning<br className="hidden md:block" />
                Professionals?
              </h2>
            </div>
            <p className="text-gray-600 mb-8">
              At Cleaning Professionals Australia, we believe that a clean space is essential for both comfort and well-being. With years of experience serving homes and businesses across Australia, we have built a reputation for excellence, reliability, and a commitment to customer satisfaction. Our skilled team of cleaning experts uses top-of-the-line equipment and eco-friendly products to deliver the best possible results for our clients.
            </p>
            <Link href="/about" className="text-[#1E3D8F] hover:underline">
              Read More About Cleaning Professionals
            </Link>
          </div>

          {/* Right Content - Features */}
          <div className="lg:w-1/2">
            <div className="grid gap-8 mt-[52px]">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Experienced and Trained Cleaners:</h3>
                  <p className="text-gray-600">All our professionals are thoroughly vetted and highly trained, ensuring the highest standards of cleanliness.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Flexible Scheduling:</h3>
                  <p className="text-gray-600">We offer flexible cleaning schedules, allowing you to book services at times that suit you.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6c0 1.1.9 2 2 2h14a2 2 0 002-2v0a2 2 0 00-2-2H5a2 2 0 00-2 2v0zm3 6h14M6 18h14" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Eco-Friendly Solutions:</h3>
                  <p className="text-gray-600">We prioritize using environmentally friendly products that are safe for you, your family, and the environment.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Comprehensive Services:</h3>
                  <p className="text-gray-600">We provide a wide array of cleaning services for residential, commercial, and specialized needs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


