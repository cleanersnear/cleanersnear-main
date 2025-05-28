import { ServiceBase } from '@/app/quick-book/types/service'

export type ServiceType = 'end-of-lease-cleaning' | 'regular-cleaning' | 'deep-cleaning' | 'office-cleaning' | 'spring-cleaning'

export interface ServiceDetails {
  id: ServiceType
  title: string
  type: string
  category: string
}

export interface BookNowProps {
  service: ServiceBase
} 