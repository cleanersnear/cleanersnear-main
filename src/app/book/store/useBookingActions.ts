import { useBookingStore } from './bookingStore';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import type { ServiceType, BookingStep } from '../types';

// ============================================================================
// FRESH BOOKING ACTIONS - CLEAN & SIMPLE
// ============================================================================

export const useBookingActions = () => {
  const searchParams = useSearchParams();
  const {
    selectedService,
    setSelectedService,
    setCurrentStep,
    resetBooking,
  } = useBookingStore();

  // Handle URL parameters on component mount
  useEffect(() => {
    const selectedServicesParam = searchParams.get('selectedServices');
    
    if (selectedServicesParam) {
      const decodedService = decodeURIComponent(selectedServicesParam);
      setSelectedService(decodedService as ServiceType);
    }
  }, [searchParams, setSelectedService]);

  // Basic action handlers
  const handleServiceSelection = (serviceName: ServiceType) => {
    setSelectedService(serviceName);
  };

  const handleStepNavigation = (step: BookingStep) => {
    setCurrentStep(step);
  };

  const handleResetBooking = () => {
    resetBooking();
  };

  return {
    selectedService,
    handleServiceSelection,
    handleStepNavigation,
    handleResetBooking,
  };
};