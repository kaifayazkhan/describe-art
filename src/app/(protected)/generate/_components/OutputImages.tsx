'use client';
import React, { useState } from 'react';
import { useGenerateImage } from '@/context/Generate';
import ImageOutputPreview from '@/app/(protected)/_components/ImagePreviewGallery';
import ImagePlaceholder from '@/app/(protected)/_components/ImagePlaceholder';
import ImageCard from '@/app/(protected)/_components/ImageCard';

export default function GeneratedImages() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const {
    imageDesc: { prompt, imageCount },
    isLoading,
    images,
  } = useGenerateImage();

  const handlePreview = (imageId: number) => {
    setSelectedImage(imageId);
    setShowPreview(true);
  };

  return (
    <div className='flex-[3] h-full py-6 px-[7%] overflow-y-auto'>
      {(images?.length >= 1 || isLoading) && (
        <p className='text-sm text-gray-400 line-clamp-2'>{prompt}</p>
      )}
      {!isLoading && images?.length <= 0 && (
        <>
          <p>Describe your art...</p>
          <div className='grid grid-cols-3 gap-10 mt-3'>
            <ImagePlaceholder />
          </div>
        </>
      )}
      {isLoading ? (
        <div className='grid grid-cols-3 mt-3 gap-10'>
          {imageCount > 0 &&
            Array(imageCount)
              .fill(1)
              .map((_, i) => <ImagePlaceholder key={i} />)}
        </div>
      ) : (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 mt-3 gap-10'>
          {images?.map((item) => (
            <ImageCard key={item.id} image={item} onClick={handlePreview} />
          ))}
        </div>
      )}
      {showPreview && (
        <ImageOutputPreview
          selectedImageId={selectedImage ?? 0}
          closeModal={() => setShowPreview(false)}
          images={images}
        />
      )}
    </div>
  );
}
