import React, { useState } from 'react';
import { useBookingStore } from '../booking-store/bookingStore';
import MobileCustomerInfo from './MobileCustomerInfo';

const MobileSummary: React.FC = () => {
  const [open, setOpen] = useState(false);
  const bookingType = useBookingStore((s) => s.bookingType);
  const frequency = useBookingStore((s) => s.frequency);
  //const bookingCategory = useBookingStore((s) => s.bookingCategory);
  const serviceType = useBookingStore((s) => s.serviceType);
  
  const baseRate = useBookingStore((s) => s.baseRate);
  
  const totalHours = useBookingStore((s) => s.totalHours);
  const totalPrice = useBookingStore((s) => s.totalPrice);
  const address = useBookingStore((s) => s.address);
  
  const bookingPreferences = useBookingStore((s) => s.bookingPreferences);
  const currentStep = useBookingStore((s) => s.currentStep);

  let cleanType = '';
  if (bookingType === 'once-off') {
    cleanType = 'Once-Off';
  } else if (bookingType === 'regular') {
    cleanType = 'Regular';
    if (frequency === 'weekly') cleanType += ' (Weekly)';
    if (frequency === 'fortnightly') cleanType += ' (Fortnightly)';
  } else {
    cleanType = '-';
  }

  const serviceTypeLabel = serviceType ? serviceType : '-';

  const formatAddress = () => {
    if (!address) return '';
    const parts = [
      address.street,
      address.suburb,
      `${address.state} ${address.postcode}`,
      address.additionalInfo
    ].filter(Boolean);
    return parts.join(', ');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimePreference = (time: string | null) => {
    if (!time) return '';
    return time.charAt(0).toUpperCase() + time.slice(1);
  };

  
  // Hamburger icon (only visible on mobile)
  return (
    <>
      <button
        aria-label="Show booking summary"
        onClick={() => setOpen(true)}
        style={{
          display: 'block',
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          position: 'fixed',
          top: 18,
          right: 18,
          zIndex: 1200,
          cursor: 'pointer',
          width: 40,
          height: 40,
          // Only show on mobile
          boxShadow: '0 2px 8px rgba(30,61,143,0.08)',
        }}
        className="mobile-summary-hamburger"
      >
        <span style={{ display: 'block', width: 28, height: 4, background: '#1E3D8F', borderRadius: 2, margin: '5px 0' }}></span>
        <span style={{ display: 'block', width: 28, height: 4, background: '#1E3D8F', borderRadius: 2, margin: '5px 0' }}></span>
        <span style={{ display: 'block', width: 28, height: 4, background: '#1E3D8F', borderRadius: 2, margin: '5px 0' }}></span>
      </button>
      {/* Sidebar overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: open ? '100vw' : 0,
          height: '100vh',
          background: open ? 'rgba(30,61,143,0.18)' : 'transparent',
          zIndex: 1199,
          transition: 'background 0.2s',
          pointerEvents: open ? 'auto' : 'none',
        }}
        onClick={() => setOpen(false)}
      />
      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 320,
          maxWidth: '90vw',
      background: '#fff',
          boxShadow: open ? '-4px 0 24px rgba(30,61,143,0.18)' : 'none',
          borderLeft: '1.5px solid #e3eafc',
          zIndex: 1201,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(.4,1.3,.6,1)',
          padding: '0 0 24px 0',
          overflowY: 'auto',
        }}
        className="mobile-summary-sidebar"
      >

        
        {/* Header with MobileCustomerInfo and Close button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 18px 0 22px',
          marginBottom: 20
        }}>
          <MobileCustomerInfo />
          <button
            aria-label="Close summary"
            onClick={() => setOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 28,
              color: '#1E3D8F',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>
        <div style={{ padding: '0 22px 0 22px' }}>
      
      
      <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, color: '#1E3D8F', letterSpacing: 0.2 }}>Booking Summary</div>
      <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '10px 0 18px 0' }} />
      {/* Contact Information */}
          {/*
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Name:</span>
        <span style={{ fontWeight: 600, color: '#222' }}>{formatContactInfo()}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Contact:</span>
        <span style={{ fontWeight: 600, color: '#222', textAlign: 'right', maxWidth: '60%' }}>{formatContactDetails()}</span>
      </div>
          */}
      {/* Existing Booking Details */}
          {/*
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Booking Category:</span>
        <span style={{ fontWeight: 600, color: '#222' }}>{categoryLabel}</span>
      </div>
          */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Clean Type:</span>
            <span style={{ fontWeight: 500, color: '#222' }}>{cleanType}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Service Type:</span>
            <span style={{ fontWeight: 500, color: '#222' }}>{serviceTypeLabel}</span>
      </div>
          {/* Address: only after step 4 and if value exists */}
          {currentStep >= 4 && formatAddress() && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap' }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Address:</span>
              <span style={{ fontWeight: 500, color: '#222', textAlign: 'right', maxWidth: '60%' }}>{formatAddress()}</span>
      </div>
          )}
          {/* Preferred Date: only after step 5 and if value exists */}
          {currentStep >= 5 && formatDate(bookingPreferences?.preferredDate || null) && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap' }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Preferred Date:</span>
              <span style={{ fontWeight: 500, color: '#222' }}>{formatDate(bookingPreferences?.preferredDate || null)}</span>
      </div>
          )}
          {/* Time Preference: only after step 6 and if value exists */}
          {currentStep >= 6 && formatTimePreference(bookingPreferences?.timePreference || null) && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap' }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Time Preference:</span>
              <span style={{ fontWeight: 500, color: '#222' }}>{formatTimePreference(bookingPreferences?.timePreference || null)}</span>
      </div>
          )}
          {/*
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Min Hours:</span>
        <span style={{ fontWeight: 600, color: '#222' }}>{minHours ?? '-'}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Min Amount:</span>
        <span style={{ fontWeight: 600, color: '#222' }}>{minAmount ? `$${minAmount}` : '-'}</span>
      </div>
          */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Base Rate:</span>
            <span style={{ fontWeight: 500, color: '#222' }}>{baseRate ? `$${baseRate}` : '-'}</span>
      </div>
          {/*
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Extra Hours:</span>
        <span style={{ fontWeight: 600, color: '#222' }}>{extraHours ?? '-'}</span>
      </div>
          */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <span style={{ color: '#888', fontWeight: 500 }}>Total Hours:</span>
            <span style={{ fontWeight: 500, color: '#222' }}>{totalHours ?? '-'}</span>
          </div>
          <div
            style={{
              background: '#e3eefd',
              borderRadius: 12,
              padding: '18px 18px 10px 18px',
              margin: '10px 0 0 0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ color: '#1E3D8F', fontWeight: 600, fontSize: 17, marginBottom: 4 }}>
              Booking Total
            </span>
            <span style={{ color: '#1E3D8F', fontWeight: 700, fontSize: 20, letterSpacing: 0.5 }}>
              {totalPrice !== null && totalPrice !== undefined ? `$${totalPrice.toFixed(2)}` : '-'}
            </span>
            <span style={{ color: '#888', fontSize: 13, marginTop: 2 }}>per service</span>
      </div>
      </div>
    </aside>
      {/* Only show hamburger on mobile */}
      <style>{`
        @media (min-width: 601px) {
          .mobile-summary-hamburger { display: none !important; }
          .mobile-summary-sidebar { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default MobileSummary; 