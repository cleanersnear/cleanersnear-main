import { ReactNode } from 'react'
import { generateMetadata } from './metadata'
import SchemaScript from './components/SchemaScript'

export { generateMetadata }

export default async function MoveInCleaningLayout({
    children,
    params,
}: {
    children: ReactNode
    params: Promise<{ suburb: string }>
}) {
    const resolvedParams = await params
    const suburb = resolvedParams.suburb
    
    return (
        <div className="min-h-screen bg-white">
            <SchemaScript suburb={suburb} />
            {children}
        </div>
    )
} 