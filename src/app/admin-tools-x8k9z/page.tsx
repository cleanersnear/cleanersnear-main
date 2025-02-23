'use client'

import { useState } from 'react'
import { forceRevalidateBlogs, forceRevalidateBlogPost } from '../blogs/revalidate'
import MainLayout from '@/components/layout/MainLayout'
import InstantCost from '@/components/instant-cost/instantcost'

export default function AdminTools() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [slug, setSlug] = useState('')
    const [activeTab, setActiveTab] = useState('blogs')

    const handleRevalidateAll = async () => {
        try {
            setLoading(true)
            setMessage('Revalidating...')
            await forceRevalidateBlogs()
            setMessage('Cache cleared successfully! Refreshing page...')
            setTimeout(() => window.location.reload(), 1000)
        } catch (error) {
            console.error('Failed to revalidate all blogs:', error)
            setMessage('Failed to clear cache. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleRevalidatePost = async () => {
        if (!slug.trim()) {
            setMessage('Please enter a blog slug')
            return
        }

        try {
            setLoading(true)
            setMessage('Revalidating...')
            await forceRevalidateBlogPost(slug)
            setMessage('Blog post cache cleared successfully!')
            setSlug('')
        } catch (error) {
            console.error('Failed to revalidate blog post:', error)
            setMessage('Failed to clear post cache. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12 mt-32">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Admin Tools</h1>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setActiveTab('blogs')}
                                className={`px-4 py-2 rounded-lg transition-all duration-200
                                    ${activeTab === 'blogs' 
                                        ? 'bg-[#1E3D8F] text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                Blog Tools
                            </button>
                            <button 
                                onClick={() => setActiveTab('calculator')}
                                className={`px-4 py-2 rounded-lg transition-all duration-200
                                    ${activeTab === 'calculator' 
                                        ? 'bg-[#1E3D8F] text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                Cost Calculator
                            </button>
                        </div>
                    </div>
                    
                    {activeTab === 'blogs' ? (
                        <div className="space-y-6">
                            {/* All Blogs Cache */}
                            <div className="p-6 bg-white rounded-lg shadow-sm border">
                                <h2 className="text-lg font-semibold mb-4">Blog List Cache</h2>
                                <button 
                                    onClick={handleRevalidateAll}
                                    disabled={loading}
                                    className="px-4 py-2 bg-[#1E3D8F] text-white rounded-lg
                                        hover:bg-[#1E3D8F]/90 transition-all duration-200
                                        disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Processing...' : 'Refresh All Blog Caches'}
                                </button>
                                <p className="mt-2 text-sm text-gray-500">
                                    This will force refresh all blog caches and reload the page.
                                </p>
                            </div>

                            {/* Single Blog Cache */}
                            <div className="p-6 bg-white rounded-lg shadow-sm border">
                                <h2 className="text-lg font-semibold mb-4">Single Blog Cache</h2>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        placeholder="Enter blog slug"
                                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none 
                                            focus:ring-2 focus:ring-[#1E3D8F]"
                                    />
                                    <button 
                                        onClick={handleRevalidatePost}
                                        disabled={loading || !slug.trim()}
                                        className="px-4 py-2 bg-[#1E3D8F] text-white rounded-lg
                                            hover:bg-[#1E3D8F]/90 transition-all duration-200
                                            disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Refresh Post
                                    </button>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Enter a blog slug to refresh its cache specifically.
                                </p>
                            </div>

                            {/* Status Message */}
                            {message && (
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">{message}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border">
                            <div className="p-6 border-b">
                                <h2 className="text-lg font-semibold">Cost Calculator Configuration</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Customize and test the instant cost calculator.
                                </p>
                            </div>
                            <div className="p-6">
                                <InstantCost service="end-of-lease" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    )
} 
