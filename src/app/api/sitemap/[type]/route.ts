import { NextRequest, NextResponse } from 'next/server'
import { MetadataRoute } from 'next'

/**
 * API route to serve individual sitemap XML files
 * This converts the Next.js sitemap objects to XML format
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const { type } = params
  
  try {
    // Import the specific sitemap function based on the type
    const { default: getSitemap } = await import(`../../../sitemap-${type}`)
    
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
  } catch (error) {
    console.error(`Error generating sitemap for type: ${type}`, error)
    
    // Return a 404 if the sitemap type doesn't exist
    return new NextResponse('Sitemap not found', { status: 404 })
  }
}

/**
 * Generate sitemap XML from sitemap object
 */
function generateSitemapXml(sitemap: MetadataRoute.Sitemap): string {
  // XML header
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  
  // Sitemap opening tag with namespaces
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
  xml += 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
  xml += 'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 '
  xml += 'http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n'
  
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
    
    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority}</priority>\n`
    }
    
    xml += '  </url>\n'
  }
  
  // Sitemap closing tag
  xml += '</urlset>'
  
  return xml
} 