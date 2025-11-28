'use client';
import React, { useState } from 'react';
import { useGenerateImage } from '@/context/Generate';
import Image from 'next/image';
import PreviewImage from '../PreviewImage';

export default function GeneratedImages() {
  const [previewUrl, setPreviewUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const {
    imageDesc: { prompt, imageCount },
    isLoading,
    images,
  } = useGenerateImage();

  const handlePreview = (url: string) => {
    setPreviewUrl(url);
    setShowPreview(true);
  };

  return (
    <div className='flex-[3] h-full py-6 px-[7%] overflow-y-auto'>
      {(images.length >= 1 || isLoading) && <p>{prompt}</p>}
      {!isLoading && images.length <= 0 && (
        <>
          <p>Describe your art...</p>
          <div className='grid grid-cols-3 gap-10 mt-3'>
            <div className='flex-1 aspect-square max-w-full  flex-center  gradient-border relative hover:opacity-90 '>
              <Image
                src='/assets/logo-2.webp'
                width={120}
                height={120}
                alt='Logo'
              />
            </div>
          </div>
        </>
      )}
      {isLoading ? (
        <div className='grid grid-cols-3 mt-3 gap-10'>
          {imageCount > 0 &&
            Array(imageCount)
              .fill(1)
              .map((_, i) => (
                <div
                  key={i}
                  className='flex-1 aspect-square max-w-full  flex-center  gradient-border relative hover:opacity-90 cursor-pointer'
                >
                  <Image
                    src='/assets/logo-2.webp'
                    width={120}
                    height={120}
                    alt='Logo'
                    className='animate-pulse '
                  />
                </div>
              ))}
        </div>
      ) : (
        <div className='grid grid-cols-3 mt-3 gap-10'>
          {images?.map((image: any, index) => (
            <div
              key={index}
              className='flex-1 aspect-square max-w-full  flex-center  gradient-border relative hover:opacity-90 cursor-pointer'
              onClick={() => handlePreview(image)}
            >
              <Image key={index} src={`${image}`} alt={`Image ${index}`} fill />
            </div>
          ))}
          {showPreview && (
            <PreviewImage
              src={previewUrl}
              handleClose={() => setShowPreview(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
