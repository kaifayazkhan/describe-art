'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRightIcon, ArrowLeftIcon, X } from 'lucide-react';
import { ImageResponse } from '@/types/images';
import DownloadButton from '@/app/(protected)/_components/DownloadButton';

const controlButtonStyle =
  'size-5 lg:size-7 flex justify-center items-center rounded-md relative bg-primaryBg text-white hover:opacity-70';

function ImageOutputPreview({
  closeModal,
  selectedImageId,
  images,
}: {
  selectedImageId: number;
  closeModal: () => void;
  images: ImageResponse[];
}) {
  const [selectedImage, setSelectedImage] = useState<number>(selectedImageId);

  const handlePrevious = () => {
    if (selectedImage === 0) {
      return setSelectedImage(images.length - 1);
    }
    setSelectedImage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (selectedImage === images.length - 1) {
      return setSelectedImage(0);
    }
    setSelectedImage((prev) => prev + 1);
  };

  return (
    <div className='fixed inset-0 z-[100] flex justify-center items-center py-5 backdrop-blur-sm drop-shadow-2xl overflow-y-auto'>
      <button
        className='absolute inset-0 '
        tabIndex={-1}
        onClick={closeModal}
      ></button>
      <div className='w-[90%] lg:max-w-[50dvw] h-fit flex flex-col gap-2 relative'>
        <button
          className='bg-secondaryBg p-1 lg:p-3 max-h-fit hover:bg-black  absolute -top-2 rounded-lg -right-2.5 z-10'
          onClick={closeModal}
          aria-label='Close preview'
        >
          <X />
        </button>
        <div className='w-full relative rounded h-[70dvh] bg-secondaryBg flex justify-between items-center p-2 flex-wrap'>
          <button className={controlButtonStyle} onClick={handlePrevious}>
            <ArrowLeftIcon className='size-4 text-white' />
          </button>
          <div className='w-[85%] h-full relative'>
            <OutputImageCard
              src={`${images[selectedImage].imageUrl}`}
              alt='Output Image'
            />
          </div>
          <button className={controlButtonStyle} onClick={handleNext}>
            <ArrowRightIcon className='size-4 text-white' />
          </button>
        </div>
        <div className='w-full bg-secondaryBg -mt-2 pb-3 flex justify-between  items-center px-[9%]'>
          <DownloadButton
            className='bg-primaryCTA mx-auto py-1 px-3 rounded-lg hover:opacity-80 max-w-fit flex items-center'
            imageURL={images[selectedImage].imageUrl}
            filename={`download-${images[selectedImage].seed}`}
          />
        </div>
      </div>
    </div>
  );
}
export function OutputImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className='relative size-full overflow-hidden'>
      <Image src={src} fill alt={alt} className='object-contain' sizes='60vw' />
    </div>
  );
}

export default ImageOutputPreview;
