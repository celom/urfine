import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('Middleware called for path:', request.nextUrl.pathname);

  const token = await getToken({ req: request });

  // Allow access to authentication routes
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Check if the user is authenticated
  if (!token) {
    console.log('No token found, redirecting to login');
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }

  console.log('Token found, allowing request');
  // Allow the request to continue
  return NextResponse.next();
}

// Update the matcher to exclude authentication routes
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};