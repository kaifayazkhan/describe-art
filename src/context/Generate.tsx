'use client';
import React, { createContext, useContext, useState } from 'react';

type ImageDescription = {
  prompt: string;
  imageCount: number;
};

const initialValue: ImageDescription = {
  prompt: '',
  imageCount: 1,
};

export const GenerateContext = createContext<{
  imageDesc: ImageDescription;
  setImageDesc: React.Dispatch<React.SetStateAction<ImageDescription>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  images: object[];
  setImages: React.Dispatch<React.SetStateAction<object[]>>;
}>({
  imageDesc: initialValue,
  setImageDesc: () => {},
  isLoading: false,
  setIsLoading: () => {},
  images: [],
  setImages: () => {},
});

const GenerateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [imageDesc, setImageDesc] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<object[]>([]);

  return (
    <GenerateContext.Provider
      value={{
        imageDesc,
        setImageDesc,
        isLoading,
        setIsLoading,
        images,
        setImages,
      }}
    >
      {children}
    </GenerateContext.Provider>
  );
};

export const useGenerateImage = () => {
  return useContext(GenerateContext);
};

export default GenerateContextProvider;
