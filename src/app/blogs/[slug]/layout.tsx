import { Metadata } from 'next'
import MainLayout from '@/components/layout/MainLayout'

export const metadata: Metadata = {
    title: 'Cleaning Blog | Cleaners Near',
    description: 'Expert cleaning tips, guides, and home maintenance advice from Melbourne\'s leading cleaning professionals.',
    openGraph: {
        title: 'Cleaning Blog | Cleaners Near',
        description: 'Expert cleaning tips and guides from Melbourne\'s leading cleaning professionals',
        type: 'website',
        url: 'https://cleanersnear.com/blogs',
        siteName: 'Cleaners Near Blog'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Cleaning Blog | Cleaners Near',
        description: 'Expert cleaning tips and guides from Melbourne\'s leading cleaning professionals'
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