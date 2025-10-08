import MainLayout from '@/components/layout/MainLayout'
import HeroBlog from './components/HeroBlog'
import TopBlogs from './components/TopBlogs'
import LatestBlogs from './components/LatestBlogs'
import SearchBlog from './components/SearchBlog'
import SubscriptionSection from '@/components/features/SubscriptionSection'

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic';

// Static data fetching with ISR
async function getInitialData() {
    try {
        // Check if API URL is available
        if (!process.env.NEXT_PUBLIC_API_URL) {
            console.warn('NEXT_PUBLIC_API_URL not set, returning empty data');
            return {
                hero: null,
                topBlogs: [],
                latestBlogs: [],
                latestPagination: { totalBlogs: 0, postsPerPage: 6, totalPages: 0 }
            };
        }

        const [heroRes, topRes, latestRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/hero`, {
                next: { revalidate: 3600 },
                cache: 'no-store'
            }).catch(err => {
                console.error('Failed to fetch hero blog:', err);
                return null;
            }),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/top?limit=3`, {
                next: { revalidate: 3600 },
                cache: 'no-store'
            }).catch(err => {
                console.error('Failed to fetch top blogs:', err);
                return null;
            }),
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/latest?limit=6`, {
                next: { revalidate: 3600 },
                cache: 'no-store'
            }).catch(err => {
                console.error('Failed to fetch latest blogs:', err);
                return null;
            })
        ]);

        const [hero, top, latest] = await Promise.all([
            heroRes?.ok ? heroRes.json().catch(() => null) : Promise.resolve(null),
            topRes?.ok ? topRes.json().catch(() => ({ blogs: [] })) : Promise.resolve({ blogs: [] }),
            latestRes?.ok ? latestRes.json().catch(() => ({ blogs: [], pagination: { totalBlogs: 0, postsPerPage: 6, totalPages: 0 } })) : Promise.resolve({ blogs: [], pagination: { totalBlogs: 0, postsPerPage: 6, totalPages: 0 } })
        ]);

        return {
            hero: hero || null,
            topBlogs: Array.isArray(top?.blogs) ? top.blogs : [],
            latestBlogs: Array.isArray(latest?.blogs) ? latest.blogs : [],
            latestPagination: latest?.pagination || { totalBlogs: 0, postsPerPage: 6, totalPages: 0 }
        };
    } catch (error) {
        console.error('Error fetching initial blog data:', error);
        return {
            hero: null,
            topBlogs: [],
            latestBlogs: [],
            latestPagination: { totalBlogs: 0, postsPerPage: 6, totalPages: 0 }
        };
    }
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