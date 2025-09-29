import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5028/api/";
    const normalizedBaseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl : `${apiBaseUrl}/`;
    const testUrl = `${normalizedBaseUrl}Account/login`;
    
    console.log("Test API: Environment variables:");
    console.log("Test API: NODE_ENV:", process.env.NODE_ENV);
    console.log("Test API: NEXT_PUBLIC_API_BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
    console.log("Test API: Testing connection to:", testUrl);
    
    // Test if the backend is reachable
    const response = await fetch(testUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        userName: "test",
        password: "test"
      }),
    });
    
    const responseText = await response.text();
    
    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      testUrl,
      backendResponse: {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseText,
      }
    });
    
  } catch (error: any) {
    console.error("Test API Error:", error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      environment: process.env.NODE_ENV,
      apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    }, { status: 500 });
  }
}
