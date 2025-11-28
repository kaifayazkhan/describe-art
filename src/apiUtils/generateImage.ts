import { api } from '@/utils/axios';
import { GenerateImageType } from '@/utils/server/generateImage';
import { ImageResponse } from '@/types/images';
import { ApiResponse } from '@/types/apiResponse';

export const generateImageAPI = async ({
  prompt,
  imageCount,
  aspectRatio,
  modelId,
}: GenerateImageType) => {
  const headers = {
    Accept: 'application/json',
  };
  const body = {
    prompt,
    imageCount,
    aspectRatio,
    modelId,
  };
  try {
    const response = await api.post('/generate', body, {
      headers: headers,
    });

    if (response.status !== 201) {
      throw new Error('Failed to generate image');
    }

    return response.data as ApiResponse<ImageResponse[]>;
  } catch (e: any) {
    throw new Error(`Image not generated: ${e.message}`, { cause: e });
  }
};
