'use client'

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { apiService } from '@/services/api';

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string;
    category: string;
    author: string;
    created_at: string;
}

const categories = ['All', 'Cleaning Tips', 'Home Maintenance', 'Commercial Cleaning', 'Green Cleaning'];

export default function BlogPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await apiService.fetchBlogs({
                    category: selectedCategory,
                    search: searchQuery
                });
                console.log('Fetched blogs:', data);
                setBlogs(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [selectedCategory, searchQuery]);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3D8F]"></div>
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <div className="text-xl text-red-500 mb-4">Error: {error}</div>
                    <button 
                        onClick={() => window.location.reload()}
                        className="text-[#1E3D8F] hover:underline"
                    >
                        Try again
                    </button>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12 mt-32">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest cleaning tips, industry news, and professional advice.
                    </p>
                </div>

                {/* Search and Categories */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            className="w-full p-4 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3D8F] focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute right-4 top-4 text-gray-400" size={24} />
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                                    selectedCategory === category
                                        ? 'bg-[#1E3D8F] text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Grid */}
                {blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No blogs found matching your criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {blogs.map((blog) => (
                            <Link 
                                href={`/blog/${blog.slug}`} 
                                key={blog.id}
                                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={blog.cover_image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="text-sm text-[#1E3D8F] mb-2">{blog.category}</div>
                                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>{blog.author}</span>
                                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
} 