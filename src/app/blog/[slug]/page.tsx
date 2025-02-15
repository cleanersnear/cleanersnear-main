import { notFound } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import Link from 'next/link'

// Types based on your database structure
interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    category: string;
    author: string;
    created_at: string;
    updated_at: string;
    is_published: boolean;
    views: number;
    tags: string[];
}

// Fetch single blog post
async function getBlog(slug: string): Promise<Blog | null> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`,
        { next: { revalidate: 3600 } }
    )
    
    if (!res.ok) return null
    return res.json()
}

// Page component
export default async function BlogDetailPage({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}) {
    // First, await the params
    const resolvedParams = await params
    // Then use the slug
    const blog = await getBlog(resolvedParams.slug)

    if (!blog) {
        notFound()
    }

    return (
        <MainLayout>
            <article className="container mx-auto px-4 py-12 mt-32">
                <div className="max-w-4xl mx-auto">
                    <Link 
                        href="/blog"
                        className="text-[#1E3D8F] hover:underline mb-8 inline-block"
                    >
                        ← Back to Blogs
                    </Link>

                    <div className="mb-8">
                        <span className="text-[#1E3D8F] font-medium">{blog.category}</span>
                        <h1 className="text-4xl font-bold mt-2 mb-4">{blog.title}</h1>
                        <div className="flex items-center text-gray-600">
                            <span>{blog.author}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
                        <Image
                            src={blog.cover_image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div 
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>
            </article>
        </MainLayout>
    )
} 
