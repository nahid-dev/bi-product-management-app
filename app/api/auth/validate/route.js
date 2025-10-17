import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // In a real app, you would validate the JWT token here
    // For this demo, we'll just check if it's our mock token
    if (token === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoYWxlay4ybWRAZ21haWwuY29tIiwiaWF0IjoxNzYwNzI5ODMzLCJleHAiOjE3NjMzMjE4MzN9.yZM7X5hQnLW0ZgXiOJ4lV7HCsql5og546wqsgYFTxiY") {
      return NextResponse.json({
        user: {
          id: 1,
          email: "khalek.2md@gmail.com",
          name: "khalek.2md",
          createdAt: new Date().toISOString(),
        }
      });
    }

    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 }
    );

  } catch (error) {
    console.error('Token validation error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
