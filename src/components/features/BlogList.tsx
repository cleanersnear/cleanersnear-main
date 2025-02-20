'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'

// Types
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

interface BlogListProps {
    initialBlogs: Blog[]
}

const categories = ['All', 'Cleaning Tips', 'Home Maintenance', 'Commercial Cleaning', 'Green Cleaning']

export default function BlogList({ initialBlogs }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    
    // Filter blogs based on search and category
    const filteredBlogs = initialBlogs.filter(blog => {
        const matchesSearch = searchQuery === '' || 
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            
        const matchesCategory = selectedCategory === 'All' || 
            blog.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    return (
        <div className="max-w-7xl mx-auto">
            {/* Search and Categories */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        className="w-full p-4 pr-12 border rounded-lg transition-all duration-300 ease-in-out
                            focus:outline-none focus:ring-2 focus:ring-[#1E3D8F] focus:border-transparent
                            hover:shadow-md focus:shadow-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute right-4 top-4 text-gray-400" size={24} />
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${
                                selectedCategory === category
                                    ? 'bg-[#1E3D8F] text-white shadow-md scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog Grid */}
            {filteredBlogs.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No blogs found matching your criteria</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog) => (
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
    )
} 