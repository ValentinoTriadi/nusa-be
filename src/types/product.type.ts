import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

import { product } from '@/db/schema';

import { readUserSchema } from './user.type';
import { readWholesalePriceListSchema } from './wholesale-price.type';

// Create
export const createProductSchema = createInsertSchema(product).omit({
  id: true,
  sellerId: true,
  createdAt: true,
});

// Read
export const readProductSchema = createSelectSchema(product, {
  createdAt: z.union([z.string(), z.date()]),
});
export const readProductListSchema = z.array(readProductSchema);

export const readProductWithSellerSchema = readProductSchema.extend({
  seller: readUserSchema,
  wholesalePriceList: readWholesalePriceListSchema,
});
export const readProductListWithSellerSchema = z.array(
  readProductWithSellerSchema,
);

// Update
export const updateProductSchema = createProductSchema.partial();

// Types
export type CreateProduct = z.infer<typeof createProductSchema>;
export type ReadProduct = z.infer<typeof readProductSchema>;
export type ReadProductList = z.infer<typeof readProductListSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
