'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '../booking-store/bookingStore';

const LoginLink = () => {
  const router = useRouter();
  const isAuthenticated = useBookingStore((s) => s.isAuthenticated);
  const customer = useBookingStore((s) => s.customer);
  const setIsAuthenticated = useBookingStore((s) => s.setIsAuthenticated);
  const setCustomer = useBookingStore((s) => s.setCustomer);
  const setLoginTime = useBookingStore((s) => s.setLoginTime);

  const handleLogout = async () => {
    try {
      // The actual logout call will be handled by your backend
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Clear tokens from both storages
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('loginTime');
        
        // Update store state
        setIsAuthenticated(false);
        setCustomer(null);
        setLoginTime(null);
        
        // Redirect to booking page
        router.push('/book');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, clear local state
      localStorage.removeItem('token');
      localStorage.removeItem('loginTime');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('loginTime');
      setIsAuthenticated(false);
      setCustomer(null);
      setLoginTime(null);
      router.push('/book');
    }
  };

  if (isAuthenticated && customer) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '1rem',
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
      }}>
        <span style={{ color: '#4b5563', fontSize: '14px' }}>
          Welcome, {customer.first_name}!
        </span>
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            color: '#1E3D8F',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            padding: '0.25rem 0.5rem',
            transition: 'color 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.color = '#152d6a'}
          onMouseOut={e => e.currentTarget.style.color = '#1E3D8F'}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div style={{
      textAlign: 'center',
      padding: '1rem',
      marginTop: '1rem',
    }}>
      <span style={{ color: '#4b5563', fontSize: '14px' }}>
        Already a member?{' '}
        <Link 
          href="/book/user/login" 
          style={{ 
            color: '#1E3D8F', 
            textDecoration: 'none', 
            fontWeight: 500,
            transition: 'color 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.color = '#152d6a'}
          onMouseOut={e => e.currentTarget.style.color = '#1E3D8F'}
        >
          Log in
        </Link>
      </span>
    </div>
  );
};

export default LoginLink; 