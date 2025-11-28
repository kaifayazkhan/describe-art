import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthHeader() {
  return (
    <header className='flex-Row-center items-center py-10'>
      <Link href='/' className='flex-Row-center h-full gap-1'>
        <Image src='/assets/logo-1.webp' width={50} height={100} alt='Logo' />
        <span className='text-xl font-semibold'>Describe Art</span>
      </Link>
    </header>
  );
}
