// NDIS Cleaning Service Configuration
// This file contains configuration constants for NDIS Cleaning service

export const NDIS_CLEANING_CONFIG = {
  MINIMUM_HOURS: 2,
  HOURLY_RATE: 56,
  MAX_HOURS: 8,
  
  DURATION_OPTIONS: [
    { value: '2 hours' as const, label: '2 hours', hours: 2, isManualQuote: false },
    { value: '3 hours' as const, label: '3 hours', hours: 3, isManualQuote: false },
    { value: '4 hours' as const, label: '4 hours', hours: 4, isManualQuote: false },
    { value: '5 hours' as const, label: '5 hours', hours: 5, isManualQuote: false },
    { value: '6 hours' as const, label: '6 hours', hours: 6, isManualQuote: false },
    { value: '7 hours' as const, label: '7 hours', hours: 7, isManualQuote: false },
    { value: '8 hours' as const, label: '8 hours', hours: 8, isManualQuote: false },
  ],
  
  FREQUENCY_OPTIONS: [
    {
      value: 'Weekly' as const,
      label: 'Weekly',
      description: 'Every 7 days',
    },
    {
      value: 'Fortnightly' as const,
      label: 'Fortnightly',
      description: 'Every 14 days',
    },
    {
      value: 'Once-off' as const,
      label: 'Once-off',
      description: 'Single cleaning session',
    },
  ],
} as const;
