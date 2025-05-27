import { ServiceBase } from '@/app/quick-book/types/service'

export type NDISCleaningType = 'regular-support' | 'one-time-service' | 'specialized-support'

export interface NDISCleaningService extends ServiceBase {
  type: 'ndis-cleaning'
  supportLevel: NDISCleaningType
  minimumHours: number
  includesSupplies: boolean
}

export interface NDISPricingProps {
  service: ServiceBase
}

export interface NDISReview {
  name: string
  location: string
  rating: number
  review: string
  date: string
  propertyType: string
} 