import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const protectedRoutes = ['/generate', '/gallery'];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const sessionCookie = getSessionCookie(request);

  const isPrivatePath = protectedRoutes.includes(path);

  if (!sessionCookie && isPrivatePath) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/generate', '/gallery'],
};
