"use client";

import { useBookingStore } from "../../store";
import type { CommercialCleaningDetails, CommercialCleaningPricing, BookingStep } from "../../types";
import { COMMERCIAL_CLEANING_CONFIG } from "./config";

export default function CommercialCleaningPage() {
  const { serviceDetails, updateServiceDetails, setCurrentStep, updatePricing } = useBookingStore();

  // Simple and clean - just cast serviceDetails to CommercialCleaningDetails
  const details = (serviceDetails || {}) as unknown as CommercialCleaningDetails;
  
  // Service updater available but not used in this component
  // const updateCommercialDetails = createServiceUpdater(updateServiceDetails);

  const calculatePricing = (): CommercialCleaningPricing => {
    const rate = COMMERCIAL_CLEANING_CONFIG.PRICING.HOURLY_RATE;
    const minHours = COMMERCIAL_CLEANING_CONFIG.PRICING.MINIMUM_HOURS;
    const hours = Math.max(minHours, Number(details.hoursPerVisit || 0));
    const staff = Math.max(1, Number(details.staffCount || 1));
    const totalHours = hours * staff;
    const totalPrice = +(totalHours * rate).toFixed(2);
    return {
      hourlyRate: rate,
      minHours,
      selectedHours: totalHours,
      totalHours,
      totalPrice,
    };
  };

  const setType = (serviceType: CommercialCleaningDetails["serviceType"]) => {
    updateServiceDetails({ serviceType });
    if (serviceType === "Once-off") {
      updateServiceDetails({ frequency: undefined });
    }
    const pricing = calculatePricing();
    updatePricing(pricing);
  };

  const setFrequency = (frequency: CommercialCleaningDetails["frequency"]) => {
    updateServiceDetails({ frequency });
    const pricing = calculatePricing();
    updatePricing(pricing);
  };

  const changeHours = (delta: number) => {
    const min = COMMERCIAL_CLEANING_CONFIG.PRICING.MINIMUM_HOURS;
    const next = Math.max(min, Math.min(12, Number(details.hoursPerVisit || min) + delta));
    updateServiceDetails({ hoursPerVisit: next });
    const pricing = calculatePricing();
    updatePricing(pricing);
  };

  const changeStaff = (delta: number) => {
    const next = Math.max(1, Math.min(10, Number(details.staffCount || 1) + delta));
    updateServiceDetails({ staffCount: next });
    const pricing = calculatePricing();
    updatePricing(pricing);
  };

  const setPreferredTime = (preferredTime: CommercialCleaningDetails["preferredTime"]) => {
    updateServiceDetails({ preferredTime });
  };

  const handleContinue = () => {
    const pricing = calculatePricing();
    updatePricing(pricing);
    setCurrentStep(3 as BookingStep);
  };

  const pricing = calculatePricing();

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Commercial Cleaning Details</h3>
      <p className="text-gray-700 mb-6">Professional cleaning for small offices and light commercial spaces.</p>
      
      <div className="space-y-6">
        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
          <div className="grid grid-cols-2 gap-3">
            {(["Once-off", "Regular"] as const).map((type) => (
              <button
                key={type}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  details.serviceType === type ? "border-[#1E3D8F] bg-blue-50" : "border-gray-300 hover:border-[#1E3D8F]"
                }`}
                onClick={() => setType(type)}
              >
                <div className="font-medium text-gray-900">{type} Clean</div>
                <div className="text-sm text-gray-600">
                  {type === "Once-off" ? "$60/hour (min. 3 hours)" : "$50/hour base (discounts by frequency)"}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Frequency - only for Regular */}
        {details.serviceType === "Regular" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Frequency</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(["Daily", "Weekly", "Fortnightly", "Monthly"] as const).map((freq) => (
                <button
                  key={freq}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    details.frequency === freq ? "border-[#1E3D8F] bg-blue-50" : "border-gray-300 hover:border-[#1E3D8F]"
                  }`}
                  onClick={() => setFrequency(freq)}
                >
                  <div className="font-medium text-gray-900">{freq}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {freq === "Daily" && "20% off"}
                    {freq === "Weekly" && "15% off"}
                    {freq === "Fortnightly" && "10% off"}
                    {freq === "Monthly" && "No discount"}
                  </div>
                  <div className="text-xs text-gray-500">${COMMERCIAL_CLEANING_CONFIG.PRICING.HOURLY_RATE}/hour</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Requirements */}
        <div className="rounded-lg border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-4">Service Requirements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hours */}
            <div>
              <div className="text-sm text-gray-700 mb-2">Hours Required Per Visit</div>
              <div className="flex items-center gap-4">
                <button type="button" className="h-10 w-10 rounded-full border border-gray-300 hover:border-[#1E3D8F]" onClick={() => changeHours(-1)}>−</button>
                <div className="text-gray-900 font-medium">{Math.max(COMMERCIAL_CLEANING_CONFIG.PRICING.MINIMUM_HOURS, details.hoursPerVisit || 0)} hrs</div>
                <button type="button" className="h-10 w-10 rounded-full border border-gray-300 hover:border-[#1E3D8F]" onClick={() => changeHours(1)}>+</button>
              </div>
              <div className="text-xs text-gray-500 mt-2">Estimated time needed for each cleaning visit</div>
            </div>

            {/* Staff */}
            <div>
              <div className="text-sm text-gray-700 mb-2">Number of Staff Required</div>
              <div className="flex items-center gap-4">
                <button type="button" className="h-10 w-10 rounded-full border border-gray-300 hover:border-[#1E3D8F]" onClick={() => changeStaff(-1)}>−</button>
                <div className="text-gray-900 font-medium">{Math.max(1, details.staffCount || 1)} people</div>
                <button type="button" className="h-10 w-10 rounded-full border border-gray-300 hover:border-[#1E3D8F]" onClick={() => changeStaff(1)}>+</button>
              </div>
              <div className="text-xs text-gray-500 mt-2">Number of cleaning staff needed for the job</div>
            </div>
          </div>

          <div className="mt-4 bg-blue-50 text-blue-900 border border-blue-100 rounded-lg p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">Total Hours per Visit:</div>
              <div className="text-sm">({Math.max(1, details.staffCount || 1)} staff × {Math.max(COMMERCIAL_CLEANING_CONFIG.PRICING.MINIMUM_HOURS, details.hoursPerVisit || 0)} hours each)</div>
            </div>
            <div className="text-blue-900 font-semibold">{pricing.totalHours} hours</div>
          </div>
        </div>

        {/* Preferred Cleaning Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Cleaning Time</label>
          <div className="grid grid-cols-3 gap-3">
            {COMMERCIAL_CLEANING_CONFIG.PREFERRED_TIMES.map((t) => (
              <button
                key={t.value}
                className={`p-3 border rounded-lg text-center transition-colors ${
                  details.preferredTime === t.value ? "border-[#1E3D8F] bg-blue-50" : "border-gray-300 hover:border-[#1E3D8F]"
                }`}
                onClick={() => setPreferredTime(t.value as CommercialCleaningDetails["preferredTime"])}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

{/* Notes */}
<div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests or Additional Notes (Optional)</label>
          <textarea
            value={details.specialRequests || ""}
            onChange={(e) => updateServiceDetails({ specialRequests: e.target.value })}
            placeholder="Any specific requirements, access constraints, or additional notes..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F] resize-none"
            rows={3}
          />
        </div>

        {/* Pricing Summary */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Pricing Summary</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span>Hourly rate:</span><span>${pricing.hourlyRate.toFixed(2)}/hour</span></div>
            <div className="flex justify-between"><span>Total hours per visit:</span><span>{pricing.totalHours} hours</span></div>
            <div className="flex justify-between font-semibold border-t border-gray-300 pt-2"><span>Total:</span><span>${pricing.totalPrice.toFixed(2)}</span></div>
          </div>
        </div>

        
        <div className="pt-4">
          <button
            className="w-full bg-[#1E3D8F] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1E3D8F]/90 disabled:bg-gray-400"
            onClick={handleContinue}
            disabled={!details.serviceType || (details.serviceType === "Regular" && !details.frequency)}
          >
            Continue to Your Details
          </button>
        </div>
      </div>
    </div>
  );
}
