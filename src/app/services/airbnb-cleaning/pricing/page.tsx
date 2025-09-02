import Link from 'next/link'
import { Check, DollarSign, Clock, Star, Phone, Calculator, Shield, Users, Award } from 'lucide-react'

export default function PricingPage() {
  const pricingPlans = [
    {
      name: 'Studio/1 Bedroom',
      price: '$149',
      duration: '2-3 hours',
      features: [
        'Complete kitchen cleaning',
        'Bathroom sanitization',
        'Living area cleaning',
        'Bedroom preparation',
        'Floor cleaning',
        'Window cleaning',
        'Bin emptying',
        'Quality inspection'
      ],
      popular: false
    },
    {
      name: '2 Bedroom',
      price: '$189',
      duration: '3-4 hours',
      features: [
        'All Studio features included',
        'Additional bedroom cleaning',
        'Extra bathroom (if applicable)',
        'Extended living areas',
        'Additional storage areas',
        'Enhanced quality check',
        'Same-day service available',
        '100% satisfaction guarantee'
      ],
      popular: true
    },
    {
      name: '3 Bedroom',
      price: '$298',
      duration: '4-5 hours',
      features: [
        'All 2 Bedroom features included',
        'Third bedroom cleaning',
        'Multiple bathroom cleaning',
        'Large living areas',
        'Kitchen deep clean',
        'All common areas',
        'Professional equipment',
        'Insurance coverage'
      ],
      popular: false
    },
    {
      name: '4+ Bedroom',
      price: '$310',
      duration: '5-6 hours',
      features: [
        'All 3 Bedroom features included',
        'Additional bedrooms',
        'Multiple bathrooms',
        'Large property coverage',
        'Premium cleaning products',
        'Dedicated team',
        'Priority scheduling',
        'VIP support'
      ],
      popular: false
    }
  ]

  const hourlyRate = {
    price: '$49.89',
    duration: 'Per hour',
    features: [
      'Flexible hourly service',
      'Minimum 2 hours',
      'Perfect for quick cleanups',
      'Same-day availability',
      'Professional team',
      'All equipment included',
      'Transparent pricing',
      'No hidden fees'
    ]
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1E3D8F] to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <DollarSign className="w-12 h-12 text-yellow-400 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Airbnb Cleaning Pricing Melbourne
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Transparent Pricing for All Property Sizes - No Hidden Fees
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/airbnb-cleaning/book"
                className="bg-white text-[#1E3D8F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Get Instant Quote
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

      {/* Pricing Plans */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                Clear & Transparent Pricing
              </h2>
              <p className="text-lg text-gray-600">
                Choose the perfect plan for your property size - all prices include GST
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {pricingPlans.map((plan) => (
                <div key={plan.name} className={`relative bg-white rounded-lg shadow-lg p-6 ${plan.popular ? 'ring-2 ring-[#1E3D8F] transform scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#1E3D8F] text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{plan.price}</div>
                    <div className="text-sm text-gray-500">{plan.duration}</div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/services/airbnb-cleaning/book"
                    className={`w-full py-3 rounded-lg font-semibold text-center block transition-colors ${
                      plan.popular
                        ? 'bg-[#1E3D8F] text-white hover:bg-opacity-90'
                        : 'bg-gray-100 text-[#1E3D8F] hover:bg-gray-200'
                    }`}
                  >
                    Book Now
                  </Link>
                </div>
              ))}
            </div>

            {/* Hourly Rate */}
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow-lg p-6 border-2 border-yellow-200">
                <div className="text-center mb-6">
                  <Calculator className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Hourly Rate</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{hourlyRate.price}</div>
                  <div className="text-sm text-gray-500">{hourlyRate.duration}</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {hourlyRate.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/services/airbnb-cleaning/book"
                  className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold text-center block hover:bg-yellow-700 transition-colors"
                >
                  Book Hourly Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                Why Our Pricing is the Best Value
              </h2>
              <p className="text-lg text-gray-600">
                Transparent pricing with no hidden fees and exceptional value
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">No Hidden Fees</h3>
                <p className="text-gray-600">All prices include GST and are fully transparent with no surprise charges</p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Competitive Rates</h3>
                <p className="text-gray-600">Best value for money with competitive pricing compared to other Melbourne services</p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Professional Service</h3>
                <p className="text-gray-600">Experienced team with professional equipment and insurance coverage included</p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Same-Day Service</h3>
                <p className="text-gray-600">Available 7 days a week with flexible scheduling at no extra cost</p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">100% Guarantee</h3>
                <p className="text-gray-600">Complete satisfaction guarantee - we&apos;ll return if you&apos;re not happy</p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3D8F] mb-3">Flexible Payment</h3>
                <p className="text-gray-600">Easy payment options with instant quotes and transparent billing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1E3D8F] mb-4">
                How We Compare to Other Services
              </h2>
              <p className="text-lg text-gray-600">
                See why our pricing offers the best value for Melbourne Airbnb hosts
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1E3D8F] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Service</th>
                      <th className="px-6 py-4 text-center font-bold">Cleaning Professionals</th>
                      <th className="px-6 py-4 text-center">Other Services</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">Studio/1 Bedroom</td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-green-600">$149</span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">$160-$200</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-medium">2 Bedroom</td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-green-600">$189</span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">$220-$280</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">3 Bedroom</td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-green-600">$298</span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">$350-$420</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-medium">4+ Bedroom</td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-green-600">$310</span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">$400-$500</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-6 py-4 font-medium">Hourly Rate</td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-green-600">$49.89</span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">$60-$80</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-6 py-4 font-medium">Same-Day Service</td>
                      <td className="px-6 py-4 text-center">
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">Extra $50-$100</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Hidden Fees</td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-red-600 font-bold">None</span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">Common</td>
                    </tr>
                  </tbody>
                </table>
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
              Get Your Instant Quote Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Transparent pricing with no hidden fees - book your Airbnb cleaning service now
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/airbnb-cleaning/book"
                className="bg-white text-[#1E3D8F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Get Instant Quote
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
            <Link href="/services/airbnb-cleaning/service-areas" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#1E3D8F] mb-2">Service Areas</h3>
              <p className="text-gray-600">All Melbourne suburbs where we provide service</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
