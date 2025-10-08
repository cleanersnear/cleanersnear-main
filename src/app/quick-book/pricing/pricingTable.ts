import { PricingTable } from '../types';

const PLACEHOLDER = { minHours: 0, minAmount: 0, baseRate: 0 };

export const PRICING_TABLE: PricingTable = {
  weekly: {
    'General Cleaning': { minHours: 2, minAmount: 92.05, baseRate: 38 },
    'NDIS Cleaning': { minHours: 2, minAmount: 99.98, baseRate: 45.15 },
    'Move-In Cleaning': PLACEHOLDER,
    'Move-Out Cleaning': PLACEHOLDER,
    'Inspection Cleaning': PLACEHOLDER,
    'Deep/Spring Cleaning': PLACEHOLDER,
    'Airbnb Cleaning': { minHours: 2, minAmount: 91.98, baseRate: 40.97 },
  },
  fortnightly: {
    'General Cleaning': { minHours: 2, minAmount: 102, baseRate: 43 },
    'NDIS Cleaning': { minHours: 2, minAmount: 110, baseRate: 47.19 },
    'Move-In Cleaning': PLACEHOLDER,
    'Move-Out Cleaning': PLACEHOLDER,
    'Inspection Cleaning': PLACEHOLDER,
    'Deep/Spring Cleaning': PLACEHOLDER,
    'Airbnb Cleaning': { minHours: 2, minAmount: 103, baseRate: 45.67 },
  },
  once: {
    'General Cleaning': { minHours: 3, minAmount: 161, baseRate: 45 },
    'NDIS Cleaning': { minHours: 3, minAmount: 180.06, baseRate: 50.02 },
    'Move-In Cleaning': { minHours: 3, minAmount: 189.05, baseRate: 48.5 },
    'Move-Out Cleaning': { minHours: 3, minAmount: 249.15, baseRate: 63.05 },
    'Inspection Cleaning': { minHours: 3, minAmount: 191.28, baseRate: 53.76 },
    'Deep/Spring Cleaning': { minHours: 3, minAmount: 205, baseRate: 53.07 },
    'Airbnb Cleaning': { minHours: 3, minAmount: 179, baseRate: 49.89 },
  }
}; 