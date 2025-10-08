import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const booking = await request.json();
        
        if (!booking || !booking.contactInfo || !booking.contactInfo.email) {
            return NextResponse.json(
                { success: false, message: 'Missing required booking/contact info' },
                { status: 400 }
            );
        }

        // Forward the request to the backend
        const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
        if (!backendUrl) {
            return NextResponse.json(
                { success: false, message: 'Backend URL not configured' },
                { status: 500 }
            );
        }

        const response = await fetch(`${backendUrl}/api/book/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data, { status: response.status || 201 });

    } catch (error: unknown) {
        console.error('Frontend API routing error:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to process booking request',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        }, { status: 500 });
    }
} 