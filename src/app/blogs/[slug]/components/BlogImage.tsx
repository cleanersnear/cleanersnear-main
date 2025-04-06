'use client'

import Image from 'next/image'

interface BlogImageProps {
    src: string
    alt: string
    className?: string
    width?: number
    height?: number
    fill?: boolean
    priority?: boolean
}

export default function BlogImage({ 
    src, 
    alt,
    className,
    width,
    height,
    fill = true,
    priority = false
}: BlogImageProps) {
    // Handle both Supabase URLs and local paths
    const imageUrl = src.includes('supabase.co') 
        ? src.replace(/([^:]\/)\/+/g, "$1")  // Clean up Supabase URLs
        : src.startsWith('/') ? src : `/${src}`  // Handle local paths

    return (
        <Image
            src={imageUrl}
            alt={alt}
            width={width}
            height={height}
            fill={fill}
            unoptimized={true}
            className={className}
            priority={priority}
        />
    )
}
