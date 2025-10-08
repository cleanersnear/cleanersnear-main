// ============================================================================
// FRESH STORE EXPORTS - CLEAN & SIMPLE
// ============================================================================

// Core store exports
export { useBookingStore } from './bookingStore';
export { useBookingActions } from './useBookingActions';

// Type exports from our single source of truth
export type {
  BookingSession,
  BookingStep,
  BookingStatus,
  ServiceType,
  CustomerDetails,
  ServicePricingBreakdown,
  BookingApiResponse,
  BookingConfirmationState,
} from '../types';

// Re-export store interface for components
export type { BookingState } from './bookingStore';