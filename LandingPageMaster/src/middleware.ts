import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'experimental-edge';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Get hostname of request (e.g. ai.ai42e.com, localhost:3000)
  const hostname = req.headers.get('host') || 'ai42e.com';

  // Define allowed domains (including localhost for dev)
  const isMaster = hostname === 'ai42e.com' || hostname === 'localhost:3000';
  
  // If it's the master domain or localhost, let it pass to the default routes
  if (isMaster) {
    // Optional: if you want admin to be at ai42e.com/admin
    // no rewrite needed
    return NextResponse.next();
  }

  // Extract the subdomain (e.g. "ai" from "ai.ai42e.com")
  const subdomain = hostname.split('.')[0];
  
  // Rewrite the request to the specific subdomain folder
  // Example: ai.ai42e.com/blog -> /ai/blog
  return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
}
