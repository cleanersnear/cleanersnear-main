'use client'

import MainLayout from '@/components/layout/MainLayout'
import { Check, Info, Phone, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'


const hourlyRates = [
  {
    id: 'weekly',
    title: <span className="flex items-center relative">
      Weekly Service
      <span className="relative group inline-block ml-2">
        <Info size={14} className="text-gray-400 cursor-help inline" />
        <span className="invisible group-hover:visible absolute left-0 top-full mt-1 w-48 bg-gray-500/80 text-white text-xs rounded p-2 z-50 transform -translate-x-1/2">
          Minimum 2 hours booking required for a thorough cleaning service
        </span>
      </span>
    </span>,
    price: '48.50',
    discount: '10% OFF',
    features: [
      'All cleaning products included',
      'Professional cleaning equipment',
      'Trained & experienced cleaners',
      'Regular scheduled cleaning'
    ],
    link: '/quick-book',
    isPopular: false
  },
  {
    id: 'fortnightly',
    title: <span className="flex items-center relative">
      Fortnightly Service
      <span className="relative group inline-block ml-2">
        <Info size={14} className="text-gray-400 cursor-help inline" />
        <span className="invisible group-hover:visible absolute left-0 top-full mt-1 w-48 bg-gray-500/80 text-white text-xs rounded p-2 z-50 transform -translate-x-1/2">
          Minimum 3 hours booking required for a thorough cleaning service
        </span>
      </span>
    </span>,
    price: '58.50',
    discount: '5% OFF',
    features: [
      'All cleaning products included',
      'Professional cleaning equipment',
      'Trained & experienced cleaners',
      'Flexible scheduling'
    ],
    link: '/quick-book',
    isPopular: true
  },
  {
    id: '3weekly',
    title: <span className="flex items-center relative">
      3-Weekly Service
      <span className="relative group inline-block ml-2">
        <Info size={14} className="text-gray-400 cursor-help inline" />
        <span className="invisible group-hover:visible absolute left-0 top-full mt-1 w-48 bg-gray-500/80 text-white text-xs rounded p-2 z-50 transform -translate-x-1/2">
          Minimum 3 hours booking required for a thorough cleaning service
        </span>
      </span>
    </span>,
    price: '63.05',
    discount: '3% OFF',
    features: [
      'All cleaning products included',
      'Professional cleaning equipment',
      'Trained & experienced cleaners',
      'Consistent service quality'
    ],
    link: '/quick-book',
    isPopular: false
  },
  {
    id: 'monthly',
    title: <span className="flex items-center relative">
      Monthly / One-Time
      <span className="relative group inline-block ml-2">
        <Info size={14} className="text-gray-400 cursor-help inline" />
        <span className="invisible group-hover:visible absolute left-0 top-full mt-1 w-48 bg-gray-500/80 text-white text-xs rounded p-2 z-50 transform -translate-x-1/2">
          Minimum 4 hours booking required for a thorough cleaning service
        </span>
      </span>
    </span>,
    price: '65.00',
    features: [
      'All cleaning products included',
      'Professional cleaning equipment',
      'Trained & experienced cleaners',
      'No commitment required'
    ],
    link: '/quick-book',
    isPopular: false
  }
]

const flatRates = [
  {
    title: '1 Bedroom/Studio Apartment',
    description: 'Perfect for small homes and studio apartments',
    startingPrice: '178',
    duration: '2-4 hours',
    features: [
      'Complete home cleaning',
      'All cleaning supplies included',
      'Professional equipment used',
      'Trained & experienced cleaners',
      'Detailed cleaning checklist'
    ],
    link: '/quick-book',
    buttonText: 'Book Now'
  },
  {
    title: '2 Bedrooms',
    description: 'Ideal for small to medium-sized homes',
    startingPrice: '212',
    duration: '3-4 hours',
    features: [
      'Complete home cleaning',
      'All cleaning supplies included',
      'Professional equipment used',
      'Trained & experienced cleaners',
      'Detailed cleaning checklist'
    ],
    link: '/quick-book',
    buttonText: 'Book Now'
  },
  {
    title: '3 Bedrooms',
    description: 'Perfect for medium to large homes',
    startingPrice: '309',
    duration: '4-6 hours',
    features: [
      'Complete home cleaning',
      'All cleaning supplies included',
      'Professional equipment used',
      'Trained & experienced cleaners',
      'Detailed cleaning checklist'
    ],
    link: '/quick-book',
    buttonText: 'Book Now'
  },
  {
    title: '4 Bedrooms',
    description: 'Ideal for larger family homes',
    startingPrice: '395',
    duration: '5-8 hours',
    features: [
      'Complete home cleaning',
      'All cleaning supplies included',
      'Professional equipment used',
      'Trained & experienced cleaners',
      'Detailed cleaning checklist'
    ],
    link: '/quick-book',
    buttonText: 'Book Now'
  }
]

const endOfLeaseRates = [
  {
    title: '1 Bedroom/Studio Apartment',
    description: 'Perfect for small rentals and studio apartments',
    priceRange: '260 - 315',
    features: [
      'Bond back guarantee',
      'Real estate standard cleaning',
      'Professional equipment used',
      'All cleaning supplies included',
      'Detailed cleaning checklist'
    ],
    link: '/quick-book',
    buttonText: 'Book Now',
    callText: 'Need a custom quote? Call us for the best price'
  },
  {
    title: '2 Bedrooms',
    description: 'Ideal for small to medium rental properties',
    priceRange: '287 - 408',
    features: [
      'Bond back guarantee',
      'Real estate standard cleaning',
      'Professional equipment used',
      'All cleaning supplies included',
      'Detailed cleaning checklist'
    ],
    link: '/quick-book',
    buttonText: 'Book Now',
    callText: 'Need a custom quote? Call us for the best price'
  },
  {
    title: '3 Bedrooms',
    description: 'Perfect for medium to large rental homes',
    priceRange: '359 - 650',
    features: [
      'Bond back guarantee',
      'Real estate standard cleaning',
      'Professional equipment used',
      'All cleaning supplies included',
      'Detailed cleaning checklist'
    ],
    link: '/quick-book',
    buttonText: 'Book Now'
  },
  {
    title: '4 Bedrooms',
    description: 'Ideal for larger rental properties',
    priceRange: '545 - 890',
    features: [
      'Bond back guarantee',
      'Real estate standard cleaning',
      'Professional equipment used',
      'All cleaning supplies included',
      'Detailed cleaning checklist'
    ],
    link: '/quick-book',
    buttonText: 'Book Now'
  }
]

const detailedPricing = [
  {
    title: 'Carpet Cleaning',
    rates: [
      '1 Bedroom: $35 - $55',
      '2 Bedrooms: $60 - $75',
      '3 Bedrooms: $90 - $100',
      '4 Bedrooms: $120 + more'
    ],
    description: 'These prices cover deep steam cleaning and stain removal, ensuring your carpets are left fresh and hygienic.'
  },
  {
    title: 'General House Cleaning',
    rates: [
      'Hourly Rate: $48.50 - $65.00 per hour',
      '1 Bedroom/Studio Apartment: $178',
      '2 Bedrooms: $212',
      '3 Bedrooms: $309',
      '4 Bedrooms: $395'
    ],
    description: 'These rates include dusting, vacuuming, mopping, and general tidying of all rooms.'
  },
  {
    title: 'Upholstery Cleaning',
    rates: [
      'Sofa Cleaning: $60 - $100 per seat',
      'Armchair Cleaning: $50 - $80 per chair',
      'Mattress Cleaning: $80 - $120 per mattress'
    ],
    description: 'These prices include deep cleaning, stain removal, and deodorizing of upholstered furniture'
  },
  {
    title: 'Office Cleaning',
    rates: [
      'Hourly Rate: $35 - $50 per hour',
      'Small Office (up to 500 sq ft): $150 - $250 per visit',
      'Medium Office (500-2000 sq ft): $250 - $400 per visit',
      'Large Office (2000+ sq ft): $400 - $600 per visit'
    ],
    description: 'This includes desk cleaning, floor care, restroom sanitation, and more.'
  },
  {
    title: 'End of Lease Cleaning',
    rates: [
      '1 Bedroom/Studio Apartment: $260 - $315',
      '2 Bedroom Apartment/House: $287 - $408',
      '3 Bedroom Apartment/House: $359 - $650',
      '4 Bedroom House: $545 - $890'
    ],
    description: 'End of lease cleaning includes comprehensive cleaning of all rooms, kitchen deep cleaning, bathroom sanitization, and ensuring the property meets the landlord\'s standards for bond return.'
  },
  {
    title: 'Oven Cleaning',
    rates: [
      'Single Oven: $80 - $120',
      'Double Oven: $120 - $160',
      'Range/Oven with Stovetop: $150 - $200'
    ],
    description: 'Oven cleaning involves thorough cleaning of the interior and exterior, including racks and trays, to remove grease and burnt-on food residues'
  },
  {
    title: 'Window Cleaning',
    rates: [
      'Interior (per window): $15 - $25',
      'Small Home (up to 5 windows): $75 - $128',
      'Medium Home (5-10 windows): $128 - $230',
      'Large Home (10+ windows): $230 - $350'
    ],
    description: 'This service ensures windows are streak-free and clear, enhancing the overall look of your home'
  },
  {
    title: 'After Renovation Cleaning',
    rates: [
      'Hourly Rate: $45 - $60 per hour',
      'Small Home: $300 - $400',
      'Medium Home: $400 - $600',
      'Large Home: $600 - $800'
    ],
    description: 'This includes removal of construction dust, debris, and thorough cleaning of all surfaces to prepare the space for occupancy'
  },
  {
    title: 'Commercial Cleaning',
    rates: [
      'Hourly Rate: $40 - $55 per hour',
      'Small Office (up to 500 sq ft): $200 - $300 per visit',
      'Medium Office (500-2000 sq ft): $300 - $500 per visit',
      'Large Office (2000+ sq ft): $500 - $800 per visit'
    ],
    description: 'These services include detailed cleaning of workspaces, restrooms, common areas, and more.'
  },
  {
    title: 'Tile and Floor Cleaning',
    rates: [
      'Hourly Rate: $40 - $55 per hour',
      'Small Areas (up to 500 sq ft): $150 - $200',
      'Medium Areas (500-1500 sq ft): $200 - $300',
      'Large Areas (1500+ sq ft): $300 - $450'
    ],
    description: 'This service includes scrubbing, polishing, and sealing of tile and floor surfaces to restore their appearance and prolong their lifespan'
  },
  {
    title: 'NDIS Cleaning',
    rates: [
      'Hourly Rate: $45 - $55 per hour (with NDIS funding typically covering up to $50.20 per hour)'
    ],
    description: 'Service Plans: Customizable based on individual needs, including regular cleaning, deep cleaning, and specialized cleaning services such as hypoallergenic cleaning. These services are tailored to the needs of individuals with disabilities, ensuring a clean and safe living environment that meets NDIS standards'
  },
  {
    title: 'Move In/Move Out Cleaning',
    rates: [
      '1 Bedroom/Studio: $220 - $280',
      '2 Bedrooms: $280 - $350',
      '3 Bedrooms: $350 - $450',
      '4 Bedrooms: $450 - $550'
    ],
    description: 'Comprehensive cleaning service for moving transitions. Includes deep cleaning of all rooms, appliances, cabinets, and fixtures to ensure the space is perfectly clean for new occupants.'
  }
]

export default function PricingPage() {
  const [showCallButtons, setShowCallButtons] = useState<{ [key: string]: boolean }>({});

  return (
    <MainLayout>
      <div className="mt-20">
        {/* Hero Section */}
        <div className="relative min-h-[400px] sm:min-h-[600px] bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Background Image */}
          <div 
            className="absolute inset-0 opacity-0 sm:opacity-90"
            style={{
              backgroundImage: 'url(/images/pricing-hero-ai.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />

          {/* Main Content */}
          <div className="relative container mx-auto px-4 py-10 sm:py-20 md:py-32">
            <div className="max-w-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-6 leading-tight">
                Simple, Transparent
                <span className="text-[#1E3D8F] block">Cleaning Prices</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8">
                Professional cleaning services tailored to your needs. No hidden fees, just quality service you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link 
                  href="/get-quote"
                  className="inline-flex justify-center items-center px-6 sm:px-8 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-[#1E3D8F] hover:bg-[#1E3D8F]/90 transition-all shadow-sm"
                >
                  Get Quote
                </Link>
                <Link 
                  href="/quick-book"
                  className="inline-flex justify-center items-center px-6 sm:px-8 py-2.5 sm:py-3 border border-[#1E3D8F] text-sm sm:text-base font-medium rounded-md text-[#1E3D8F] bg-white hover:bg-[#1E3D8F]/5 transition-all shadow-sm"
                >
                  Book Now
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="hidden sm:grid mt-12 grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-white shadow-sm border-2 border-[#298f1e]/20">
                    <Check className="w-5 h-5 text-[#298f1e]" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Fixed Pricing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-white shadow-sm border-2 border-[#298f1e]/20">
                    <Check className="w-5 h-5 text-[#298f1e]" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Trained Staff</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-white shadow-sm border-2 border-[#298f1e]/20">
                    <Check className="w-5 h-5 text-[#298f1e]" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">100% Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Rates Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">General House Cleaning</h2>
            <p className="text-xl font-semibold text-center text-gray-600 mb-12">Hourly rates</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {hourlyRates.map((rate) => (
                <div 
                  key={rate.id}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col ${
                    rate.isPopular ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  {rate.isPopular && (
                    <div className="bg-green-500 text-white text-center py-2">
                      Popular Choice
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-4">{rate.title}</h3>
                      <div className="flex items-baseline mb-4">
                        <span className="text-3xl font-bold">${rate.price}</span>
                        <span className="text-gray-600 ml-1">/hour</span>
                      </div>
                      {rate.discount && (
                        <div className="text-green-500 font-semibold mb-4">
                          {rate.discount}
                        </div>
                      )}
                      <ul className="space-y-3 mb-6">
                        {rate.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={rate.link}
                      className="mx-auto w-[200px] sm:w-full bg-[#1E3D8F] text-white text-center py-2 sm:py-3 rounded-md hover:bg-opacity-90 transition-all text-sm sm:text-base mt-6"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flat Rates Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-4">
              Flat-Rates for a Complete Home Cleaning
            </h1>
            <h2 className="text-1xl font-bold text-center mb-4">
              One-Time House Cleaning, Fixed Rates for a Full Home Clean
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Our one-time cleaning service is perfect for those who need a thorough clean without any ongoing commitment. Prices are based on the size of your home and include all cleaning supplies and equipment.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {flatRates.map((rate) => (
                <div 
                  key={rate.title}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
                >
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{rate.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">{rate.description}</p>
                      <div className="mb-2">
                        <div className="text-xs sm:text-sm text-gray-500">Starting from</div>
                        <div className="text-2xl sm:text-3xl font-bold">${rate.startingPrice}</div>
                      </div>
                      <div className="mb-4 sm:mb-6">
                        <div className="text-xs sm:text-sm font-medium text-gray-500">Duration</div>
                        <div className="text-sm sm:text-md text-gray-700">{rate.duration}</div>
                      </div>
                      <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                        {rate.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Check size={14} className="text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={rate.link}
                      className="mx-auto w-[200px] sm:w-full bg-[#1E3D8F] text-white text-center py-2 sm:py-3 rounded-md hover:bg-opacity-90 transition-all text-sm sm:text-base"
                    >
                      {rate.buttonText}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* End of Lease Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-4">
              End of Lease Cleaning Packages
            </h1>
            <h2 className="text-1xl font-bold text-center mb-4">
              Professional Bond Cleaning Services
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Our end of lease cleaning service is designed to help you get your bond back. We follow a comprehensive checklist that meets real estate standards and includes all the necessary cleaning tasks required by property managers.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {endOfLeaseRates.map((rate) => {
                return (
                  <div 
                    key={rate.title}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
                  >
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">{rate.title}</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-4">{rate.description}</p>
                        <div className="mb-6">
                          <div className="text-sm text-gray-500">Price Range</div>
                          <div className="text-3xl font-bold">${rate.priceRange}</div>
                          <button 
                            onClick={() => setShowCallButtons(prev => ({
                              ...prev,
                              [rate.title]: !prev[rate.title]
                            }))}
                            className="text-sm text-blue-600 hover:text-blue-700 mt-2 flex items-center gap-1 transition-colors"
                          >
                            Not sure about the price? 
                            <ChevronDown 
                              size={16} 
                              className={`transform transition-transform duration-200 ${
                                showCallButtons[rate.title] ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>
                        <ul className="space-y-3 mb-6">
                          {rate.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col space-y-3">
                        <Link
                          href={rate.link}
                          className="mx-auto w-[200px] sm:w-full bg-[#1E3D8F] text-white text-center py-2 sm:py-3 rounded-md hover:bg-opacity-90 transition-all text-sm sm:text-base"
                        >
                          {rate.buttonText}
                        </Link>
                        <div className={`transform transition-all duration-200 overflow-hidden ${
                          showCallButtons[rate.title] ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <Link
                            href="tel:+61123456789"
                            className="mx-auto w-[180px] sm:w-full bg-green-500 text-white text-center py-2 rounded-md hover:bg-opacity-90 transition-all text-sm gap-2 flex items-center justify-center"
                          >
                            <Phone size={14} />
                            Call for Best Price
                          </Link>
                          <p className="text-xs text-gray-500 text-center mt-2">
                            We can provide a custom quote based on your specific needs
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Pricing Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              Detailed Cleaning Pricing
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Comprehensive pricing for all our specialized cleaning services
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {detailedPricing.map((service) => (
                <div 
                  key={service.title}
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-lg sm:text-xl font-bold mb-4">{service.title}</h3>
                      <ul className="space-y-3 mb-6">
                        {service.rates.map((rate) => (
                          <li key={rate} className="flex items-center">
                            <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-gray-600">{rate}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm sm:text-base text-gray-600 text-sm border-t pt-4">
                        {service.description}
                      </p>
                    </div>
                    <Link
                      href="/quick-book"
                      className="mx-auto w-[200px] sm:w-full bg-[#1E3D8F] text-white text-center py-2 sm:py-3 rounded-md hover:bg-opacity-90 transition-all text-sm sm:text-base mt-6"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
} 