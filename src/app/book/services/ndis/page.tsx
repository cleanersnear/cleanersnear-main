"use client";

import { useBookingStore } from "../../store";
import type { NDISCleaningDetails, NDISCleaningPricing, BookingStep } from "../../types";
import { NDIS_CLEANING_CONFIG } from "./config";

export default function NDISCleaningPage() {
  const { serviceDetails, updateServiceDetails, setCurrentStep, updatePricing } = useBookingStore();
  
  // Simple and clean - just cast serviceDetails to NDISCleaningDetails
  const details = (serviceDetails || {}) as unknown as NDISCleaningDetails;
  
  // Service updater available but not used in this component
  // const updateNDISDetails = createServiceUpdater(updateServiceDetails);

  // Calculate pricing based on selections
  const calculatePricing = (duration: string): NDISCleaningPricing => {
    const hours = parseInt(duration);
    const additionalHours = Math.max(0, hours - NDIS_CLEANING_CONFIG.MINIMUM_HOURS);
    const totalPrice = hours * NDIS_CLEANING_CONFIG.HOURLY_RATE;

    return {
      minimumHours: NDIS_CLEANING_CONFIG.MINIMUM_HOURS,
      hourlyRate: NDIS_CLEANING_CONFIG.HOURLY_RATE,
      maxHours: NDIS_CLEANING_CONFIG.MAX_HOURS,
      additionalHours,
      totalHours: hours,
      totalPrice,
    };
  };

  const handleDurationSelect = (duration: string) => {
    updateServiceDetails({ duration });
    
    // Recalculate pricing when duration is selected
    const pricing = calculatePricing(duration);
    updatePricing(pricing);
  };

  const handleFrequencySelect = (frequency: string) => {
    updateServiceDetails({ frequency });
  };

  const handleSpecialRequestsChange = (value: string) => {
    updateServiceDetails({ specialRequests: value });
  };

  const handleContinue = () => {
    setCurrentStep(3 as BookingStep);
  };

  // Check if manual quote is needed (over 8 hours)
  const isManualQuote = details.duration && parseInt(details.duration) > NDIS_CLEANING_CONFIG.MAX_HOURS;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">NDIS Cleaning Details</h3>
      <p className="text-gray-700 mb-6">Support-focused cleaning services for eligible participants (self or plan managed).</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
          <div className="grid grid-cols-3 gap-3">
            {NDIS_CLEANING_CONFIG.FREQUENCY_OPTIONS.map((option) => (
              <button 
                key={option.value}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  details.frequency === option.value 
                    ? 'border-[#1E3D8F] bg-blue-50' 
                    : 'border-gray-300 hover:border-[#1E3D8F]'
                }`}
                onClick={() => handleFrequencySelect(option.value)}
              >
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-600">{option.description}</div>
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Frequency selection is for scheduling information only - no price changes
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
          <div className="grid grid-cols-3 gap-3">
            {NDIS_CLEANING_CONFIG.DURATION_OPTIONS.map((option) => (
              <button 
                key={option.value}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  details.duration === option.value 
                    ? 'border-[#1E3D8F] bg-blue-50' 
                    : 'border-gray-300 hover:border-[#1E3D8F]'
                }`}
                onClick={() => handleDurationSelect(option.value)}
              >
                <div className="font-medium text-gray-900">{option.label}</div>
                {option.isManualQuote && (
                  <div className="text-xs text-[#1E3D8F] font-medium mt-1">
                    Manual Quote
                  </div>
                )}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Minimum 2 hours • $56/hour flat rate
          </p>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests or Additional Notes (Optional)
          </label>
          <textarea
            value={details.specialRequests || ''}
            onChange={(e) => handleSpecialRequestsChange(e.target.value)}
            placeholder="Any specific requirements, accessibility needs, or additional notes..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F] resize-none"
            rows={3}
          />
        </div>

        {/* Pricing Summary */}
        {details.duration && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Pricing Summary</h4>
            {(() => {
              const pricing = calculatePricing(details.duration);
              return (
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>{pricing.totalHours} hour(s) × ${pricing.hourlyRate}/hour:</span>
                    <span>${pricing.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-gray-300 pt-2">
                    <span>Total:</span>
                    <span>${pricing.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        <div className="pt-4">
          <button 
            className="w-full bg-[#1E3D8F] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1E3D8F]/90 disabled:bg-gray-400"
            onClick={handleContinue}
            disabled={!details.frequency || !details.duration}
          >
            Continue to Your Details
          </button>
        </div>

        {/* Manual Quote Notice */}
        {isManualQuote && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Manual Quote Required</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>For cleaning sessions over 8 hours, please contact our office for a custom quote.</p>
                  <p className="mt-1">Call us at <strong>0000 000 000</strong> to discuss your requirements.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
