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
    name: "Studio/1 Bed",
    description: "Perfect for studio apartments and 1 bedroom units",
    price: "From $205",
    features: [
      "Bond back guarantee",
      "REIV checklist compliant",
      "Professional equipment used",
      "All cleaning supplies included",
      "Detailed cleaning checklist"
    ],
    note: "Great value"
  },
  {
    name: "2 Bed",
    description: "Perfect for 2 bedroom homes and apartments",
    price: "From $310",
    features: [
      "Bond back guarantee",
      "REIV checklist compliant",
      "Professional equipment used", 
      "All cleaning supplies included",
      "Detailed cleaning checklist"
    ],
    note: "Popular choice"
  },
  {
    name: "3 Bed",
    description: "Ideal for 3 bedroom houses and larger apartments",
    price: "From $450",
    features: [
      "Bond back guarantee",
      "REIV checklist compliant",
      "Professional equipment used",
      "All cleaning supplies included", 
      "Detailed cleaning checklist"
    ],
    note: "Comprehensive cleaning"
  },
  {
    name: "4 Bed",
    description: "Perfect for large 4 bedroom houses",
    price: "From $625",
    features: [
      "Bond back guarantee",
      "REIV checklist compliant",
      "Professional equipment used",
      "All cleaning supplies included",
      "Detailed cleaning checklist"
    ],
    note: "Premium service"
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
            No hidden fees, no surprises. Choose the end of lease cleaning package that works best for your {capitalizeFirstLetter(locationData.name)} property size and get your bond back guaranteed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] border border-[#1E3D8F]"
            >
              <div className="p-6 lg:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{plan.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-3xl lg:text-4xl font-bold text-[#1E3D8F]">{plan.price}</div>
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
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={`/book?selectedServices=End%20of%20Lease%20Cleaning&location=${encodeURIComponent(locationData.name)}`}>
                  <Button 
                    size="lg" 
                    className="w-full bg-[#1E3D8F] hover:bg-[#1E3D8F]/90 text-white"
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 