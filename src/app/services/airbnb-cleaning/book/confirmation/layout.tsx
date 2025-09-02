import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Booking Confirmation | Airbnb Cleaning Melbourne',
  description: 'Your Airbnb cleaning booking has been confirmed. View your booking details and next steps.',
  robots: {
    index: false, // Don't index confirmation pages
    follow: false,
  },
}

export default function ConfirmationLayout({
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





