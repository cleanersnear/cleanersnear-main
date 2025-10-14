import Link from "next/link";
import { Button } from "../../components/ui/Button";
const SERVICES = [
  "Deep dusting all surfaces",
  "Mopping floors",
  "Kitchen deep clean",
  "Bathroom deep clean",
  "Inside appliances",
  "Window cleaning",
  "Cabinet cleaning",
  "Baseboard cleaning",
  "Door & frame cleaning",
  "Trash removal"
];

export function WhatsIncluded() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              What&apos;s included in move-in cleaning?
            </h2>
            <p className="mt-4 text-gray-600">
              Our comprehensive move-in cleaning ensures your new home is spotless and move-in ready. We clean every surface, appliance, and corner so you can start fresh in your new space.
            </p>
            <div className="mt-6">
              <Link href="/about/how_it_works">
                <Button variant="outline" size="md">
                  How it works
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
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
    </section>
  );
}
