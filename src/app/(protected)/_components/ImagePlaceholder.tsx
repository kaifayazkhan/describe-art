import React from 'react';
import Image from 'next/image';

function ImagePlaceholder() {
  return (
    <div className='aspect-square max-w-full flex-center gradient-border relative'>
      <Image src='/assets/logo-2.webp' width={120} height={120} alt='Logo' />
    </div>
  );
}

export default ImagePlaceholder;
