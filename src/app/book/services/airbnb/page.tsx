"use client";

import { useBookingStore } from "../../store";
import type { AirbnbCleaningDetails, AirbnbCleaningPricing, BookingStep } from "../../types";
import { AIRBNB_CLEANING_CONFIG } from "./config";

export default function AirbnbCleaningPage() {
  const { serviceDetails, updateServiceDetails, setCurrentStep, updatePricing } = useBookingStore();

  // Simple and clean - just cast serviceDetails to AirbnbCleaningDetails
  const details = (serviceDetails || {}) as unknown as AirbnbCleaningDetails;
  
  // Service updater available but not used in this component
  // const updateAirbnbDetails = createServiceUpdater(updateServiceDetails);
  const isRegular = details.serviceType !== 'Once-off';

  const calculatePricing = (duration: string): AirbnbCleaningPricing => {
    const hours = parseInt(duration);
    const cfg = isRegular ? AIRBNB_CLEANING_CONFIG.REGULAR : AIRBNB_CLEANING_CONFIG.ONCE_OFF;
    const minimumHours = cfg.MINIMUM_HOURS;
    const minimumPrice = cfg.MINIMUM_PRICE;
    const additionalHours = Math.max(0, hours - minimumHours);
    const additionalCost = additionalHours * cfg.HOURLY_RATE_AFTER_MINIMUM;
    const totalHours = hours;
    const totalPrice = minimumPrice + additionalCost;
    return {
      minimumHours,
      minimumPrice,
      hourlyRateAfterMinimum: cfg.HOURLY_RATE_AFTER_MINIMUM,
      additionalHours,
      additionalCost,
      totalHours,
      totalPrice,
    };
  };

  const setType = (serviceType: AirbnbCleaningDetails["serviceType"]) => {
    updateServiceDetails({ serviceType });
    if (serviceType === 'Regular' && !details.frequency) {
      updateServiceDetails({ frequency: 'Weekly' });
    }
  };

  const setFrequency = (frequency: AirbnbCleaningDetails["frequency"]) => {
    updateServiceDetails({ frequency });
  };

  const setDuration = (duration: AirbnbCleaningDetails["duration"]) => {
    updateServiceDetails({ duration });
    if (duration) {
      const pricing = calculatePricing(duration);
      updatePricing(pricing);
    }
  };

  const handleContinue = () => {
    if (details.duration) {
      const pricing = calculatePricing(details.duration);
      updatePricing(pricing);
    }
    setCurrentStep(3 as BookingStep);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Airbnb Cleaning Details</h3>
      <p className="text-gray-700 mb-6">Fast turnovers with hotel-standard presentation for your short-term rental.</p>
      
      <div className="space-y-6">
        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
          <div className="grid grid-cols-2 gap-3">
            {(['Regular', 'Once-off'] as const).map((type) => (
              <button
                key={type}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  details.serviceType === type ? 'border-[#1E3D8F] bg-blue-50' : 'border-gray-300 hover:border-[#1E3D8F]'
                }`}
                onClick={() => setType(type)}
              >
                <div className="font-medium text-gray-900">{type}</div>
                <div className="text-sm text-gray-600">
                  {type === 'Regular'
                    ? 'From $118 (2 hrs) • $45/hour after'
                    : 'From $198 (3 hrs) • $50/hour after'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Frequency for Regular */}
        {isRegular && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
            <div className="grid grid-cols-3 gap-3">
              {AIRBNB_CLEANING_CONFIG.FREQUENCIES.map((f) => (
                <button
                  key={f.value}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    details.frequency === f.value ? 'border-[#1E3D8F] bg-blue-50' : 'border-gray-300 hover:border-[#1E3D8F]'
                  }`}
                  onClick={() => setFrequency(f.value as AirbnbCleaningDetails["frequency"])}
                >
                  <div className="font-medium text-gray-900">{f.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
          <div className="grid grid-cols-3 gap-3">
            {AIRBNB_CLEANING_CONFIG.DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  details.duration === opt.value ? 'border-[#1E3D8F] bg-blue-50' : 'border-gray-300 hover:border-[#1E3D8F]'
                }`}
                onClick={() => setDuration(opt.value)}
              >
                <div className="font-medium text-gray-900">{opt.label}</div>
              </button>
            ))}
          </div>
          {isRegular ? (
            <p className="text-sm text-gray-500 mt-2">
              Minimum 2 hours • $118 for first 2 hours • $45/hour thereafter
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-2">
              3 hours • $198 for first 3 hours • $50/hour thereafter
            </p>
          )}
        </div>

        {/* Extras */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Extras</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={details.extras?.linenChange || false}
                onChange={(e) => {
                  const newExtras = { ...details.extras, linenChange: e.target.checked };
                  updateServiceDetails({ extras: newExtras });
                }}
                className="rounded border-gray-300 text-[#1E3D8F] focus:ring-[#1E3D8F]"
              />
              <span className="ml-2 text-sm text-gray-700">Linen change & bed making (extra charge)</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={details.extras?.restockAmenities || false}
                onChange={(e) => {
                  const newExtras = { ...details.extras, restockAmenities: e.target.checked };
                  updateServiceDetails({ extras: newExtras });
                }}
                className="rounded border-gray-300 text-[#1E3D8F] focus:ring-[#1E3D8F]"
              />
              <span className="ml-2 text-sm text-gray-700">Restock amenities  (extra charge)</span>
            </label>
            {/* Key handover removed */}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests or Additional Notes (Optional)
          </label>
          <textarea
            value={details.specialRequests || ''}
            onChange={(e) => updateServiceDetails({ specialRequests: e.target.value })}
            placeholder="Any specific requirements, linen handling, timings, or other notes..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F] resize-none"
            rows={3}
          />
        </div>

        {/* Pricing Summary */}
        {details.duration && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Pricing Summary</h4>
            {(() => {
              const pricing = calculatePricing(details.duration!);
              return (
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Base ({pricing.minimumHours} hours):</span>
                    <span>${pricing.minimumPrice.toFixed(2)}</span>
                  </div>
                  {pricing.additionalHours > 0 && (
                    <div className="flex justify-between">
                      <span>Additional {pricing.additionalHours} hour(s):</span>
                      <span>${pricing.additionalCost.toFixed(2)}</span>
                    </div>
                  )}
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
            disabled={!details.duration || (isRegular && !details.frequency)}
          >
            Continue to Your Details
          </button>
        </div>
      </div>
    </div>
  );
}
