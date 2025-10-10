import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/Button";
import { Phone } from "lucide-react";
import { LocationBreadcrumb } from "../../components/LocationBreadcrumb";

interface LocationData {
  name: string;
  region: string;
  council: string;
  mainSuburbs: string[];
  postcode: string;
}

interface EOLCleaningHeroProps {
  locationData: LocationData;
  suburbSlug: string;
}

export function EOLCleaningHero({ locationData, suburbSlug }: EOLCleaningHeroProps) {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '1300 886 119';
  const phoneHref = `tel:${phone.replace(/\s+/g, '')}`;
  
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  return (
    <section className="relative bg-white py-8 sm:py-12 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 lg:space-y-8">
            <LocationBreadcrumb
              suburb={locationData.name}
              service="End of Lease Cleaning"
              suburbSlug={suburbSlug}
            />
            <div className="space-y-3 lg:space-y-4">
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-[#1E3D8F] rounded-full text-xs sm:text-sm font-medium">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1E3D8F] rounded-full mr-1.5 sm:mr-2"></span>
                Bond back guarantee
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                End of Lease Cleaning in{" "}
                <span className="text-[#1E3D8F]">{capitalizeFirstLetter(locationData.name)}</span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Professional end of lease cleaning in {capitalizeFirstLetter(locationData.name)} to help you get your bond back. REIV checklist compliant with bond back guarantee. From $205 for studio apartments.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#1E3D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">Bond Back Guarantee</span>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#1E3D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">REIV Checklist Compliant</span>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#1E3D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">Same-Day Available</span>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#1E3D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-700 font-medium">Professional Equipment</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href={`/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`}>
                <Button 
                  size="lg" 
                  className="bg-[#1E3D8F] hover:bg-[#1E3D8F]/90 text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                >
                  Book End of Lease Cleaning
                </Button>
              </Link>
              
              <Link href={`/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-[#1E3D8F] text-[#1E3D8F] hover:bg-[#1E3D8F] hover:text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-200 w-full sm:w-auto"
                >
                  Get Instant Quote
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 pt-4">
              <div className="flex items-center space-x-2">
              <Image src="/icons/google-icon.png" alt="Google icon" width={20} height={20} />
             
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <span className="text-sm sm:text-base text-gray-600 font-medium">4.9/5 (1,200+ reviews)</span>
              </div>
              
              <div className="text-sm sm:text-base text-gray-600">
                <span className="font-semibold">100+</span> {locationData.region} Suburbs
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative h-[350px] sm:h-[400px] lg:h-[500px] xl:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/end-of-lease-cleaning.png"
                alt={`Professional end of lease cleaning service in ${capitalizeFirstLetter(locationData.name)}`}
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay Card - Hidden on mobile */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:right-6 sm:left-auto sm:w-auto bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-lg hidden sm:block">
                 <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                   <div className="hidden sm:flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[#1E3D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900">Quick & Reliable</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Book in 60 seconds</p>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Link 
                      href={phoneHref}
                      className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-[#1E3D8F] hover:bg-[#1E3D8F]/90 text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 w-full sm:w-auto"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call {phone}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#1E3D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            {/* Mobile-only Call Now Button */}
            <div className="mt-4 sm:hidden">
              <Link
                href={phoneHref}
                className="inline-flex items-center justify-center w-full bg-[#1E3D8F] hover:bg-[#1E3D8F]/90 text-white px-6 py-3 text-base font-semibold rounded-lg transition-colors duration-200"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call {phone}
              </Link>
            </div>
          
          </div>
        </div>
      </div>

    </section>
  );
}
