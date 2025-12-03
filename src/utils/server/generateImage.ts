import axios, { AxiosResponse } from 'axios';
import z from 'zod';
import {
  AspectRatioFlux,
  AspectRatioSD,
  AspectRatioTypeFlux,
  AspectRatioTypeSD,
  getFluxWidthAndHeight,
  getWidthAndHeightSD,
} from '@/utils/imageDimension';
import { ModelKeyType } from '@/utils/server/modelConfig';

const SupportedDimensions = [...AspectRatioSD, ...AspectRatioFlux];

export const GenerateImageSchema = z.object({
  prompt: z.string().max(400),
  imageCount: z.number(),
  aspectRatio: z.enum(SupportedDimensions as [string, ...string[]]),
  modelId: z.number(),
});

type BaseImageType = {
  base64: string;
  seed: number;
};

type ApiResponseSD = {
  artifacts: Array<BaseImageType & { finishReason: string }>;
};

type ApiResponseFlux = {
  data: Array<{
    b64_json: string;
    url: string | null;
  }>;
};

const BASE_PROMPT =
  '(extremely detailed 8k photograph),(masterpiece), (best quality), (ultra-detailed), (best shadow), sony A7, 35mm';
const NEGATIVE_PROMPT =
  'blurry, bad, lowresolution, bad anatomy, bad hands, mutated hand, text, error, missing fingers, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name, out of focus, (wedding ring:1.1), 2girls, 3girls, (((multiple views))), (((bad proportions))), (((multiple legs))), (((multiple arms))), (monotone). 3D. low quality lowres multiple breasts, bad fingers, jewelry, ((vertical letterboxing)), ((letterboxing))';

export class GenerateImage {
  readonly prompt: string;
  readonly imageCount: number;
  readonly aspectRatio: AspectRatioTypeSD | AspectRatioTypeFlux;

  constructor(
    prompt: string,
    imageCount: number,
    aspectRatio: AspectRatioTypeSD | AspectRatioTypeFlux,
  ) {
    this.prompt = prompt;
    this.imageCount = imageCount;
    this.aspectRatio = aspectRatio;
  }

  async StableDiffusion(steps: number) {
    if (!AspectRatioFlux.includes(this.aspectRatio as AspectRatioTypeFlux)) {
      throw new Error(`Invalid aspect ratio for Flux: ${this.aspectRatio}`);
    }
    const { width, height } = getWidthAndHeightSD(
      this.aspectRatio as AspectRatioTypeSD,
    );
    try {
      const path =
        'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';

      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
      };

      const body = {
        steps: steps,
        width: width,
        height: height,
        seed: 0,
        cfg_scale: 7,
        samples: this.imageCount,
        text_prompts: [
          {
            text: `${this.prompt} ${BASE_PROMPT}`,
            weight: 1,
          },
          {
            text: NEGATIVE_PROMPT,
            weight: -1,
          },
        ],
      };

      const response = (await axios.post(path, body, {
        headers: headers,
      })) as AxiosResponse<ApiResponseSD>;

      return {
        images: response.data.artifacts,
        prompt: this.prompt,
        imageCount: this.imageCount,
        aspectRatio: this.aspectRatio,
        width,
        height,
        format: 'png',
      };
    } catch (error: unknown) {
      console.error('Error generating image:', error);
      if (axios.isAxiosError(error)) {
        throw new Error('Failed to generate image', {
          cause: error.response?.data,
        });
      } else {
        throw new Error('Failed to generate image', { cause: error });
      }
    }
  }

  async Flux(
    model: Exclude<ModelKeyType, 'stable-diffusion-xl-1024-v1-0'>,
    steps: number,
  ) {
    if (!AspectRatioFlux.includes(this.aspectRatio as AspectRatioTypeFlux)) {
      throw new Error(`Invalid aspect ratio for Flux: ${this.aspectRatio}`);
    }
    const { width, height } = getFluxWidthAndHeight(
      this.aspectRatio as AspectRatioTypeFlux,
    );

    try {
      const path = 'https://api.tokenfactory.nebius.com/v1/images/generations';
      const IMAGE_FORMAT: 'png' | 'webp' | 'jpg' = 'png';
      const seed = Math.floor(Math.random() * 0xffffffff);

      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.NEBIUS_API_KEY}`,
      };

      const body = {
        model: model,
        prompt: `${this.prompt} ${BASE_PROMPT}`,
        negative_prompt: NEGATIVE_PROMPT,
        response_format: 'b64_json',
        response_extension: IMAGE_FORMAT,
        width: width,
        height: height,
        num_inference_steps: steps,
        seed: seed,
      };

      const response = (await axios.post(path, body, {
        headers: headers,
      })) as AxiosResponse<ApiResponseFlux>;

      return {
        images: response.data.data.map((item) => ({
          base64: item.b64_json,
          seed: seed,
        })),
        prompt: this.prompt,
        imageCount: this.imageCount,
        aspectRatio: this.aspectRatio,
        width,
        height,
        format: IMAGE_FORMAT,
      };
    } catch (error: unknown) {
      console.error('Error generating image:', error);
      if (axios.isAxiosError(error)) {
        throw new Error('Failed to generate image', {
          cause: error.response?.data,
        });
      } else {
        throw new Error('Failed to generate image', { cause: error });
      }
    }
  }
}
