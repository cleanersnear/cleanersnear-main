'use client'
import Image from 'next/image'
import Link from 'next/link'



// Services data
const services = [
    {
      title: 'Move In/Move Out Cleaning',
      slug: 'move-in-cleaning',
      description: 'Moving out? Our end-of-lease cleaning service ensures you leave the property in pristine condition. We handle everything from deep cleaning carpets to scrubbing kitchens and bathrooms.',
      price: 'Starts from: $275',
      image: '/images/Movein.png',
      link: '/services/move-in-cleaning',
      isPopular: true
    },
    {
      title: 'Carpet Cleaning',
      slug: 'carpet-cleaning',
      description: 'Our carpet cleaning service uses deep-cleaning techniques to remove stains, dirt, and allergens, leaving your carpets looking fresh and new. Ideal for homes, offices, and commercial spaces.',
      price: 'Starts from : $35 - $55 ( each)',
      image: '/images/carpet-cleaning.png',
      link: '/services/carpet-cleaning'
    },
    {
      title: 'NDIS Cleaning',
      description: 'We offer specialized cleaning services under the NDIS (National Disability Insurance Scheme), ensuring your home remains clean, safe, and hygienic.',
      price: 'Hourly rate: $35 - $50 per hour',
      image: '/images/ndis-cleaning.jpg',
      link: '/services/ndis-cleaning'
    },
    {
      title: 'Window Cleaning',
      description: 'Our window cleaning service ensures streak-free windows, providing a clear view inside and out. Whether it\'s your home or office, we can handle both interior and exterior window cleaning.',
      price: 'From $299',
      image: '/images/windows-cleaning.png',
      link: '/services/window-cleaning'
    },
    {
      title: 'Oven Cleaning',
      description: 'Our oven cleaning service is perfect for households or businesses that want their ovens thoroughly cleaned. We remove grease, grime, and burnt-on food to restore your oven\'s cleanliness.',
      price: 'From $80',
      image: '/images/oven-cleaning.jpg',
      link: '/services/oven-cleaning'
    },
    {
      title: 'General Cleaning',
      description: 'Our comprehensive general cleaning service covers all aspects of home cleaning, from dusting and vacuuming to bathroom and kitchen cleaning, ensuring your space stays fresh and hygienic.',
      price: 'Hourly rate: $35 - $45',
      image: '/images/general-cleaning.jpg',
      link: '/services/general-cleaning'
    }
  ]
  
export default function ServicesGrid() {
  
  return (
    <>
      {/* Services Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div className="w-full md:w-auto">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
                <span className="text-xs md:text-sm uppercase tracking-wider text-center">SERVICES</span>
                <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
              </div>
              <h2 className="text-xl md:text-4xl font-bold text-center mb-4 md:mb-0">
                Our Comprehensive&nbsp;<br className="hidden md:block" />
                Cleaning Services
              </h2>
              {/* Mobile More Services Button */}
              <Link 
                href="/services"
                className="w-full bg-white text-[#1E3D8F] border-2 border-[#1E3D8F] px-4 py-3 text-sm font-semibold hover:bg-[#1E3D8F] hover:text-white transition-all duration-200 text-center mt-4 block md:hidden"
              >
                MORE SERVICES
              </Link>
            </div>
            {/* Desktop More Services Button */}
            <Link 
              href="/services"
              className="hidden md:block bg-[#FFA500] text-white px-6 py-3 rounded-md hover:bg-opacity-90"
            >
              MORE SERVICES
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {services.map((service) => (
              <Link 
                href={service.link} 
                key={service.title}
                className="block mb-6 md:mb-0"
              >
                <div 
                  className="bg-white rounded-lg shadow-lg overflow-visible relative group 
                    hover:shadow-xl transition-all duration-300 flex flex-col h-full mt-6
                    transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {service.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 
                      bg-green-500 text-white px-4 md:px-6 py-1 md:py-1.5 rounded-full 
                      text-xs md:text-sm font-semibold shadow-md">
                      Popular
                    </div>
                  )}
                  
                  <div className="relative h-48 md:h-64 overflow-hidden rounded-t-lg">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-xs md:text-base text-gray-600 mb-4 flex-grow line-clamp-3 md:line-clamp-none">
                      {service.description}
                    </p>

                    <div className="flex flex-col gap-2 md:gap-3">
                      <div className="flex items-center justify-between md:flex-row md:items-center gap-1 md:gap-0">
                        <span className="text-[#1E3D8F] font-bold text-base md:text-xl">
                          {service.price}
                        </span>
                        
                        {/* Mobile Arrow Button */}
                        <div className="md:hidden flex items-center justify-center w-8 h-8 rounded-full 
                          bg-[#1E3D8F] text-white hover:bg-opacity-90 transition-all duration-200">
                          <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M9 5l7 7-7 7" 
                            />
                          </svg>
                        </div>
                        
                        {/* Desktop See Pricing Link */}
                        <span className="hidden md:block text-[#1E3D8F] text-base hover:text-opacity-80 
                          transition-all duration-200">
                          See Details
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
} 