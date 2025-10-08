import { NextRequest, NextResponse } from 'next/server';
import type { BookingApiResponse } from '../../book/types';

// ============================================================================
// FRONTEND API ROUTE - PROXY TO BACKEND
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // Get booking data from request
    const bookingData = await request.json();
    
    // Forward request to backend API
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`;
    
    console.log('🔄 Forwarding booking request to backend:', backendUrl);
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      console.error('❌ Backend API error:', response.status, response.statusText);
      throw new Error(`Backend API error: ${response.status}`);
    }

    const result: BookingApiResponse = await response.json();
    
    console.log('✅ Backend response:', result);
    
    // The backend now returns complete booking data in result.data
    // This includes the booking number, customer details, service details, and pricing
    // The frontend booking store can use this complete data for confirmation
    
    return NextResponse.json(result, { status: response.status });

  } catch (error) {
    console.error('❌ Frontend API Proxy Error:', error);
    
    // Return error response if backend is unavailable
    const errorResponse: BookingApiResponse = {
      success: false,
      bookingNumber: '',
      status: 'error',
      message: 'Unable to connect to booking service. Please try again later.'
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

