import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

export default async function HeaderAndFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
