export const aspectRatio = [
  '1:1',
  '9:7',
  '19:13',
  '7:4',
  '12:5',
  '5:12',
  '4:7',
  '13:19',
  '7:9',
] as const;

export type AspectRatio = (typeof aspectRatio)[number];

export const getWidthAndHeight = (aspectRatio: AspectRatio) => {
  switch (aspectRatio) {
    case '1:1':
      return { width: 1024, height: 1024 };

    case '9:7':
      return { width: 1152, height: 896 };

    case '19:13':
      return { width: 1216, height: 832 };

    case '7:4':
      return { width: 1344, height: 768 };

    case '12:5':
      return { width: 1536, height: 640 };

    case '5:12':
      return { width: 640, height: 1536 };

    case '4:7':
      return { width: 768, height: 1344 };

    case '13:19':
      return { width: 832, height: 1216 };

    case '7:9':
      return { width: 896, height: 1152 };

    default:
      throw new Error(`Unknown aspect ratio: ${aspectRatio}`);
  }
};
