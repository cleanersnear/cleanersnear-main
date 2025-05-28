import { MELBOURNE_REGIONS } from '@/utils/location/regions'
import DynamicHero from '@/components/Home/HeroSection/DynamicHero'
import Header from '@/components/layout/Header'
import Link from 'next/link'

interface LocationData {
  name: string;
  region: string;
  council: string;
  mainSuburbs: string[];
  postcode: string;
}

interface BusinessInfo {
  yearsInBusiness: number;
  totalCleaners: number;
  insuranceInfo: string;
}

interface PageProps {
  params: Promise<{ suburb: string }>;
}

export default async function LocationPage({ 
  params 
}: { 
  params: { suburb: string } 
} & PageProps) {
  // Get the resolved params
  const resolvedParams = await params;
  // Normalize suburb name from URL
  const suburb = resolvedParams.suburb.replace(/-/g, ' ')
  let locationData: LocationData | undefined
  
  // Search through regions to find the suburb
  Object.values(MELBOURNE_REGIONS).forEach(region => {
    region.councils.forEach(council => {
      const suburbIndex = council.key_suburbs
        .findIndex(s => s.toLowerCase() === suburb.toLowerCase())
      
      if (suburbIndex !== -1) {
        locationData = {
          name: suburb,
          region: region.name,
          council: council.name,
          mainSuburbs: council.key_suburbs.filter(s => 
            s.toLowerCase() !== suburb.toLowerCase()
          ),
          postcode: council.postcodes[suburbIndex]
        }
      }
    })
  })

  const businessInfo: BusinessInfo = {
    yearsInBusiness: 4,
    totalCleaners: 35,
    insuranceInfo: 'Public Liability Insurance'
  }

  if (!locationData) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 pt-36 pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-[#1E3D8F] mb-6">Location Not Found</h1>
            <p className="text-lg mb-8">
              We couldn&apos;t find information about this specific location. Please check our service areas below or contact us for more information.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                href="/locations/"
                className="bg-[#1E3D8F] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
              >
                View All Locations
              </Link>
              <Link
                href="/contact"
                className="bg-[#FFA500] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/"
                className="bg-white text-[#1E3D8F] border border-[#1E3D8F] px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </Link>
            </div>
            
            <h2 className="text-2xl font-semibold text-[#1E3D8F] mb-4">Popular Service Areas</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Link href="/locations/melbourne-cbd/" className="text-[#1E3D8F] hover:text-[#FFA500]">Melbourne CBD</Link>
              <Link href="/locations/south-yarra/" className="text-[#1E3D8F] hover:text-[#FFA500]">South Yarra</Link>
              <Link href="/locations/richmond/" className="text-[#1E3D8F] hover:text-[#FFA500]">Richmond</Link>
              <Link href="/locations/toorak/" className="text-[#1E3D8F] hover:text-[#FFA500]">Toorak</Link>
              <Link href="/locations/st-kilda/" className="text-[#1E3D8F] hover:text-[#FFA500]">St Kilda</Link>
              <Link href="/locations/brunswick/" className="text-[#1E3D8F] hover:text-[#FFA500]">Brunswick</Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <DynamicHero 
          location={{
            city: locationData.name,
            region: locationData.region,
            mainSuburbs: locationData.mainSuburbs
          }}
          businessInfo={businessInfo}
        />
        
        {/* Main Content Section */}
        <section className="container mx-auto px-4 py-16 max-w-none">
          <div className="max-w-7xl mx-auto">
            {/* Main Heading */}
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
                Professional Cleaning Services in {locationData.name}
              </h2>
              <div className="w-20 h-1 bg-[#FFA500] mx-auto"></div>
            </div>
            
            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Main Content */}
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  Looking for reliable cleaning services in {locationData.name}? Our professional 
                  cleaning team delivers exceptional results for homes and businesses 
                  in {locationData.name} and surrounding areas including {locationData.mainSuburbs.slice(0, 3).join(', ')}.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  As trusted cleaners in {locationData.council}, we understand the unique needs of 
                  {locationData.name} residents and provide customized cleaning solutions that exceed expectations.
                </p>

                <h3 className="text-xl font-semibold text-[#1E3D8F] mb-4">
                  Our Services in {locationData.name}
                </h3>
                <ul className="grid md:grid-cols-2 gap-4 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <Link 
                      href={`/locations/${locationData.name.toLowerCase().replace(/\s+/g, '-')}/end-of-lease-cleaning`}
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
                      href={`/locations/${locationData.name.toLowerCase().replace(/\s+/g, '-')}/ndis-cleaning`}
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
                      href={`/locations/${locationData.name.toLowerCase().replace(/\s+/g, '-')}/general-cleaning`}
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
                      href={`/locations/${locationData.name.toLowerCase().replace(/\s+/g, '-')}/deep-cleaning`}
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
                      href={`/locations/${locationData.name.toLowerCase().replace(/\s+/g, '-')}/spring-cleaning`}
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
                      href={`/locations/${locationData.name.toLowerCase().replace(/\s+/g, '-')}/commercial-cleaning`}
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
                      href={`/locations/${locationData.name.toLowerCase().replace(/\s+/g, '-')}/carpet-cleaning`}
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
                      href={`/locations/${locationData.name.toLowerCase().replace(/\s+/g, '-')}/move-in-cleaning`}
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
                      <p className="text-gray-600">{locationData.region}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#FFA500] mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <div>
                      <span className="font-medium">Council:</span>
                      <p className="text-gray-600">{locationData.council}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#FFA500] mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-medium">Postcode:</span>
                      <p className="text-gray-600">{locationData.postcode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* House Cleaning Near Me Section */}
            <section className="mb-12 bg-white rounded-lg shadow-md p-8 flex flex-col md:flex-row items-center gap-8 border border-gray-100">
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-[#FFA500]/10 rounded-full">
                <svg className="w-12 h-12 text-[#FFA500]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1E3D8F] mb-2">
                  House Cleaning Services Near Me in {locationData.name}
                </h2>
                <p className="text-lg text-gray-700 mb-2">
                  Looking for <strong>house cleaning</strong>, <strong>house cleaners</strong>, or <strong>home cleaning near me</strong> in <span className="font-semibold text-[#FFA500]">{locationData.name}</span>? Our local, trusted cleaners provide professional <strong>home cleaning services</strong> and <strong>cleaning services near me</strong> in <span className="font-semibold text-[#FFA500]">{locationData.name}</span> and all nearby suburbs. Book a reliable house cleaner near you today!
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
                House Cleaning Prices in {locationData.name}
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
              <p className="text-gray-600 text-sm mt-4">*Prices are for house cleaning services in {locationData.name} and may vary based on your specific needs. Contact us for a custom quote or to book your <strong>house cleaning near me</strong> service today.</p>
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
                  <h4 className="font-bold mb-2 text-[#1E3D8F]">Do you offer house cleaning services near me in {locationData.name}?</h4>
                  <p className="text-gray-700">Yes! We provide house cleaning services in <span className="font-semibold text-[#FFA500]">{locationData.name}</span> and all surrounding suburbs. Our local cleaners are ready to help you keep your home spotless.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                  <h4 className="font-bold mb-2 text-[#1E3D8F]">How do I book a house cleaner near me?</h4>
                  <p className="text-gray-700">Simply use our <Link href="/quick-book" className="text-[#FFA500] underline hover:text-[#1E3D8F]">online booking form</Link> or call us to schedule a house cleaning service in <span className="font-semibold text-[#FFA500]">{locationData.name}</span> or any nearby area.</p>
                </div>
              </div>
            </section>

            {/* Service Checklist Section */}
            <section className="mb-12">
              <h3 className="text-xl font-semibold text-[#1E3D8F] mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#FFA500]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                What&apos;s Included in Our House Cleaning?
              </h3>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                <li>✔️ Kitchen cleaning (benchtops, sinks, appliances)</li>
                <li>✔️ Bathroom & toilet cleaning</li>
                <li>✔️ Dusting and wiping all surfaces</li>
                <li>✔️ Vacuuming and mopping floors</li>
                <li>✔️ Bedroom and living area cleaning</li>
                <li>✔️ Rubbish removal</li>
                <li>✔️ Custom requests available</li>
              </ul>
            </section>

            {/* Testimonials Section */}
            <section className="mb-12">
              <h3 className="text-xl font-semibold text-[#1E3D8F] mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#FFA500]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2h5" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                What Our Clients Say
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                  <p className="italic text-gray-700 mb-2">&quot;Fantastic service! The cleaners were punctual, professional, and left my house sparkling. Highly recommend for anyone in {locationData.name}.&quot;</p>
                  <span className="font-semibold text-[#1E3D8F]">— Sarah, {locationData.name}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
                  <p className="italic text-gray-700 mb-2">&quot;Booking was easy and the results were amazing. I&apos;ll definitely use this cleaning service again!&quot;</p>
                  <span className="font-semibold text-[#1E3D8F]">— James, {locationData.name}</span>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="bg-[#1E3D8F] text-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Book Your Clean?</h3>
              <p className="mb-6">Experience the difference of professional cleaning services in {locationData.name}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/quick-book"
                  className="bg-[#FFA500] text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
                >
                  Book Online Now
                </Link>
                <Link
                  href="tel:0450124086"
                  className="bg-white text-[#1E3D8F] px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors font-semibold"
                >
                  Call Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

// Generate static params for all suburbs
export async function generateStaticParams() {
  const suburbs = Object.values(MELBOURNE_REGIONS).flatMap(region =>
    region.councils.flatMap(council => 
      council.key_suburbs.map(suburb => ({
        suburb: suburb.toLowerCase().replace(/\s+/g, '-')
      }))
    )
  )
  
  return suburbs
} 