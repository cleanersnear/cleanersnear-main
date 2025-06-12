import React from 'react';
import Header from './components/Header';

export const metadata = {
  title: 'Book a Cleaning Service',
  description: 'Book your professional cleaning service with ease',
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="booking-layout">
      <Header />
      {children}
    </div>
  );
} 