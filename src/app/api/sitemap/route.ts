import { NextResponse } from 'next/server'
import { MetadataRoute } from 'next'

/**
 * API route to serve the main sitemap.xml file
 * This converts the Next.js sitemap object to XML format
 */
export async function GET() {
  // Import the main sitemap function
  const { default: getSitemap } = await import('../../sitemap')
  
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
  
  // Sitemap index opening tag with namespaces
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  
  // Add each sitemap entry
  for (const entry of sitemap) {
    xml += '  <sitemap>\n'
    xml += `    <loc>${entry.url}</loc>\n`
    
    if (entry.lastModified) {
      const lastmod = entry.lastModified instanceof Date
        ? entry.lastModified.toISOString()
        : entry.lastModified
      
      xml += `    <lastmod>${lastmod}</lastmod>\n`
    }
    
    xml += '  </sitemap>\n'
  }
  
  // Sitemap index closing tag
  xml += '</sitemapindex>'
  
  return xml
} 