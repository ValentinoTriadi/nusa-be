import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { createId } from '../db-helper';

export const wholesalePrice = pgTable('wholesale_price', {
  id: varchar('id').primaryKey().unique().$defaultFn(createId),
  productId: varchar('product_id').notNull(),
  minQuantity: integer('min_quantity'),
  maxQuantity: integer('max_quantity'),
  price: integer('price'),
});

// Types
export type WholesalePrice = typeof wholesalePrice.$inferSelect;
export type WholesalePriceInsert = typeof wholesalePrice.$inferInsert;
