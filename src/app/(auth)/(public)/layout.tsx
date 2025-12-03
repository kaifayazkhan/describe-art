import React, { ReactNode } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/utils/auth';

async function AuthPublicLayout({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/generate');
  }

  return <>{children}</>;
}

export default AuthPublicLayout;
