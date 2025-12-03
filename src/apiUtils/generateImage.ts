import { api } from '@/utils/axios';
import { ImageResponseType } from '@/types/images';
import { ApiResponse } from '@/types/apiResponse';
import { isAxiosError } from 'axios';

type GenerateImageType = {
  prompt: string;
  imageCount: number;
  aspectRatio: string;
  modelId: number;
};

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
      throw new Error('Failed to generate image', { cause: response?.data });
    }

    return response.data as ApiResponse<ImageResponseType[]>;
  } catch (e: any) {
    if (isAxiosError(e)) {
      throw new Error('Failed to generate image', {
        cause: e.response?.data?.message || '',
      });
    }
    throw new Error(`Image not generated: ${e.message}`, { cause: e });
  }
};
