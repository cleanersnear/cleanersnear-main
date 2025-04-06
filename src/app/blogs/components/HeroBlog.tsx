import Link from 'next/link'
import BlogImage from './BlogImage'

interface HeroBlogData {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    coverImage: string;
    author: {
        name: string;
        role: string;
        image: string;
    }
}

interface HeroBlogProps {
    initialBlog: HeroBlogData;
}

export default function HeroBlog({ initialBlog }: HeroBlogProps) {
    if (!initialBlog) return null;

    return (
        <div className="relative">
            <div className="container mx-auto px-4">
                <div className="relative h-[600px] sm:h-[600px] rounded-2xl overflow-hidden max-w-[1800px] mx-auto">
                    <BlogImage
                        src={initialBlog.coverImage}
                        alt={initialBlog.title}
                        className="object-cover"
                        priority={true}
                        fill={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                        <div className="absolute bottom-0 left-0 p-6 pb-16 sm:pb-10 sm:p-12 text-white max-w-3xl">
                            <span className="text-xs sm:text-sm mb-2 inline-block">
                                {initialBlog.category} • {initialBlog.readTime}
                            </span>
                            <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">
                                {initialBlog.title}
                            </h1>
                            <p className="text-base sm:text-lg text-gray-200 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                                {initialBlog.excerpt}
                            </p>
                            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <div className="relative w-10 h-10">
                                    <BlogImage
                                        src={initialBlog.author.image}
                                        alt={initialBlog.author.name}
                                        className="rounded-full object-cover"
                                        fill={true}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-sm sm:text-base">
                                        {initialBlog.author.name}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-300">
                                        {initialBlog.author.role}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-start mt-2 sm:mt-0">
                                <Link 
                                    href={`/blogs/${initialBlog.slug}`}
                                    className="inline-block bg-white text-black px-6 sm:px-8 py-3 sm:py-4 
                                        rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 
                                        text-sm sm:text-lg w-1/2 sm:w-auto text-center"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 