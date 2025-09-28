import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

  const { pathname } = request.nextUrl;

  // Allow requests for auth pages, API routes, and static files
  if (pathname.startsWith('/auth') || pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/images') || pathname.endsWith('.png')) {
    return NextResponse.next();
  }

  // If no token and not an auth-related page, redirect to login
  if (!token) {
    const loginUrl = new URL('/auth/auth1/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except for the ones that should be public
    '/((?!auth/auth1/login|_next/static|_next/image|favicon.ico|images/.*).*)',
  ],
};
