import { NextResponse } from 'next/server'
import { MetadataRoute } from 'next'

/**
 * API route to serve the manual-locations sitemap.xml file
 * This converts the Next.js sitemap object to XML format for manually optimized pages
 */
export async function GET() {
  // Import the manual locations sitemap function
  const { default: getSitemap } = await import('../../../sitemap-manual-locations')
  
  // Get the sitemap data
  const sitemap = await getSitemap()
  
  // Convert the sitemap to XML
  const xml = generateSitemapXml(sitemap)
  
  // Return the XML with the correct content type
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, must-revalidate'
    }
  })
}

/**
 * Generate sitemap XML from sitemap object
 */
function generateSitemapXml(sitemap: MetadataRoute.Sitemap): string {
  // XML header
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  
  // URL set opening tag with namespaces
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  
  // Add each URL entry
  for (const entry of sitemap) {
    xml += '  <url>\n'
    xml += `    <loc>${entry.url}</loc>\n`
    
    if (entry.lastModified) {
      const lastmod = entry.lastModified instanceof Date
        ? entry.lastModified.toISOString()
        : entry.lastModified
      
      xml += `    <lastmod>${lastmod}</lastmod>\n`
    }
    
    if (entry.changeFrequency) {
      xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`
    }
    
    if (entry.priority) {
      xml += `    <priority>${entry.priority}</priority>\n`
    }
    
    xml += '  </url>\n'
  }
  
  // URL set closing tag
  xml += '</urlset>'
  
  return xml
}
