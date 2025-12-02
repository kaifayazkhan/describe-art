import { api } from '@/utils/axios';
import { ModelType } from '@/drizzle/schema';

export type Models = Pick<
  ModelType,
  'id' | 'modelId' | 'provider' | 'displayName'
>;

export const getModels = async () => {
  try {
    const response = await api.get('/models');

    if (response.status === 200 && response?.data) {
      return response.data.data as Models[];
    }

    throw new Error('Unable to get models', { cause: response.statusText });
  } catch (error) {
    console.error('Error fetching models:', error);
    throw error;
  }
};
