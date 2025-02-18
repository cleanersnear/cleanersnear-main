"use client"

import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface SearchResult {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    coverImage: string;
    author: {
        name: string;
        image: string;
    }
}

interface SearchResponse {
    blogs: SearchResult[];
}

export default function SearchBlog() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)

    // Fetch search results
    useEffect(() => {
        const searchBlogs = async () => {
            if (!search.trim()) {
                setResults([]);
                return;
            }

            try {
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/search/data?query=${encodeURIComponent(search)}`, {
                    next: { 
                        revalidate: 1
                    }
                });
                
                if (!res.ok) throw new Error('Failed to search blogs');
                const data: SearchResponse = await res.json();
                setResults(data.blogs);
            } catch (error) {
                console.error('Search error:', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search
        const timeoutId = setTimeout(searchBlogs, 300);
        return () => clearTimeout(timeoutId);
    }, [search]);

    return (
        <div className="relative max-w-[90%] sm:max-w-2xl mx-auto -mt-8 px-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-2">Search Our Blog</h2>
                <p className="text-gray-600 text-sm mb-4">
                    Discover articles, guides, and expert cleaning tips
                </p>
                <div className="relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search articles..."
                        className="w-full p-4 pl-12 rounded-xl border border-gray-200 
                            focus:outline-none focus:ring-2 focus:ring-[#1E3D8F]
                            text-gray-600 placeholder:text-gray-400"
                    />
                    <Search 
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
                        size={20} 
                    />

                    {/* Overlay Search Results */}
                    {search.trim() && (
                        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl 
                            shadow-lg border border-gray-100 max-h-[400px] overflow-y-auto z-50">
                            <div className="p-2">
                                {loading ? (
                                    <p className="text-gray-500 text-sm p-3">Searching...</p>
                                ) : results.length > 0 ? (
                                    results.slice(0, 4).map((blog) => (
                                        <Link 
                                            key={blog.slug} 
                                            href={`/blogs/${blog.slug}`}
                                            className="block p-3 rounded-lg hover:bg-gray-50 
                                                transition-colors duration-200"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="relative w-14 h-14 rounded-lg 
                                                    overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={blog.coverImage}
                                                        alt={blog.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-medium text-sm mb-1 truncate">
                                                        {blog.title}
                                                    </h3>
                                                    <p className="text-xs text-gray-600 line-clamp-1">
                                                        {blog.excerpt}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                                        <span>{blog.category}</span>
                                                        <span>•</span>
                                                        <span>{blog.readTime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm p-3">No results found</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 