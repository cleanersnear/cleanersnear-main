'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export function BookingHeader() {
  const searchParams = useSearchParams()
  const fromGetQuote = searchParams.get('source') === 'get-quote'
  const phone = process.env.NEXT_PUBLIC_PHONE ?? "0000 000 000";
  const sanitizedPhone = phone.replace(/\s/g, "");

  return (
    <div className="flex items-center justify-between pb-6 border-b border-gray-200">
      <div className="flex items-center gap-6">
        <Link href="/" className="hidden md:inline-block">
          <Image
            src="/images/logo.webp"
            alt="Cleaning Professionals"
            width={120}
            height={40}
            className="object-contain w-[100px] md:w-[120px]"
          />
        </Link>
        <div className="hidden md:block h-8 w-px bg-gray-300"></div>
        <h1 className="text-lg font-medium text-gray-600">{fromGetQuote ? 'Get Instant Pricing Quote' : 'Book Your Clean'}</h1>
      </div>
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

