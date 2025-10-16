import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:3001/health', {
      cache: 'no-store',
    });
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      backendHealthy: response.ok && data.success,
      backendData: data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      backendHealthy: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}