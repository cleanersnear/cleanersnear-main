'use client'

import { useSearchParams } from 'next/navigation'

export function BookingHeader() {
  const searchParams = useSearchParams()
  const fromGetQuote = searchParams.get('source') === 'get-quote'
  const phone = process.env.NEXT_PUBLIC_PHONE ?? "0000 000 000";
  const sanitizedPhone = phone.replace(/\s/g, "");

  return (
    <div className="flex items-center justify-between pb-6 border-b border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900">{fromGetQuote ? 'Get Instant Pricing Quote' : 'Book Your Clean'}</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 hidden sm:inline">Need help?</span>
        <a
          href={`tel:${sanitizedPhone}`}
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
          Call {phone}
        </a>
      </div>
    </div>
  );
}

