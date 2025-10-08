import { Suspense } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import FAQList from '@/components/features/FAQList';

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic';

async function getFaqs() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faqs`, {
            next: { 
                revalidate: 3600 // Revalidate every hour
            },
            cache: 'no-store' // Ensure no caching during build
        });
        
        if (!res.ok) {
            console.error('Failed to fetch FAQs:', res.status);
            return { faqs: [] }; // Return empty array on error
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        return { faqs: [] }; // Return empty array on error
    }
}

export default async function FAQsPage() {
    const initialFaqs = await getFaqs();

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12 mt-32">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about our cleaning services, booking process, and more.
                    </p>
                </div>

                <Suspense fallback={
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3D8F]"></div>
                    </div>
                }>
                    <FAQList initialFaqs={initialFaqs} />
                </Suspense>
            </div>
        </MainLayout>
    );
}