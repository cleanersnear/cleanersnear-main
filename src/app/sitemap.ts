import { MetadataRoute } from 'next'

/**
 * Main sitemap index file
 * 
 * This file serves as the primary index for all other sitemap files.
 * It follows the sitemap index protocol as specified by Google and other search engines.
 * 
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
 * @returns {MetadataRoute.Sitemap} The sitemap index entries
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  const baseUrl = 'https://www.cleaningprofessionals.com.au'
  
  // Define the last modified date for all sitemaps - use the current date
  const lastModified = new Date()
  
  // Create the sitemap index entries
  // Each entry points to a specific sitemap file that contains a subset of URLs
  return [
    {
      url: `${baseUrl}/sitemap-home.xml`,
      lastModified,
    },
    {
      url: `${baseUrl}/sitemap-services.xml`,
      lastModified,
    },
    {
      url: `${baseUrl}/sitemap-locations.xml`,
      lastModified,
    },
    {
      url: `${baseUrl}/sitemap-location-services.xml`,
      lastModified,
    },
    {
      url: `${baseUrl}/sitemap-manual-locations.xml`,
      lastModified,
    },
    {
      url: `${baseUrl}/sitemap-blogs.xml`,
      lastModified,
    },
    {
      url: `${baseUrl}/sitemap-static.xml`,
      lastModified,
    }
  ]
}
