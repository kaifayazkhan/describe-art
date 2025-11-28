import { api } from '@/utils/axios';
import { ModelType } from '@/drizzle/schema';

export type Models = Pick<
  ModelType,
  'id' | 'modelId' | 'provider' | 'displayName'
>;

export const getModels = async (): Promise<Models[] | undefined> => {
  try {
    const response = await api.get('/models');

    if (response.status === 200) {
      return response.data.data as Models[];
    }

    console.error(`Failed to fetch models: ${response.status}`, response.data);
    return [];
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
};
