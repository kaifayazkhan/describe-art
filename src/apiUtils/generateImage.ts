import { api } from '@/utils/axios';
import { GenerateImageType } from '@/utils/server/generateImage';

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
    return await api.post('/generate', body, {
      headers: headers,
    });
  } catch (e: any) {
    throw new Error(`Image not generated: ${e.message}`, { cause: e });
  }
};
