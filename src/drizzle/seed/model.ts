import { db } from '../db';
import { model, type ModelInsertType } from '@/drizzle/schema';

const modelsData: ModelInsertType[] = [
  {
    displayName: 'Stable Diffusion XL',
    modelId: 'stable-diffusion-xl-1024-v1-0',
    isActive: true,
    provider: 'Stability AI',
  },
  {
    displayName: 'Flux Schnell',
    modelId: 'black-forest-labs/flux-schnell',
    isActive: true,
    provider: 'Nebius',
  },
  {
    displayName: 'Flux Dev',
    modelId: 'black-forest-labs/flux-dev',
    isActive: true,
    provider: 'Nebius',
  },
];

const seedModel = async () => {
  try {
    console.log('Seeding model...');
    await db.insert(model).values(modelsData);
    // await db.delete(model)
    console.log('Model seeded');
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await seedModel();
  process.exit(0);
})();
