import {
  pgTable,
  text,
  timestamp,
  boolean,
  bigserial,
  integer,
  varchar,
  bigint,
  serial,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => new Date())
    .notNull(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const request = pgTable('request', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  prompt: text('prompt').notNull(),
  negativePrompt: text('negative_prompt'),

  imageCount: integer('image_count').notNull(),
  width: integer('width').notNull(),
  height: integer('height').notNull(),

  steps: integer('steps').notNull(),
  seed: bigint('seed', { mode: 'bigint' }),

  modelId: integer('model_id')
    .notNull()
    .references(() => model.id),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const image = pgTable('image', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  request_id: bigint('request_id', { mode: 'number' })
    .notNull()
    .references(() => request.id, { onDelete: 'cascade' }),

  storage_key: text('storage_key').notNull(),
  mimeType: varchar('mime_type').notNull(),
  order: integer('order').notNull(),
  seed: bigint('seed', { mode: 'bigint' }),

  uploaded_at: timestamp('uploaded_at').defaultNow().notNull(),
});

export const model = pgTable('model', {
  id: serial('id').primaryKey(),

  displayName: varchar('display_name').notNull(),
  modelId: varchar('model_id').notNull(),

  description: text('description'),
  version: varchar('version'),
  isActive: boolean('is_active').default(true),
  provider: varchar('provider'),

  createdAt: timestamp('created_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const schema = {
  user,
  session,
  verification,
  account,
  request,
  image,
  model,
};
