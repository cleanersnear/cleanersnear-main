import MainLayout from '@/components/layout/MainLayout'

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