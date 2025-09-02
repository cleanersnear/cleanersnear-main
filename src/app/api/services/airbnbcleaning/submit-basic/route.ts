import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('Next.js API route: Received request')
    
    // Get the request body
    const body = await request.json()
    console.log('Next.js API route: Request body:', body)
    
    // Forward the request to your Express backend
    console.log('Next.js API route: Forwarding to Express backend...')
    
    try {
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

      const response = await fetch(`${backendUrl}/api/services/airbnbcleaning/submit-basic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })

      console.log('Next.js API route: Express response status:', response.status)
      console.log('Next.js API route: Express response headers:', Object.fromEntries(response.headers.entries()))

      // Get the response data
      const data = await response.json()
      console.log('Next.js API route: Express response data:', data)

      // If there's an error, log the detailed Supabase error
      if (!data.success && data.error) {
        console.error('Next.js API route: Supabase error details:', {
          message: data.error.message,
          details: data.error.details,
          hint: data.error.hint,
          code: data.error.code,
          table: data.error.table,
          column: data.error.column,
          constraint: data.error.constraint,
          insertData: data.insertData
        });
      }

      // Return the response with the same status code
      return NextResponse.json(data, { status: response.status })
      
    } catch (fetchError) {
      console.error('Next.js API route: Fetch error:', fetchError)
      
      // Check if it's a connection error (server not running)
      if (fetchError instanceof Error && fetchError.message.includes('fetch')) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Express backend server is not running. Please start it with: cd api && npm run dev',
            error: 'Connection refused - Express server not running'
          }, 
          { status: 503 }
        )
      }
      
      throw fetchError
    }

  } catch (error) {
    console.error('Error in Next.js API route:', error)
    
    // Return a proper error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : 'No stack trace'
      }, 
      { status: 500 }
    )
  }
}
