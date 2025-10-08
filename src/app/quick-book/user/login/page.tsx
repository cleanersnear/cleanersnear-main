'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '../../booking-store/bookingStore';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const setIsAuthenticated = useBookingStore((s) => s.setIsAuthenticated);
  const setCustomer = useBookingStore((s) => s.setCustomer);
  const setLoginTime = useBookingStore((s) => s.setLoginTime);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error('Unexpected server response. Please try again later.');
      }
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setSuccess('Login successful! Redirecting...');
      // Update Zustand store
      setIsAuthenticated(true);
      setCustomer(data.customer);
      const loginTime = Date.now();
      setLoginTime(loginTime);
      // Store the token and loginTime based on keepLoggedIn
      if (data.token) {
        if (keepLoggedIn) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('loginTime', loginTime.toString());
        } else {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('loginTime', loginTime.toString());
        }
      }
      setTimeout(() => router.push('/book'), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '0 1rem',
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: 600,
        color: '#1a2b3b',
        marginBottom: '1.5rem',
        textAlign: 'center',
      }}>
        Please log in to continue
      </h1>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: '#f3f4f6',
            }}
            required
          />
        </div>

        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: '#f3f4f6',
              paddingRight: '70px',
            }}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              background: 'none',
              color: '#666',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.5rem',
        }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '14px',
            color: '#4b5563',
            cursor: 'pointer',
          }}>
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={() => setKeepLoggedIn(v => !v)}
              style={{ cursor: 'pointer' }}
            />
            Keep me logged in
          </label>
          <Link
            href="https://customer.cleaningprofessionals.com.au/user/forget-password"
            style={{
              fontSize: '14px',
              color: '#666',
              textDecoration: 'none',
            }}
          >
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '16px',
            fontWeight: 600,
            color: '#fff',
            backgroundColor: '#1E3D8F',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '1rem',
            transition: 'background-color 0.2s',
          }}
          disabled={loading}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#152d6a'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#1E3D8F'}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        {error && <div style={{ color: "#b91c1c", marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: "#059669", marginTop: 8 }}>{success}</div>}
        <div style={{
          textAlign: 'center',
          marginTop: '1rem',
          fontSize: '14px',
          color: '#4b5563',
        }}>
          Don&apos;t have an account yet?{' '}
          <Link
            href="/book/user/register"
            style={{
              color: '#1E3D8F',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
} 