export type BookingCategory = 'individual' | 'business';

export type BookingType = 'regular' | 'once-off';

export type Frequency = 'weekly' | 'fortnightly';

export type ServiceType =
  | 'General Cleaning'
  | 'NDIS Cleaning'
  | 'Move-In Cleaning'
  | 'Move-Out Cleaning'
  | 'Inspection Cleaning'
  | 'Deep/Spring Cleaning'
  | 'Airbnb Cleaning';

export interface ServicePricing {
  serviceType: ServiceType;
  hourlyRate: number;
  minimumHours: number;
  minimumPrice: number;
  extraHourRate: number;
  frequency?: Frequency; // Only for regular
}

export interface BookingPricing {
  category: BookingCategory;
  bookingType: BookingType;
  frequency?: Frequency; // Only for regular
  services: ServicePricing[];
}

// Example data structure:
export const PRICING: BookingPricing[] = [
  // Individual Once-Off
  {
    category: 'individual',
    bookingType: 'once-off',
    services: [
      { serviceType: 'General Cleaning', hourlyRate: 45, minimumHours: 3, minimumPrice: 161, extraHourRate: 45 },
      { serviceType: 'NDIS Cleaning', hourlyRate: 50.02, minimumHours: 3, minimumPrice: 180.06, extraHourRate: 50.02 },
      { serviceType: 'Move-In Cleaning', hourlyRate: 48.5, minimumHours: 3, minimumPrice: 189.05, extraHourRate: 48.5 },
      { serviceType: 'Move-Out Cleaning', hourlyRate: 63.05, minimumHours: 3, minimumPrice: 249.15, extraHourRate: 63.05 },
      { serviceType: 'Inspection Cleaning', hourlyRate: 53.76, minimumHours: 3, minimumPrice: 191.28, extraHourRate: 53.76 },
      { serviceType: 'Deep/Spring Cleaning', hourlyRate: 53.07, minimumHours: 3, minimumPrice: 205, extraHourRate: 53.07 },
      { serviceType: 'Airbnb Cleaning', hourlyRate: 49.89, minimumHours: 3, minimumPrice: 179, extraHourRate: 49.89 },
    ],
  },
  // Individual Regular Weekly
  {
    category: 'individual',
    bookingType: 'regular',
    frequency: 'weekly',
    services: [
      { serviceType: 'General Cleaning', hourlyRate: 38, minimumHours: 2, minimumPrice: 92.05, extraHourRate: 38, frequency: 'weekly' },
      { serviceType: 'NDIS Cleaning', hourlyRate: 45.15, minimumHours: 2, minimumPrice: 99.98, extraHourRate: 45.15, frequency: 'weekly' },
      { serviceType: 'Airbnb Cleaning', hourlyRate: 40.97, minimumHours: 2, minimumPrice: 91.98, extraHourRate: 40.97, frequency: 'weekly' },
    ],
  },
  // Individual Regular Fortnightly
  {
    category: 'individual',
    bookingType: 'regular',
    frequency: 'fortnightly',
    services: [
      { serviceType: 'General Cleaning', hourlyRate: 43, minimumHours: 2, minimumPrice: 102, extraHourRate: 43, frequency: 'fortnightly' },
      { serviceType: 'NDIS Cleaning', hourlyRate: 47.19, minimumHours: 2, minimumPrice: 110, extraHourRate: 47.19, frequency: 'fortnightly' },
      { serviceType: 'Airbnb Cleaning', hourlyRate: 45.67, minimumHours: 2, minimumPrice: 103, extraHourRate: 45.67, frequency: 'fortnightly' },
    ],
  },
  // Business/Commercial Once-Off
  {
    category: 'business',
    bookingType: 'once-off',
    services: [
      { serviceType: 'General Cleaning', hourlyRate: 65, minimumHours: 4, minimumPrice: 260, extraHourRate: 65 },
    ],
  },
  // Business/Commercial Regular
  {
    category: 'business',
    bookingType: 'regular',
    services: [
      { serviceType: 'General Cleaning', hourlyRate: 44, minimumHours: 2, minimumPrice: 88, extraHourRate: 44 },
    ],
  },
];
