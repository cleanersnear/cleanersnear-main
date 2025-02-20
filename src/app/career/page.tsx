import { Suspense } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CareerList from '@/components/features/CareerList';
import Image from 'next/image';

async function getCareers() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/careers`, {
        next: { 
            revalidate: 3600 // Revalidate every hour
        }
    });
    
    if (!res.ok) throw new Error('Failed to fetch careers');
    return res.json();
}

export default async function CareerPage() {
    const initialCareers = await getCareers();

    return (
        <MainLayout>
            <div className="relative h-[300px] mt-32">
                <Image
                    src="/images/career-hero.jpg"
                    alt="Join Our Cleaning Team"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E3D8F] to-transparent" />
                <div className="absolute inset-0 container mx-auto px-4 flex items-center">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
                        <p className="text-xl">
                            Build your career with Melbourne&apos;s leading cleaning service provider. We&apos;re always looking for dedicated professionals to join our growing team.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <Suspense fallback={
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3D8F]"></div>
                    </div>
                }>
                    <CareerList initialCareers={initialCareers} />
                </Suspense>
            </div>
        </MainLayout>
    );
} 