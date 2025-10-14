import Link from "next/link";
import { Button } from "../../components/ui/Button";

interface LocationData {
  name: string;
  region: string;
  council: string;
  mainSuburbs: string[];
  postcode: string;
}

interface PricingStructureProps {
  locationData: LocationData;
}

const PRICING_PLANS = [
  {
    name: "Standard Deep Clean",
    description: "Comprehensive deep cleaning for most homes and apartments",
    price: "From $161",
    duration: "3 hours minimum",
    hourlyRate: "$45/hour thereafter",
    features: [
      "Deep cleaning all rooms",
      "Inside appliances included",
      "Window cleaning",
      "100% satisfaction guarantee"
    ],
    popular: true,
    note: "Most popular choice"
  },
  {
    name: "Premium Deep Clean",
    description: "Extensive cleaning for large homes or heavy-duty requirements",
    price: "From $296",
    duration: "6 hours minimum", 
    hourlyRate: "$45/hour thereafter",
    features: [
      "Everything in Standard",
      "Carpet cleaning",
      "Oven deep clean",
      "Extra attention to details"
    ],
    popular: false,
    note: "For extensive cleaning needs"
  }
];

export function PricingStructure({ locationData }: PricingStructureProps) {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <section className="bg-[#F7FAFF] py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent{" "}
            <span className="text-[#1E3D8F]">Pricing</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            No hidden fees, no surprises. Choose the deep cleaning package that works best for your {capitalizeFirstLetter(locationData.name)} home and requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] ${
                plan.popular ? 'ring-2 ring-[#1E3D8F] hover:ring-[#1E3D8F] hover:ring-4' : 'hover:ring-2 hover:ring-[#1E3D8F]'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-[#1E3D8F] text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className={`p-6 lg:p-8 ${plan.popular ? 'pt-12' : ''}`}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-[#1E3D8F]">{plan.price}</div>
                    <div className="text-sm text-gray-500 mt-1">{plan.duration}</div>
                    <div className="text-sm text-gray-500">{plan.hourlyRate}</div>
                  </div>
                  
                  <div className="inline-block bg-blue-100 text-[#1E3D8F] px-3 py-1 rounded-full text-sm font-medium">
                    {plan.note}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-[#1E3D8F]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/book?selectedServices=Once-Off%20Cleaning&location=${encodeURIComponent(locationData.name)}`}>
                  <Button 
                    size="lg" 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-[#1E3D8F] hover:bg-[#1E3D8F]/90 text-white' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    Book {plan.name}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        {/* <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Need a Custom Solution?</h3>
            <p className="text-gray-600 mb-6">
              Every Melbourne home is unique. Contact us to discuss custom cleaning schedules, 
              additional services, or special requirements. We&apos;re here to create the perfect cleaning plan for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-[#1E3D8F] text-[#1E3D8F] hover:bg-[#1E3D8F] hover:text-white">
                  Contact Us
                </Button>
              </Link>
              <Link href="/book?selectedServices=Regular%20Cleaning&frequency=Weekly">
                <Button size="lg" className="bg-[#1E3D8F] hover:bg-[#1E3D8F]/90 text-white">
                  Get Instant Quote
                </Button>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}