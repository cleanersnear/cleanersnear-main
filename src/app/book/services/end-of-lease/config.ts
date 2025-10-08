// End of Lease Cleaning Service Configuration
// This file contains configuration constants for End of Lease Cleaning service

export const END_OF_LEASE_CLEANING_CONFIG = {
  SIZES: [
    { label: 'Studio' as const, price: 205, bathrooms: 1, toilets: 1, manualQuote: false },
    { label: '1 Bed' as const, price: 255, bathrooms: 1, toilets: 1, manualQuote: false },
    { label: '2 Bed' as const, price: 310, bathrooms: 1, toilets: 1, manualQuote: false },
    { label: '3 Bed' as const, price: 450, bathrooms: 2, toilets: 2, manualQuote: false },
    { label: '4 Bed' as const, price: 625, bathrooms: 2, toilets: 3, manualQuote: false },
    { label: '5+ Bed' as const, price: 0, bathrooms: 0, toilets: 0, manualQuote: true },
  ],
  PRICES: {
    EXTRA_BATHROOM: 30,
    EXTRA_TOILET: 10,
    FURNISHED: 60,
    STUDY_ROOM: 10,
    PETS: 20,
    STEAM_BASE: 30, // if steam required at all
    STEAM_PER_ROOM: 30, // per bedroom or living room
    STEAM_HALLWAY: 20,
    STEAM_STAIRS: 40,
    EXTRA_BALCONY: 55,
    EXTRA_GARAGE: 40,
  } as const,
} as const;
