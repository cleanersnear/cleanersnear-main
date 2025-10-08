'use client';

import React from 'react';
import { useBookingStore } from '../booking-store/bookingStore';

interface BookingProgressProps {
  showSteps?: boolean; // If true, show step indicators on desktop
}

const BookingProgress: React.FC<BookingProgressProps> = ({ showSteps = false }) => {
  const steps = useBookingStore((s) => s.steps);
  const currentStep = useBookingStore((s) => s.currentStep);
  const progress = (currentStep - 1) / (steps.length - 1);

  return (
    <>
      {/* Progress bar (always visible) */}
      <div style={{ width: '100%' }}>
        <div style={{
          width: '100%',
          height: '5px',
          background: '#f3f4f6',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div
            style={{
              width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
              height: '100%',
              background: '#3576b0',
              transition: 'width 0.3s',
            }}
          />
        </div>
      </div>

      {/* Desktop step indicators (optional) */}
      {showSteps && (
        <div className="desktopSteps">
          <div className="progressContainer">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'relative',
              marginBottom: '2rem',
            }}>
              {/* Step indicators */}
              {steps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: i + 1 <= currentStep ? '#1E3D8F' : '#fff',
                    border: `2px solid ${i + 1 <= currentStep ? '#1E3D8F' : '#e5e7eb'}`,
                    marginBottom: '8px',
                  }} />
                  <div style={{
                    fontSize: '14px',
                    color: i + 1 <= currentStep ? '#1a2b3b' : '#6b7280',
                    fontWeight: i + 1 === currentStep ? 600 : 400,
                  }}>
                    {step.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .mobileSteps {
          display: block;
        }
        .desktopSteps {
          display: none;
        }
        @media (min-width: 640px) {
          .mobileSteps {
            display: none;
          }
          .desktopSteps {
            display: block;
          }
        }
        .progressContainer {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 0 1rem;
        }
      `}</style>
    </>
  );
};

export default BookingProgress; 