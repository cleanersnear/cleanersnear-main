import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Cleaning Tips & Advice Blog | Professional Cleaning Services Melbourne',
    description: 'Expert cleaning tips, guides, and home maintenance advice from Melbourne\'s leading cleaning professionals. Learn about cleaning techniques, maintenance, and best practices.',
    metadataBase: new URL('https://www.cleaningprofessionals.com.au'),
    alternates: {
        canonical: '/blogs/',
    },
    openGraph: {
        title: 'Cleaning Tips & Advice Blog | Melbourne Cleaning Professionals',
        description: 'Discover expert cleaning tips, guides, and advice from Melbourne\'s trusted cleaning service. Stay updated with the latest cleaning trends and best practices.',
        url: 'https://www.cleaningprofessionals.com.au/blogs/',
        type: 'website',
        siteName: 'Cleaning Professionals Melbourne'
    }
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white">
            {children}
        </div>
    )
} 