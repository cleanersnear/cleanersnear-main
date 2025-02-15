import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'
import BlogList from '@/components/features/BlogList'
import { Suspense } from 'react'

// Define metadata for SEO
export const metadata: Metadata = {
    title: 'Our Blog | Cleaners Near',
    description: 'Stay updated with the latest cleaning tips and industry insights'
}

// Simple data fetching with revalidation
async function getBlogs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
        next: { revalidate: 3600 }
    })
    if (!res.ok) throw new Error('Failed to fetch blogs')
    return res.json()
}

// Basic page component
export default async function BlogPage() {
    const blogs = await getBlogs()

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12 mt-32">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest cleaning tips, industry news, and professional advice.
                    </p>
                </div>
                <Suspense fallback={
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3D8F]"></div>
                    </div>
                }>
                    <BlogList initialBlogs={blogs} />
                </Suspense>
            </div>
        </MainLayout>
    )
} 
