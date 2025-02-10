import { SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  name: "Cleaning Professionals",
  description: "Professional Cleaning Services in Melbourne",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  links: {
    facebook: "https://facebook.com/cleanersnear",
    instagram: "https://instagram.com/cleanersnear",
  }
} 