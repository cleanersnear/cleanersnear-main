import Link from "next/link";
import { Button } from "../../components/ui/Button";
const SERVICES = [
  "Complete linen change",
  "Bathroom deep clean", 
  "Kitchen sanitization",
  "Floor mopping & vacuuming",
  "Surface dusting",
  "Mirror & glass cleaning",
  "Trash removal",
  "Amenity restocking",
  "Bed making",
  "Guest-ready presentation",
  "Quality inspection",
  "Fast turnaround"
];

export function WhatsIncluded() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              What&apos;s included in Airbnb cleaning?
            </h2>
            <p className="mt-4 text-gray-600">
              Our comprehensive Airbnb cleaning covers complete linen change, bathroom deep clean, kitchen sanitization, amenity restocking and more. Fast turnovers with hotel-standard presentation for your short-term rental.
            </p>
            <div className="mt-6">
              <Link href="/about/how_it_works">
                <Button variant="outline" size="md">
                  How it works
                </Button>
              </Link>
            </div>
          </div>
          
          <div>
            {/* Standard Services */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Standard Services:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SERVICES.map((service, index) => (
                  <div 
                    key={service}
                    className={`flex items-center gap-2 p-2 rounded ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex-shrink-0 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Extras Section - Full Width */}
        <div className="mt-12">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Extras:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="flex items-center gap-2 p-2 rounded bg-gray-50">
                <div className="flex-shrink-0 w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Linen replacement <span className="text-xs text-gray-500">(extra charge)</span></span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-gray-50">
                <div className="flex-shrink-0 w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Deep oven cleaning <span className="text-xs text-gray-500">(extra charge)</span></span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-gray-50">
                <div className="flex-shrink-0 w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Carpet cleaning <span className="text-xs text-gray-500">(extra charge)</span></span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-gray-50">
                <div className="flex-shrink-0 w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Window cleaning <span className="text-xs text-gray-500">(extra charge)</span></span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-gray-50">
                <div className="flex-shrink-0 w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Express service <span className="text-xs text-gray-500">(extra charge)</span></span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-gray-50">
                <div className="flex-shrink-0 w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Accessories replacement <span className="text-xs text-gray-500">(custom pricing)</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
