import React from 'react';
import Header from './components/Header';
import { metadata as pageMetadata } from './metadata';

export const metadata = pageMetadata;

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