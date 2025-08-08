import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

import { wholesalePrice } from '@/db/schema';

// Create
export const createWholesalePriceSchema = createInsertSchema(
  wholesalePrice,
).omit({
  id: true,
});

// Read
export const readWholesalePriceSchema =
  createSelectSchema(wholesalePrice).openapi('WholesalePrice');
export const readWholesalePriceListSchema = z.array(readWholesalePriceSchema);

// Update
export const updateWholesalePriceSchema = createWholesalePriceSchema.partial();

// Types
export type CreateWholesalePrice = z.infer<typeof createWholesalePriceSchema>;
export type ReadWholesalePrice = z.infer<typeof readWholesalePriceSchema>;
export type ReadWholesalePriceList = z.infer<
  typeof readWholesalePriceListSchema
>;
export type UpdateWholesalePrice = z.infer<typeof updateWholesalePriceSchema>;
