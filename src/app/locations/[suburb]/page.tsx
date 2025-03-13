import { MELBOURNE_REGIONS } from '@/utils/location/regions'
import DynamicHero from '@/components/Home/HeroSection/DynamicHero'
import Header from '@/components/layout/Header'
import Link from 'next/link'
import { Metadata } from 'next'

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

// Generate metadata for each suburb page
export async function generateMetadata({ params }: { params: Promise<{ suburb: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const suburb = resolvedParams.suburb.replace(/-/g, ' ')
  
  return {
    title: `Professional Cleaning Services in ${suburb} | Melbourne Cleaners`,
    description: `Expert cleaning services in ${suburb}, Melbourne. End of lease, carpet cleaning, NDIS, commercial & more. Trusted professionals, affordable rates. Book today!`,
    alternates: {
      canonical: `/locations/${resolvedParams.suburb}/`,
    },
    openGraph: {
      title: `${suburb} Cleaning Services | Cleaning Professionals Melbourne`,
      description: `Professional cleaning services in ${suburb}. Trusted local cleaners for homes and businesses.`,
      url: `https://www.cleaningprofessionals.com.au/locations/${resolvedParams.suburb}/`,
      type: 'website',
    }
  }
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
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-[#1E3D8F] mb-6">Location Not Found</h1>
            <p className="text-lg mb-8">
              We couldn't find information about this specific location. Please check our service areas below or contact us for more information.
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
                    <span>End of Lease Cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>NDIS Cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Regular House Cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Deep Cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Spring Cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Office Cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Carpet Cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#FFA500] mt-1 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Window Cleaning</span>
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