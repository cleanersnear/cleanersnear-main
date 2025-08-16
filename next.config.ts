import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Primary domain redirect - catch all non-www traffic
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'cleaningprofessionals.com.au',
          },
        ],
        permanent: true,
        destination: 'https://www.cleaningprofessionals.com.au/:path*',
      },
      // Handle http to https redirects
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        permanent: true,
        destination: 'https://www.cleaningprofessionals.com.au/:path*',
      },
      //Handle terms page variations
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
      // Handle case-sensitive URLs for blog posts
      {
        source: '/blogs/professional-end-of-lease-cleaning-Melbourne',
        destination: '/blogs/professional-end-of-lease-cleaning-melbourne',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/blogs/:slug',
        permanent: true,
      },
      {
        source: '/services/windows-cleaning/',
        destination: '/services/window-cleaning/',
        permanent: true,
      },
      {
        source: '/locations/melbourne',
        destination: '/locations/melbourne-cbd/',
        permanent: true,
      },
      {
        source: '/services/general-house-cleaning/',
        destination: '/services/general-cleaning/',
        permanent: true,
      },
      {
        source: '/services/office-cleaning/',
        destination: '/services/commercial-cleaning/',
        permanent: true,
      },
      {
        source: '/services/holiday-cleaning',
        destination: '/services/move-in-cleaning/',
        permanent: true,
      },
      // Handle query parameter redirects
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'url',
            value: '(?<url>.*)',
          },
        ],
        destination: '/:path*/:url',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        // Enhanced sitemap handling
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap',
        },
        {
          source: '/sitemap-:type.xml',
          destination: '/api/sitemap/:type',
        },
        // Add a catch-all for sitemap variations
        {
          source: '/sitemap_:type.xml',
          destination: '/api/sitemap/:type',
        }
      ],
      fallback: []
    }
  },
  // Enhanced headers configuration
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
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ],
      },
      // Enhanced XML handling
      {
        source: '/:path*.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
          }
        ]
      }
    ]
  },
  // Keep trailing slash consistent
  trailingSlash: true,
  // Enhanced image configuration
  images: {
    domains: ['vzyscxgvpzsqbkzpvttk.supabase.co', 'www.cleaningprofessionals.com.au', 'cleaningprofessionals.com.au'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vzyscxgvpzsqbkzpvttk.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    path: '/_next/image',
    loader: 'default',
    disableStaticImages: false,
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    serverComponentsExternalPackages: [],
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
}

export default nextConfig;
