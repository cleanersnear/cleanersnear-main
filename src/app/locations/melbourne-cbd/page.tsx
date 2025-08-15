import Header from '@/components/layout/Header'
import Link from 'next/link'
import Image from 'next/image'
import BeforeAfterGallery from '@/app/locations/[suburb]/components/BeforeAfterGallery'
import HomeLatestBlogs from '@/components/Home/HomeBlogs/HomeLatestBlogs'
import SubscriptionSection from '@/components/features/SubscriptionSection'
import Footer from '@/components/layout/Footer'
import Testimonials from './components/Testimonials'

export default function MelbourneCBDLocationPage() {
  return (
    <>
      <Header />
      <main>
        {/* Static Hero Section */}
        <div className="relative bg-gray-50">
          <section className="relative h-auto md:h-[800px]">
            {/* Background image for both mobile and desktop */}
            <div className="absolute inset-0">
              {/* Mobile image - shown on small screens */}
              <Image
                src="/images/homepage/Cleaning Professionals mobile Hero.png"
                alt="Professional Melbourne Cleaning Services in Melbourne CBD"
                fill
                className="object-cover object-center brightness-100 sm:brightness-[0.85] md:hidden"
                priority
              />
              {/* Desktop image - shown on medium screens and up */}
              <Image
                src="/images/homepage/Cleaning Professionals Desktop Hero.png"
                alt="Professional Melbourne Cleaning Services in Melbourne CBD"
                fill
                className="hidden object-cover object-center brightness-100 md:block md:brightness-[0.85]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-grey/50" />
            </div>

            {/* Content container */}
            <div className="relative inset-0">
              <div className="container mx-auto px-4 h-full">
                {/* Content section */}
                <div className="flex flex-col pt-36 pb-32 md:pb-0 md:pt-32">
                  {/* Text content */}
                  <div className="max-w-2xl text-white">
                    {/* Location Badge */}
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4 md:mb-8">
                      <svg className="w-4 h-4 mr-2 text-[#FFA500]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white font-medium">Melbourne CBD, VIC</span>
                    </div>

                    <div className="block md:hidden h-[130px]" />

                    <h1 className="text-xl md:text-4xl font-bold mb-5 md:mb-8 leading-tight md:leading-normal">
                      Melbourne Cleaning Services | Professional House Cleaners in Melbourne CBD | End of Lease & NDIS Cleaning Experts
                    </h1>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mb-6 md:mb-8 text-xs md:text-base">
                      <span className="bg-white/10 backdrop-blur-sm md:bg-transparent rounded-full px-3 py-1.5 md:p-0 text-white/90 flex items-center">
                        <svg className="w-3.5 h-3.5 md:w-5 md:h-5 mr-1 md:mr-2 text-[#FFA500]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Background Checked
                      </span>
                      <span className="bg-white/10 backdrop-blur-sm md:bg-transparent rounded-full px-3 py-1.5 md:p-0 text-white/90 flex items-center">
                        <svg className="w-3.5 h-3.5 md:w-5 md:h-5 mr-1 md:mr-2 text-[#FFA500]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        4+ Years
                      </span>
                      <span className="bg-white/10 backdrop-blur-sm md:bg-transparent rounded-full px-3 py-1.5 md:p-0 text-white/90 flex items-center">
                        <svg className="w-3.5 h-3.5 md:w-5 md:h-5 mr-1 md:mr-2 text-[#FFA500]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Fully Insured
                      </span>
                    </div>

                    <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">
                    Melbourne cleaning services by Cleaning Professionals. Trusted by Melbourne&apos;s finest homes and businesses with fantastic job satisfaction. Professional end of lease cleaning, NDIS cleaning, and regular cleaning service all around Melbourne CBD and surrounding areas including Carlton, North Melbourne, Docklands. Fully insured with comprehensive coverage for your <strong> peace of mind</strong>.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                      <Link
                        href="/quick-book"
                        className="bg-[#FFA500] text-white px-6 py-3 rounded-md hover:bg-[#ffb733] transition-colors font-semibold flex items-center justify-center"
                      >
                        Get Instant Pricing
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                      <Link
                        href="tel:0450124086"
                        className="bg-white text-[#1E3D8F] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center"
                      >
                        CALL 0450124086
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        {/* BEFORE AFTER GALLERY - Top Section */}
        <div className="hidden md:block">
          <BeforeAfterGallery serviceSlug="end-of-lease-cleaning" />
        </div>
        
        {/* Main Content Section */}
        <section className="container mx-auto px-4 py-16 max-w-none">
          <div className="max-w-7xl mx-auto">
            {/* Main Heading */}
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
                Professional Cleaning Services in Melbourne CBD
              </h2>
              <div className="w-20 h-1 bg-[#FFA500] mx-auto"></div>
            </div>
            
            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Main Content */}
              <div className="prose max-w-none">
                                            <p className="text-lg leading-relaxed mb-6">
                              Looking for reliable <strong>cleaning services</strong> in Melbourne CBD? Our professional 
                              <strong>cleaning company</strong> delivers exceptional results for homes and businesses 
                              in Melbourne CBD and surrounding areas including Carlton, North Melbourne, Docklands. Our <strong>cleaners in Melbourne</strong> are <strong>background checked</strong> and provide outstanding <strong>customer service</strong>. Learn more about our <Link href="/blogs/cleaning-services-melbourne/" className="text-[#FFA500] hover:text-[#1E3D8F] underline">comprehensive cleaning services in Melbourne</Link> and how we differentiate between general and deep cleaning.
                            </p>
                
                                            <p className="text-lg leading-relaxed mb-6">
                              As trusted <strong>cleaners in Melbourne</strong> serving the City of Melbourne, we understand the unique needs of 
                              Melbourne CBD residents and provide customized cleaning solutions that exceed expectations. Every <strong>cleaning job</strong> is completed to the highest standards, ensuring your home is <strong>left clean</strong> and spotless. Discover the difference between <Link href="/blogs/regular-house-cleaning-vs-one-off-cleaning-services-near-me-melbourne/" className="text-[#FFA500] hover:text-[#1E3D8F] underline">regular house cleaning vs one-off cleaning services</Link> to choose the best option for your needs.
                            </p>

                <h3 className="text-xl font-semibold text-[#1E3D8F] mb-4">
                  Our Cleaning Services in Melbourne CBD
                </h3>
                <ul className="grid md:grid-cols-2 gap-4 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <Link 
                      href="/locations/melbourne-cbd/end-of-lease-cleaning"
                      className="hover:text-[#FFA500] transition-colors"
                    >
                      End of Lease Cleaning
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <Link 
                      href="/locations/melbourne-cbd/ndis-cleaning"
                      className="hover:text-[#FFA500] transition-colors"
                    >
                      NDIS Cleaning
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <Link 
                      href="/locations/melbourne-cbd/general-cleaning"
                      className="hover:text-[#FFA500] transition-colors"
                    >
                      Regular House Cleaning
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <Link 
                      href="/locations/melbourne-cbd/deep-cleaning"
                      className="hover:text-[#FFA500] transition-colors"
                    >
                      Deep Cleaning
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <Link 
                      href="/locations/melbourne-cbd/spring-cleaning"
                      className="hover:text-[#FFA500] transition-colors"
                    >
                      Spring Cleaning
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <Link 
                      href="/locations/melbourne-cbd/commercial-cleaning"
                      className="hover:text-[#FFA500] transition-colors"
                    >
                      Commercial Cleaning
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <Link 
                      href="/locations/melbourne-cbd/carpet-cleaning"
                      className="hover:text-[#FFA500] transition-colors"
                    >
                      Carpet Cleaning
                    </Link>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <Link 
                      href="/locations/melbourne-cbd/move-in-cleaning"
                      className="hover:text-[#FFA500] transition-colors"
                    >
                      Move In Cleaning
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Right Column - Location Info */}
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-[#1E3D8F] mb-6">
                  Service Coverage Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#FFA500] mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-medium">Region:</span>
                      <p className="text-gray-600">Inner City Melbourne</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#FFA500] mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <div>
                      <span className="font-medium">Council:</span>
                      <p className="text-gray-600">City of Melbourne</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#FFA500] mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-medium">Postcode:</span>
                      <p className="text-gray-600">3000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Content Section */}
            <section className="mb-12 bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E3D8F] mb-6">
                Why Choose Our Melbourne Cleaning Services?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#1E3D8F] mb-4">Professional <strong>Cleaning Company</strong> with <strong>Fantastic Job</strong> Guarantee</h3>
                  <p className="text-gray-700 mb-4">
                    Our <strong>Melbourne cleaning services</strong> are delivered by a team of professional <strong>cleaners in Melbourne</strong> who are <strong>background checked</strong> and fully trained. We pride ourselves on delivering a <strong>fantastic job</strong> every time, ensuring your home is <strong>left clean</strong> and spotless.
                  </p>
                  <p className="text-gray-700">
                    With over 4 years of experience serving Melbourne CBD, our <strong>cleaning company</strong> has built a reputation for exceptional <strong>customer service</strong> and reliable <strong>regular cleaning service</strong> that gives you <strong>peace of mind</strong>.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1E3D8F] mb-4">Flexible <strong>Bi Weekly</strong> and Regular Cleaning Options</h3>
                  <p className="text-gray-700 mb-4">
                    We offer flexible scheduling options including <strong>bi weekly</strong> cleaning services to suit your lifestyle and budget. Our <strong>regular cleaning service</strong> ensures your home stays consistently clean and well-maintained.
                  </p>
                  <p className="text-gray-700">
                    Whether you need a one-time deep clean or ongoing <strong>regular cleaning service</strong>, our <strong>Melbourne cleaning services</strong> are designed to meet your specific needs and schedule.
                  </p>
                </div>
              </div>
            </section>

            {/* LOCAL CONTENT: NEED-BASED + E-E-A-T (hard-coded) */}
            <section className="mb-12 bg-white rounded-lg shadow-md p-8 border border-gray-100">
              <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
                {/* Left: Editorial content */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Need Professional Cleaners in Melbourne CBD? 
                  </h2>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Latest cleaning services by Cleaning Professionals
                  </h4>
                                                <p className="text-lg text-gray-700 mb-6">
                                Book today for a sparkling, inspection‑ready home. Our local team delivers
                                professional cleaning services across Melbourne CBD VIC 3000—covering apartments,
                                townhouses and family homes. Instant online booking in 60 seconds, transparent
                                pricing, and no hidden fees. For more information about <Link href="/blogs/house-maid-services-near-me-melbourne/" className="text-[#FFA500] hover:text-[#1E3D8F] underline">house maid services near me in Melbourne</Link>, check out our comprehensive guide.
                              </p>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Melbourne CBD Cleaning Services you can rely on
                  </h3>
                                                <p className="text-gray-700 leading-relaxed mb-4">
                                Based in the City of Melbourne, our cleaners understand the standards local
                                property managers expect. From homes near Flinders Street to streets off Collins
                                Street and Bourke Street, we work to professional standards with a satisfaction
                                guarantee for complete peace of mind. Our <Link href="/blogs/cleaning-services-melbourne/" className="text-[#FFA500] hover:text-[#1E3D8F] underline">professional cleaning services in Melbourne</Link> are designed to meet the highest industry standards.
                              </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Booking is easy. Choose a time that suits you, and our insured, police‑checked
                    team arrives fully equipped and ready to go. We use eco‑friendly products that are
                    safe for families and pets, and we communicate clearly from start to finish.
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-3 mb-6 text-gray-800">
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> 100% Satisfaction guarantee</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> Professional cleaning standards</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> Transparent pricing with no hidden fees</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> Instant online booking and fast confirmations</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> Insured and police‑checked local cleaners</li>
                    <li className="flex items-start gap-2"><span className="text-green-600 mt-1">✓</span> Eco‑friendly products; equipment supplied</li>
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/quick-book" className="bg-[#1E3D8F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1E3D8F]/90 text-center">
                      Book Online in 60 Seconds
                    </Link>
                    <a href="tel:0450124086" className="border border-gray-300 px-6 py-3 rounded-lg font-semibold text-gray-800 hover:bg-gray-50 text-center">
                      Call 0450 124 086
                    </a>
                  </div>
                </div>

                
                {/* Right: Local images */}
                <div className="grid gap-4">
                  <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow">
                    <Image
                      src="/melbourne-cbd/melbourne-cbd-kitchen-cleaned-to-perfection.jpg"
                      alt="Professional Cleaning in Melbourne CBD — Kitchen cleaned to perfection"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={false}
                    />
                  </div>
                  <div className="relative w-full h-56 md:h-72 rounded-xl overflow-hidden shadow">
                    <Image
                      src="/melbourne-cbd/melbourne-cbd-living-area-spotless.jpg"
                      alt="Professional Cleaning in Melbourne CBD — Living area spotless"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* House Cleaning Near Me Section */}
            <section className="mb-12 bg-white rounded-lg shadow-md p-8 flex flex-col md:flex-row items-center gap-8 border border-gray-100">
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-[#FFA500]/10 rounded-full">
                <svg className="w-12 h-12 text-[#FFA500]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1E3D8F] mb-2">
                  House Cleaning Services Near Me in Melbourne CBD
                </h2>
                                            <p className="text-lg text-gray-700 mb-2">
                              Looking for <strong>house cleaning</strong>, <strong>house cleaners</strong>, or <strong>home cleaning near me</strong> in <span className="font-semibold text-[#FFA500]">Melbourne CBD</span>? Our local, trusted <strong>cleaners in Melbourne</strong> provide professional <strong>home cleaning services</strong> and <strong>cleaning services near me</strong> in <span className="font-semibold text-[#FFA500]">Melbourne CBD</span> and all nearby suburbs. Learn more about <Link href="/blogs/house-maid-services-near-me-melbourne/" className="text-[#FFA500] hover:text-[#1E3D8F] underline">house maid services near me in Melbourne</Link> and book a reliable house cleaner near you today!
                            </p>
                <Link href="/quick-book" className="inline-block mt-4 bg-[#FFA500] text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-[#ffb733] transition-colors">
                  Book House Cleaning Now
                </Link>
              </div>
            </section>

            {/* Pricing Section */}
            <section className="mb-12">
              <h3 className="text-xl font-semibold text-[#1E3D8F] mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#FFA500]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 10c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                </svg>
                House Cleaning Prices in Melbourne CBD
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                  <h4 className="font-bold mb-2">Weekly Service</h4>
                  <p className="text-2xl font-bold text-[#1E3D8F] mb-1">$48.50<span className="text-base font-normal">/hour</span></p>
                  <p className="text-green-600 font-semibold mb-2">10% OFF</p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>✔️ All cleaning products included</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100 border-2 border-green-400">
                  <h4 className="font-bold mb-2">Fortnightly Service <span className="bg-green-400 text-white text-xs px-2 py-1 rounded ml-2">Popular Choice</span></h4>
                  <p className="text-2xl font-bold text-[#1E3D8F] mb-1">$58.50<span className="text-base font-normal">/hour</span></p>
                  <p className="text-green-600 font-semibold mb-2">5% OFF</p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>✔️ All cleaning products included</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                  <h4 className="font-bold mb-2">3-Weekly Service</h4>
                  <p className="text-2xl font-bold text-[#1E3D8F] mb-1">$63.05<span className="text-base font-normal">/hour</span></p>
                  <p className="text-green-600 font-semibold mb-2">3% OFF</p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>✔️ All cleaning products included</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                  <h4 className="font-bold mb-2">Monthly / One-Time</h4>
                  <p className="text-2xl font-bold text-[#1E3D8F] mb-1">$65.00<span className="text-base font-normal">/hour</span></p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>✔️ All cleaning products included</li>
                  </ul>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4">*Prices are for house cleaning services in Melbourne CBD and may vary based on your specific needs. Contact us for a custom quote or to book your <strong>house cleaning near me</strong> service today.</p>
            </section>

            {/* FAQ Section */}
            <section className="mb-12">
              <h3 className="text-xl font-semibold text-[#1E3D8F] mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#FFA500]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8a9 9 0 1118 0z" />
                </svg>
                Frequently Asked Questions
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                              <h4 className="font-bold mb-2 text-[#1E3D8F]">Do you offer house cleaning services near me in Melbourne CBD?</h4>
                              <p className="text-gray-700">Yes! We provide house cleaning services in <span className="font-semibold text-[#FFA500]">Melbourne CBD</span> and all surrounding suburbs. Our local <strong>cleaners in Melbourne</strong> are ready to help you keep your home spotless with our <strong>regular cleaning service</strong>. For detailed information about our <Link href="/blogs/regular-house-cleaning-vs-one-off-cleaning-services-near-me-melbourne/" className="text-[#FFA500] hover:text-[#1E3D8F] underline">regular vs one-off cleaning services</Link>, check out our comprehensive guide.</p>
                            </div>
                                            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                              <h4 className="font-bold mb-2 text-[#1E3D8F]">How do I book a house cleaner near me?</h4>
                              <p className="text-gray-700">Simply use our <Link href="/quick-book" className="text-[#FFA500] underline hover:text-[#1E3D8F]">online booking form</Link> or call us to schedule a house cleaning service in <span className="font-semibold text-[#FFA500]">Melbourne CBD</span> or any nearby area. Our <strong>customer service</strong> team is here to help! For more insights about <Link href="/blogs/cleaning-services-melbourne/" className="text-[#FFA500] hover:text-[#1E3D8F] underline">professional cleaning services in Melbourne</Link>, visit our blog.</p>
                            </div>
              </div>
            </section>

            {/* Service Checklist Section */}
            <section className="mb-12">
              <h3 className="text-xl font-semibold text-[#1E3D8F] mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#FFA500]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                What&apos;s Included in Our General House Cleaning?
              </h3>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                <li>✔️ Kitchen cleaning (benchtops, sinks, appliances)</li>
                <li>✔️ Bathroom & toilet cleaning</li>
                <li>✔️ Dusting and wiping all surfaces</li>
                <li>✔️ Vacuuming and mopping floors</li>
                <li>✔️ Bedroom and living area cleaning</li>
                <li>✔️ Rubbish removal</li>
                
              </ul>
            </section>

            

            {/* Testimonials Section */}
            <Testimonials suburb="Melbourne CBD" />

            {/* Related Blog Posts Section */}
            <section className="mb-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#1E3D8F] mb-6 text-center">
                Learn More About Cleaning Services in Melbourne
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-lg text-[#1E3D8F] mb-3">
                    Professional Cleaning Services Guide
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    Understand the difference between general and deep cleaning services, and how to choose the right cleaning company for your needs.
                  </p>
                  <Link 
                    href="/blogs/cleaning-services-melbourne/" 
                    className="inline-flex items-center text-[#FFA500] hover:text-[#1E3D8F] font-semibold text-sm"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-lg text-[#1E3D8F] mb-3">
                    Regular vs One-Off Cleaning
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    Discover the benefits of regular house cleaning versus one-off services, including pricing, scheduling, and which option suits your lifestyle.
                  </p>
                  <Link 
                    href="/blogs/regular-house-cleaning-vs-one-off-cleaning-services-near-me-melbourne/" 
                    className="inline-flex items-center text-[#FFA500] hover:text-[#1E3D8F] font-semibold text-sm"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-lg text-[#1E3D8F] mb-3">
                    House Maid Services Guide
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    Everything you need to know about house maid services in Melbourne, including what to expect, pricing, and how to find reliable cleaners.
                  </p>
                  <Link 
                    href="/blogs/house-maid-services-near-me-melbourne/" 
                    className="inline-flex items-center text-[#FFA500] hover:text-[#1E3D8F] font-semibold text-sm"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </section>

      
        {/* Latest Blogs Section */}
        <HomeLatestBlogs />

        {/* FINAL CTA SECTION - Professional Footer */}
        <section className="py-16 md:py-20 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Main CTA */}
              <div className="bg-gradient-to-r from-[#1E3D8F] to-[#1E3D8F]/95 rounded-2xl p-8 md:p-12 text-white shadow-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Experience Professional Cleaning?
                </h2>
                <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Join hundreds of satisfied Melbourne CBD residents who trust us with their homes
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link
                    href="/quick-book"
                    className="bg-[#FFA500] hover:bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Get Instant Quote
                  </Link>
                  <Link
                    href="tel:0450124086"
                    className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 border border-white/30"
                  >
                    Call 0450 124 086
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-[#FFA500]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Background Checked</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-[#FFA500]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>100% Satisfaction</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-[#FFA500]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Fully Insured</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-[#FFA500]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Instant Booking</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 text-gray-600">
                <p className="text-sm">
                  <strong>Melbourne CBD Service Area:</strong> CBD, Carlton, North Melbourne, Docklands, Southbank, East Melbourne
                </p>
                <p className="text-sm mt-2">
                  Available 7 days a week • Same day service available • No hidden fees
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <SubscriptionSection />
        <Footer />
      </main>
    </>
  )
} 