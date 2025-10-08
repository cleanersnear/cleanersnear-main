
import BlogImage from '../components/BlogImage'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, Share2, Bookmark, ThumbsUp } from 'lucide-react'
import TableOfContents from './components/TableOfContents'
import FAQ from './components/FAQ'
import CallToAction from './components/CallToAction'
import LatestBlogs from '../components/LatestBlogs'
import SubscriptionSection from '@/components/features/SubscriptionSection'

// Use ISR with dynamic params generation
export const dynamicParams = true;
export const revalidate = 3600; // Revalidate every hour

interface Section {
    id: string;
    title: string;
    content: string[];
    highlights?: Highlight[]; 
}

interface Highlight {
    title: string;
    items: string[];
}

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
    sections: Section[];
    tableOfContents: {
        id: string;
        title: string;
    }[];
    faqs: {
        question: string;
        answer: string;
    }[];
}

// Add this helper function after the interfaces and before the generateStaticParams
const parseContent = (content: string) => {
    return content.replace(
        /\{link:(.*?):(.*?)\}/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>'
    );
};

export async function generateStaticParams() {
    try {
        // Check if API URL is available
        if (!process.env.NEXT_PUBLIC_API_URL) {
            console.warn('NEXT_PUBLIC_API_URL not set, skipping static generation');
            return [];
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/slugs`, {
            next: { revalidate: 1 },
            cache: 'no-store'
        });
        
        if (!res.ok) {
            console.error('Failed to fetch slugs:', res.status, res.statusText);
            return [];
        }
        
        const data = await res.json();
        const slugs = data.slugs || data || [];
        return Array.isArray(slugs) ? slugs.map((slug: string) => ({ slug })) : [];
    } catch (error) {
        console.error('Error generating static params:', error);
        return []; // Return empty array to prevent build failure
    }
}

async function getBlogBySlug(slug: string): Promise<BlogPost> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`, {
        next: { 
            revalidate: 3600,
            tags: [`blog-${slug}`] // Add cache tag for targeted revalidation
        }
    });

    if (!res.ok) {
        if (res.status === 404) notFound();
        throw new Error('Failed to fetch blog post');
    }

    return res.json();
}

export default async function BlogPage({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}) {
    // Await params first
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);
    
    // Fetch latest blogs with error handling
    let latestData = { blogs: [], pagination: { totalBlogs: 0, postsPerPage: 3, totalPages: 0 } };
    try {
        if (process.env.NEXT_PUBLIC_API_URL) {
            const latestRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/blog/latest?excludeSlug=${slug}`,
                { 
                    next: { revalidate: 3600 },
                    cache: 'no-store'
                }
            );
            if (latestRes.ok) {
                latestData = await latestRes.json();
            } else {
                console.error('Failed to fetch latest blogs:', latestRes.status);
            }
        }
    } catch (error) {
        console.error('Error fetching latest blogs:', error);
    }

    if (!blog) {
        notFound()
    }

    // Enhanced schema markup
    const blogPostSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.excerpt,
        "image": blog.coverImage,
        "author": {
            "@type": "Person",
            "name": blog.author.name,
            "jobTitle": blog.author.role,
            "url": `https://www.cleaningprofessionals.com.au/team/${blog.author.name.toLowerCase().replace(/\s+/g, '-')}`
        },
        "publisher": {
            "@type": "Organization",
            "name": "Cleaning Professionals Melbourne",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.cleaningprofessionals.com.au/logos/logo.png"
            }
        },
        "datePublished": blog.publishDate,
        "dateModified": blog.lastUpdated,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.cleaningprofessionals.com.au/blogs/${slug}`
        },
        "keywords": [
            blog.category.toLowerCase(),
            ...blog.title.toLowerCase().split(' '),
            'cleaning guide',
            'melbourne cleaning',
            'professional cleaning'
        ].join(', '),
        "articleSection": blog.category,
        "articleBody": blog.introduction,
        "wordCount": blog.sections.reduce((count, section) => 
            count + section.content.join(' ').split(/\s+/).length, 0),
        "timeRequired": blog.readTime,
        "inLanguage": "en-AU",
        "isAccessibleForFree": "true",
        "license": "https://creativecommons.org/licenses/by-nc-sa/4.0/"
    };

    // Professional cleaning services specific schema
    const professionalCleaningSchema = slug === 'professional-cleaning-services-melbourne' ? {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Professional Cleaning Services Melbourne",
        "description": "Expert cleaning services in Melbourne for residential and commercial properties.",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Cleaning Professionals Melbourne",
            "image": "https://www.cleaningprofessionals.com.au/logos/logo.png",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Melbourne",
                "addressRegion": "VIC",
                "addressCountry": "AU"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-37.8136",
                "longitude": "144.9631"
            },
            "url": "https://www.cleaningprofessionals.com.au",
            "telephone": "+61-xxx-xxx-xxx",
            "priceRange": "$$",
            "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": "-37.8136",
                    "longitude": "144.9631"
                },
                "geoRadius": "50000"
            }
        },
        "serviceType": "Professional Cleaning",
        "areaServed": "Melbourne Metropolitan Area",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Cleaning Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "House Cleaning"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Commercial Cleaning"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "End of Lease Cleaning"
                    }
                }
            ]
        }
    } : null;

    return (
        <article className="container mx-auto px-4 py-4 md:py-12 mt-8 md:mt-32">
            {/* Add enhanced Schema markup for all blog posts */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blogPostSchema)
                }}
            />
            
            {/* Add Schema markup for professional cleaning services post */}
            {professionalCleaningSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(professionalCleaningSchema)
                    }}
                />
            )}

            <div className="max-w-[1400px] mx-auto">
                {/* Breadcrumb & Actions */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/blogs" className="hover:text-[#1E3D8F]">Blog</Link>
                        <span>/</span>
                        <span>{blog.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-[#1E3D8F]">
                            <Share2 size={20} />
                            Share
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-[#1E3D8F]">
                            <Bookmark size={20} />
                            Save
                        </button>
                    </div>
                </div>

                {/* Category Badge & Title */}
                <div className="mb-4 md:mb-8">
                    <span className="bg-blue-100 text-[#1E3D8F] px-4 py-2 rounded-full text-sm font-medium">
                        {blog.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                        {blog.title}
                    </h1>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center">
                                <div className="relative h-12 w-12">
                                    <BlogImage
                                        src={blog.author.image}
                                        alt={blog.author.name}
                                        className="rounded-full object-cover"
                                        fill={true}
                                    />
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium">{blog.author.name}</p>
                                    <p className="text-sm text-gray-600">{blog.author.role}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Clock size={20} />
                                <span>{blog.readTime}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Last updated: {new Date(blog.lastUpdated).toLocaleDateString()}</span>
                            <div className="flex items-center gap-2">
                                <ThumbsUp size={18} />
                                <span>{blog.likes} likes</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative h-[300px] md:h-[600px] rounded-2xl overflow-hidden mb-4 md:mb-12">
                    <BlogImage
                        src={blog.coverImage}
                        alt={blog.title}
                        className="object-cover"
                        priority={true}
                        width={1400}
                        height={600}
                    />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="prose prose-lg max-w-none">
                            {/* Introduction */}
                            <p className="text-lg leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: parseContent(blog.introduction) }} />

                            {/* Sections */}
                            {blog.sections.map((section: Section) => (
                                <div key={section.id} id={section.id} className="mb-12">
                                    <h2 className="text-3xl font-bold mb-6">
                                        {section.title}
                                    </h2>
                                    {section.content.map((paragraph: string, pIndex: number) => (
                                        <p 
                                            key={pIndex} 
                                            className="text-lg leading-relaxed mb-6" 
                                            dangerouslySetInnerHTML={{ __html: parseContent(paragraph) }}
                                        />
                                    ))}
                                    {section.highlights?.map((highlight: Highlight, hIndex: number) => (
                                        <div key={hIndex} className="bg-gray-50 p-8 rounded-2xl my-8">
                                            <h3 className="text-xl font-bold mb-4">
                                                {highlight.title}
                                            </h3>
                                            <ul className="space-y-3">
                                                {highlight.items.map((item: string, iIndex: number) => (
                                                    <li key={iIndex} className="flex items-start gap-3">
                                                        <span className="text-[#1E3D8F] font-bold">•</span>
                                                        <span dangerouslySetInnerHTML={{ __html: parseContent(item) }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Call to Action aligned with FAQ */}
                        <div className="mt-12">
                            <CallToAction />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-8">
                            <TableOfContents items={blog.tableOfContents} />
                            <FAQ questions={blog.faqs} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Blogs Section */}
            <div className="mt-16 md:mt-32">
                <LatestBlogs 
                    initialBlogs={latestData.blogs}
                    initialPagination={latestData.pagination}
                    excludeSlug={blog.slug}
                />
            </div>

            {/* Newsletter Section */}
            <div className="mt-16 md:mt-32">
                <SubscriptionSection />
            </div>
        </article>
    )
}

// Export generateMetadata from metadata.ts
export { generateMetadata } from './metadata' 