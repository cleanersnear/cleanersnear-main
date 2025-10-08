/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['vzyscxgvpzsqbkzpvttk.supabase.co'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'vzyscxgvpzsqbkzpvttk.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
        ],
        formats: ['image/webp'],
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
    },
    async redirects() {
        return [
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
}

module.exports = nextConfig 