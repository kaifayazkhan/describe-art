import { api } from '@/utils/axios';
import { GalleryImages } from '@/types/images';
import { PaginatedApiResponse } from '@/types/apiResponse';

export const getImages = async ({
  limit,
  cursor,
}: {
  limit?: number;
  cursor?: string;
}) => {
  try {
    const pageSize = limit || 5;
    const params = new URLSearchParams({
      limit: pageSize.toString(),
    });

    if (cursor) {
      params.append('cursor', cursor);
    }

    const response = await api.get(`/users/images?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200 || !response.data) {
      throw new Error('Failed to fetch users images');
    }

    return response.data as PaginatedApiResponse<GalleryImages>;
  } catch (e: any) {
    console.error(`Failed to fetch user images: ${e.message}`, { cause: e });
    return undefined;
  }
};
