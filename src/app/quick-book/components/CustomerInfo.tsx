import React, { useState, useRef, useEffect } from 'react';
import { useBookingStore } from '../booking-store/bookingStore';

const CustomerInfo = () => {
  const customer = useBookingStore((s) => s.customer);
  const isAuthenticated = useBookingStore((s) => s.isAuthenticated);
  const setIsAuthenticated = useBookingStore((s) => s.setIsAuthenticated);
  const setCustomer = useBookingStore((s) => s.setCustomer);
  const setLoginTime = useBookingStore((s) => s.setLoginTime);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  if (!isAuthenticated || !customer) return null;

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {}
    // Remove tokens and loginTime from both storages
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loginTime');
    setIsAuthenticated(false);
    setCustomer(null);
    setLoginTime(null);
    setOpen(false);
    window.location.href = '/book';
  };

  return (
    <div style={{ 
      position: 'absolute', 
      top: '1rem', 
      right: '1.5rem', 
      zIndex: 110 
    }} ref={dropdownRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          color: '#1E3D8F',
          fontWeight: 500,
          fontSize: 14,
          cursor: 'pointer',
          gap: 6,
          padding: '8px 12px',
          borderRadius: 8,
          transition: 'background-color 0.2s',
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#f3f7ff'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontWeight: 600 }}>
            {customer.first_name}{customer.last_name ? ` ${customer.last_name}` : ''}
          </span>
          <span style={{ color: '#4b5563', fontWeight: 400, fontSize: 12 }}>
            {customer.email}
          </span>
        </div>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 4 }}>
          <path d="M6 8L10 12L14 8" stroke="#1E3D8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: 'calc(100% + 4px)',
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          minWidth: 200,
          zIndex: 120,
        }}>
          <a
            href="https://customer.cleaningprofessionals.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '0.75rem 1rem',
              color: '#1E3D8F',
              textDecoration: 'none',
              fontWeight: 500,
              borderBottom: '1px solid #e5e7eb',
              transition: 'background 0.2s',
            }}
            onClick={() => setOpen(false)}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#f3f7ff'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Profile & Settings
          </a>
          <button
            onClick={handleSignOut}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem 1rem',
              color: '#b91c1c',
              background: 'none',
              border: 'none',
              textAlign: 'left',
              fontWeight: 500,
              cursor: 'pointer',
              borderRadius: '0 0 8px 8px',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#fef2f2'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerInfo; 