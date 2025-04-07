import BlogImage from '../components/BlogImage'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, Share2, Bookmark, ThumbsUp } from 'lucide-react'
import TableOfContents from './components/TableOfContents'
import FAQ from './components/FAQ'
import CallToAction from './components/CallToAction'
import LatestBlogs from '../components/LatestBlogs'
import SubscriptionSection from '@/components/features/SubscriptionSection'
import { Metadata } from 'next'



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

export async function generateStaticParams() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/slugs`, {
            next: { revalidate: 1 }
        });
        
        if (!res.ok) throw new Error('Failed to fetch slugs');
        
        const { slugs } = await res.json();
        return slugs.map((slug: string) => ({ slug }));
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

export async function generateMetadata({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}): Promise<Metadata> {
    try {
        const { slug } = await params;
        const blog = await getBlogBySlug(slug);

        // Special SEO configuration ONLY for professional cleaning services post
        if (slug === 'professional-cleaning-services-melbourne') {
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
                    canonical: 'https://www.cleaningprofessionals.com.au/blogs/professional-cleaning-services-melbourne'
                },
                openGraph: {
                    title: 'Professional Cleaning Services Melbourne | Expert Commercial & Residential Cleaners',
                    description: 'Transform your space with Melbourne\'s leading professional cleaning services. ✓ 15+ years experience ✓ Certified cleaners ✓ Customized solutions',
                    url: 'https://www.cleaningprofessionals.com.au/blogs/professional-cleaning-services-melbourne',
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

        // Return original metadata for all other blog posts


        return {
            title: blog.title,
            description: blog.excerpt,
            openGraph: {
                title: blog.title,
                description: blog.excerpt,
                
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
            title: 'Blog Post',
            description: 'Read our latest blog post'
        };
    }
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
    const latestRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blog/latest?excludeSlug=${slug}`,
        { next: { revalidate: 3600 } }
    );
    const latestData = await latestRes.json();

    if (!blog) {
        notFound()
    }

    // Add this before your return statement
    const professionalCleaningSchema = slug === 'professional-cleaning-services-melbourne' ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Professional Cleaning Services Melbourne",
        "description": "Expert guide to professional cleaning services in Melbourne. Comprehensive solutions for residential and commercial cleaning needs.",
        "image": blog.coverImage,
        "author": {
            "@type": "Person",
            "name": blog.author.name,
            "jobTitle": blog.author.role
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
            "@id": "https://www.cleaningprofessionals.com.au/blogs/professional-cleaning-services-melbourne"
        },
        "keywords": "professional cleaning services, commercial cleaning, residential cleaning, Melbourne cleaners",
        "articleSection": "Professional Cleaning",
        "articleBody": blog.introduction
    } : null;



    return (
        <article className="container mx-auto px-4 py-4 md:py-12 mt-8 md:mt-32">
            
           {/* Add Schema markup only for professional cleaning services post */}
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
                            <p className="text-lg leading-relaxed mb-8">
                                {blog.introduction}
                            </p>

                            {/* Sections */}
                            {blog.sections.map((section: Section) => (
                                <div key={section.id} id={section.id} className="mb-12">
                                    <h2 className="text-3xl font-bold mb-6">
                                        {section.title}
                                    </h2>
                                    {section.content.map((paragraph: string, pIndex: number) => (
                                        <p key={pIndex} className="text-lg leading-relaxed mb-6">
                                            {paragraph}
                                        </p>
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
                                                        <span>{item}</span>
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
