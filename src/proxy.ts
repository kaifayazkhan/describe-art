import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const publicPath = [
  '/signIn',
  '/signUp',
  '/forgot-password',
  '/reset-password',
];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const sessionCookie = getSessionCookie(request);

  const isPublicPath = publicPath.includes(path);

  const isPrivatePath = path === '/generate';

  if (!sessionCookie && isPrivatePath) {
    return NextResponse.redirect(new URL('/signIn', request.url));
  }

  if (isPublicPath && sessionCookie) {
    return NextResponse.redirect(new URL('/generate', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/signIn',
    '/signUp',
    '/forgot-password',
    '/reset-password',
    '/generate',
  ],
};
