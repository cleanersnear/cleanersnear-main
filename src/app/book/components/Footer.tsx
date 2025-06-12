'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0.5rem',
      }}>
        <div style={{
          borderTop: '1px solid #eee',
          padding: '1.5rem 0.5rem 1rem 0.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}>
          <Link href="/" style={{
            textDecoration: 'none',
            display: 'block',
          }}>
            <Image
              src="/logos/Cleaning-professionals-new-logo.png"
              alt="Cleaning Professionals"
              width={120}
              height={80}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Link>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem 1.5rem',
            fontSize: '13px',
            padding: '0 0.5rem',
          }}>
            <Link href="/terms" style={{ color: '#666', textDecoration: 'none' }}>Terms of Use</Link>
            <Link href="/privacy" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/contact" style={{ color: '#666', textDecoration: 'none' }}>Contact Us</Link>
          </div>

          <div style={{
            width: '100%',
            textAlign: 'center',
            color: '#666',
            fontSize: '12px',
            padding: '0.5rem 0 0',
          }}>
            © {currentYear} Cleaning Professionals. All rights reserved.
          </div>
        </div>
      </div>
      
      {/* Mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          footer div:first-child {
            padding: 0.25rem !important;
          }
          
          footer div:nth-child(2) {
            padding: 1rem 0.25rem 0.75rem 0.25rem !important;
            gap: 1rem !important;
          }
          
          footer img {
            width: 100px !important;
            height: 67px !important;
          }
          
          footer div:nth-child(3) {
            gap: 0.5rem 1rem !important;
            fontSize: 12px !important;
            padding: 0 0.25rem !important;
          }
          
          footer div:last-child {
            fontSize: 11px !important;
            padding: 0.25rem 0 0 !important;
          }
        }
        
        @media (max-width: 480px) {
          footer img {
            width: 90px !important;
            height: 60px !important;
          }
          
          footer div:nth-child(3) {
            fontSize: 11px !important;
            gap: 0.5rem 0.75rem !important;
          }
          
          footer div:last-child {
            fontSize: 10px !important;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer