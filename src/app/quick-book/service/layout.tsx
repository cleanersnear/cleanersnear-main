import BookingHeader from '@/app/quick-book/components/layout/BookingHeader'
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Select Service - Quick Book Cleaning",
    description: "Choose your cleaning service",
}

export default function ServiceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white">
            <BookingHeader />
            <main className="pt-16">
                {children}
            </main>
        </div>
    );
} 