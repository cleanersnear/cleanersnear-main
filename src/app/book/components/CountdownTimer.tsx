"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface CountdownTimerProps {
  onComplete: () => void;
  seconds?: number;
}

export function CountdownTimer({ onComplete, seconds = 10 }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState(seconds);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const expiryTimeRef = useRef<number | null>(null);
  const router = useRouter();

  // Initialize expiry time and start countdown timer
  useEffect(() => {
    // Set expiry timestamp on mount
    if (!expiryTimeRef.current) {
      expiryTimeRef.current = Date.now() + (seconds * 1000);
      console.log(`🚀 Timer started - ${seconds} second countdown begins`);
    }

    const updateCountdown = () => {
      if (!expiryTimeRef.current) return;

      const remaining = Math.max(0, Math.ceil((expiryTimeRef.current - Date.now()) / 1000));
      setCountdown(remaining);

      if (remaining <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setIsComplete(true);
      }
    };

    // Update immediately
    updateCountdown();
    
    // Then update every second
    timerRef.current = setInterval(updateCountdown, 1000);

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [seconds]);

  // Handle completion in separate effect
  useEffect(() => {
    if (isComplete) {
      console.log('✅ Booking Completed! Resetting booking and redirecting to home...');
      onComplete();
      router.push('/');
    }
  }, [isComplete, onComplete, router]);

  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-red-600 font-medium">
        Redirect to home in {countdown} sec
      </p>
    </div>
  );
}

