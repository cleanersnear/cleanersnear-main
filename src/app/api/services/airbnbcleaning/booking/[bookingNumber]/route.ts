import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookingNumber: string }> }
) {
  try {
    // Forward the request to your Express backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!backendUrl) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Backend URL not configured',
          error: 'NEXT_PUBLIC_API_URL environment variable is missing'
        }, 
        { status: 500 }
      )
    }

    const { bookingNumber } = await params;
    const response = await fetch(`${backendUrl}/api/services/airbnbcleaning/booking/${bookingNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    // Get the response data
    const data = await response.json()

    // Return the response with the same status code
    return NextResponse.json(data, { status: response.status })

  } catch (error) {
    console.error('Error in Next.js API route:', error)
    
    // Return a proper error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}




