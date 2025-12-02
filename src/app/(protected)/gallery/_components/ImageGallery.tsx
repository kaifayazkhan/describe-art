'use client';
import React, { useState, useEffect, useRef } from 'react';
import { GalleryImages, ImageResponseType } from '@/types/images';
import { getImages } from '@/apiUtils/getImages';
import ImageOutputPreview from '@/app/(protected)/_components/ImagePreviewGallery';
import ImageCard from '@/app/(protected)/_components/ImageCard';
import Spinner from '@/components/UI/Spinner';

const LIMIT = 5;

function ImageGallery() {
  const [images, setImages] = useState<GalleryImages[]>([]);
  const [galleryImages, setGalleryImages] = useState<ImageResponseType[]>([]);

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handlePreview = (imageId: number) => {
    const selectedImageId = galleryImages.findIndex(
      (item) => item.id === imageId,
    );
    if (selectedImageId === -1) return;
    setSelectedImage(selectedImageId);
    setShowPreview(true);
  };

  const fetchImages = async ({
    limit,
    cursor,
  }: {
    limit: number;
    cursor: string;
  }) => {
    try {
      setLoading(true);
      const response = await getImages({
        limit,
        cursor,
      });

      if (!response) {
        return;
      }

      setImages((prevImages) => {
        const existingIds = new Set(prevImages.map((img) => img.id));
        const newImages = response.data.filter(
          (img) => !existingIds.has(img.id),
        );
        return [...prevImages, ...newImages];
      });
      setCursor(response.meta.nextCursor);
      setHasNextPage(!!response.meta.nextCursor);

      const gallery = response.data.reduce((acc: ImageResponseType[], curr) => {
        return [...acc, ...curr.images];
      }, []);

      setGalleryImages((prevGallery) => {
        const existingIds = new Set(prevGallery.map((img) => img.id));
        const newGallery = gallery.filter((img) => !existingIds.has(img.id));
        return [...prevGallery, ...newGallery];
      });
    } catch (error) {
      console.error('Failed to fetch images', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages({
      limit: LIMIT,
      cursor: '',
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && cursor && hasNextPage && !loading) {
          fetchImages({
            limit: LIMIT,
            cursor: cursor,
          });
        }
      },
      { threshold: 0.2 },
    );

    const currentRef = scrollRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, cursor, loading]);

  return (
    <div className='space-y-5 mt-4'>
      {loading && images.length === 0 && (
        <div className='w-full h-40  text-center gap-1 flex  justify-center items-center'>
          <Spinner />
          Loading...
        </div>
      )}

      {images?.map((image) => (
        <div key={image.id} className='pt-4'>
          <p className='text-sm text-gray-400 line-clamp-2'>{image.prompt}</p>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 mt-3 gap-10'>
            {image.images.map((item) => (
              <ImageCard key={item.id} image={item} onClick={handlePreview} />
            ))}
          </div>
        </div>
      ))}

      {hasNextPage && <div ref={scrollRef} className='w-full h-10'></div>}

      {hasNextPage && loading && images.length > 0 ? (
        <div className='w-full h-10  text-center gap-1 flex  justify-center items-center'>
          <Spinner />
          Loading...
        </div>
      ) : null}

      {!loading && !hasNextPage && images.length >= 0 ? (
        <div className='w-full h-40 flex justify-center items-center'>
          No more images found
        </div>
      ) : null}

      {showPreview && (
        <ImageOutputPreview
          selectedImageId={selectedImage ?? 0}
          closeModal={() => setShowPreview(false)}
          images={galleryImages}
        />
      )}
    </div>
  );
}

export default ImageGallery;
