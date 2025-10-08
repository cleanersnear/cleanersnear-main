"use client";

import { useState } from "react";
import { useBookingStore } from "../store";
import { END_OF_LEASE_FIELD_CONFIG, type BookingStep } from "../types";
import GooglePlacesAutocomplete from "../components/AddressLookup/GooglePlacesAutocomplete";

export function CustomerDetailsForm() {
  const { customerDetails, selectedService, updateCustomerDetails, setCurrentStep, submitBooking, confirmationState } = useBookingStore();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    updateCustomerDetails({ [field]: value });
    
    // Clear validation error for this field when user starts typing
    if (validationErrors.includes(field)) {
      setValidationErrors(prev => prev.filter(error => error !== field));
    }
  };

  const handleNDISDetailsChange = (field: string, value: string) => {
    updateCustomerDetails({
      ndisDetails: {
        ...(customerDetails.ndisDetails || {}),
        [field]: value,
      },
    });
  };

  const handleCommercialDetailsChange = (field: string, value: string) => {
    updateCustomerDetails({
      commercialDetails: {
        ...(customerDetails.commercialDetails || {}),
        [field]: value,
      },
    });
  };

  const handleContinue = async () => {
    // Clear previous validation errors
    setValidationErrors([]);
    
    // Simple validation - check required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'scheduleDate'];
    const missingFields = requiredFields.filter(field => !customerDetails[field as keyof typeof customerDetails]);
    
    if (missingFields.length > 0) {
      // Set validation errors and scroll to first error
      setValidationErrors(missingFields);
      
      // Scroll to first missing field
      const firstErrorField = document.getElementById(missingFields[0]);
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
      
      return;
    }

    try {
      // Submit booking to API and await response
      await submitBooking();
      
      // Move to Step 4: Confirmation immediately after API response
      setCurrentStep(4 as BookingStep);
    } catch {
      // Error is already handled in submitBooking function
      // Still move to Step 4 to show error state
      setCurrentStep(4 as BookingStep);
    }
  };

  const handleAddressSelect = (address: string, postcode: string, suburb: string) => {
    updateCustomerDetails({ 
      address,
      // Store additional address components for future use
      postcode,
      suburb 
    });
    
    // Clear validation error for address when selected
    if (validationErrors.includes('address')) {
      setValidationErrors(prev => prev.filter(error => error !== 'address'));
    }
  };

  // Helper function to get field styling based on validation state
  const getFieldStyles = (fieldName: string) => {
    const hasError = validationErrors.includes(fieldName);
    return {
      input: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F] ${
        hasError 
          ? 'border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500' 
          : 'border-gray-300'
      }`,
      label: `block text-sm font-medium mb-1 ${
        hasError ? 'text-red-700' : 'text-gray-700'
      }`,
      errorMessage: hasError ? (
        <p className="mt-1 text-sm text-red-600">
          This field is required
        </p>
      ) : null
    };
  };

  return (
    <form className="space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className={getFieldStyles('firstName').label}>
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={customerDetails.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={getFieldStyles('firstName').input}
              placeholder="Enter your first name"
            />
            {getFieldStyles('firstName').errorMessage}
          </div>
          <div>
            <label htmlFor="lastName" className={getFieldStyles('lastName').label}>
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={customerDetails.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={getFieldStyles('lastName').input}
              placeholder="Enter your last name"
            />
            {getFieldStyles('lastName').errorMessage}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={getFieldStyles('email').label}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={customerDetails.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={getFieldStyles('email').input}
              placeholder="Enter your email address"
            />
            {getFieldStyles('email').errorMessage}
          </div>
          <div>
            <label htmlFor="phone" className={getFieldStyles('phone').label}>
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={customerDetails.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={getFieldStyles('phone').input}
              placeholder="Enter your phone number"
            />
            {getFieldStyles('phone').errorMessage}
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Service Address</h3>
        <div>
          <label htmlFor="address" className={getFieldStyles('address').label}>
            Full Address *
          </label>
          <GooglePlacesAutocomplete
            onAddressSelect={handleAddressSelect}
            placeholder="Enter the full address where cleaning service is needed"
            value={customerDetails.address || ''}
            onChange={(value: string) => handleInputChange('address', value)}
            className={getFieldStyles('address').input}
          />
          {getFieldStyles('address').errorMessage}
        </div>
      </div>

      {/* Schedule Date */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule</h3>
        <div>
          <label htmlFor="scheduleDate" className={getFieldStyles('scheduleDate').label}>
            Preferred Date *
          </label>
          <input
            type="date"
            id="scheduleDate"
            name="scheduleDate"
            required
            min={new Date().toISOString().split('T')[0]}
            value={customerDetails.scheduleDate || ''}
            onChange={(e) => handleInputChange('scheduleDate', e.target.value)}
            className={getFieldStyles('scheduleDate').input}
          />
          {getFieldStyles('scheduleDate').errorMessage}
        </div>
      </div>

      {/* Service-Specific Fields */}
      {selectedService === "NDIS Cleaning" && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">NDIS Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ndisNumber" className="block text-sm font-medium text-gray-700 mb-1">
                NDIS Number
              </label>
              <input
                type="text"
                id="ndisNumber"
                name="ndisNumber"
                value={customerDetails.ndisDetails?.ndisNumber || ''}
                onChange={(e) => handleNDISDetailsChange('ndisNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F]"
                placeholder="Enter NDIS participant number"
              />
            </div>
            <div>
              <label htmlFor="planManager" className="block text-sm font-medium text-gray-700 mb-1">
                Plan Manager (if applicable)
              </label>
              <input
                type="text"
                id="planManager"
                name="planManager"
                value={customerDetails.ndisDetails?.planManager || ''}
                onChange={(e) => handleNDISDetailsChange('planManager', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F]"
                placeholder="Enter plan manager details"
              />
            </div>
          </div>
        </div>
      )}

      {selectedService === "End of Lease Cleaning" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eolRole" className="block text-sm font-medium text-gray-700 mb-1">
                I am
              </label>
              <select
                id="eolRole"
                name="eolRole"
                value={customerDetails.endOfLeaseDetails?.role || ''}
                onChange={(e) => updateCustomerDetails({ endOfLeaseDetails: { ...(customerDetails.endOfLeaseDetails || {}), role: e.target.value as 'Tenant' | 'Property Owner' | 'Real Estate Agent' } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F]"
              >
                <option value="">Select your role</option>
                {END_OF_LEASE_FIELD_CONFIG.roles.map((r) => (
                  <option key={r.value} value={r.value || ''}>{r.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-600 bg-yellow-50 border border-yellow-200 rounded-md p-3">
            {END_OF_LEASE_FIELD_CONFIG.parkingNote}
          </div>
        </div>
      )}

      {selectedService === "Commercial Cleaning" && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={customerDetails.commercialDetails?.businessName || ''}
                onChange={(e) => handleCommercialDetailsChange('businessName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F]"
                placeholder="Enter business name"
              />
            </div>
            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={customerDetails.commercialDetails?.contactPerson || ''}
                onChange={(e) => handleCommercialDetailsChange('contactPerson', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F]"
                placeholder="Primary contact person"
              />
            </div>
            <div>
              <label htmlFor="abn" className="block text-sm font-medium text-gray-700 mb-1">
                Business ABN
              </label>
              <input
                type="text"
                id="abn"
                name="abn"
                value={customerDetails.commercialDetails?.abn || ''}
                onChange={(e) => handleCommercialDetailsChange('abn', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F]"
                placeholder="Enter ABN (if applicable)"
              />
            </div>
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                Business Type
              </label>
              <select
                id="businessType"
                name="businessType"
                value={customerDetails.commercialDetails?.businessType || ''}
                onChange={(e) => handleCommercialDetailsChange('businessType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F]"
              >
                <option value="">Select business type</option>
                <option value="office">Office</option>
                <option value="retail">Retail</option>
                <option value="agedCare">Aged Care</option>
                <option value="educationChildCare">Education & Child Care</option>
                <option value="government">Government</option>
                <option value="medical">Medical & Healthcare</option>
                <option value="gymFitness">Gym & Fitness</option>
                <option value="restaurantHospitality">Restaurant & Hospitality</option>
                <option value="warehouseIndustrial">Warehouse & Industrial</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Additional Notes */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Special Instructions or Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={customerDetails.notes || ''}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3D8F] focus:border-[#1E3D8F] resize-none"
            placeholder="Any special instructions, access codes, or additional information..."
          />
        </div>
      </div>

      {/* Continue Button */}
      <div className="pt-4">
        <button 
          type="button"
          className="w-full bg-[#1E3D8F] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1E3D8F]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleContinue}
          disabled={confirmationState.apiStatus === 'loading'}
        >
          {confirmationState.apiStatus === 'loading' ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Submitting Booking...
            </div>
          ) : (
            'Submit Booking & Continue'
          )}
        </button>
      </div>
    </form>
  );
}

