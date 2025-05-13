'use client'

import { useEffect } from 'react'
import { use } from 'react'
import { useRouter } from 'next/navigation'

interface PageProps {
  params: Promise<{ suburb: string }>
}

export default function Page({ params }: PageProps) {
  const router = useRouter()
  const resolvedParams = use(params)
  const suburb = resolvedParams.suburb.replace(/-/g, ' ')
  const capitalizedSuburb = suburb.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('https://www.cleaningprofessionals.com.au/services/ndis-cleaning/')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E3D8F] mb-6">
            NDIS Cleaning Services in {capitalizedSuburb}
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Specialized NDIS cleaning services in {capitalizedSuburb}. Supporting NDIS participants with professional and caring cleaning solutions.
          </p>
          <p className="text-blue-600 text-lg">
            Redirecting you to our main NDIS cleaning service page in 3 seconds...
          </p>
        </div>
      </section>
    </main>
  )
} 