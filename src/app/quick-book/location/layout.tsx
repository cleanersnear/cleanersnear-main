import BookingHeader from '@/app/quick-book/components/layout/BookingHeader'
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Select Location - Quick Book Cleaning",
    description: "Choose your service location",
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