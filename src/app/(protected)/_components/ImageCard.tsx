import React from 'react';
import Image from 'next/image';
import { ImageResponseType } from '@/types/images';

type Props = {
  image: ImageResponseType;
  onClick: (id: number) => void;
};

function ImageCard({ onClick, image }: Props) {
  return (
    <div className='flex-1 aspect-square max-w-full hover:scale-[1.02] transition-transform flex-center gradient-border relative hover:opacity-70 cursor-pointer'>
      <button
        className='absolute inset-0 z-10'
        aria-label='Preview Image'
        onClick={() => onClick(image.id)}
      ></button>
      <Image
        key={image.id}
        src={image.imageUrl}
        alt='user gallery images'
        className='object-contain'
        sizes='(min-width: 1024px) 40vw, 100vw'
        loading='lazy'
        fill
      />
    </div>
  );
}

export default ImageCard;
