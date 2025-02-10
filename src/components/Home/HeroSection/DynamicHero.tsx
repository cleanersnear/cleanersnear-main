'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LocationBadge } from '@/components/shared/LocationBadge'
import { HeroProps } from './types'
import { MELBOURNE_REGIONS } from '@/utils/location/regions'


// Create a helper function to get nearby suburbs based on council
function getNearbySuburbs(city: string): string[] {
  // Find the council and region for the current city
  let cityCouncil = '';
  

  // Find the city's council and region
  for (const region of Object.values(MELBOURNE_REGIONS)) {
    for (const council of region.councils) {
      if (council.key_suburbs.includes(city)) {
        cityCouncil = council.name;

        
        break;
      }
    }
    if (cityCouncil) break;
  }

  if (!cityCouncil) return [];

  // Get nearby suburbs from the same council
  const nearbySuburbs: string[] = [];
  
  // Find suburbs in the same council
  for (const region of Object.values(MELBOURNE_REGIONS)) {
    const council = region.councils.find(c => c.name === cityCouncil);
    if (council) {
      nearbySuburbs.push(
        ...council.key_suburbs
          .filter(suburb => suburb !== city)
          .slice(0, 3)
      );
    }
  }

  return nearbySuburbs;
}

// Update the content generation
function generateAreaContent(location: HeroProps['location']): string {
  const { city } = location;
  const surroundingSuburbs = getNearbySuburbs(city);
  
  let content = `Expert residential and commercial cleaning services in ${city}`;
  
  if (surroundingSuburbs.length > 0) {
    content += ` and surrounding areas including ${surroundingSuburbs.join(', ')}`;
  }
  
  content += `. Trusted by Melbourne's finest homes and businesses. Professional end of lease cleaning, NDIS cleaning, and regular house cleaning services. Fully insured with comprehensive coverage.`;
  
  return content;
}

export default function DynamicHero({ location, businessInfo }: HeroProps) {
  const areaContent = generateAreaContent(location);

  return (
    <section className="relative h-auto md:h-[800px]">
      {/* Desktop background image */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src="/images/hero-bg.webp"
          alt={`Professional Cleaning Services in ${location.city}`}
          fill
          className="object-cover object-center brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      {/* Content and mobile image container */}
      <div className="relative md:absolute inset-0">
        <div className="container mx-auto px-4 h-full">
          {/* Content section */}
          <div className="flex flex-col md:flex-row pt-36 md:pt-32">
            {/* Text content */}
            <div className="max-w-2xl text-black md:text-white">
              <LocationBadge 
                city={location.city}
                region="VIC"
                className="mb-4 md:mb-8 scale-90 origin-left md:scale-100"
              />

              <h1 className="text-xl md:text-4xl font-bold mb-5 md:mb-8 leading-tight md:leading-normal">
                Professional Cleaning Services in {location.city} | End of Lease & NDIS Cleaning Experts
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mb-6 md:mb-8 text-xs md:text-base">
                <span className="bg-[#1E3D8F]/5 md:bg-transparent rounded-full px-3 py-1.5 md:p-0 text-black/90 md:text-white/90 flex items-center">
                  <svg className="w-3.5 h-3.5 md:w-5 md:h-5 mr-1 md:mr-2 text-[#FFA500]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Police Checked
                </span>
                <span className="bg-[#1E3D8F]/5 md:bg-transparent rounded-full px-3 py-1.5 md:p-0 text-black/90 md:text-white/90 flex items-center">
                  <svg className="w-3.5 h-3.5 md:w-5 md:h-5 mr-1 md:mr-2 text-[#1E3D8F]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1z" />
                  </svg>
                  {businessInfo.yearsInBusiness}+ Years
                </span>
                <span className="bg-[#1E3D8F]/5 md:bg-transparent rounded-full px-3 py-1.5 md:p-0 text-black/90 md:text-white/90 flex items-center">
                  <svg className="w-3.5 h-3.5 md:w-5 md:h-5 mr-1 md:mr-2 text-[#4CAF50]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Fully Insured
                </span>
              </div>

              <p className="text-sm md:text-xl mb-6 md:mb-10 leading-relaxed opacity-90">
                {areaContent}
              </p>

              <div className="flex flex-col md:flex-row gap-3 md:gap-4 px-3 md:px-0 mb-6 md:mb-0">
                <Link 
                  href="/quick-book"
                  className="w-[calc(100%-16px)] md:w-auto mx-auto md:mx-0 bg-[#FFA500] text-white px-4 md:px-8 py-2.5 md:py-3 text-sm md:text-lg font-semibold hover:bg-opacity-80 transition-all duration-200 text-center flex items-center justify-center md:rounded-none"
                >
                  Book Your Clean Online
                  <ArrowRight className="ml-2 w-4 h-4 md:w-[18px] md:h-[18px]" />
                </Link>
                <Link 
                  href="tel:0450124086"
                  className="w-[calc(100%-16px)] md:w-auto mx-auto md:mx-0 bg-white text-[#1E3D8F] border-2 border-[#1E3D8F] px-4 md:px-8 py-2.5 md:py-3 text-sm md:text-lg font-semibold hover:bg-[#1E3D8F] hover:text-white transition-all duration-200 text-center flex items-center justify-center md:rounded-none"
                >
                  CALL 0450124086
                  <ArrowRight className="ml-2 w-4 h-4 md:w-[18px] md:h-[18px]" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile image below content */}
          <div className="md:hidden w-full h-[300px] relative mt-8">
            <Image
              src="/images/hero-bg.webp"
              alt={`Professional Cleaning Services in ${location.city}`}
              fill
              className="object-cover object-center rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
} 