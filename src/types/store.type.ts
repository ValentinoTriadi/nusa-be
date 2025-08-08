import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

import { store } from '@/db/schema';

import { readUserSchema } from './user.type';

// Create
export const createStoreSchema = createInsertSchema(store).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

// Read
export const readStoreSchema = createSelectSchema(store, {
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
}).openapi('Store');
export const readStoreListSchema = z.array(readStoreSchema);

export const readStoreWithUserSchema = readStoreSchema
  .extend({
    user: readUserSchema,
  })
  .openapi('StoreWithUser');
export const readStoreListWithUserSchema = z.array(readStoreWithUserSchema);

// Update
export const updateStoreSchema = createStoreSchema.partial();

// Types
export type CreateStore = z.infer<typeof createStoreSchema>;
export type ReadStore = z.infer<typeof readStoreSchema>;
export type ReadStoreList = z.infer<typeof readStoreListSchema>;
export type UpdateStore = z.infer<typeof updateStoreSchema>;
