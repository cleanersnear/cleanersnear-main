import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Handle www to non-www redirects first
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.cleaningprofessionals.com.au',
          },
        ],
        permanent: true,
        destination: 'https://cleaningprofessionals.com.au/:path*',
      },
      // Handle terms page variations
      {
        source: '/terms',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/tnc',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      // Then handle case-sensitive URLs for blog posts
      {
        source: '/blogs/professional-end-of-lease-cleaning-Melbourne',
        destination: '/blogs/professional-end-of-lease-cleaning-melbourne',
        permanent: true,
      },
      // Handle blog vs blogs redirects
      {
        source: '/blog/:slug',
        destination: '/blogs/:slug',
        permanent: true,
      }
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: []
    }
  },
  // Force trailing slashes for consistency
  trailingSlash: true,
  // Optimize images
  images: {
    domains: ['cleaningprofessionals.com.au'],
    formats: ['image/avif', 'image/webp'],
  },
  // Handle headers for better SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
          }
        ],
      }
    ]
  }
}

export default nextConfig;
