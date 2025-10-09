import { MetadataRoute } from 'next'
// Import your database client or API functions
// For example, if using Prisma:
// import { prisma } from '@/lib/prisma'
// Or if using a custom API:
// import { getAllBlogPosts } from '@/lib/api'

/**
 * Blogs sitemap file
 * 
 * Contains all blog pages and important blog posts.
 * Blog content is crucial for SEO as it targets long-tail keywords and provides fresh content.
 * 
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
 * @returns {Promise<MetadataRoute.Sitemap>} The sitemap entries for blog pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.cleaningprofessionals.com.au'
  
  // Main blogs page
  const blogsMainPage = {
    url: `${baseUrl}/blogs/`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9
  }
  
  // Important blog posts (0.9)
  // These are high-value content pieces that target specific keywords
  const importantBlogSlugs = [
    'professional-cleaning-services-melbourne',
    'professional-mold-removal-melbourne-guide',
    'professional-move-out-cleaning-melbourne-guide',
    'move-out-cleaning-mistakes-victoria',
    'professional-office-cleaning-melbourne-benefits'
  ]
  
  // Map blog slugs to sitemap entries with proper formatting
  const importantBlogPosts = importantBlogSlugs.map(slug => ({
    url: `${baseUrl}/blogs/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }))

  // Fetch all blog posts from the API
  // Using the same approach as in your [slug]/page.tsx
  try {
    // Check if API URL is available
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn('NEXT_PUBLIC_API_URL not set, returning only important blog posts');
      return [
        blogsMainPage,
        ...importantBlogPosts
      ];
    }

    // Fetch all blog slugs from the API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/slugs`, {
      next: { revalidate: 3600 },
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error('Failed to fetch blog slugs');
    
    const { slugs } = await res.json();
    
    // Fetch additional metadata for each blog post
    // This is optional - if you want to include lastUpdated dates
    // If this is too many requests, you can skip this step and use new Date() for all
    const blogDetails = await Promise.all(
      slugs
        .filter((slug: string) => !importantBlogSlugs.includes(slug))
        .map(async (slug: string) => {
          try {
            const blogRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`, {
              next: { revalidate: 3600 }
            });
            
            if (!blogRes.ok) return { slug, lastUpdated: new Date() };
            
            const blogData = await blogRes.json();
            return { 
              slug, 
              lastUpdated: blogData.lastUpdated ? new Date(blogData.lastUpdated) : new Date() 
            };
          } catch (error) {
            console.error('Error fetching blog details for slug:', slug, error);
            // Fallback to current date if fetch fails
            return { slug, lastUpdated: new Date() };
          }
        })
    );
    
    // Map the blog details to sitemap entries
    const otherBlogPosts = blogDetails.map(blog => ({
      url: `${baseUrl}/blogs/${blog.slug}/`,
      lastModified: blog.lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8 // Slightly lower priority than the important posts
    }));
    
    // Return all blog pages
    return [
      blogsMainPage,
      ...importantBlogPosts,
      ...otherBlogPosts
    ];
    
  } catch (error) {
    console.error('Error fetching blog slugs for sitemap:', error);
    
    // Fallback to just the important blog posts if API fails
    return [
      blogsMainPage,
      ...importantBlogPosts
    ];
  }
} 