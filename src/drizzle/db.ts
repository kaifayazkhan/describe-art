import { drizzle } from 'drizzle-orm/node-postgres';
import { schema } from '@/drizzle/schema';

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: schema,
});
