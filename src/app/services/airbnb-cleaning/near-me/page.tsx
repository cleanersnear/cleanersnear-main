import Link from 'next/link'
import { Check, MapPin, Clock, Star, Phone, Search, Navigation, Users, Shield } from 'lucide-react'

export default function NearMePage() {
  const melbourneAreas = [
    { name: 'Melbourne CBD', postcode: '3000', distance: '0km' },
    { name: 'South Yarra', postcode: '3141', distance: '3km' },
    { name: 'St Kilda', postcode: '3182', distance: '5km' },
    { name: 'Richmond', postcode: '3121', distance: '2km' },
    { name: 'Brunswick', postcode: '3056', distance: '6km' },
    { name: 'Carlton', postcode: '3053', distance: '2km' },
    { name: 'Docklands', postcode: '3008', distance: '1km' },
    { name: 'Northcote', postcode: '3070', distance: '7km' },
    { name: 'Fitzroy', postcode: '3065', distance: '3km' },
    { name: 'Collingwood', postcode: '3066', distance: '3km' },
    { name: 'Preston', postcode: '3072', distance: '9km' },
    { name: 'Thornbury', postcode: '3071', distance: '8km' },
    { name: 'Coburg', postcode: '3058', distance: '8km' },
    { name: 'Essendon', postcode: '3040', distance: '10km' },
    { name: 'Moonee Ponds', postcode: '3039', distance: '8km' },
    { name: 'Ascot Vale', postcode: '3032', distance: '6km' },
    { name: 'Footscray', postcode: '3011', distance: '7km' },
    { name: 'Yarraville', postcode: '3013', distance: '8km' },
    { name: 'Williamstown', postcode: '3016', distance: '12km' },
    { name: 'Port Melbourne', postcode: '3207', distance: '4km' },
    { name: 'Albert Park', postcode: '3206', distance: '4km' },
    { name: 'Middle Park', postcode: '3206', distance: '4km' },
    { name: 'West Melbourne', postcode: '3003', distance: '1km' },
    { name: 'North Melbourne', postcode: '3051', distance: '2km' },
    { name: 'Kensington', postcode: '3031', distance: '4km' },
    { name: 'Flemington', postcode: '3031', distance: '5km' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1E3D8F] to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="w-12 h-12 text-yellow-400 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Airbnb Cleaning Near Me Melbourne
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find Professional Airbnb Cleaning Services in Your Local Area
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/airbnb-cleaning/book"
                className="bg-white text-[#1E3D8F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Find Local Service Now
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

      {/* Search by Location */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                Find Airbnb Cleaning Services Near You
              </h2>
              <p className="text-lg text-gray-600">
                Search by suburb, postcode, or area to find local Airbnb cleaning services
              </p>
            </div>

            {/* Search Box */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter your suburb or postcode (e.g., South Yarra, 3141)"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1E3D8F] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Melbourne Areas Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {melbourneAreas.map((area) => (
                <div key={area.name} className="bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <MapPin className="w-4 h-4 text-[#1E3D8F] flex-shrink-0" />
                    <span className="text-xs text-gray-500">{area.distance}</span>
                  </div>
                  <h3 className="font-semibold text-[#1E3D8F] text-sm mb-1">{area.name}</h3>
                  <p className="text-xs text-gray-600">{area.postcode}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Local Service */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                Why Choose Local Airbnb Cleaning Services?
              </h2>
              <p className="text-lg text-gray-600">
                Benefits of choosing a local Airbnb cleaning service near you
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-[#1E3D8F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Navigation className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Quick Response</h3>
                <p className="text-gray-600">Local cleaners can respond faster to your cleaning needs and emergencies</p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Same-Day Service</h3>
                <p className="text-gray-600">Local teams can provide same-day cleaning service for urgent turnovers</p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Local Knowledge</h3>
                <p className="text-gray-600">Local cleaners understand your area and can provide personalized service</p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Trusted & Reliable</h3>
                <p className="text-gray-600">Local services are more accountable and easier to reach for follow-ups</p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Area Coverage</h3>
                <p className="text-gray-600">Comprehensive coverage of all Melbourne suburbs and surrounding areas</p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Local Reviews</h3>
                <p className="text-gray-600">Read reviews from other local hosts in your area who use our service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                Our Service Coverage Areas
              </h2>
              <p className="text-lg text-gray-600">
                We provide Airbnb cleaning services across all Melbourne metropolitan areas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-4">Inner Melbourne</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Melbourne CBD (3000)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2 flex-shrink-0" />
                    <span>South Yarra (3141)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2 flex-shrink-0" />
                    <span>St Kilda (3182)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Richmond (3121)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Carlton (3053)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Fitzroy (3065)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-4">Outer Melbourne</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Brunswick (3056)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Northcote (3070)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Preston (3072)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Essendon (3040)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Footscray (3011)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2 flex-shrink-0" />
                    <span>Williamstown (3016)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                What Local Hosts Say About Our Service
              </h2>
              <p className="text-lg text-gray-600">
                Real reviews from Melbourne hosts who found our local Airbnb cleaning service
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
                  &ldquo;Found the best local Airbnb cleaning service near me! They&apos;re always on time and understand the local market. Highly recommend for Melbourne hosts.&rdquo;
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
                  &ldquo;Local service is so much better! They know the area well and can respond quickly to last-minute cleaning requests. Perfect for my St Kilda property.&rdquo;
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Michael R.</strong> - St Kilda Host
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  &ldquo;Great local Airbnb cleaning service! They cover my area perfectly and always deliver excellent results. Easy to reach and very reliable.&rdquo;
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Emma L.</strong> - Richmond Host
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
              Find Your Local Airbnb Cleaning Service Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get professional local cleaning for your short stay property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/airbnb-cleaning/book"
                className="bg-white text-[#1E3D8F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Find Local Service Now
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
            <Link href="/services/airbnb-cleaning/best-service" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Best Airbnb Cleaning Service</h3>
              <p className="text-gray-600">Why we&apos;re Melbourne&apos;s top choice for Airbnb cleaning</p>
            </Link>
            <Link href="/services/airbnb-cleaning/house-cleaning" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Airbnb House Cleaning</h3>
              <p className="text-gray-600">Comprehensive house cleaning for short stay properties</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
