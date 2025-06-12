import React from 'react';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '../../app/book/booking-store/bookingStore';

interface BookingDialogProps {
  onClose: () => void;
}

const options = [
  'Just Once',
  'Weekly (Most Popular)',
  'Fortnightly',
  'Unsure',
];

const BookingDialog: React.FC<BookingDialogProps> = ({ onClose }) => {
  const router = useRouter();
  const setBookingType = useBookingStore((s) => s.setBookingType);
  const setFrequency = useBookingStore((s) => s.setFrequency);

  const handleOptionClick = (option: string) => {
    if (option === 'Unsure') {
      // For Unsure, set both to null and redirect to pricing page
      setBookingType(null);
      setFrequency(null);
      router.push('/book/home-cleaning-prices');
    } else {
      // For other options, set the appropriate values and redirect to booking
      if (option === 'Just Once') {
        setBookingType('once-off');
        setFrequency('once');
    } else if (option.startsWith('Weekly')) {
      setBookingType('regular');
      setFrequency('weekly');
    } else if (option === 'Fortnightly') {
      setBookingType('regular');
      setFrequency('fortnightly');
    }
      router.push('/book');
    }
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.30)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      fontFamily: 'Roboto, Arial, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '1.5rem 1.5rem 2rem',
        width: '100%',
        maxWidth: '300px',
        margin: '0 1rem',
        boxShadow: '0 2px 16px rgba(30,61,143,0.08)',
        textAlign: 'center',
        position: 'relative',
        border: 'none',
      }}>
        {/* Close button - absolute positioned */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'none',
            border: 'none',
            borderRadius: '50%',
            width: 32,
            height: 32,
            fontSize: 22,
            cursor: 'pointer',
            color: '#1E3D8F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
            padding: 0,
          }}
          aria-label="Close dialog"
          onMouseOver={e => (e.currentTarget.style.background = '#f3f4f6')}
          onMouseOut={e => (e.currentTarget.style.background = 'none')}
        >
          &times;
        </button>

        {/* Centered company name */}
        <div style={{ 
          fontSize: 14, 
          color: '#888', 
          fontWeight: 350,
          marginBottom: 8,
          textAlign: 'center',
          width: '100%'
        }}>
          Cleaning Professionals
        </div>
        
        {/* Payment notice */}
        <div style={{
          fontSize: 12,
          color: '#27ae60',
          fontWeight: 600,
          marginBottom: 16,
          textAlign: 'center',
          background: '#e8f5e8',
          padding: '6px 12px',
          borderRadius: 12,
          border: '1px solid #c3e6c3'
        }}>
          BOOK NOW – PAY ON THE DAY
        </div>

        <div style={{ 
          fontWeight: 700, 
          fontSize: 18, 
          marginBottom: 24, 
          color: '#222', 
          lineHeight: 1.35 
        }}>
          How often would you like help with cleaning?
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {options.map(option => (
            <div key={option} style={{ position: 'relative' }}>
              <button
                onClick={() => handleOptionClick(option)}
                style={{
                  border: '1.5px solid #1E3D8F',
                  borderRadius: 32,
                  padding: '12px 0',
                  fontSize: 16,
                  fontWeight: 500,
                  background: '#fff',
                  color: '#1E3D8F',
                  cursor: 'pointer',
                  marginBottom: 0,
                  transition: 'background 0.18s, color 0.18s',
                  outline: 'none',
                  width: '100%',
                  position: 'relative',
                }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#1E3D8F';
                  (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                  // Find and keep the badge green
                  const badge = e.currentTarget.querySelector('span span') as HTMLSpanElement;
                  if (badge) {
                    badge.style.background = '#4CAF50';
                    badge.style.color = '#fff';
                  }
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#fff';
                  (e.currentTarget as HTMLButtonElement).style.color = '#1E3D8F';
                }}
              >
                {option.replace(' (Most Popular)', '')}
                {option.includes('Most Popular') && (
                  <span style={{
                    display: 'inline-block',
                    marginLeft: 8,
                    verticalAlign: 'middle',
                    position: 'relative',
                  }}>
                    <span style={{
                      background: '#4CAF50',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: 12,
                      borderRadius: 12,
                      padding: '2px 8px',
                      position: 'relative',
                      overflow: 'hidden',
                      zIndex: 1,
                      display: 'inline-block',
                    }}>
                      Most Popular
                      <span className="shine-once" style={{
                        position: 'absolute',
                        left: '-40%',
                        top: 0,
                        width: '40%',
                        height: '100%',
                        background: 'linear-gradient(120deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 100%)',
                        transform: 'skewX(-20deg)',
                        animation: 'shine-move-once 1.2s ease-in-out forwards',
                        zIndex: 2,
                        pointerEvents: 'none',
                      }} />
                    </span>
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
        {/* Shine Animation Keyframes */}
        <style>{`
          @keyframes shine-move-once {
            0% { left: -40%; }
            100% { left: 110%; }
          }
          .shine-once {
            animation: shine-move-once 1.2s ease-in-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default BookingDialog; 