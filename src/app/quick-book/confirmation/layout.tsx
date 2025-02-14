import BookingHeader from '@/app/quick-book/components/layout/BookingHeader'
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Booking Confirmation - Quick Book Cleaning",
    description: "Your booking has been confirmed",
}

export default function ConfirmationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white">
            <BookingHeader />
            <main className="pt-12">
                <div className="w-full max-w-[800px]  px-4 lg:px-6">
                    {children}
                </div>
            </main>
        </div>
    );
} 