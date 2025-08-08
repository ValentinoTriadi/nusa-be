import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

import { cart } from '@/db/schema';

import { readProductSchema } from './product.type';
import { readUserSchema } from './user.type';

// Create
export const createCartSchema = createInsertSchema(cart).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

// Read
export const readCartSchema = createSelectSchema(cart, {
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});
export const readCartListSchema = z.array(readCartSchema);

export const readCartWithRelationsSchema = readCartSchema.extend({
  user: readUserSchema,
  product: readProductSchema,
});
export const readCartListWithRelationsSchema = z.array(
  readCartWithRelationsSchema,
);

// Update
export const updateCartSchema = createCartSchema.partial();

// Types
export type CreateCart = z.infer<typeof createCartSchema>;
export type ReadCart = z.infer<typeof readCartSchema>;
export type ReadCartList = z.infer<typeof readCartListSchema>;
export type UpdateCart = z.infer<typeof updateCartSchema>;
