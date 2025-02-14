'use client';

import { usePathname } from 'next/navigation';
import BookingHeader from '@/app/quick-book/components/layout/BookingHeader'


export default function QuickBookLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const showSidebar = !pathname.includes('/location') && !pathname.includes('/service');

    return (
        <div className="min-h-screen bg-white">
            <BookingHeader />
            
            <main className={`pt-24 ${showSidebar ? 'md:pl-72' : ''}`}>
                <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-6">
                    {children}
                </div>
            </main>
        </div>
    )
} 