export async function forceRevalidateBlogs() {
    try {
        // Revalidate main blog listing
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/revalidate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                path: '/blogs'
            })
        });

        // Revalidate hero blog
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/hero`, {
            method: 'GET',
            next: { revalidate: 0 }
        });

        // Revalidate top blogs
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/top`, {
            method: 'GET',
            next: { revalidate: 0 }
        });

        console.log('Blog cache revalidated successfully!')
        return true;
    } catch (error) {
        console.error('Failed to revalidate blogs:', error)
        return false;
    }
}

// For single blog post
export async function forceRevalidateBlogPost(slug: string) {
    try {
        // Revalidate specific blog post
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/revalidate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                path: `/blogs/${slug}`
            })
        });

        console.log(`Blog post ${slug} revalidated successfully!`)
        return true;
    } catch (error) {
        console.error(`Failed to revalidate blog post ${slug}:`, error)
        return false;
    }
} 