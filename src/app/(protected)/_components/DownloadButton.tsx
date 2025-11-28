import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { DownloadIcon } from 'lucide-react';

interface Props extends React.ComponentProps<'button'> {
  filename: string;
  imageURL: string;
}

export default function DownloadButton({ filename, imageURL, ...rest }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDownload = async (url: string, filename: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to download: ${response.status} ${response.statusText}`,
        );
      }

      const extension = `.${response.headers.get('content-type')?.split(';')[0].split('/')[1] || 'png'}`;
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${filename}${extension}`;
      a.click();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error('Failed to download image');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      onClick={() => handleDownload(imageURL, filename)}
      disabled={isLoading}
      {...rest}
    >
      <DownloadIcon className=' size-4 mr-2' />
      Download
    </button>
  );
}
