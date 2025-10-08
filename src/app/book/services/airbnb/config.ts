// Airbnb Cleaning Service Configuration
// This file contains configuration constants for Airbnb Cleaning service

export const AIRBNB_CLEANING_CONFIG = {
  REGULAR: {
    MINIMUM_HOURS: 2,
    MINIMUM_PRICE: 118,
    HOURLY_RATE_AFTER_MINIMUM: 45,
  },
  
  ONCE_OFF: {
    MINIMUM_HOURS: 3,
    MINIMUM_PRICE: 198,
    HOURLY_RATE_AFTER_MINIMUM: 50,
  },
  
  FREQUENCIES: [
    { value: 'Daily' as const, label: 'Daily' },
    { value: 'Weekly' as const, label: 'Weekly' },
    { value: 'Fortnightly' as const, label: 'Fortnightly' },
  ],
  
  DURATION_OPTIONS: [
    { value: '2 hours' as const, label: '2 hours', hours: 2 },
    { value: '3 hours' as const, label: '3 hours', hours: 3 },
    { value: '4 hours' as const, label: '4 hours', hours: 4 },
    { value: '5 hours' as const, label: '5 hours', hours: 5 },
    { value: '6 hours' as const, label: '6 hours', hours: 6 },
    { value: '7 hours' as const, label: '7 hours', hours: 7 },
    { value: '8 hours' as const, label: '8 hours', hours: 8 },
  ],
} as const;
