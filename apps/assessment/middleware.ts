import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  // Check if the user is authenticated
  if (!token) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
    * Match all request paths except for the ones starting with:
    * - api/auth (API routes)
    * - login (login page)
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico, sitemap.xml, robots.txt (metadata files)
    */
    '/((?!api/auth|login|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};