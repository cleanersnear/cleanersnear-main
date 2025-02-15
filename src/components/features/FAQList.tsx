'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
}

const categories = ['All', 'Services', 'Booking', 'Products', 'Safety', 'Pricing']

interface FAQListProps {
    initialFaqs: FAQ[]
}

export default function FAQList({ initialFaqs }: FAQListProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [openFaq, setOpenFaq] = useState<string | null>(null)
    
    // Filter FAQs based on search and category
    const filteredFaqs = initialFaqs.filter(faq => {
        const matchesSearch = searchQuery === '' || 
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
            
        const matchesCategory = selectedCategory === 'All' || 
            faq.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    return (
        <div className="max-w-3xl mx-auto">
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search FAQs..."
                    className="w-full p-4 pr-12 border rounded-lg transition-all duration-300 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-[#1E3D8F] focus:border-transparent
                        hover:shadow-md focus:shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-4 top-4 text-gray-400" size={24} />
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-8">
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

            {filteredFaqs.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No FAQs found matching your criteria</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredFaqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-all duration-300 ease-in-out"
                                aria-expanded={openFaq === faq.id}
                            >
                                <span className="font-medium flex-1 pr-4">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 transform transition-all duration-300 ease-in-out flex-shrink-0 ${
                                        openFaq === faq.id ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <div
                                className={`transition-all duration-500 ease-in-out transform ${
                                    openFaq === faq.id
                                        ? 'max-h-[1000px] opacity-100 scale-y-100 origin-top'
                                        : 'max-h-0 opacity-0 scale-y-95 origin-top'
                                } overflow-hidden`}
                            >
                                <div className="p-4 bg-gray-50 border-t transform transition-all duration-500 ease-in-out">
                                    <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}