import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

import { product } from '@/db/schema';

import { readStoreSchema } from './store.type';
import { readWholesalePriceListSchema } from './wholesale-price.type';

// Create
export const createProductSchema = createInsertSchema(product).omit({
  id: true,
  storeId: true,
  createdAt: true,
});

// Read
export const readProductSchema = createSelectSchema(product, {
  createdAt: z.union([z.string(), z.date()]),
}).openapi('Product');
export const readProductListSchema = z.array(readProductSchema);

export const readProductWithStoreSchema = readProductSchema
  .extend({
    store: readStoreSchema.optional(),
    wholesalePrices: readWholesalePriceListSchema.optional(),
  })
  .openapi('ProductWithStore');
export const readProductListWithStoreSchema = z.array(
  readProductWithStoreSchema,
);

// Update
export const updateProductSchema = createProductSchema.partial();

// Types
export type CreateProduct = z.infer<typeof createProductSchema>;
export type ReadProduct = z.infer<typeof readProductSchema>;
export type ReadProductList = z.infer<typeof readProductListSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
