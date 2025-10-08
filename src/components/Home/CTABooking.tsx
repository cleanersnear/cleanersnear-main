import LocationSearch from "../../app/book/components/AddressLookup/LocationSearch";

export function CTABooking() {
  const phone = process.env.NEXT_PUBLIC_PHONE ?? "0000 000 000";
  const sanitizedPhone = phone.replace(/\s/g, "");

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Get your Melbourne home cleaned in under 2 minutes.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our streamlined booking process makes it easy 
              to schedule your cleaning service. Simply enter 
              your postcode, choose your service, and we&apos;ll handle the rest.
            </p>
            
            <div className="mt-6">
              <LocationSearch />
            </div>
          </div>

          <div className="text-center lg:text-right">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Or speak with our Melbourne team</h3>
            <p className="text-gray-600 mb-6">
              Have questions? Our friendly customer service team is here to help with personalized advice for your cleaning needs.
            </p>
            
            <div className="space-y-4">
              <a
                href={`tel:${sanitizedPhone}`}
                className="inline-flex items-center justify-center w-full lg:w-auto px-8 py-3 bg-white text-[#1E3D8F] font-semibold rounded-lg border border-[#1E3D8F] hover:bg-blue-50 transition-colors"
              >
                Call {phone}
              </a>
              <p className="text-sm text-gray-500">
                Available MON-FRI 8:30am - 5pm AEST
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}