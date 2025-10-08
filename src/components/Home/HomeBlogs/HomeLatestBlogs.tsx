"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Calendar, User, Tag } from 'lucide-react'
import BlogImage from '@/app/blogs/components/BlogImage'

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    readTime: string;
    lastUpdated: string;
    coverImage: string;
    category: string;
    author: {
        name: string;
        image: string;
    }
    categories?: string[];
    tags?: string[];
}

interface Pagination {
    totalBlogs: number;
    postsPerPage: number;
    totalPages: number;
}

export default function HomeLatestBlogs() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<Pagination>({ totalBlogs: 0, postsPerPage: 3, totalPages: 0 });

    useEffect(() => {
        const fetchLatestBlogs = async () => {
            try {
                const base = process.env.NEXT_PUBLIC_API_URL?.trim();
                const url = base && base.startsWith('http') 
                  ? `${base}/api/blog/latest`
                  : `/api/blog/latest`;
                const res = await fetch(url, { cache: 'no-store' });
                if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                const data = await res.json();
                const items = Array.isArray(data?.blogs) ? data.blogs : [];
                setBlogs(items);
                setPagination({
                    totalBlogs: items.length,
                    postsPerPage: 3,
                    totalPages: Math.ceil(items.length / 3)
                });
            } catch (error) {
                console.error('Error fetching latest blogs:', error);
                setBlogs([]);
                setPagination({ totalBlogs: 0, postsPerPage: 3, totalPages: 0 });
            }
        };

        fetchLatestBlogs();
    }, []);

    // Calculate current posts for display
    const currentPosts = blogs.slice(
        (currentPage - 1) * pagination.postsPerPage,
        currentPage * pagination.postsPerPage
    );

    if (!blogs.length) return null;

    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <div className="w-full md:w-auto">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                            <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
                    <span className="text-xs md:text-sm uppercase tracking-wider text-center text-[#1E3D8F]">BLOGS</span>
                            <div className="w-8 md:w-12 h-[1px] bg-gray-300"></div>
                        </div>
                        <h2 className="text-center text-xl md:text-4xl font-bold mt-2 mb-4 md:mb-0">
                            Tips to keep the&nbsp;<br className="hidden md:block" />
                            surroundings clean
                        </h2>
                <Link 
                    href="/blogs"
                    className="w-full md:w-auto bg-white text-[#1E3D8F] border-2 border-[#1E3D8F] md:border-0 md:bg-[#1E3D8F] md:text-white px-4 md:px-6 py-3 md:py-3 text-sm md:text-base hover:bg-[#1E3D8F]/10 md:hover:bg-[#1E3D8F]/90 transition-all duration-200 text-center mt-4 block md:hidden rounded-lg"
                >
                            VIEW ALL POSTS
                        </Link>
                    </div>
                    {/* Desktop View All Posts button */}
                    <Link 
                        href="/blogs"
                className="hidden md:block bg-[#1E3D8F] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all duration-200"
                    >
                        VIEW ALL POSTS
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {currentPosts.map((blog) => (
                        <div 
                            key={blog.slug} 
                            className="bg-white rounded-lg shadow-lg overflow-hidden relative
                                transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                        >
                            <Link href={`/blogs/${blog.slug}`}>
                                <div className="relative h-48">
                                    <BlogImage
                                        src={blog.coverImage}
                                        alt={blog.title}
                                        className="object-cover"
                                        fill={true}
                                    />
                                    {/* Category badge from API (primary category) */}
                                    <div className="absolute top-3 left-3">
                                      <span className="inline-block rounded-full bg-blue-100/90 text-[#1E3D8F] px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                                        {blog.category || 'General'}
                                      </span>
                                    </div>
                                </div>
                                <div className="p-4 pb-12">
                                    {/* Blog Meta Info - Only visible on desktop */}
                                    <div className="hidden md:flex flex-wrap gap-3 mb-2 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>{new Date(blog.lastUpdated).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User size={14} />
                                            <span>{blog.author.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Tag size={14} />
                                            <span>{blog.readTime}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold mb-1 group-hover:text-[#1E3D8F] 
                                        transition-colors duration-200 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2 text-sm line-clamp-2">{blog.excerpt}</p>
                                </div>
                            </Link>
                            
                            {/* Fixed Position Read More Link */}
                            <div className="absolute bottom-0 right-0 p-4">
                                <span className="text-xs font-medium text-gray-500 hover:text-[#1E3D8F] transition-colors duration-200 flex items-center gap-1 cursor-pointer">
                                    Continue Reading
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                {pagination.totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-lg hover:bg-gray-100 transition-colors
                                    ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label="Previous page"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                                </svg>
                            </button>
                            
                            <span className="text-sm font-medium">
                                Page {currentPage} of {pagination.totalPages}
                            </span>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                                disabled={currentPage === pagination.totalPages}
                                className={`p-2 rounded-lg hover:bg-gray-100 transition-colors
                                    ${currentPage === pagination.totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label="Next page"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
} 
