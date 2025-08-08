import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

import { favorite } from '@/db/schema';

import { readProductSchema } from './product.type';
import { readUserSchema } from './user.type';

// Create
export const createFavoriteSchema = createInsertSchema(favorite).omit({
  id: true,
  userId: true,
  createdAt: true,
});

// Read
export const readFavoriteSchema = createSelectSchema(favorite, {
  createdAt: z.union([z.string(), z.date()]),
});
export const readFavoriteListSchema = z.array(readFavoriteSchema);

export const readFavoriteWithRelationsSchema = readFavoriteSchema.extend({
  user: readUserSchema,
  product: readProductSchema,
});
export const readFavoriteListWithRelationsSchema = z.array(
  readFavoriteWithRelationsSchema,
);

// Update
export const updateFavoriteSchema = createFavoriteSchema.partial();

// Types
export type CreateFavorite = z.infer<typeof createFavoriteSchema>;
export type ReadFavorite = z.infer<typeof readFavoriteSchema>;
export type ReadFavoriteList = z.infer<typeof readFavoriteListSchema>;
export type UpdateFavorite = z.infer<typeof updateFavoriteSchema>;
