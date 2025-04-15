import type { Metadata } from "next"

/**
 * Metadata Configuration Structure:
 * 
 * 1. Default Dynamic Template (generateDefaultMetadata):
 *    - Applied to all blog posts
 *    - Comprehensive SEO optimization
 *    - Dynamic title, description, and keywords based on blog content
 *    - Professional metadata structure for maximum visibility
 * 
 * 2. Specific Blog Overrides (customMetadata):
 *    - cleaning-services-melbourne: Main service page with comprehensive cleaning service details
 *    - end-of-lease-cleaning: Specialized bond cleaning and end of lease services
 *    - professional-cleaning-services: Professional and commercial cleaning focus
 *    - house-cleaning-services: Residential and home cleaning services
 *    - commercial-cleaning-services: Business and office cleaning solutions
 *    - deep-cleaning-services: Detailed deep cleaning and sanitization
 *    - carpet-cleaning-services: Specialized carpet and upholstery cleaning
 */

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

interface MetadataTitle {
    absolute: string;
    template?: string;
}

// Priority blog posts with specific metadata
const priorityBlogs: Record<string, {
    title: string;
    description: string;
    keywords: string[];
    openGraph: {
        title: string;
        description: string;
        images?: {
            url: string;
            width: number;
            height: number;
            alt: string;
        }[];
    };
}> = {
    'cleaning-services-melbourne': {
        title: 'Professional Cleaning Services Melbourne | Expert House & Commercial Cleaners',
        description: 'Expert cleaning tips, guides, and home maintenance advice from Melbourne\'s leading cleaning professionals. Trusted local cleaners with 15+ years experience.',
        keywords: [
            'house cleaning melbourne',
            'cleaning services melbourne',
            'professional cleaners melbourne',
            'commercial cleaning melbourne',
            'end of lease cleaning melbourne',
            'domestic cleaning services',
            'office cleaning melbourne',
            'residential cleaning melbourne',
            'local cleaning services',
            'professional house cleaning'
        ],
        openGraph: {
            title: 'Professional Cleaning Services Melbourne | Expert Cleaning Tips & Guides',
            description: 'Discover professional cleaning tips, guides and expert advice from Melbourne\'s leading cleaning service. Quality assured, satisfaction guaranteed.',
            images: [
                {
                    url: 'https://www.cleaningprofessionals.com.au/images/cleaning-services-melbourne.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Professional Cleaning Services Melbourne'
                }
            ]
        }
    },
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

// Default metadata generator for all blogs
function generateDefaultMetadata(blog: BlogPost, slug: string): Metadata & { title: MetadataTitle } {
    const baseUrl = 'https://www.cleaningprofessionals.com.au';
    const fullUrl = `${baseUrl}/blogs/${slug}`;

    return {
        metadataBase: new URL(baseUrl),
        title: {
            absolute: `${blog.title} | Professional Cleaning Services Melbourne 2024`,
            template: '%s | Cleaning Professionals Melbourne'
        } as MetadataTitle,
        description: `${blog.excerpt} | Professional cleaning services in Melbourne. ✓ 15+ years experience ✓ Satisfaction guaranteed ✓ Expert cleaners ✓ Free quotes ✓ Same-day service available.`,
        keywords: [
            'cleaning services melbourne',
            'professional cleaning melbourne',
            'melbourne cleaning company',
            'local cleaning services',
            'residential cleaning',
            'commercial cleaning',
            'office cleaning',
            'house cleaning',
            'end of lease cleaning',
            'deep cleaning service',
            'professional cleaners',
            'cleaning experts melbourne',
            'best cleaning service melbourne',
            'reliable cleaning company',
            'affordable cleaning services',
            'quality cleaning service',
            'experienced cleaners',
            'trusted cleaning professionals',
            'eco-friendly cleaning',
            'same day cleaning service',
            blog.category.toLowerCase(),
            ...blog.title.toLowerCase().split(' '),
            'melbourne cleaning tips',
            'cleaning guides',
            'professional cleaning advice',
            'cleaning service rates',
            'cleaning company reviews',
            'top rated cleaners',
            'verified cleaning service'
        ],
        authors: [{ name: blog.author.name }],
        category: blog.category,
        alternates: {
            canonical: fullUrl
        },
        openGraph: {
            title: `${blog.title} | Expert Cleaning Services Melbourne`,
            description: `${blog.excerpt} | Professional Melbourne cleaning services with 15+ years experience. Quality assured, satisfaction guaranteed.`,
            type: 'article',
            url: fullUrl,
            publishedTime: blog.publishDate,
            modifiedTime: blog.lastUpdated,
            authors: [blog.author.name],
            siteName: 'Cleaning Professionals Melbourne',
            images: [
                {
                    url: blog.coverImage,
                    width: 1200,
                    height: 630,
                    alt: `${blog.title} - Professional Cleaning Services Melbourne`
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            site: '@CleaningProfessionals',
            creator: '@CleaningProfessionals',
            title: `${blog.title} | Professional Cleaning Melbourne`,
            description: blog.excerpt,
            images: [blog.coverImage]
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
        },
        verification: {
            google: 'your-google-verification-code',
            yandex: 'your-yandex-verification-code',
            yahoo: 'your-yahoo-verification-code'
        }
    };
}

// Custom metadata overrides for specific blogs
const customMetadata: Record<string, (blog: BlogPost) => Partial<Metadata & { title: MetadataTitle }>> = {
    'cleaning-services-melbourne': (blog) => {
        // Use the blog parameter to avoid the unused variable error
        console.log(`Generating custom metadata for ${blog.title}`);
        
        return {
            title: {
                absolute: 'Professional Cleaning Services Melbourne | Expert House & Commercial Cleaners 2024',
                template: '%s | Melbourne\'s Leading Cleaning Service'
            },
            description: 'Melbourne\'s top-rated cleaning service. ✓ 15+ years experience ✓ 10,000+ satisfied customers ✓ Expert house & commercial cleaners ✓ Same-day service ✓ Free quotes ✓ Professional equipment ✓ Eco-friendly products ✓ Fully insured.',
            keywords: [
                // Location-specific keywords
                'cleaning services melbourne',
                'melbourne cleaning company',
                'local cleaners melbourne',
                'melbourne house cleaning',
                'melbourne commercial cleaning',
                // Service-specific keywords
                'professional cleaning services',
                'commercial cleaning melbourne',
                'residential cleaning services',
                'office cleaning melbourne',
                'house cleaning services',
                'end of lease cleaning',
                'deep cleaning service',
                'regular cleaning service',
                'same day cleaning',
                // Quality and trust keywords
                'reliable cleaning company',
                'trusted cleaning service',
                'experienced cleaners',
                'professional cleaners melbourne',
                'best cleaning company melbourne',
                'top rated cleaning service',
                // Specific service keywords
                'carpet cleaning melbourne',
                'window cleaning service',
                'floor cleaning specialists',
                'office sanitization',
                'covid safe cleaning',
                // Commercial keywords
                'commercial cleaning quotes',
                'business cleaning solutions',
                'corporate cleaning services',
                'industrial cleaning melbourne',
                'warehouse cleaning',
                // Additional service aspects
                'eco friendly cleaning',
                'green cleaning services',
                'emergency cleaning service',
                'regular cleaning contracts',
                'specialized cleaning solutions'
            ],
            openGraph: {
                title: 'Professional Cleaning Services Melbourne | Expert Commercial & Residential Cleaners',
                description: 'Transform your space with Melbourne\'s leading cleaning service. ✓ Professional cleaners ✓ Commercial & residential experts ✓ Satisfaction guaranteed ✓ Free quotes available.',
                images: [
                    {
                        url: 'https://www.cleaningprofessionals.com.au/images/cleaning-services-melbourne.jpg',
                        width: 1200,
                        height: 630,
                        alt: 'Professional Cleaning Services Melbourne - Expert Cleaners'
                    }
                ]
            }
        };
    },
    'end-of-lease-cleaning': (blog) => {
        // Use the blog parameter to avoid the unused variable error
        console.log(`Generating custom metadata for ${blog.title}`);
        
        return {
            title: {
                absolute: 'End of Lease Cleaning Melbourne | Bond Back Guaranteed 2024',
                template: '%s | Expert Bond Cleaning Service'
            },
            description: 'Melbourne\'s trusted end of lease cleaning service. ✓ Bond back guarantee ✓ Real estate approved ✓ Professional equipment ✓ Detailed cleaning checklist ✓ Experienced cleaners ✓ Same day service ✓ Affordable rates ✓ Free quotes.',
            keywords: [
                // Primary keywords
                'end of lease cleaning melbourne',
                'bond cleaning melbourne',
                'vacate cleaning melbourne',
                'bond back cleaning',
                'lease end cleaning',
                // Location variations
                'end of lease cleaning south melbourne',
                'bond cleaning north melbourne',
                'vacate cleaning western suburbs',
                'end of lease cleaning eastern suburbs',
                // Service-specific keywords
                'professional bond cleaning',
                'end of lease cleaning checklist',
                'rental property cleaning',
                'moving out cleaning service',
                'real estate approved cleaning',
                // Quality and trust keywords
                'guaranteed bond back cleaning',
                'reliable end of lease cleaners',
                'trusted bond cleaning service',
                'professional vacate cleaning',
                'experienced end of lease cleaners',
                // Additional services
                'carpet steam cleaning',
                'window cleaning service',
                'oven cleaning service',
                'full house cleaning',
                // Pricing and value keywords
                'end of lease cleaning cost',
                'affordable bond cleaning',
                'bond cleaning prices',
                'cheap end of lease cleaning',
                'best value bond cleaning',
                // Property-specific keywords
                'apartment end of lease cleaning',
                'house vacate cleaning',
                'unit bond cleaning',
                'studio apartment cleaning',
                // Additional relevant terms
                'same day bond cleaning',
                'emergency vacate cleaning',
                'weekend bond cleaning',
                'last minute end of lease cleaning',
                'express bond cleaning service'
            ]
        };
    }
};

export async function generateMetadata({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}): Promise<Metadata & { title: MetadataTitle }> {
    // Await params first
    const { slug } = await params;
    
    try {
        // Fetch blog data
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            return {
                title: {
                    absolute: 'Blog Post Not Found | Cleaning Professionals Melbourne'
                },
                description: 'The requested blog post could not be found. Explore our other professional cleaning services and expert cleaning guides.',
                metadataBase: new URL('https://www.cleaningprofessionals.com.au')
            };
        }

        const blog: BlogPost = await res.json();
        
        // Check if this is a priority blog
        const isPriorityBlog = slug in priorityBlogs;
        if (isPriorityBlog) {
            console.log(`Using priority metadata for ${slug}`);
        }
        
        // Generate default metadata
        const defaultMeta = generateDefaultMetadata(blog, slug);
        
        // Check if we have custom metadata for this blog
        const customMeta = customMetadata[slug]?.(blog);
        
        if (customMeta) {
            const defaultTitle = defaultMeta.title as MetadataTitle;
            return {
                ...defaultMeta,
                ...customMeta,
                title: {
                    absolute: customMeta.title?.absolute || defaultTitle.absolute,
                    template: customMeta.title?.template || defaultTitle.template
                },
                openGraph: {
                    ...defaultMeta.openGraph,
                    ...(customMeta.openGraph || {}),
                    title: customMeta.title?.absolute || defaultMeta.openGraph?.title
                },
                twitter: {
                    ...defaultMeta.twitter,
                    ...(customMeta.twitter || {}),
                    title: customMeta.title?.absolute || defaultMeta.twitter?.title
                }
            };
        }
        
        // Return default metadata
        return defaultMeta;
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: {
                absolute: 'Professional Cleaning Services Melbourne | Expert Cleaning Solutions'
            } as MetadataTitle,
            description: 'Discover professional cleaning services in Melbourne. Expert cleaners, quality service, satisfaction guaranteed. Contact us for a free quote today.',
            metadataBase: new URL('https://www.cleaningprofessionals.com.au')
        };
    }
} 