import Link from 'next/link'
import { Check, MapPin, Star, Phone } from 'lucide-react'
import AirbnbCleaningHero from '../components/AirbnbCleaningHero'
import MobileWhatsIncluded from '../components/MobileWhatsIncluded'

const melbourneSuburbs = [
  'Melbourne CBD', 'South Yarra', 'St Kilda', 'Richmond', 'Brunswick', 'Carlton',
  'Docklands', 'Epping', 'Craigieburn', 'Northcote', 'Fitzroy', 'Collingwood',
  'Preston', 'Thornbury', 'Coburg', 'Essendon', 'Moonee Ponds', 'Ascot Vale',
  'Footscray', 'Yarraville', 'Williamstown', 'Port Melbourne', 'Albert Park',
  'Middle Park', 'West Melbourne', 'North Melbourne', 'Kensington', 'Flemington'
]

export default function MelbourneAirbnbCleaningPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AirbnbCleaningHero />

      {/* Service Introduction - Custom Content */}
      <section className="md:py-12 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Content Area */}
            <div className="lg:col-span-2 hidden md:block">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-[#1E3D8F] mb-6">
                  Melbourne&apos;s Most Trusted Airbnb Cleaning Service
                </h2>
                <p className="text-gray-600 mb-8">
                  Keep your Airbnb property spotless and your guests happy with our professional Airbnb cleaning service. 
                  We understand the unique needs of short stay properties and provide reliable turnover cleaning that meets 
                  the highest standards expected by your guests.
                </p>

                {/* Service Features */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-xl mb-4">Living Areas & Bedrooms</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Remove cobwebs from walls and ceilings</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Clean all skirting boards and window sills</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Wipe doors and door frames</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Clean switches and power points</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Vacuum and mop all floors</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Make beds with fresh linen (if provided)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-xl mb-4">Kitchen</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Deep clean stovetop and rangehood</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Clean and sanitize all benchtops</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Clean and polish sink area</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Clean inside/outside microwave</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Deep clean oven (inside and out)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Empty and clean refrigerator</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-xl mb-4">Bathrooms and Toilets</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Deep clean shower and screens</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Clean and sanitize vanity area</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Thorough toilet cleaning</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Wall tiles and grout cleaning</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Clean exhaust fans</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Replace towels and amenities</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-xl mb-4">Our Guarantee</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>100% Satisfaction Guarantee</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Airbnb Host Approved Service</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Professional Equipment Used</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Experienced Cleaning Team</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Public Liability Insured</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Same Day Service Available</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 hidden md:block">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32">
                <h3 className="text-2xl font-bold mb-4">Book Your Clean</h3>
                <div className="mb-6">
                  <div className="text-sm text-gray-500">Starting from</div>
                  <div className="text-3xl font-bold text-[#1E3D8F]">$149</div>
                  <div className="text-sm text-gray-500">Studio/1 Bedroom</div>
                </div>
                <div className="mb-4">
                  <Link
                    href="/services/airbnb-cleaning/book"
                    className="block w-full bg-[#1E3D8F] text-white text-center py-3 rounded-md hover:bg-opacity-90 transition-all"
                  >
                    Book Now
                  </Link>
                </div>
                <Link
                  href="/services/airbnb-cleaning/pricing"
                  className="block w-full border-2 border-[#1E3D8F] text-[#1E3D8F] text-center py-3 rounded-md hover:bg-[#1E3D8F] hover:text-white transition-all"
                >
                  See Detailed Pricing
                </Link>

                {/* Operating Hours */}
                <div className="mt-8">
                  <h4 className="font-bold mb-4">Operating Hours</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8am – 8pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9am - 7pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>9am - 8pm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile What's Included */}
      <MobileWhatsIncluded />

      {/* Melbourne-Specific Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                Professional Airbnb Cleaning Service in Melbourne
              </h2>
              <p className="text-lg text-gray-600">
                Serving all Melbourne suburbs with expert turnover cleaning for your short stay properties
              </p>
            </div>

            {/* Melbourne Suburbs Grid */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-[#1E3D8F] mb-6 text-center">
                We Service All Melbourne Areas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {melbourneSuburbs.map((suburb) => (
                  <div key={suburb} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-[#1E3D8F] mr-2 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{suburb}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us for Melbourne */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-4">
                  Melbourne CBD & Inner Suburbs
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Same-day service available in Melbourne CBD</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Expert knowledge of Melbourne short stay market</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Local Melbourne cleaning team</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Competitive Melbourne pricing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-4">
                  Melbourne Host Benefits
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Airbnb host approved service</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Flexible scheduling for Melbourne properties</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Professional equipment & supplies</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Public liability insurance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Melbourne Testimonials */}
            <div className="bg-gray-50 p-8 rounded-lg mb-12">
              <h3 className="text-2xl font-bold text-[#1E3D8F] mb-6 text-center">
                What Melbourne Hosts Say
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    &ldquo;Excellent Airbnb cleaning service in Melbourne CBD. They understand the short stay market and always deliver on time. Highly recommended!&rdquo;
                  </p>
                  <div className="text-sm text-gray-600">
                    <strong>Sarah M.</strong> - South Yarra Host
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    &ldquo;Professional team that knows Melbourne properties well. Same-day service is a lifesaver for last-minute bookings. Great value for money.&rdquo;
                  </p>
                  <div className="text-sm text-gray-600">
                    <strong>Michael R.</strong> - St Kilda Host
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center bg-[#1E3D8F] text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Book Your Melbourne Airbnb Cleaning?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Get professional turnover cleaning for your Melbourne short stay property
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/services/airbnb-cleaning/book"
                  className="bg-white text-[#1E3D8F] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Book Now
                </Link>
                <a
                  href="tel:0450124086"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1E3D8F] transition-colors flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call 0450 124 086
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1E3D8F] mb-8 text-center">
            Related Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/services/airbnb-cleaning/best-service" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Best Airbnb Cleaning Service</h3>
              <p className="text-gray-600">Why we&apos;re Melbourne&apos;s top choice for Airbnb cleaning</p>
            </Link>
            <Link href="/services/airbnb-cleaning/house-cleaning" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Airbnb House Cleaning</h3>
              <p className="text-gray-600">Comprehensive house cleaning for short stay properties</p>
            </Link>
            <Link href="/services/airbnb-cleaning/near-me" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Airbnb Cleaning Near Me</h3>
              <p className="text-gray-600">Find local Airbnb cleaning services in your area</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
