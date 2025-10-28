'use client';

import React from 'react';
import BookingSummary from './components/BookingSummary';
import BookingForm from './components/BookingForm';
import MobileSummary from './components/MobileSummary';
import Footer from './components/Footer';
import { useBookingStore } from './booking-store/bookingStore';

const BookingPage = () => {
  const currentStep = useBookingStore((s) => s.currentStep);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main content area */}
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="booking-page-container flex flex-col md:flex-row gap-8 items-start">
            {/* Booking Form: full width on mobile, flex=1 on desktop */}
            <div className="booking-form-wrapper w-full md:flex-1 min-w-0">
              <BookingForm />
            </div>
            {/* Desktop/Tablet Summary - Completely hidden on mobile with strict rules */}
            <div className="booking-summary-wrapper hidden md:block md:flex-shrink-0 md:w-auto" style={{ minWidth: 340, maxWidth: 380 }}>
              <BookingSummary />
            </div>
          </div>
          
          {/* Mobile Summary - Floating hamburger, only visible on mobile */}
          <div className="mobile-summary-wrapper block md:hidden">
            <MobileSummary />
          </div>
        </div>
      </div>
      
      {/* Footer - Only show on step 1, sticks to bottom */}
      {currentStep === 1 && (
        <div className="mt-auto">
          <Footer />
        </div>
      )}
      
      {/* Additional CSS to ensure mobile responsiveness */}
      <style jsx>{`
        .booking-page-container {
          width: 100%;
        }
        
        .booking-form-wrapper {
          flex: 1;
          min-width: 0;
          width: 100%;
        }
        
        .booking-summary-wrapper {
          flex-shrink: 0;
        }
        
        @media (max-width: 767px) {
          .booking-page-container {
            flex-direction: column !important;
            gap: 0 !important;
          }
          
          .booking-form-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            flex: none !important;
          }
          
          .booking-summary-wrapper {
            display: none !important;
            visibility: hidden !important;
            position: absolute !important;
            left: -9999px !important;
            width: 0 !important;
            height: 0 !important;
          }
          
          .mobile-summary-wrapper {
            display: block !important;
          }
        }
        
        @media (min-width: 768px) {
          .mobile-summary-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingPage;
