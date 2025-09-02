import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Airbnb Cleaning Melbourne | Professional Short Stay Cleaning',
  description: 'Book your professional Airbnb cleaning service in Melbourne. Easy online booking for studio, 1, 2, 3, and 4+ bedroom properties. Same-day service available.',
  keywords: 'book airbnb cleaning melbourne, airbnb cleaning booking, airbnb cleaner booking, short stay cleaning booking, holiday rental cleaning melbourne',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Book Airbnb Cleaning Melbourne | Professional Short Stay Cleaning',
    description: 'Book your professional Airbnb cleaning service in Melbourne. Easy online booking for all property sizes.',
    url: 'https://www.cleaningprofessionals.com.au/services/airbnb-cleaning/book/',
    siteName: 'Cleaning Professionals Melbourne',
    locale: 'en_AU',
    type: 'website',
  },
  alternates: {
    canonical: '/services/airbnb-cleaning/book/',
  },
}

export default function AirbnbCleaningBookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
