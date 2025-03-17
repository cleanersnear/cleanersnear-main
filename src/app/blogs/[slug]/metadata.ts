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
            };
        }

        const blog: BlogPost = await res.json();

        // Special SEO configuration for professional cleaning services post
        if (params.slug === 'professional-cleaning-services-melbourne') {
            return {
                title: {
                    absolute: 'Professional Cleaning Services Melbourne | Top-Rated Cleaners 2024',
                    template: '%s | Melbourne\'s Leading Cleaning Professionals'
                },
                description: 'Melbourne\'s #1 professional cleaning services. ✓ 5+ years experience ✓ 10,000+ satisfied customers ✓ Expert cleaners ✓ Same-day service ✓ Free quotes. Transform your space with our trusted local cleaners.',
                keywords: [
                    'professional cleaning services melbourne',
                    'professional cleaners melbourne',
                    'commercial cleaning services',
                    'residential cleaning services'
                ],
                metadataBase: new URL('https://www.cleaningprofessionals.com.au'),
                alternates: {
                    canonical: `https://www.cleaningprofessionals.com.au/blogs/${params.slug}`
                },
                openGraph: {
                    title: 'Professional Cleaning Services Melbourne | Expert Commercial & Residential Cleaners',
                    description: 'Transform your space with Melbourne\'s leading professional cleaning services. ✓ 15+ years experience ✓ Certified cleaners ✓ Customized solutions',
                    url: `https://www.cleaningprofessionals.com.au/blogs/${params.slug}`,
                    images: [
                        {
                            url: blog.coverImage,
                            width: 1200,
                            height: 630,
                            alt: 'Professional Cleaning Services Melbourne - Cleaning Professionals'
                        }
                    ],
                    type: 'article',
                    publishedTime: blog.publishDate,
                    modifiedTime: blog.lastUpdated,
                    authors: [blog.author.name],
                    siteName: 'Cleaning Professionals Melbourne'
                },
                twitter: {
                    card: 'summary_large_image',
                    title: 'Professional Cleaning Services Melbourne',
                    description: 'Expert professional cleaning services in Melbourne. ✓ Certified cleaners ✓ 100% satisfaction guaranteed',
                    images: [blog.coverImage],
                    creator: '@CleaningProfessionals'
                }
            };
        }

        // Default metadata for all other blog posts
        return {
            title: blog.title,
            description: blog.excerpt,
            alternates: {
                canonical: `/blogs/${params.slug}/`,
            },
            openGraph: {
                title: blog.title,
                description: blog.excerpt,
                url: `https://www.cleaningprofessionals.com.au/blogs/${params.slug}`,
                images: [
                    {
                        url: blog.coverImage,
                        width: 1200,
                        height: 630,
                        alt: blog.title
                    }
                ],
                type: 'article',
                publishedTime: blog.publishDate,
                modifiedTime: blog.lastUpdated,
                authors: [blog.author.name],
                siteName: 'Cleaning Professionals Melbourne'
            },
            twitter: {
                card: 'summary_large_image',
                title: blog.title,
                description: blog.excerpt,
                images: [blog.coverImage],
            }
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Blog Post | Cleaning Professionals Melbourne',
            description: 'Read our latest blog post about professional cleaning services.',
        };
    }
} 