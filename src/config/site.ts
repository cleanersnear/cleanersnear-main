import { SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  name: "Cleaning Professionals",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  links: {
    facebook: "https://facebook.com/cleaningprofessionals",
    instagram: "https://instagram.com/cleaningprofessionals",
  },
  title: {
    template: '%s | Cleaning Professionals Melbourne',
    default: 'Professional Cleaning Services Melbourne | End of Lease, NDIS & Commercial | Cleaning Professionals',
    services: 'Professional Cleaning Services Melbourne | %s',
  },
  description: {
    default: 'Melbourne\'s trusted professional cleaning service. Expert cleaners, satisfaction guaranteed, servicing all suburbs.',
    services: 'Professional %s in Melbourne. Certified cleaners, 100% satisfaction guaranteed.',
    locations: 'Expert professional cleaning services in {location}. Trusted local cleaners.'
  },
} 