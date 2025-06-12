'use client';

import React from 'react';
import BookingProgress from './BookingProgress';
import CustomerInfo from './CustomerInfo';

const Header = () => (
  <header style={{
    width: '100%',
    background: '#fff',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 2px 8px rgba(30,61,143,0.03)',
    marginBottom: 0,
    zIndex: 100,
    position: 'relative'
  }}>
    {/* Customer Info - Positioned absolutely in top right, hidden on mobile */}
    <div style={{
      display: 'block'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 768px) {
            .customer-info-container {
              display: none !important;
            }
          }
        `
      }} />
      <div className="customer-info-container">
        <CustomerInfo />
      </div>
    </div>
    
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '1.2rem 1.5rem 0.5rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      position: 'relative'
    }}>
      <span style={{
        fontSize: 24,
        fontWeight: 700,
        color: '#1E3D8F',
        letterSpacing: 1,
        marginBottom: 2
      }}>
        Cleaning Professionals
      </span>
      <span style={{
        fontSize: 12,
        color: '#888',
        fontWeight: 500,
        marginBottom: 0
      }}>
        Book your professional cleaning service
      </span>
    </div>
    
    <BookingProgress />
  </header>
);

export default Header; 