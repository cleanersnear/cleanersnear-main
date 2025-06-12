import React from 'react';
import { useBookingStore } from '../booking-store/bookingStore';

const BookingSummary: React.FC = () => {
  const bookingType = useBookingStore((s) => s.bookingType);
  const frequency = useBookingStore((s) => s.frequency);
  //const bookingCategory = useBookingStore((s) => s.bookingCategory);
  const serviceType = useBookingStore((s) => s.serviceType);
  //const minHours = useBookingStore((s) => s.minHours);
  //const minAmount = useBookingStore((s) => s.minAmount);
  const baseRate = useBookingStore((s) => s.baseRate);
  //const extraHours = useBookingStore((s) => s.extraHours);
  const totalHours = useBookingStore((s) => s.totalHours);
  const totalPrice = useBookingStore((s) => s.totalPrice);
  const address = useBookingStore((s) => s.address);
  //const contactInfo = useBookingStore((s) => s.contactInfo);
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

{/*
  const formatContactInfo = () => {
    if (!contactInfo) return '';
    return `${contactInfo.firstName} ${contactInfo.lastName}`.trim();
  };

  const formatContactDetails = () => {
    if (!contactInfo) return '';
    return `${contactInfo.email} | ${contactInfo.phone}`;
  };

 */}

  return (
    <aside 
      className="booking-summary-desktop"
      style={{
        border: '1.5px solid #1E3D8F',
        borderRadius: 16,
        padding: '28px 28px 20px 28px',
        maxWidth: 380,
        minWidth: 320,
        background: '#fff',
        boxShadow: '0 4px 24px rgba(30,61,143,0.15)',
        fontFamily: 'inherit',
        transition: 'box-shadow 0.2s',
        marginTop: 0,
        width: '100%',
      }}
    >
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
      
      {/* Strict mobile hiding - ensure this component never affects mobile layout */}
      <style jsx>{`
        .booking-summary-desktop {
          display: block;
        }
        
        @media (max-width: 767px) {
          .booking-summary-desktop {
            display: none !important;
            visibility: hidden !important;
            position: absolute !important;
            left: -9999px !important;
            width: 0 !important;
            height: 0 !important;
            min-width: 0 !important;
            max-width: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            overflow: hidden !important;
          }
        }
      `}</style>
    </aside>
  );
};

export default BookingSummary; 