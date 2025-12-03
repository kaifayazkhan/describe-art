export const sdAspectRatioMap = {
  '1:1': { width: 1024, height: 1024 },
  '9:7': { width: 1152, height: 896 },
  '19:13': { width: 1216, height: 832 },
  '7:4': { width: 1344, height: 768 },
  '12:5': { width: 1536, height: 640 },
  '5:12': { width: 640, height: 1536 },
  '4:7': { width: 768, height: 1344 },
  '13:19': { width: 832, height: 1216 },
  '7:9': { width: 896, height: 1152 },
} as const;

export type AspectRatioTypeSD = keyof typeof sdAspectRatioMap;
export const AspectRatioSD = Object.keys(
  sdAspectRatioMap,
) as readonly AspectRatioTypeSD[];

export const getWidthAndHeightSD = (ratio: AspectRatioTypeSD) => {
  const result = sdAspectRatioMap[ratio];
  if (!result) throw new Error(`Unknown aspect ratio: ${ratio}`);
  return result;
};

export const fluxAspectRatioMap = {
  '1:1': { width: 1024, height: 1024 },
  '3:4': { width: 768, height: 1024 },
  '4:3': { width: 1024, height: 768 },
  '9:16': { width: 1080, height: 1920 },
  '16:9': { width: 1920, height: 1080 },
} as const;

export type AspectRatioTypeFlux = keyof typeof fluxAspectRatioMap;
export const AspectRatioFlux = Object.keys(
  fluxAspectRatioMap,
) as readonly AspectRatioTypeFlux[];

export const getFluxWidthAndHeight = (ratio: AspectRatioTypeFlux) => {
  const result = fluxAspectRatioMap[ratio];
  if (!result) throw new Error(`Unknown aspect ratio: ${ratio}`);
  return result;
};

export const modelAspectRatioSupport = {
  'stable-diffusion-xl-1024-v1-0': Object.keys(sdAspectRatioMap),
  'black-forest-labs/flux-schnell': Object.keys(fluxAspectRatioMap),
  'black-forest-labs/flux-dev': Object.keys(fluxAspectRatioMap),
} as const;
