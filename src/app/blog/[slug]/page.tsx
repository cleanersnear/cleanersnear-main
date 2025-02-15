import { notFound } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import Link from 'next/link'

// Types
interface Blog {
    title: string;
    content: string;
    cover_image: string;
    category: string;
    author: string;
    created_at: string;
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`)
    const blogs = await res.json()
    
    return blogs.map((blog: { slug: string }) => ({
        slug: blog.slug
    }))
}

// Fetch blog data
async function getBlog(slug: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`,
        { next: { revalidate: 3600 } } // Revalidate every hour
    )
    
    if (!res.ok) return null
    return res.json()
}

export default async function BlogDetailPage({ 
    params 
}: { 
    params: { slug: string } 
}) {
    const blog = await getBlog(params.slug)

    if (!blog) {
        notFound() // This will show the not-found page
    }

    return (
        <MainLayout>
            <article className="container mx-auto px-4 py-12 mt-32">
                <div className="max-w-4xl mx-auto">
                    {/* Back to blogs link */}
                    <Link 
                        href="/blog"
                        className="text-[#1E3D8F] hover:underline mb-8 inline-block"
                    >
                        ← Back to Blogs
                    </Link>

                    {/* Blog header */}
                    <div className="mb-8">
                        <span className="text-[#1E3D8F] font-medium">{blog.category}</span>
                        <h1 className="text-4xl font-bold mt-2 mb-4">{blog.title}</h1>
                        <div className="flex items-center text-gray-600">
                            <span>{blog.author}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Blog image */}
                    <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
                        <Image
                            src={blog.cover_image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Blog content */}
                    <div 
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </article>
        </MainLayout>
    )
} 
