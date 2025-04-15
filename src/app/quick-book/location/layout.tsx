import BookingHeader from '@/app/quick-book/components/layout/BookingHeader'
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "Book Cleaning Services Melbourne | Instant Online Booking | Same Day Service",
        template: "%s | Quick Book Cleaning Services Melbourne"
    },
    description: "Book professional cleaning services in Melbourne instantly. Available in all Melbourne suburbs | Same-day service | Flexible scheduling | Professional cleaners | 100% satisfaction guaranteed",
    openGraph: {
        title: "Book Professional Cleaning Services Melbourne | Instant Online Booking",
        description: "Book your cleaning service in Melbourne now. Available across Melbourne | Professional cleaners | Same-day service | Free quotes | Satisfaction guaranteed",
        type: 'website',
        url: 'https://www.cleaningprofessionals.com.au/quick-book/location',
        siteName: 'Cleaning Professionals Melbourne',
        images: [
            {
                url: 'https://www.cleaningprofessionals.com.au/images/booking-location.jpg',
                width: 1200,
                height: 630,
                alt: 'Book Professional Cleaning Services Melbourne'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Book Cleaning Services Melbourne | Instant Online Booking',
        description: 'Book your professional cleaning service in Melbourne now. Available across all Melbourne suburbs with same-day service options.',
        images: ['https://www.cleaningprofessionals.com.au/images/booking-location.jpg']
    },
    keywords: [
        'book cleaning service melbourne',
        'melbourne cleaning booking',
        'instant cleaning booking melbourne',
        'same day cleaning service melbourne',
        'professional cleaners melbourne booking',
        'online cleaning booking melbourne',
        'book house cleaning melbourne',
        'book commercial cleaning melbourne',
        'cleaning service location melbourne',
        'cleaning service suburbs melbourne',
        'quick book cleaning melbourne',
        'instant cleaning service booking'
    ].join(', '),
    alternates: {
        canonical: 'https://www.cleaningprofessionals.com.au/quick-book/location'
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        }
    }
}

export default function LocationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white">
            <BookingHeader />
            <main className="pt-24">
                <div className="w-full max-w-[800px] mx-auto px-4 lg:px-6">
                    {children}
                </div>
            </main>
        </div>
    );
} 