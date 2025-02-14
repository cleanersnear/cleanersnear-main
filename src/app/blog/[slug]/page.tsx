'use client'

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { apiService } from '@/services/api';
import Link from 'next/link';

interface Blog {
    title: string;
    content: string;
    cover_image: string;
    category: string;
    author: string;
    created_at: string;
}

export default function BlogDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await apiService.fetchBlogBySlug(params.slug as string);
                console.log('Fetched blog:', data);
                setBlog(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch blog');
                console.error('Error fetching blog:', err);
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchBlog();
        }
    }, [params.slug]);

    const createMarkup = (html: string) => {
        return { __html: html };
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3D8F]"></div>
                </div>
            </MainLayout>
        );
    }

    if (error || !blog) {
        return (
            <MainLayout>
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <div className="text-xl text-red-500 mb-4">{error || 'Blog post not found'}</div>
                    <button 
                        onClick={() => router.push('/blog')}
                        className="text-[#1E3D8F] hover:underline"
                    >
                        Back to Blog List
                    </button>
                </div>
            </MainLayout>
        );
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
                        dangerouslySetInnerHTML={createMarkup(blog.content)}
                    />
                </div>
            </article>
        </MainLayout>
    );
} 