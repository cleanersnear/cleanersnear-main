"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface CountdownTimerProps {
  onComplete: () => void;
  seconds?: number;
}

export function CountdownTimer({ onComplete, seconds = 30 }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState(seconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Memoize the onComplete callback to prevent unnecessary re-renders
  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    console.log('🚀 Timer started - 30 second countdown begins');
    
    // Start countdown immediately
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Timer finished
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          console.log('✅ Booking Completed! Resetting booking and redirecting to home...');
          
          // Call the completion callback
          handleComplete();
          router.push('/');
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [handleComplete, router]); // Include dependencies

  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-red-600 font-medium">
        Redirect to home in {countdown} sec
      </p>
    </div>
  );
}

