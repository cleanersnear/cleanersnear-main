'use client'

export default function HowItWorks() {
  return (
    <>
      {/* Trust Badges - Now at top and hidden on mobile */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 py-6">
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-2 text-[#1E3D8F]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-base text-gray-800 font-medium">Insured & Bonded</span>
            </div>
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-2 text-[#1E3D8F]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="text-base text-gray-800 font-medium">Expert Cleaners</span>
            </div>
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-2 text-[#1E3D8F]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span className="text-base text-gray-800 font-medium">Satisfaction Guaranteed</span>
            </div>
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-2 text-[#1E3D8F]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              <span className="text-base text-gray-800 font-medium">Flexible Scheduling</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main How It Works section */}
      <section className="bg-[#1E3D8F] text-white py-12 md:py-20" aria-label="Booking Process">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold">
              Book Your Professional Clean<br />
              in 3 Easy Steps
            </h2>
            <p className="mt-3 md:mt-4 text-sm md:text-base text-white/80 max-w-2xl mx-auto">
              Experience Melbourne&apos;s most reliable cleaning service with our straightforward booking process. 
              Professional cleaners at your doorstep in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg 
                  className="w-6 h-6 md:w-8 md:h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
                  />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Select Your Service</h3>
              <p className="text-sm md:text-base text-white/80">
                Choose from our comprehensive range of professional cleaning services - 
                End of Lease, NDIS, Regular House Cleaning, or Commercial Cleaning. 
                All backed by our satisfaction guarantee.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg 
                  className="w-6 h-6 md:w-8 md:h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Schedule Your Clean</h3>
              <p className="text-sm md:text-base text-white/80">
                Book online 24/7 or call us for flexible scheduling. Same-day service available. 
                Our professional cleaners work around your schedule, including weekends and holidays.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <svg 
                  className="w-6 h-6 md:w-8 md:h-8" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Relax & We&apos;ll Handle The Rest</h3>
              <p className="text-sm md:text-base text-white/80">
                Our police-checked, insured cleaning professionals deliver exceptional results. 
                Enjoy peace of mind with our 100% satisfaction guarantee on every clean.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 