'use client';

import React, { useEffect } from 'react';
import BookingSummary from './components/BookingSummary';
import BookingForm from './components/BookingForm';
import MobileSummary from './components/MobileSummary';
import Footer from './components/Footer';
import LoginLink from './components/LoginLink';
import { useBookingStore } from './booking-store/bookingStore';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const BookingPage = () => {
  const currentStep = useBookingStore((s) => s.currentStep);
  const isAuthenticated = useBookingStore((s) => s.isAuthenticated);
  const setIsAuthenticated = useBookingStore((s) => s.setIsAuthenticated);
  const setCustomer = useBookingStore((s) => s.setCustomer);
  const setLoginTime = useBookingStore((s) => s.setLoginTime);

  // Check for existing authentication on page load
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const loginTime = localStorage.getItem('loginTime') || sessionStorage.getItem('loginTime');
      
      if (token && loginTime) {
        const isKeepLoggedIn = !!localStorage.getItem('token');
        const now = Date.now();
        const loginTimestamp = parseInt(loginTime, 10);
        
        // Check if token is still valid (30 minutes for session, unlimited for persistent)
        if (isKeepLoggedIn || now - loginTimestamp < 30 * 60 * 1000) {
          setIsAuthenticated(true);
          setLoginTime(loginTimestamp);
          
          // Fetch and set customer data
          try {
            const res = await fetch(`${apiUrl}/api/auth/profile`, {
              headers: { Authorization: `Bearer ${token}` },
              credentials: 'include',
            });
            
            if (res.ok) {
              const customer = await res.json();
              setCustomer(customer);
            } else {
              // Token is invalid, clear auth state
              localStorage.removeItem('token');
              localStorage.removeItem('loginTime');
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('loginTime');
              setIsAuthenticated(false);
              setCustomer(null);
              setLoginTime(null);
            }
          } catch (error) {
            console.error('Failed to fetch customer profile:', error);
            // Clear auth state on error
            localStorage.removeItem('token');
            localStorage.removeItem('loginTime');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('loginTime');
            setIsAuthenticated(false);
            setCustomer(null);
            setLoginTime(null);
          }
        } else {
          // Token expired, clear auth state
          localStorage.removeItem('token');
          localStorage.removeItem('loginTime');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('loginTime');
          setIsAuthenticated(false);
          setLoginTime(null);
          setCustomer(null);
        }
      }
    };

    checkAuthentication();
  }, [setIsAuthenticated, setLoginTime, setCustomer]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main content area */}
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="booking-page-container flex flex-col md:flex-row gap-8 items-start">
            {/* Booking Form: full width on mobile, flex=1 on desktop */}
            <div className="booking-form-wrapper w-full md:flex-1 min-w-0">
              <BookingForm />
              {/* Login Link - Show when not authenticated */}
              {!isAuthenticated && <LoginLink />}
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
