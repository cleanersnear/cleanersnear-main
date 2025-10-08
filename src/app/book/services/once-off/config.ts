// Once-Off Cleaning Service Configuration
// This file contains configuration constants for Once-Off Cleaning service

export const ONCE_OFF_CLEANING_CONFIG = {
  MINIMUM_HOURS: 3,
  MINIMUM_PRICE: 161,
  HOURLY_RATE: 45,
  MAX_HOURS: 8,
  
  DURATION_OPTIONS: [
    { value: '3 hours' as const, label: '3 hours', hours: 3, isManualQuote: false },
    { value: '4 hours' as const, label: '4 hours', hours: 4, isManualQuote: false },
    { value: '5 hours' as const, label: '5 hours', hours: 5, isManualQuote: false },
    { value: '6 hours' as const, label: '6 hours', hours: 6, isManualQuote: false },
    { value: '7 hours' as const, label: '7 hours', hours: 7, isManualQuote: false },
    { value: '8 hours' as const, label: '8 hours', hours: 8, isManualQuote: false },
  ],
} as const;
