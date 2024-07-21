import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

  if(token && (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/sign-up') || url.pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } else if(!token && url.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}
 
export const config = {
  matcher: ['/sign-in', '/sign-up', '/', '/dashboard/:path*'],
}