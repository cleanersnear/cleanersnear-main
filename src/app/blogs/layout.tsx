import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Cleaning Blog | Cleaners Near',
    description: 'Expert cleaning tips, guides, and home maintenance advice'
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