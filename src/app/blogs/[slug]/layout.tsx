import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'

export const metadata: Metadata = {
    title: 'Cleaning Tips & Advice Blog | Professional Cleaning Services Melbourne',
    description: 'Expert cleaning tips, guides, and home maintenance advice from Melbourne\'s leading cleaning professionals.',
    metadataBase: new URL('https://www.cleaningprofessionals.com.au'),
    alternates: {
        canonical: '/blogs/',
    },
    openGraph: {
        title: 'Cleaning Tips & Advice Blog | Melbourne Cleaning Professionals',
        description: 'Expert cleaning tips and guides from Melbourne\'s leading cleaning professionals',
        type: 'website',
        url: 'https://www.cleaningprofessionals.com.au/blogs',
        siteName: 'Cleaning Professionals Melbourne'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Cleaning Tips & Advice Blog | Melbourne Cleaning Professionals',
        description: 'Expert cleaning tips and guides from Melbourne\'s leading cleaning professionals',
        creator: '@CleaningProfessionals'
    }
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <MainLayout>
            <main className="min-h-screen bg-white">
                {children}
            </main>
        </MainLayout>
    )
} 