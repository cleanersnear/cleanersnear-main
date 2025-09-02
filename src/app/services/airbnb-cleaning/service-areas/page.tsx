import Link from 'next/link'
import { MapPin, Clock, Star, Phone, Navigation, Users, Shield } from 'lucide-react'

export default function ServiceAreasPage() {
  const serviceAreas = [
    // Inner Melbourne
    { name: 'Melbourne CBD', postcode: '3000', region: 'Inner Melbourne', popular: true },
    { name: 'South Yarra', postcode: '3141', region: 'Inner Melbourne', popular: true },
    { name: 'St Kilda', postcode: '3182', region: 'Inner Melbourne', popular: true },
    { name: 'Richmond', postcode: '3121', region: 'Inner Melbourne', popular: true },
    { name: 'Carlton', postcode: '3053', region: 'Inner Melbourne', popular: false },
    { name: 'Docklands', postcode: '3008', region: 'Inner Melbourne', popular: false },
    { name: 'Fitzroy', postcode: '3065', region: 'Inner Melbourne', popular: false },
    { name: 'Collingwood', postcode: '3066', region: 'Inner Melbourne', popular: false },
    { name: 'West Melbourne', postcode: '3003', region: 'Inner Melbourne', popular: false },
    { name: 'North Melbourne', postcode: '3051', region: 'Inner Melbourne', popular: false },
    { name: 'Albert Park', postcode: '3206', region: 'Inner Melbourne', popular: false },
    { name: 'Middle Park', postcode: '3206', region: 'Inner Melbourne', popular: false },
    { name: 'Port Melbourne', postcode: '3207', region: 'Inner Melbourne', popular: false },
    
    // North Melbourne
    { name: 'Brunswick', postcode: '3056', region: 'North Melbourne', popular: true },
    { name: 'Northcote', postcode: '3070', region: 'North Melbourne', popular: true },
    { name: 'Preston', postcode: '3072', region: 'North Melbourne', popular: false },
    { name: 'Thornbury', postcode: '3071', region: 'North Melbourne', popular: false },
    { name: 'Coburg', postcode: '3058', region: 'North Melbourne', popular: false },
    { name: 'Essendon', postcode: '3040', region: 'North Melbourne', popular: false },
    { name: 'Moonee Ponds', postcode: '3039', region: 'North Melbourne', popular: false },
    { name: 'Ascot Vale', postcode: '3032', region: 'North Melbourne', popular: false },
    { name: 'Kensington', postcode: '3031', region: 'North Melbourne', popular: false },
    { name: 'Flemington', postcode: '3031', region: 'North Melbourne', popular: false },
    
    // West Melbourne
    { name: 'Footscray', postcode: '3011', region: 'West Melbourne', popular: true },
    { name: 'Yarraville', postcode: '3013', region: 'West Melbourne', popular: false },
    { name: 'Williamstown', postcode: '3016', region: 'West Melbourne', popular: false },
  ]

  const popularAreas = serviceAreas.filter(area => area.popular)
  const innerMelbourne = serviceAreas.filter(area => area.region === 'Inner Melbourne')
  const northMelbourne = serviceAreas.filter(area => area.region === 'North Melbourne')
  const westMelbourne = serviceAreas.filter(area => area.region === 'West Melbourne')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1E3D8F] to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="w-12 h-12 text-yellow-400 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Airbnb Cleaning Service Areas Melbourne
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Professional Airbnb Cleaning Services Across All Melbourne Suburbs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/airbnb-cleaning/book"
                className="bg-white text-[#1E3D8F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Book Service in Your Area
              </Link>
              <a
                href="tel:0450124086"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1E3D8F] transition-colors text-lg flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 0450 124 086
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                Most Popular Service Areas
              </h2>
              <p className="text-lg text-gray-600">
                Our most requested Airbnb cleaning service areas in Melbourne
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {popularAreas.map((area) => (
                <div key={area.name} className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 text-[#1E3D8F] mr-2 flex-shrink-0" />
                    <span className="text-xs bg-[#1E3D8F] text-white px-2 py-1 rounded-full">Popular</span>
                  </div>
                  <h3 className="font-bold text-[#1E3D8F] text-sm mb-1">{area.name}</h3>
                  <p className="text-xs text-gray-600">{area.postcode}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Service Areas by Region */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                Complete Service Areas Coverage
              </h2>
              <p className="text-lg text-gray-600">
                We provide Airbnb cleaning services across all Melbourne metropolitan areas
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Inner Melbourne */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-4 flex items-center">
                  <Navigation className="w-5 h-5 mr-2" />
                  Inner Melbourne
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {innerMelbourne.map((area) => (
                    <div key={area.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 text-[#1E3D8F] mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700">{area.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{area.postcode}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* North Melbourne */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-4 flex items-center">
                  <Navigation className="w-5 h-5 mr-2" />
                  North Melbourne
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {northMelbourne.map((area) => (
                    <div key={area.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 text-[#1E3D8F] mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700">{area.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{area.postcode}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* West Melbourne */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-4 flex items-center">
                  <Navigation className="w-5 h-5 mr-2" />
                  West Melbourne
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {westMelbourne.map((area) => (
                    <div key={area.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 text-[#1E3D8F] mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700">{area.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{area.postcode}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Benefits by Area */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                Why Choose Our Service Across All Areas?
              </h2>
              <p className="text-lg text-gray-600">
                Consistent quality and service standards across all Melbourne suburbs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="w-16 h-16 bg-[#1E3D8F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1E3D8F] mb-2">Wide Coverage</h3>
                <p className="text-gray-600 text-sm">Service all Melbourne metropolitan areas and suburbs</p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1E3D8F] mb-2">Same-Day Service</h3>
                <p className="text-gray-600 text-sm">Available across all service areas with flexible scheduling</p>
              </div>

              <div className="text-center p-6 bg-yellow-50 rounded-lg">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1E3D8F] mb-2">Local Teams</h3>
                <p className="text-gray-600 text-sm">Local cleaning teams familiar with each area&apos;s requirements</p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1E3D8F] mb-2">Consistent Quality</h3>
                <p className="text-gray-600 text-sm">Same high-quality service standards across all areas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Area-Specific Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                What Hosts Say About Our Service in Their Areas
              </h2>
              <p className="text-lg text-gray-600">
                Real reviews from hosts across different Melbourne areas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  &ldquo;Excellent service in South Yarra! They understand the local market and always deliver on time. Highly recommended for Melbourne CBD and inner suburbs.&rdquo;
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Sarah M.</strong> - South Yarra Host
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  &ldquo;Great service in Brunswick! Local team knows the area well and can handle all types of properties. Perfect for North Melbourne suburbs.&rdquo;
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Michael R.</strong> - Brunswick Host
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  &ldquo;Reliable service in Footscray! They cover all West Melbourne areas and always provide consistent quality. Great for local hosts.&rdquo;
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Emma L.</strong> - Footscray Host
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1E3D8F] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Book Airbnb Cleaning Service in Your Area Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Professional cleaning service available across all Melbourne suburbs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/airbnb-cleaning/book"
                className="bg-white text-[#1E3D8F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Book Service in Your Area
              </Link>
              <a
                href="tel:0450124086"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1E3D8F] transition-colors text-lg flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 0450 124 086
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1E3D8F] mb-8 text-center">
            Explore Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/services/airbnb-cleaning/melbourne" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Airbnb Cleaning Melbourne</h3>
              <p className="text-gray-600">Professional cleaning service across all Melbourne suburbs</p>
            </Link>
            <Link href="/services/airbnb-cleaning/near-me" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Airbnb Cleaning Near Me</h3>
              <p className="text-gray-600">Find local Airbnb cleaning services in your area</p>
            </Link>
            <Link href="/services/airbnb-cleaning/pricing" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Airbnb Cleaning Pricing</h3>
              <p className="text-gray-600">Transparent pricing for all property sizes</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
