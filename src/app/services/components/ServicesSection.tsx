import Link from "next/link";
import { Button } from "./ui/Button";

type Service = {
  title: string;
  description: string;
  bullets: string[];
  cta?: string;
  highlight?: boolean;
  priceLine?: string;
  priceSub?: string;
  note?: string;
  learnMoreLink?: string;
};

const PRIMARY_SERVICES: Service[] = [
  {
    title: "Regular Cleaning",
    description:
      "Weekly or fortnightly cleans to keep your home.",
    bullets: [
      "Police checked and insured cleaners",
      "Customised cleaning plan",
      "Flexible scheduling",
    ],
    priceLine: "From $92.05 for 2 hours",
    priceSub: "$38/hour thereafter",
    note: "Minimum 2 hours • Weekly or fortnightly options",
    cta: "Get Instant Pricing",
    highlight: true,
    learnMoreLink: "/services/regular-cleaning",
  },
  {
    title: "Once-Off Cleaning",
    description:
      "Deep clean for a fresh reset or special occasion.",
    bullets: [
      "Top-to-bottom comprehensive clean",
      "All equipment and products supplied",
      "Attention to detail",
    ],
    priceLine: "From $161 for 3 hours",
    priceSub: "$45/hour thereafter",
    note: "Minimum 3 hours",
    cta: "Get Instant Pricing",
    learnMoreLink: "/services/once-off-cleaning",
  },
  {
    title: "NDIS Cleaning",
    description:
      "Support-focused cleaning for eligible participants (self or plan managed).",
    bullets: [
      "Police checked, reliable team",
      "Tailored cleaning to needs",
      "Public liability insurance",
    ],
    priceLine: "From $56/hour base rate",
    priceSub: "Same rate for any number of hours",
    note: "Minimum 2 hours",
    cta: "Get Instant Pricing",
    learnMoreLink: "/services/ndis-cleaning",
  },
];

const SECONDARY_SERVICES: Service[] = [
  {
    title: "Airbnb Cleaning",
    description: "Fast turnovers with hotel-standard presentation.",
    bullets: [],
    learnMoreLink: "/services/airbnb-cleaning",
  },
  {
    title: "End of Lease Cleaning",
    description: "Move-in / Move-out cleaning to meet inspection standards.",
    bullets: [],
    learnMoreLink: "/services/end-of-lease-cleaning",
  },
  {
    title: "Commercial Cleaning",
    description: "Small offices and light commercial spaces.",
    bullets: [],
    learnMoreLink: "/services/commercial-cleaning",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-white  md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Professional Cleaning Services in Melbourne
          </h2>
          <p className="mt-2 text-gray-600">
            Choose the cleaning that fits your home and schedule.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PRIMARY_SERVICES.map((s) => (
            <article
              key={s.title}
              className={`rounded-xl border ${
                s.highlight ? "border-blue-200 bg-blue-50 hover:border-blue-300" : "border-gray-200 bg-white hover:border-gray-300"
              } p-6 shadow-sm transition duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col relative`}
            >
              {s.highlight && (
                <div className="absolute -top-3 left-4">
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 shadow">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{s.title}</h3>
                {s.priceLine && (
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{s.priceLine}</p>
                    {s.priceSub && (
                      <p className="text-xs text-gray-600">{s.priceSub}</p>
                    )}
                  </div>
                )}
              </div>
              <p className="mt-3 text-gray-600">{s.description}</p>
              {s.bullets.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.cta && (
                <div className="mt-6">
                  {s.note && (
                    <p className="mb-4 mt-4 text-xs text-gray-600 text-left">{s.note}</p>
                  )}
                  <Link href={`/book?selectedServices=${encodeURIComponent(s.title)}`}>
                    <Button className="w-full bg-[#1E3D8F] hover:bg-[#1E3D8F]/90" size="lg">
                      {s.cta}
                    </Button>
                  </Link>
                  {s.learnMoreLink && (
                    <div className="mt-3 text-center">
                      <Link href={s.learnMoreLink} className="text-xs text-gray-500 hover:text-gray-700 underline">
                        Learn more
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 mb-2 text-center">
          <h3 className="text-lg font-semibold text-gray-900">Other services</h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECONDARY_SERVICES.map((s) => (
            <article key={s.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group flex flex-col">
              <div className="mb-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
              </div>
              
              <div className="flex w-full gap-2">
                <Link 
                  href={s.learnMoreLink || "#"} 
                  className="flex-1 inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Learn More
                </Link>
                
                <Link 
                  href={`/book?selectedServices=${encodeURIComponent(s.title)}`}
                  className="flex-[0.6] inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-[#1E3D8F] rounded-lg hover:bg-[#1E3D8F]/90 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm hover:shadow-md"
                >
                  <span>Book Now</span>
                  <svg className="ml-2 w-4 h-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


