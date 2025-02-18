"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo } from 'react'

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    readTime: string;
    lastUpdated: string;
    coverImage: string;
    author: {
        name: string;
        image: string;
    }
}

interface Pagination {
    totalBlogs: number;
    postsPerPage: number;
    totalPages: number;
}

interface LatestBlogsProps {
    initialBlogs: BlogPost[];
    initialPagination: Pagination;
    excludeSlug?: string;
}

export default function LatestBlogs({ 
    initialBlogs,    
    excludeSlug
}: LatestBlogsProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3; // Keep 3 posts per page for clean UI

    // Filter out excluded slug if any
    const filteredBlogs = useMemo(() => {
        return excludeSlug 
            ? initialBlogs.filter(blog => blog.slug !== excludeSlug)
            : initialBlogs;
    }, [initialBlogs, excludeSlug]);

    // Calculate pagination based on all available blogs
    const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
    
    // Get current posts for display
    const currentPosts = useMemo(() => {
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        return filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
    }, [filteredBlogs, currentPage]);

    if (!initialBlogs.length) return null;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentPosts.map((blog) => (
                        <Link 
                            key={blog.slug}
                            href={`/blogs/${blog.slug}`}
                            className="group"
                        >
                            <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                                <Image
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-[#1E3D8F] 
                                transition-colors duration-200">
                                {blog.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {blog.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={blog.author.image}
                                        alt={blog.author.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                    <span className="text-sm font-medium">{blog.author.name}</span>
                                </div>
                                <span className="text-sm text-gray-500">{blog.readTime}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Static Pagination */}
                {totalPages > 1 && (
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
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-lg hover:bg-gray-100 transition-colors
                                    ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
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
        </div>
    );
} 