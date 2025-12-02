import React from 'react';
import ImageGallery from '@/app/(protected)/gallery/_components/ImageGallery';
import Header from '@/components/Header';

function Gallery() {
  return (
    <>
      <Header />
      <main className='my-8 padding-x'>
        <h1 className='text-large'>Gallery</h1>
        <ImageGallery />
      </main>
    </>
  );
}

export default Gallery;
