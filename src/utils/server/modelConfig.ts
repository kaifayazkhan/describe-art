export const MODEL_CONFIG = {
  'stable-diffusion-xl-1024-v1-0': {
    type: 'sd',
    steps: 35,
    maxImages: 5,
  },
  'black-forest-labs/flux-schnell': {
    type: 'flux',
    steps: 8,
    maxImages: 1,
  },
  'black-forest-labs/flux-dev': {
    type: 'flux',
    steps: 28,
    maxImages: 1,
  },
} as const;

export type ModelConfigType = typeof MODEL_CONFIG;
export type ModelKeyType = keyof ModelConfigType;
