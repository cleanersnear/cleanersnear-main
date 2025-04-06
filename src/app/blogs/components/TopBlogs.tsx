import Link from 'next/link'
import BlogImage from './BlogImage'

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    coverImage: string;
    likes: number;
    author: {
        name: string;
        role: string;
        image: string;
    }
}

interface TopBlogsProps {
    initialBlogs: BlogPost[];
}

export default function TopBlogs({ initialBlogs }: TopBlogsProps) {
    if (!initialBlogs.length) return null;

    const [featuredBlog, ...otherBlogs] = initialBlogs;

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-12">Most Popular Blogs</h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Featured Blog - Left Side: now spans 7 columns */}
                <Link 
                    href={`/blogs/${featuredBlog.slug}`} 
                    className="group block lg:col-span-7"
                >
                    <div className="relative h-[600px] rounded-2xl overflow-hidden mb-4">
                        <BlogImage
                            src={featuredBlog.coverImage}
                            alt={featuredBlog.title}
                            className="object-cover group-hover:scale-105 transition-all duration-300"
                            fill={true}
                        />
                        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full 
                            flex items-center gap-1 text-sm font-medium">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="currentColor" 
                                className="w-4 h-4 text-red-500"
                            >
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                            {featuredBlog.likes}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-base text-gray-500">{featuredBlog.category}</span>
                            <span className="text-base text-gray-500">{featuredBlog.readTime}</span>
                        </div>
                        <h3 className="text-3xl font-bold group-hover:text-[#1E3D8F] 
                            transition-colors duration-200">
                            {featuredBlog.title}
                        </h3>
                        <p className="text-gray-600 text-lg line-clamp-2">
                            {featuredBlog.excerpt}
                        </p>
                        <div className="flex items-center pt-2">
                            <div className="relative w-8 h-8">
                                <BlogImage
                                    src={featuredBlog.author.image}
                                    alt={featuredBlog.author.name}
                                    className="rounded-full object-cover"
                                    fill={true}
                                />
                            </div>
                            <span className="ml-2 font-medium text-lg">{featuredBlog.author.name}</span>
                        </div>
                    </div>
                </Link>

                {/* Right Side Stack: now spans 5 columns */}
                <div className="space-y-12 lg:col-span-5">
                    {otherBlogs.map((blog) => (
                        <Link 
                            key={blog.slug} 
                            href={`/blogs/${blog.slug}`} 
                            className="group block"
                        >
                            <div className="relative h-[280px] rounded-2xl overflow-hidden mb-4">
                                <BlogImage
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    className="object-cover group-hover:scale-105 transition-all duration-300"
                                    fill={true}
                                />
                                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full 
                                    flex items-center gap-1 text-sm font-medium">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24" 
                                        fill="currentColor" 
                                        className="w-4 h-4 text-red-500"
                                    >
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                    {blog.likes}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">{blog.category}</span>
                                    <span className="text-sm text-gray-500">{blog.readTime}</span>
                                </div>
                                <h3 className="text-xl font-semibold group-hover:text-[#1E3D8F] 
                                    transition-colors duration-200">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    {blog.excerpt}
                                </p>
                                <div className="flex items-center pt-2">
                                    <div className="relative w-6 h-6">
                                        <BlogImage
                                            src={blog.author.image}
                                            alt={blog.author.name}
                                            className="rounded-full object-cover"
                                            fill={true}
                                        />
                                    </div>
                                    <span className="ml-2 text-sm font-medium">{blog.author.name}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
} 