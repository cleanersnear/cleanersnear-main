"use client";

import { Suspense, useEffect } from 'react';
import { useBookingStore, useBookingActions } from '../store';
import type { ServiceType, BookingStep } from '../types';
import { BookingHeader } from './Header';
import { StepIndicator } from './StepIndicator';
import { StepSummary } from './StepSummary';
import { CustomerDetailsForm } from './CustomerDetailsForm';
import { CountdownTimer } from './CountdownTimer';

// Import service-specific pages as components
import RegularCleaningPage from '../services/regular/page';
import OnceOffCleaningPage from '../services/once-off/page';
import NDISCleaningPage from '../services/ndis/page';
import EndOfLeaseCleaningPage from '../services/end-of-lease/page';
import AirbnbCleaningPage from '../services/airbnb/page';
import CommercialCleaningPage from '../services/commercial/page';

function BookingPageContent() {
  const { 
    currentStep, 
    selectedService, 
    customerDetails, 
    pricing,
    confirmationState,
    setCurrentStep
  } = useBookingStore();
  const { handleServiceSelection, handleResetBooking } = useBookingActions();
  
  // Reset booking store only when navigating to home page after successful booking
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (confirmationState.apiStatus === 'success') {
        handleResetBooking();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [confirmationState.apiStatus, handleResetBooking]);

  const isTwoColumn = currentStep === 2 || currentStep === 3;

  const renderServiceDetails = () => {
    switch (selectedService) {
      case "Regular Cleaning":
        return <RegularCleaningPage />;
      case "Once-Off Cleaning":
        return <OnceOffCleaningPage />;
      case "NDIS Cleaning":
        return <NDISCleaningPage />;
      case "End of Lease Cleaning":
        return <EndOfLeaseCleaningPage />;
      case "Airbnb Cleaning":
        return <AirbnbCleaningPage />;
      case "Commercial Cleaning":
        return <CommercialCleaningPage />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-gray-900">2. Service Details</h2>
            <p className="text-gray-600 mt-2">Please select a service to see its details.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <BookingHeader />
      <StepIndicator currentStep={currentStep} />

      <div className={"grid gap-8 " + (isTwoColumn ? "lg:grid-cols-3" : "")}>
        <section className={isTwoColumn ? "lg:col-span-2" : "max-w-3xl mx-auto w-full"}>
          {currentStep > 1 && (
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1) as BookingStep)}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#1E3D8F]"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Back
              </button>
            </div>
          )}
          {currentStep === 1 && (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Cleaning Service</h2>
                <p className="text-gray-600">Select the service that best fits your needs</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Regular Cleaning */}
                <button 
                  className="relative bg-white rounded-xl border-2 border-[#1E3D8F] shadow-md p-6 text-left hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  onClick={() => handleServiceSelection("Regular Cleaning" as ServiceType)}
                >
                  <div className="absolute top-4 left-4 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    Popular
                  </div>
                  <div className="mt-6">
                    <div className="font-bold text-lg text-gray-900 mb-2">Regular Cleaning</div>
                    <div className="text-sm text-gray-600 mb-4">Weekly or fortnightly home cleaning</div>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400">Starting from</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">$92</span>
                        <span className="text-sm text-gray-600">for 2 hours</span>
                      </div>
                      <div className="text-xs text-gray-400">*$38/hour thereafter</div>
                    </div>
                  </div>
                </button>

                {/* Once-Off Cleaning */}
                <button 
                  className="bg-white rounded-xl border-2 border-[#1E3D8F] shadow-md p-6 text-left hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  onClick={() => handleServiceSelection("Once-Off Cleaning" as ServiceType)}
                >
                  <div className="font-bold text-lg text-gray-900 mb-2">Once-Off Cleaning</div>
                  <div className="text-sm text-gray-600 mb-4">Deep clean for a fresh reset</div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400">Starting from</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">$161</span>
                      <span className="text-sm text-gray-600">for 3 hours</span>
                    </div>
                    <div className="text-xs text-gray-400">*$45/hour thereafter</div>
                  </div>
                </button>

                {/* NDIS Cleaning */}
                <button 
                  className="relative bg-white rounded-xl border-2 border-[#1E3D8F] shadow-md p-6 text-left hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  onClick={() => handleServiceSelection("NDIS Cleaning" as ServiceType)}
                >
                  <div className="absolute top-4 left-4 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    NDIS
                  </div>
                  <div className="mt-6">
                    <div className="font-bold text-lg text-gray-900 mb-2">NDIS Cleaning</div>
                    <div className="text-sm text-gray-600 mb-4">Support-focused cleaning services</div>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400">Flat rate</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">$56</span>
                        <span className="text-sm text-gray-600">per hour</span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* End of Lease Cleaning */}
                <button 
                  className="bg-white rounded-xl border-2 border-[#1E3D8F] shadow-md p-6 text-left hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  onClick={() => handleServiceSelection("End of Lease Cleaning" as ServiceType)}
                >
                  <div className="font-bold text-lg text-gray-900 mb-2">End of Lease Cleaning</div>
                  <div className="text-sm text-gray-600 mb-4">Bond-ready move-out clean</div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400">Starting from</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">$205</span>
                      <span className="text-sm text-gray-600">for Studio</span>
                    </div>
                    <div className="text-xs text-gray-400">From 4 hours minimum</div>
                  </div>
                </button>

                {/* Airbnb Cleaning */}
                <button 
                  className="bg-white rounded-xl border-2 border-[#1E3D8F] shadow-md p-6 text-left hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  onClick={() => handleServiceSelection("Airbnb Cleaning" as ServiceType)}
                >
                  <div className="font-bold text-lg text-gray-900 mb-2">Airbnb Cleaning</div>
                  <div className="text-sm text-gray-600 mb-4">Fast turnovers with hotel-standard presentation</div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400">Starting from</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">$118</span>
                      <span className="text-sm text-gray-600">for 2 hours</span>
                    </div>
                    <div className="text-xs text-gray-400">*$45/hour thereafter</div>
                  </div>
                </button>

                {/* Commercial Cleaning */}
                <button 
                  className="bg-white rounded-xl border-2 border-[#1E3D8F] shadow-md p-6 text-left hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  onClick={() => handleServiceSelection("Commercial Cleaning" as ServiceType)}
                >
                  <div className="font-bold text-lg text-gray-900 mb-2">Commercial Cleaning</div>
                  <div className="text-sm text-gray-600 mb-4">Small offices and light commercial spaces</div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-400">Custom pricing</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">Custom Quote</span>
                    </div>
                    <div className="text-xs text-gray-400">Flexible duration</div>
                  </div>
                </button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <div>
              {renderServiceDetails()}
            </div>
          )}

          {currentStep === 3 && (
            <div>
               <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <CustomerDetailsForm />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Loading State */}
                {confirmationState.apiStatus === 'loading' && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E3D8F]"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Submitting Your Booking</h3>
                    <p className="text-gray-600">Please wait while we process your booking...</p>
                  </div>
                )}

                {/* Success State */}
                {confirmationState.apiStatus === 'success' && (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Booking Confirmed!</h3>
                        <p className="text-sm text-gray-600 mt-1">{confirmationState.message}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-200">
                        Confirmed
                      </span>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Booking Number</span>
                          <span className="font-semibold text-gray-900">{confirmationState.bookingNumber}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Service</span>
                          <span className="font-semibold text-gray-900">{selectedService ?? "—"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Customer</span>
                          <span className="font-semibold text-gray-900">{customerDetails.firstName} {customerDetails.lastName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Email</span>
                          <span className="font-semibold text-gray-900">{customerDetails.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Phone</span>
                          <span className="font-semibold text-gray-900">{customerDetails.phone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Address</span>
                          <span className="font-semibold text-gray-900">{customerDetails.address}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Scheduled Date</span>
                          <span className="font-semibold text-gray-900">
                            {customerDetails.scheduleDate ? new Date(customerDetails.scheduleDate).toLocaleDateString() : "—"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-semibold text-gray-900">
                            ${pricing?.totalPrice?.toFixed(2) || '0.00'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                          <span className="text-gray-900 font-semibold">Total Amount</span>
                          <span className="text-2xl font-bold text-gray-900">
                            ${pricing?.totalPrice?.toFixed(2) || '0.00'}
                          </span>
                        </div>
                      </div> 
                    </div>

                    {/* Countdown Timer Component */}
                    <CountdownTimer 
                      onComplete={handleResetBooking}
                      seconds={30}
                    />
                  </>
                )}

                {/* Error State */}
                {confirmationState.apiStatus === 'error' && (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-red-900">Booking Failed</h3>
                        <p className="text-sm text-red-600 mt-1">{confirmationState.message}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-200">
                        Error
                      </span>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Please go back to Step 3 and try submitting your booking again.
                      </p>
                    </div>
                  </>
                )}

              </div>
            </div>
          )}
        </section>

        {(currentStep === 2 || currentStep === 3) && (
          <div className="self-start">
            <StepSummary />
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPageWrapper() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
