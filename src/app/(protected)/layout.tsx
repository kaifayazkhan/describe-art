import React from 'react';
import Header from '@/components/Header';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header padding='px-3' />
      {children}
    </>
  );
}
