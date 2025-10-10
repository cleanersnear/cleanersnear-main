'use client'

import MainLayout from '@/components/layout/MainLayout'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

const serviceCards = [
  {
    id: 'regular-cleaning',
    title: 'Regular Cleaning',
    description: 'Weekly or fortnightly cleans to keep your home.',
    priceLine: 'From $92 for 2 hours',
    priceSub: '$38/hour thereafter',
    features: [
      'Police checked and insured cleaners',
      'Customised cleaning plan',
      'Flexible scheduling'
    ],
    minimums: 'Minimum 2 hours • Weekly or fortnightly options',
    link: '/services/regular-cleaning',
    isPopular: true,
    highlight: 'Most Popular'
  },
  {
    id: 'once-off-cleaning',
    title: 'Once-Off Cleaning',
    description: 'Deep clean for a fresh reset or special occasion.',
    priceLine: 'From $161 for 3 hours',
    priceSub: '$45/hour thereafter',
    features: [
      'Top-to-bottom comprehensive clean',
      'All equipment and products supplied',
      'Attention to detail'
    ],
    minimums: 'Minimum 3 hours',
    link: '/services/once-off-cleaning',
    isPopular: false
  },
  {
    id: 'ndis-cleaning',
    title: 'NDIS Cleaning',
    description: 'Support-focused cleaning for eligible participants (self or plan managed).',
    priceLine: 'From $112 for 2 hours',
    priceSub: '$56/hour thereafter',
    features: [
      'Police checked, reliable team',
      'Tailored cleaning to needs',
      'Public liability insurance'
    ],
    minimums: 'Minimum 2 hours',
    link: '/services/ndis-cleaning',
    isPopular: false
  },
  {
    id: 'airbnb-cleaning',
    title: 'Airbnb Cleaning',
    description: 'Professional turnover cleaning for your rental property.',
    priceLine: 'From $118 for 2 hours',
    priceSub: '$45/hour thereafter',
    features: [
      'Sanitisation of high-touch areas',
      'Bed linen change & presentation',
      'Restocking essentials'
    ],
    minimums: 'Minimum 2 hours',
    link: '/services/airbnb-cleaning',
    isPopular: false
  },
  {
    id: 'commercial-cleaning',
    title: 'Commercial Cleaning',
    description: 'Professional office and commercial space cleaning.',
    priceLine: 'From $50/hour base rate',
    priceSub: 'Discounts by frequency',
    features: [
      'Complete office cleaning',
      'Restroom sanitization',
      'Flexible scheduling'
    ],
    minimums: 'Minimum 3 hours',
    link: '/services/commercial-cleaning',
    isPopular: false
  },
  {
    id: 'end-of-lease-cleaning',
    title: 'End of Lease Cleaning',
    description: 'Bond back guarantee cleaning service.',
    priceLine: 'From $205 for studio/1 bed',
    priceSub: 'Up to $625+ for 4 bed',
    features: [
      'Bond back guarantee',
      'REIV checklist compliant',
      'Professional equipment used'
    ],
    minimums: 'Various minimums by property size',
    link: '/services/end-of-lease-cleaning',
    isPopular: false
  }
]

const endOfLeasePricing = [
  {
    title: 'Studio/1 Bedroom',
    description: 'Perfect for studio apartments and 1 bedroom units',
    priceRange: '$205 - $315',
    features: [
      'Bond back guarantee',
      'REIV checklist compliant',
      'Professional equipment used',
      'All cleaning supplies included',
      'Detailed cleaning checklist'
    ],
    link: '/services/end-of-lease-cleaning',
    buttonText: 'Book Now'
  },
  {
    title: '2 Bedrooms',
    description: 'Perfect for 2 bedroom homes and apartments',
    priceRange: '$310 - $408',
    features: [
      'Bond back guarantee',
      'REIV checklist compliant',
      'Professional equipment used',
      'All cleaning supplies included',
      'Detailed cleaning checklist'
    ],
    link: '/services/end-of-lease-cleaning',
    buttonText: 'Book Now'
  },
  {
    title: '3 Bedrooms',
    description: 'Ideal for 3 bedroom houses and larger apartments',
    priceRange: '$450 - $650',
    features: [
      'Bond back guarantee',
      'REIV checklist compliant',
      'Professional equipment used',
      'All cleaning supplies included',
      'Detailed cleaning checklist'
    ],
    link: '/services/end-of-lease-cleaning',
    buttonText: 'Book Now'
  },
  {
    title: '4 Bedrooms',
    description: 'Perfect for large 4 bedroom houses',
    priceRange: '$625 - $890',
    features: [
      'Bond back guarantee',
      'REIV checklist compliant',
      'Professional equipment used',
      'All cleaning supplies included',
      'Detailed cleaning checklist'
    ],
    link: '/services/end-of-lease-cleaning',
    buttonText: 'Book Now'
  }
]


const additionalServices = [
  {
    title: 'Regular Cleaning',
    rates: [
      'Weekly: From $92 for 2 hours',
      'Fortnightly: From $130 for 3 hours',
      'Hourly Rate: $38/hour thereafter'
    ],
    description: 'Consistent cleaning service with same cleaner, flexible scheduling, and all supplies included.'
  },
  {
    title: 'Once-Off Cleaning',
    rates: [
      'Standard Deep Clean: From $161 for 3 hours',
      'Premium Deep Clean: From $296 for 6 hours',
      'Hourly Rate: $45/hour thereafter'
    ],
    description: 'Comprehensive one-time cleaning including deep cleaning, appliance cleaning, and window cleaning.'
  },
  {
    title: 'NDIS Cleaning',
    rates: [
      'Weekly: From $112 for 2 hours',
      'Fortnightly: From $168 for 3 hours',
      'Hourly Rate: $56/hour thereafter'
    ],
    description: 'Specialized cleaning for NDIS participants with tailored services and support-focused approach.'
  },
  {
    title: 'Airbnb Cleaning',
    rates: [
      'Regular Turnover: From $118 for 2 hours',
      'Deep Clean: From $198 for 3 hours',
      'Hourly Rate: $45/hour thereafter'
    ],
    description: 'Professional turnover cleaning with sanitization, bed linen changes, and restocking essentials.'
  },
  {
    title: 'Commercial Cleaning',
    rates: [
      'Once-off: $60/hour (3 hour minimum)',
      'Regular Service: $50/hour base rate',
      'Frequency discounts available'
    ],
    description: 'Professional office cleaning with restroom sanitization, floor care, and flexible scheduling.'
  },
  {
    title: 'End of Lease Cleaning',
    rates: [
      'Studio/1 Bed: $205 - $315',
      '2 Bed: $310 - $408',
      '3 Bed: $450 - $650',
      '4 Bed: $625 - $890'
    ],
    description: 'Bond back guarantee cleaning service that meets real estate standards and includes comprehensive cleaning.'
  }
]

export default function PricingPage() {
  
  // Save scroll position when navigating away
  useEffect(() => {
    // Save scroll position when navigating away
    const handleBeforeUnload = () => {
      sessionStorage.setItem('pricingScrollPosition', window.scrollY.toString());
    };

    // Restore scroll position when returning to the page
    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem('pricingScrollPosition');
      if (savedPosition) {
        // Use setTimeout to ensure the DOM is fully rendered
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition));
        }, 100);
        
        // Clear the saved position after restoring
        sessionStorage.removeItem('pricingScrollPosition');
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Check if we're returning to this page
    const history = JSON.parse(sessionStorage.getItem('navigationHistory') || '[]');
    if (history.length > 1 && history[history.length - 2] === '/pricing') {
      restoreScrollPosition();
    }

    // Clean up event listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Handle link clicks to save scroll position
  const handleLinkClick = () => {
    // Save current scroll position
    sessionStorage.setItem('pricingScrollPosition', window.scrollY.toString());
    
    // Save navigation history
    const currentPath = window.location.pathname;
    const history = JSON.parse(sessionStorage.getItem('navigationHistory') || '[]');
    
    if (history.length === 0 || history[history.length - 1] !== currentPath) {
      history.push(currentPath);
      sessionStorage.setItem('navigationHistory', JSON.stringify(history));
    }
  };

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
                  href="/book?source=get-quote"
                  onClick={handleLinkClick}
                  className="inline-flex justify-center items-center px-6 sm:px-8 py-2.5 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-[#1E3D8F] hover:bg-[#1E3D8F]/90 transition-all shadow-sm"
                >
                  Get Quote
                </Link>
                <Link 
                  href="/book"
                  onClick={handleLinkClick}
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

        {/* Service Cards Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Our Cleaning Services</h2>
            <p className="text-xl font-semibold text-center text-gray-600 mb-12">Choose the service that fits your needs</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCards.map((service) => (
                <div 
                  key={service.id}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col ${
                    service.isPopular ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  {service.highlight && (
                    <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                      {service.highlight}
                    </div>
                  )}
                  <div className={`p-6 flex flex-col flex-grow ${service.highlight ? 'pt-12' : ''}`}>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-[#1E3D8F]">{service.priceLine}</div>
                        <div className="text-sm text-gray-500">{service.priceSub}</div>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="text-xs text-gray-500 mb-4">{service.minimums}</div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link
                        href={`/book?selectedServices=${encodeURIComponent(service.title)}`}
                        onClick={handleLinkClick}
                        className="w-full bg-[#1E3D8F] text-white text-center py-2 sm:py-3 rounded-md hover:bg-opacity-90 transition-all text-sm sm:text-base"
                      >
                        Get Instant Pricing
                      </Link>
                      <Link
                        href={service.link}
                        onClick={handleLinkClick}
                        className="text-xs text-gray-500 underline hover:text-gray-700 text-center"
                      >
                        Learn more
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* End of Lease Cleaning Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-4">
              End of Lease Cleaning
            </h1>
            <h2 className="text-xl font-bold text-center mb-4">
              Bond Back Guarantee Service
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Our end of lease cleaning service is designed to help you get your bond back. We follow a comprehensive checklist that meets real estate standards and includes all the necessary cleaning tasks required by property managers.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {endOfLeasePricing.map((rate) => (
                <div 
                  key={rate.title}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
                >
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{rate.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">{rate.description}</p>
                      <div className="mb-4 sm:mb-6">
                        <div className="text-xs sm:text-sm text-gray-500">Price Range</div>
                        <div className="text-2xl sm:text-3xl font-bold">{rate.priceRange}</div>
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
                      href="/book?selectedServices=End%20of%20Lease%20Cleaning"
                      onClick={handleLinkClick}
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


        {/* Additional Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              Service Pricing Details
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Detailed pricing information for all our cleaning services
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalServices.map((service) => (
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
                      <p className="text-sm sm:text-base text-gray-600 border-t pt-4">
                        {service.description}
                      </p>
                    </div>
                    <Link
                      href="/book"
                      onClick={handleLinkClick}
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