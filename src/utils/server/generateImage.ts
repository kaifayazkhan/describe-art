import axios, { AxiosResponse } from 'axios';
import z from 'zod';
import { aspectRatio, getWidthAndHeight } from '@/utils/imageDimension';

export const GenerateImageSchema = z.object({
  prompt: z.string(),
  imageCount: z.number(),
  aspectRatio: z.enum(aspectRatio),
  modelId: z.number(),
});

export type GenerateImageType = z.infer<typeof GenerateImageSchema>;

type BaseImageType = {
  base64: string;
  seed: number;
};

type ApiResponseSD = {
  artifacts: Array<BaseImageType & { finishReason: string }>;
};

export const generateWithStableDiffusion = async ({
  prompt,
  imageCount,
  aspectRatio,
}: Omit<GenerateImageType, 'modelId'>) => {
  const { width, height } = getWidthAndHeight(aspectRatio);
  try {
    const path =
      'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
    };

    const body = {
      steps: 35,
      width: width,
      height: height,
      seed: 0,
      cfg_scale: 7,
      samples: imageCount,
      text_prompts: [
        {
          text: `${prompt} (extremely detailed 8k photograph),(masterpiece), (best quality), (ultra-detailed), (best shadow), sony A7, 35mm`,
          weight: 1,
        },
        {
          text: 'blurry, bad, lowresolution, bad anatomy, bad hands, mutated hand, text, error, missing fingers, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name, out of focus, (wedding ring:1.1), 2girls, 3girls, (((multiple views))), (((bad proportions))), (((multiple legs))), (((multiple arms))), (monotone). 3D. low quality lowres multiple breasts, bad fingers, jewelry, ((vertical letterboxing)), ((letterboxing))',
          weight: -1,
        },
      ],
    };

    // TODO: add retry mechanism if request fails
    const response = (await axios.post(path, body, {
      headers: headers,
    })) as AxiosResponse<ApiResponseSD>;

    return {
      images: response.data.artifacts,
      prompt: prompt,
      imageCount: imageCount,
      aspectRatio: aspectRatio,
      width,
      height,
      format: 'png',
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error('Failed to generate image', {
        cause: error.response?.data,
      });
    } else {
      throw new Error('Failed to generate image');
    }
  }
};
