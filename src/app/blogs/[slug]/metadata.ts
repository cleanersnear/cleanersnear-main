import type { Metadata } from "next"

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    publishDate: string;
    lastUpdated: string;
    coverImage: string;
    likes: number;
    author: {
        name: string;
        role: string;
        image: string;
    };
    introduction: string;
    sections: {
        id: string;
        title: string;
        content: string[];
        highlights?: {
            title: string;
            items: string[];
        }[];
    }[];
    tableOfContents: {
        id: string;
        title: string;
    }[];
    faqs: {
        question: string;
        answer: string;
    }[];
}

// Priority blog posts with specific metadata
// This structure makes it easy to add new priority blogs in the future
const priorityBlogs: Record<string, {
    title: string;
    description: string;
    keywords: string[];
    openGraph: {
        title: string;
        description: string;
    };
}> = {
    'end-of-lease-cleaning': {
        title: 'End of Lease Cleaning Guide Melbourne | Bond Back Guaranteed 2024',
        description: 'Complete guide to end of lease cleaning in Melbourne. | Professional bond cleaning | Expert tips | Comprehensive checklist | Guaranteed bond back | Real estate approved cleaning standards.',
        keywords: [
            'end of lease cleaning melbourne',
            'bond cleaning melbourne',
            'vacate cleaning melbourne',
            'rental property cleaning',
            'property manager cleaning',
            'bond back cleaning',
            'end of lease cleaning checklist',
            'professional bond cleaning',
            'rental cleaning melbourne',
            'vacate cleaning checklist',
            'real estate cleaning melbourne',
            'bond cleaning checklist',
            'end of lease cleaning cost melbourne',
            'rental property cleaning melbourne',
            'professional vacate cleaning'
        ],
        openGraph: {
            title: 'End of Lease Cleaning Guide Melbourne | Professional Bond Cleaning Services',
            description: 'Expert guide to end of lease cleaning in Melbourne. | Professional bond cleaning services | Comprehensive checklist | Guaranteed bond back | Real estate approved standards'
        }
    },
    'professional-cleaning-services-melbourne': {
        title: 'Professional Cleaning Services Melbourne | Top-Rated Cleaners 2024',
        description: 'Melbourne\'s #1 professional cleaning services. | 5+ years experience | 10,000+ satisfied customers | Expert cleaners | Same-day service | Free quotes.',
        keywords: [
            'professional cleaning services melbourne',
            'professional cleaners melbourne',
            'commercial cleaning services',
            'residential cleaning services',
            'cleaning company melbourne',
            'professional house cleaning'
        ],
        openGraph: {
            title: 'Professional Cleaning Services Melbourne | Expert Commercial & Residential Cleaners',
            description: 'Transform your space with Melbourne\'s leading professional cleaning services. | 15+ years experience | Certified cleaners | Customized solutions'
        }
    },
    'end-of-lease-cleaning-melbourne': {
        title: 'End of Lease Cleaning Melbourne | Bond Back Guaranteed 2024',
        description: 'Expert end of lease cleaning in Melbourne. | Bond back guaranteed | Professional cleaners | Same-day service | Free quotes | 100% satisfaction.',
        keywords: [
            'end of lease cleaning melbourne',
            'bond cleaning melbourne',
            'vacate cleaning melbourne',
            'rental property cleaning',
            'property manager cleaning'
        ],
        openGraph: {
            title: 'End of Lease Cleaning Melbourne | Guaranteed Bond Back',
            description: 'Professional end of lease cleaning services in Melbourne. | Bond back guarantee | Expert cleaners | Same-day service | Free quotes'
        }
    },
    'house-cleaning-services-melbourne': {
        title: 'House Cleaning Services Melbourne | Professional Home Cleaners 2024',
        description: 'Professional house cleaning services in Melbourne. | Experienced cleaners | Customized plans | Eco-friendly products | Satisfaction guaranteed.',
        keywords: [
            'house cleaning melbourne',
            'home cleaning services',
            'residential cleaning melbourne',
            'house cleaning company',
            'home cleaning professionals'
        ],
        openGraph: {
            title: 'House Cleaning Services Melbourne | Professional Home Cleaners',
            description: 'Expert house cleaning services in Melbourne. | Customized cleaning plans | Eco-friendly products | Experienced cleaners | Satisfaction guaranteed'
        }
    },
    'commercial-cleaning-services-melbourne': {
        title: 'Commercial Cleaning Services Melbourne | Office & Business Cleaners 2024',
        description: 'Professional commercial cleaning services in Melbourne. | Office cleaning | Retail cleaning | Industrial cleaning | Customized solutions.',
        keywords: [
            'commercial cleaning melbourne',
            'office cleaning services',
            'business cleaning melbourne',
            'retail cleaning services',
            'industrial cleaning melbourne'
        ],
        openGraph: {
            title: 'Commercial Cleaning Services Melbourne | Professional Business Cleaners',
            description: 'Expert commercial cleaning services in Melbourne. | Office cleaning | Retail cleaning | Industrial cleaning | Customized solutions'
        }
    }
}

// Helper function to generate common metadata
function generateCommonMetadata(blog: BlogPost, slug: string) {
    return {
        metadataBase: new URL('https://www.cleaningprofessionals.com.au'),
        alternates: {
            canonical: `/blogs/${slug}`
        },
        openGraph: {
            url: `https://www.cleaningprofessionals.com.au/blogs/${slug}`,
            type: 'article',
            publishedTime: blog.publishDate,
            modifiedTime: blog.lastUpdated,
            authors: [blog.author.name],
            siteName: 'Cleaning Professionals Melbourne'
        },
        twitter: {
            card: 'summary_large_image',
            creator: '@CleaningProfessionals'
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large' as const,
                'max-snippet': -1,
            },
        }
    };
}

export async function generateMetadata({ 
    params 
}: { 
    params: { slug: string } 
}): Promise<Metadata> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${params.slug}`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            return {
                title: 'Blog Post Not Found | Cleaning Professionals Melbourne',
                description: 'The requested blog post could not be found.',
                metadataBase: new URL('https://www.cleaningprofessionals.com.au')
            };
        }

        const blog: BlogPost = await res.json();

        // Special case for end-of-lease cleaning blog
        if (params.slug === 'end-of-lease-cleaning') {
            return {
                title: {
                    absolute: 'End of Lease Cleaning Guide Melbourne 2024 | Expert Tips & Checklist',
                    template: '%s | Melbourne\'s Leading Cleaning Professionals'
                },
                description: 'Comprehensive guide to end of lease cleaning in Melbourne. | Expert tips | Detailed checklist | Bond back guarantee | Real estate approved standards | Professional cleaning services | Move out cleaning guide | Rental property cleaning | Property manager requirements | Vacate cleaning checklist | Melbourne bond cleaning.',
                keywords: [
                    'end of lease cleaning melbourne',
                    'bond cleaning melbourne',
                    'vacate cleaning melbourne',
                    'rental property cleaning',
                    'property manager cleaning',
                    'bond back cleaning',
                    'end of lease cleaning checklist',
                    'professional bond cleaning',
                    'rental cleaning melbourne',
                    'vacate cleaning checklist',
                    'real estate cleaning melbourne',
                    'bond cleaning checklist',
                    'end of lease cleaning cost melbourne',
                    'rental property cleaning melbourne',
                    'professional vacate cleaning',
                    'move out cleaning melbourne',
                    'rental property inspection cleaning',
                    'melbourne bond cleaning services',
                    'end of lease cleaning guide',
                    'property manager cleaning requirements',
                    'move in cleaning',
                    'move in cleaning melbourne',
                    'move in cleaning service',
                    'move in cleaning prices',
                    'move in cleaning near me',
                    'move out cleaning',
                    'move out cleaning melbourne',
                    'move out cleaning near me',
                    'move out cleaning prices',
                    'move out cleaning reviews',
                    'move out cleaning cost',
                    'move out cleaning checklist',
                    'move out apartment cleaning',
                    'move out cleaning list for tenants',
                    'move out cleaning services melbourne',
                    'move out apartment cleaning checklist',
                    'end of lease cleaning',
                    'end of lease cleaning melbourne',
                    'end of lease cleaning near me',
                    'end of lease cleaning epping',
                    'end of lease cleaning cost',
                    'end of lease cleaning melbourne price',
                    'end of lease cleaning requirements victoria',
                    'cheap end of lease cleaning melbourne',
                    'best end of lease cleaning melbourne',
                    'end of lease cleaning melbourne reddit',
                    'deep cleaning melbourne',
                    'same day cleaning service melbourne',
                    'move clean melbourne reviews',
                    'house deep cleaning service cost',
                    'spring cleaning melbourne',
                    'vacate cleaning',
                    'vacate cleaning meaning',
                    'vacate cleaning melbourne',
                    'vacate cleaning near me',
                    'vacate cleaning price list',
                    'vacate cleaning reviews',
                    'vacate cleaning prices',
                    'cheap vacate cleaning'
                ],
                metadataBase: new URL('https://www.cleaningprofessionals.com.au'),
                alternates: {
                    canonical: '/blogs/end-of-lease-cleaning'
                },
                openGraph: {
                    title: 'End of Lease Cleaning Guide Melbourne | Expert Tips & Complete Checklist',
                    description: 'Master your end of lease cleaning with our comprehensive guide. | Expert tips | Detailed checklist | Bond back guarantee | Real estate approved standards | Professional cleaning services | Move out cleaning guide | Melbourne bond cleaning.',
                    url: 'https://www.cleaningprofessionals.com.au/blogs/end-of-lease-cleaning',
                    type: 'article',
                    publishedTime: blog.publishDate,
                    modifiedTime: blog.lastUpdated,
                    authors: [blog.author.name],
                    siteName: 'Cleaning Professionals Melbourne'
                },
                twitter: {
                    card: 'summary_large_image',
                    title: 'End of Lease Cleaning Guide Melbourne | Expert Tips & Checklist',
                    description: 'Master your end of lease cleaning with our comprehensive guide. | Expert tips | Detailed checklist | Bond back guarantee | Real estate approved standards.',
                    creator: '@CleaningProfessionals'
                },
                robots: {
                    index: true,
                    follow: true,
                    googleBot: {
                        index: true,
                        follow: true,
                        'max-video-preview': -1,
                        'max-image-preview': 'large' as const,
                        'max-snippet': -1,
                    },
                }
            };
        }

        // Check if this is a priority blog post
        const priorityBlog = priorityBlogs[params.slug as keyof typeof priorityBlogs];

        if (priorityBlog) {
            return {
                title: {
                    absolute: priorityBlog.title,
                    template: '%s | Melbourne\'s Leading Cleaning Professionals'
                },
                description: priorityBlog.description,
                keywords: priorityBlog.keywords,
                ...generateCommonMetadata(blog, params.slug),
                openGraph: {
                    ...generateCommonMetadata(blog, params.slug).openGraph,
                    title: priorityBlog.openGraph.title,
                    description: priorityBlog.openGraph.description
                },
                twitter: {
                    ...generateCommonMetadata(blog, params.slug).twitter,
                    title: priorityBlog.title,
                    description: priorityBlog.description
                }
            };
        }

        // Default metadata for all other blog posts
        return {
            title: blog.title,
            description: blog.excerpt,
            keywords: [
                'cleaning tips',
                'cleaning advice',
                'cleaning guides',
                'cleaning professionals',
                blog.category.toLowerCase(),
                'melbourne cleaning'
            ],
            ...generateCommonMetadata(blog, params.slug),
            openGraph: {
                ...generateCommonMetadata(blog, params.slug).openGraph,
                title: blog.title,
                description: blog.excerpt
            },
            twitter: {
                ...generateCommonMetadata(blog, params.slug).twitter,
                title: blog.title,
                description: blog.excerpt
            }
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Blog Post | Cleaning Professionals Melbourne',
            description: 'Read our latest blog post about professional cleaning services.',
            metadataBase: new URL('https://www.cleaningprofessionals.com.au')
        };
    }
} 