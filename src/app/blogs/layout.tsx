import { Metadata } from 'next'

// This metadata will only apply to the blog listing page layout structure
export const metadata: Metadata = {
    metadataBase: new URL('https://www.cleaningprofessionals.com.au'),
    applicationName: 'Cleaning Professionals Melbourne Blog',
    manifest: '/manifest.json',
    themeColor: '#1E3D8F',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
        userScalable: false
    },
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png'
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