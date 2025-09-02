import Link from 'next/link'
import { Check, Star, Award, Shield, Clock, Users, Phone, ArrowRight } from 'lucide-react'

export default function BestServicePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1E3D8F] to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Award className="w-12 h-12 text-yellow-400 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Best Airbnb Cleaning Service Melbourne
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Why We&apos;re Melbourne&apos;s #1 Choice for Professional Airbnb Cleaning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/airbnb-cleaning/book"
                className="bg-white text-[#1E3D8F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Book the Best Service Now
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

      {/* Why We're the Best */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                Why We&apos;re Melbourne&apos;s Best Airbnb Cleaning Service
              </h2>
              <p className="text-lg text-gray-600">
                Discover what makes us the top choice for Airbnb hosts across Melbourne
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="w-16 h-16 bg-[#1E3D8F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">4.9/5 Star Rating</h3>
                <p className="text-gray-600">Over 5,000 satisfied customers rate us as Melbourne&apos;s best Airbnb cleaning service</p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Same-Day Service</h3>
                <p className="text-gray-600">Available 7 days a week with flexible scheduling to meet your turnover needs</p>
              </div>

              <div className="text-center p-6 bg-yellow-50 rounded-lg">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">100% Guarantee</h3>
                <p className="text-gray-600">Complete satisfaction guarantee - we&apos;ll return if you&apos;re not happy</p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Expert Team</h3>
                <p className="text-gray-600">Professional cleaners trained specifically for Airbnb turnover cleaning</p>
              </div>

              <div className="text-center p-6 bg-red-50 rounded-lg">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Airbnb Approved</h3>
                <p className="text-gray-600">Trusted by hundreds of Melbourne Airbnb hosts and property managers</p>
              </div>

              <div className="text-center p-6 bg-indigo-50 rounded-lg">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Competitive Pricing</h3>
                <p className="text-gray-600">Best value for money with transparent pricing and no hidden fees</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                How We Compare to Other Airbnb Cleaning Services
              </h2>
                              <p className="text-lg text-gray-600">
                See why we&apos;re consistently rated as Melbourne&apos;s best Airbnb cleaning service
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1E3D8F] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Feature</th>
                      <th className="px-6 py-4 text-center font-bold">Cleaning Professionals</th>
                      <th className="px-6 py-4 text-center">Other Services</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">Customer Rating</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                          <span className="font-bold text-green-600">4.9/5</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">3.2-4.1/5</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-medium">Same-Day Service</td>
                      <td className="px-6 py-4 text-center">
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">Limited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">Airbnb Specialized</td>
                      <td className="px-6 py-4 text-center">
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">General Cleaning</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-medium">Satisfaction Guarantee</td>
                      <td className="px-6 py-4 text-center">
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">Limited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">Professional Equipment</td>
                      <td className="px-6 py-4 text-center">
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">Basic</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-medium">Insurance Coverage</td>
                      <td className="px-6 py-4 text-center">
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">Limited</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Pricing</td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-green-600">Competitive</span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">Variable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                What Our Customers Say About Our Service
              </h2>
              <p className="text-lg text-gray-600">
                Real reviews from Melbourne Airbnb hosts who chose the best cleaning service
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  &ldquo;Absolutely the best Airbnb cleaning service in Melbourne. They understand the short stay market and always deliver exceptional results. Highly recommended!&rdquo;
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Sarah M.</strong> - South Yarra Host
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  &ldquo;Professional, reliable, and the best value for money. Same-day service is a lifesaver for last-minute bookings. This is definitely Melbourne&apos;s top Airbnb cleaning service.&rdquo;
                </p>
                <div className="text-sm text-gray-600">
                  <strong>Michael R.</strong> - St Kilda Host
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  &ldquo;Outstanding service! They&apos;re the best Airbnb cleaning company in Melbourne. Professional team, great communication, and always on time. Worth every dollar.&rdquo;
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
              Experience Melbourne&apos;s Best Airbnb Cleaning Service
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied Melbourne hosts who trust us with their properties
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/airbnb-cleaning/book"
                className="bg-white text-[#1E3D8F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg flex items-center justify-center"
              >
                Book the Best Service Now
                <ArrowRight className="w-5 h-5 ml-2" />
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
            <Link href="/services/airbnb-cleaning/house-cleaning" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Airbnb House Cleaning</h3>
              <p className="text-gray-600">Comprehensive house cleaning for short stay properties</p>
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
