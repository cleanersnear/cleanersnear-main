import MainLayout from '@/components/layout/MainLayout'
import HeroBlog from './components/HeroBlog'
import TopBlogs from './components/TopBlogs'
import LatestBlogs from './components/LatestBlogs'
import SearchBlog from './components/SearchBlog'
import SubscriptionSection from '@/components/features/SubscriptionSection'

// Generate static paths for first few pages
export async function generateStaticParams() {
    return Array.from({ length: 5 }, (_, i) => ({
        page: (i + 1).toString()
    }));
}

// Static data fetching with ISR
async function getInitialData() {
    const [heroRes, topRes, latestRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/hero`, {
            next: { revalidate: 3600 } // Revalidate every hour
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/top?limit=3`, {
            next: { revalidate: 3600 }
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/latest?limit=6`, {
            next: { revalidate: 3600 }
        })
    ]);

    const [hero, top, latest] = await Promise.all([
        heroRes.json(),
        topRes.json(),
        latestRes.json()
    ]);

    return {
        hero,
        topBlogs: top.blogs,
        latestBlogs: latest.blogs,
        latestPagination: latest.pagination
    };
}

export default async function BlogsPage() {
    const initialData = await getInitialData();

    return (
        <MainLayout>
            <div className="mt-32">
                <HeroBlog initialBlog={initialData.hero} />
                <SearchBlog />
                <TopBlogs initialBlogs={initialData.topBlogs} />
                <LatestBlogs 
                    initialBlogs={initialData.latestBlogs}
                    initialPagination={initialData.latestPagination}
                />
                
                <div className="mt-20">
                    <SubscriptionSection />
                </div>
            </div>
        </MainLayout>
    )
} 