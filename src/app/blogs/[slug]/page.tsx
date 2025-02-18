import Image from 'next/image'
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
            next: { revalidate: 3600 }
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

        return {
            title: blog.title,
            description: blog.excerpt,
            openGraph: {
                title: blog.title,
                description: blog.excerpt,
                images: [blog.coverImage],
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

    return (
        <article className="container mx-auto px-4 py-12 mt-32">
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
                <div className="mb-8">
                    <span className="bg-blue-100 text-[#1E3D8F] px-4 py-2 rounded-full text-sm font-medium">
                        {blog.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                        {blog.title}
                    </h1>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center">
                                <Image
                                    src={blog.author.image}
                                    alt={blog.author.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                />
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
                <div className="relative h-[600px] rounded-2xl overflow-hidden mb-12">
                    <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
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
            <div className="mt-32">
                <LatestBlogs 
                    initialBlogs={latestData.blogs}
                    initialPagination={latestData.pagination}
                    excludeSlug={blog.slug}
                />
            </div>

            {/* Newsletter Section */}
            <div className="mt-32">
                <SubscriptionSection />
            </div>
        </article>
    )
} 