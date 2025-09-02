import Link from 'next/link'
import { Check, Home, Bed, Bath, Utensils, Sofa, Phone, Star, Clock, Shield } from 'lucide-react'

export default function HouseCleaningPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1E3D8F] to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Home className="w-12 h-12 text-yellow-400 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Airbnb House Cleaning Melbourne
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Professional House Cleaning for Short Stay Properties & Vacation Rentals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/airbnb-cleaning/book"
                className="bg-white text-[#1E3D8F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Book House Cleaning Now
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

      {/* What's Included in House Cleaning */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                Complete House Cleaning for Airbnb Properties
              </h2>
              <p className="text-lg text-gray-600">
                Every room, every surface, every detail covered for your short stay property
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Living Areas */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Sofa className="w-8 h-8 text-[#1E3D8F] mr-3" />
                  <h3 className="text-xl font-bold text-[#1E3D8F]">Living Areas</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Vacuum and mop all floors</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Dust all surfaces and furniture</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Clean windows and window sills</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Remove cobwebs from corners</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Clean light switches and power points</span>
                  </li>
                </ul>
              </div>

              {/* Bedrooms */}
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Bed className="w-8 h-8 text-[#1E3D8F] mr-3" />
                  <h3 className="text-xl font-bold text-[#1E3D8F]">Bedrooms</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Make beds with fresh linen</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Vacuum carpets and rugs</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Dust bedside tables and dressers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Clean mirrors and glass surfaces</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Empty and clean wardrobes</span>
                  </li>
                </ul>
              </div>

              {/* Kitchen */}
              <div className="bg-yellow-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Utensils className="w-8 h-8 text-[#1E3D8F] mr-3" />
                  <h3 className="text-xl font-bold text-[#1E3D8F]">Kitchen</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Clean stovetop and rangehood</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Sanitize all benchtops</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Clean and polish sink</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Clean inside microwave</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Empty and clean refrigerator</span>
                  </li>
                </ul>
              </div>

              {/* Bathrooms */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Bath className="w-8 h-8 text-[#1E3D8F] mr-3" />
                  <h3 className="text-xl font-bold text-[#1E3D8F]">Bathrooms</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Deep clean shower and screens</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Sanitize vanity area</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Thorough toilet cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Clean and polish mirrors</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Replace towels and amenities</span>
                  </li>
                </ul>
              </div>

              {/* Additional Services */}
              <div className="bg-red-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Shield className="w-8 h-8 text-[#1E3D8F] mr-3" />
                  <h3 className="text-xl font-bold text-[#1E3D8F]">Additional Services</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Empty all bins and replace liners</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Clean door frames and handles</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Dust skirting boards</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Clean light fixtures</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Final quality inspection</span>
                  </li>
                </ul>
              </div>

              {/* Quality Guarantee */}
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Star className="w-8 h-8 text-[#1E3D8F] mr-3" />
                  <h3 className="text-xl font-bold text-[#1E3D8F]">Quality Guarantee</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>100% satisfaction guarantee</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Professional equipment used</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Experienced cleaning team</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Public liability insurance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Same-day service available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                House Cleaning for All Property Types
              </h2>
              <p className="text-lg text-gray-600">
                Professional house cleaning services for every type of short stay property
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Home className="w-12 h-12 text-[#1E3D8F] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#1E3D8F] mb-2">Studio Apartments</h3>
                <p className="text-gray-600 text-sm">Complete house cleaning for studio Airbnb properties</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Bed className="w-12 h-12 text-[#1E3D8F] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#1E3D8F] mb-2">1-2 Bedroom Houses</h3>
                <p className="text-gray-600 text-sm">Comprehensive house cleaning for smaller properties</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Home className="w-12 h-12 text-[#1E3D8F] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#1E3D8F] mb-2">3+ Bedroom Houses</h3>
                <p className="text-gray-600 text-sm">Full house cleaning for larger family properties</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <Shield className="w-12 h-12 text-[#1E3D8F] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#1E3D8F] mb-2">Vacation Rentals</h3>
                <p className="text-gray-600 text-sm">Specialized house cleaning for holiday homes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our House Cleaning */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                Why Choose Our Airbnb House Cleaning Service?
              </h2>
              <p className="text-lg text-gray-600">
                Professional house cleaning specifically designed for short stay properties
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#1E3D8F] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Same-Day Service</h3>
                    <p className="text-gray-600">Available 7 days a week with flexible scheduling to meet your turnover needs</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">100% Guarantee</h3>
                    <p className="text-gray-600">Complete satisfaction guarantee - we&apos;ll return if you&apos;re not happy with our house cleaning</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Expert Team</h3>
                    <p className="text-gray-600">Professional cleaners trained specifically for Airbnb house cleaning and turnover cleaning</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Airbnb Specialized</h3>
                    <p className="text-gray-600">We understand the unique needs of short stay properties and Airbnb house cleaning requirements</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Professional Equipment</h3>
                    <p className="text-gray-600">High-quality cleaning equipment and eco-friendly products for the best house cleaning results</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Fully Insured</h3>
                    <p className="text-gray-600">Public liability insurance and bonded cleaners for your peace of mind</p>
                  </div>
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
              Book Professional Airbnb House Cleaning Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get your short stay property professionally cleaned and ready for your next guests
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/airbnb-cleaning/book"
                className="bg-white text-[#1E3D8F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Book House Cleaning Now
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
