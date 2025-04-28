import type { Metadata } from "next"

/**
 * Metadata Configuration Structure:
 * 
 * 1. Custom Metadata (Highest Priority - Full Customization):
 *    Found in customMetadata object
 *    Blogs using this:
 *    - cleaning-services-melbourne: Main service page with comprehensive cleaning service details
 *    - end-of-lease-cleaning: Specialized bond cleaning and end of lease services
 * 
 * 2. Priority Blogs (Medium Priority - Semi-Custom):
 *    Found in priorityBlogs object
 *    Blogs using this:
 *    - professional-cleaning-services-melbourne: Professional and commercial cleaning focus
 *    - end-of-lease-cleaning-melbourne: End of lease and bond back services
 *    - house-cleaning-services-melbourne: Residential and home cleaning services
 *    - commercial-cleaning-services-melbourne: Business and office cleaning solutions
 * 
 * 3. Default Dynamic Template (Base Template):
 *    Uses generateDefaultMetadata function
 *    Applied to: All other blog posts not listed above
 *    - Comprehensive SEO optimization
 *    - Dynamic title, description, and keywords based on blog content
 *    - Professional metadata structure for maximum visibility
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
    'professional-cleaning-services-melbourne': {
        title: 'Professional Cleaning Services Melbourne | Top-Rated Cleaners 2025',
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
            description: 'Transform your space with Melbourne\'s leading professional cleaning services. | 5+ years experience | Certified cleaners | Customized solutions'
        }
    },
    'end-of-lease-cleaning-melbourne': {
        title: 'End of Lease Cleaning Melbourne | Bond Back Guaranteed 2025',
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
        title: 'House Cleaning Services Melbourne | Professional Home Cleaners 2025',
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
        title: 'Commercial Cleaning Services Melbourne | Office & Business Cleaners 2025',
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
            absolute: `${blog.title} | Professional Cleaning Services Melbourne 2025`,
            template: '%s | Cleaning Professionals Melbourne'
        } as MetadataTitle,
        description: `${blog.excerpt} | Professional cleaning services in Melbourne. | 5+ years experience | Satisfaction guaranteed | Expert cleaners | Free quotes | Same-day service available.`,
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
            description: `${blog.excerpt} | Professional Melbourne cleaning services with 5+ years experience. Quality assured, satisfaction guaranteed.`,
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
        console.log(`Generating custom metadata for ${blog.title}`);
        
        return {
            title: {
                absolute: 'Cleaning Services Melbourne | Professional House & Commercial Cleaners 2025',
                template: 'Cleaning Services Melbourne | %s'
            },
            description: 'Cleaning Services Melbourne | Trusted local cleaning services | 5+ years experience | Professional house & commercial cleaners | Same-day service | Affordable rates | Expert cleaners | Satisfaction guaranteed | Free quotes.',
            keywords: [
                // Primary target keywords
                'cleaning services melbourne',
                'melbourne cleaning services',
                'cleaning services in melbourne',
                'professional cleaning services melbourne',
                // Service type variations
                'residential cleaning services melbourne',
                'commercial cleaning services melbourne',
                'house cleaning services melbourne',
                'office cleaning services melbourne',
                // Location variations
                'local cleaning services melbourne',
                'melbourne city cleaning services',
                'melbourne metro cleaning services',
                'melbourne suburbs cleaning services',
                // Quality indicators
                'professional cleaners melbourne',
                'expert cleaning services melbourne',
                'reliable cleaning services melbourne',
                'trusted cleaning services melbourne',
                // Service features
                'same day cleaning service melbourne',
                'regular cleaning services melbourne',
                'one-off cleaning services melbourne',
                'emergency cleaning services melbourne'
            ],
            openGraph: {
                title: 'Cleaning Services Melbourne | Expert Local Cleaners | Professional Service',
                description: 'Looking for Cleaning Services in Melbourne? | Professional & reliable cleaning service | Local expert cleaners | 5+ years experience | Residential & commercial cleaning | Free quotes available',
                images: [
                    {
                        url: 'https://www.cleaningprofessionals.com.au/images/cleaning-services-melbourne.jpg',
                        width: 1200,
                        height: 630,
                        alt: 'Professional Cleaning Services Melbourne - Local Expert Cleaners'
                    }
                ]
            }
        };
    },
    'end-of-lease-cleaning': (blog) => {
        console.log(`Generating custom metadata for ${blog.title}`);
        
        return {
            title: {
                absolute: 'End of Lease Cleaning Melbourne | Bond Back Guaranteed 2025',
                template: '%s | Expert Bond Cleaning Service'
            },
            description: 'Melbourne\'s trusted end of lease cleaning service. | Bond back guarantee | Real estate approved | Professional equipment | Detailed cleaning checklist | Experienced cleaners | Same day service | Affordable rates | Free quotes.',
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
    },
    'move-out-cleaning': (blog) => {
        console.log(`Generating custom metadata for ${blog.title}`);
        
        return {
            title: {
                absolute: 'Move Out Cleaning | Melbourne | Prices & Bond Back Guarantee from $200',
                template: 'Move Out Cleaning Melbourne | %s'
            },
            description: 'Professional move out & end of lease cleaning services in Melbourne with 100% bond return guarantee. Affordable prices starting from $200. Book now!',
            keywords: [
                // Primary target keywords
                'move out cleaning prices',
                'move out cleaning melbourne',
                'end of lease cleaning',
                'end of lease cleaning price melbourne',
                'move out cleaning price',
                // Requirements and location variations
                'end of lease cleaning requirements victoria',
                'end of lease cleaning near me',
                'move out cleaning near me',
                'cheap end of lease cleaning melbourne',
                // Related service keywords
                'bond cleaning melbourne',
                'carpet cleaning',
                'cleaning services',
                'end of tenancy cleaning',
                // Job related keywords
                'move out cleaning jobs',
                // Property types
                'apartment move out cleaning',
                'house end of lease cleaning',
                'studio move out cleaning cost',
                // Service features
                'professional move out cleaning',
                'guaranteed bond return',
                'deep cleaning service',
                'thorough property cleaning',
                // Quality indicators
                'best move out cleaners melbourne',
                'reliable end of lease cleaning',
                'trusted bond cleaning service',
                // Pricing variations
                'affordable move out cleaning',
                'end of lease cleaning cost',
                'cheap bond cleaning',
                'move out cleaning quotes',
                // Additional services
                'carpet steam cleaning',
                'oven cleaning service',
                'window cleaning service',
                // Specific Melbourne areas from your image
                'move out cleaning melbourne cbd',
                'south yarra move out cleaning',
                'toorak end of lease cleaning',
                'richmond bond cleaning',
                'brunswick move out cleaning',
                'carlton end of lease cleaning',
                'st kilda bond cleaning',
                'fitzroy move out cleaning',
                // Additional specific locations you requested
                'move out cleaning epping',
                'end of lease cleaning thomastown',
                'bond cleaning carlton',
                'preston move out cleaning',
                'north melbourne end of lease cleaning',
                'sunshine bond cleaning',
                'essendon move out cleaning',
                'moonee ponds end of lease cleaning',
                'ascot vale bond cleaning',
                'glenroy move out cleaning',
                'airport west end of lease cleaning',
                'broadmeadows bond cleaning',
                'craigieburn move out cleaning',
                'greenvale end of lease cleaning',
                'thornbury bond cleaning',
                'reservoir move out cleaning',
                'coburg end of lease cleaning',
                'pascoe vale bond cleaning',
                // Time-based keywords
                'same day move out cleaning',
                'emergency end of lease cleaning',
                'weekend bond cleaning service'
            ],
            openGraph: {
                title: 'Move Out Cleaning Prices Melbourne | Bond Back Guarantee from $200',
                description: 'Professional move out & end of lease cleaning in Melbourne with 100% bond return guarantee. Prices from $200. Expert cleaners, thorough service.',
                images: [
                    {
                        url: 'https://vzyscxgvpzsqbkzpvttk.supabase.co/storage/v1/object/public/blog-images/Move%20Out%20Cleaning%20-%20Professional%20Services.png',
                        width: 1200,
                        height: 630,
                        alt: 'Professional Move Out Cleaning Services Melbourne - Bond Back Guaranteed'
                    }
                ]
            },
            // FAQs schema for Google rich results
            jsonLd: {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'What defines move out cleaning?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Move-out cleaning services refer to the deep cleaning of all rooms within the home prior to move-out day. This typically includes scrubbing bathrooms, kitchens, bedrooms, living areas, closets, and hallways from top to bottom for maximum efficiency and thoroughness.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'How much does an exit clean cost?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'At Cleaning Professionals, our exit cleaning prices in Melbourne vary based on property size and condition: Studio/1-bedroom: $200 - $350, 2-bedroom apartment: $250 - $400, 3-bedroom house: $350 - $600, 4-bedroom house: $500 - $800. Additional services like carpet steam cleaning may increase these prices. We provide transparent quotes with NO HIDDEN CLEANING COSTS - NO SURPRISES - $200 WITH HARD FLOOR OR $250 WITH CARPET.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'What is the difference between a move out cleaning and a regular cleaning?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'While deep cleaning is a thorough cleaning of your entire home, move out cleaning is more about preparing the property for new occupants, ensuring every nook and cranny is spotless. This distinction is vital for homeowners and landlords to ensure their properties are maintained to the highest standard and meet all requirements for bond returns.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'Should you clean when you move out?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'When you move out, the place should be pretty clean--like how it was when you first moved in, minus normal wear and tear. For renters, thorough cleaning is essential for getting your bond back. At Cleaning Professionals, we ensure your property exceeds all cleaning requirements, guaranteeing your bond return.'
                        }
                    },
                    {
                        '@type': 'Question',
                        name: 'What are your move out cleaning prices?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Here\'s a quick breakdown of our competitive pricing at Cleaning Professionals: Studio / 1 Bedroom: $200 – $350, 2 Bedroom Apartment: $250 – $400, 3 Bedroom House: $350 – $600, 4 Bedroom House: $500 – $800. NO HIDDEN CLEANING COSTS - NO SURPRISES '
                        }
                    }
                ]
            }
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
            description: 'Discover professional cleaning services in Melbourne. | Expert cleaners | Quality service | Satisfaction guaranteed. Contact us for a free quote today.',
            metadataBase: new URL('https://www.cleaningprofessionals.com.au')
        };
    }
} 
