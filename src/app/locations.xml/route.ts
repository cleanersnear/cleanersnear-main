import { MELBOURNE_REGIONS } from '@/utils/location/regions'

function generateLocationXML(regions: typeof MELBOURNE_REGIONS) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${Object.values(regions).flatMap(region =>
        region.councils.flatMap(council =>
          council.key_suburbs.map(suburb => `
            <url>
              <loc>https://cleaningprofessionals.com.au/locations/${suburb.toLowerCase().replace(/\s+/g, '-')}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `).join('')
        )
      )}
    </urlset>`
}

export async function GET() {
  const xml = generateLocationXML(MELBOURNE_REGIONS)
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
} 