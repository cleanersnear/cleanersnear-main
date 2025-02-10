export interface LocationBadgeProps {
  city: string
  region: string
  className?: string
}

export interface BusinessInfo {
  yearsInBusiness: number
  totalCleaners: number
  insuranceInfo: string
}

export interface HeroProps {
  location: {
    city: string
    region: string
    mainSuburbs: string[]
  }
  businessInfo: BusinessInfo
} 