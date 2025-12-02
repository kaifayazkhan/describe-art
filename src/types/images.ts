export type ImageResponseType = {
  id: number;
  imageUrl: string;
  contentType: string;
  order: number;
  seed: number;
};

export type GalleryImages = {
  id: number;
  prompt: string;
  createdAt: string;
  images: ImageResponseType[];
};
