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
  const isLocal = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(hostname);
  // Cloudflare Pages preview and pages.dev addresses (e.g. 1485f59f.landingpage-4rt.pages.dev) are not subdomains of ai42e.com:
  // serve them by path (/invest, /studio) instead of rewriting to a folder named after the deployment hash.
  const isPagesPreview = hostname.endsWith('.pages.dev');
  const isMaster = hostname === 'ai42e.com' || isLocal || isPagesPreview;
  
  // If it's the master domain or localhost, let it pass to the default routes
  if (isMaster) {
    // Optional: if you want admin to be at ai42e.com/admin
    // no rewrite needed
    return NextResponse.next();
  }

  // Extract the subdomain (e.g. "ai" from "ai.ai42e.com")
  const subdomain = hostname.split('.')[0];

  // mmo.ai42e.com and invest.ai42e.com are the same Trading line: until mmo has a page of its own, its home shows the Trading page.
  // Other paths on mmo (e.g. /blog) keep their old route.
  if (subdomain === 'mmo' && url.pathname === '/') {
    return NextResponse.rewrite(new URL('/invest', req.url));
  }

  // Rewrite the request to the specific subdomain folder
  // Example: ai.ai42e.com/blog -> /ai/blog
  return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
}
