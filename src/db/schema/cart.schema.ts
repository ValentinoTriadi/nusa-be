import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { createId, getNow } from '../db-helper';

export const cart = pgTable('cart', {
  id: varchar('id').primaryKey().unique().$defaultFn(createId),
  userId: varchar('user_id').notNull(),
  productId: varchar('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('created_at').$defaultFn(getNow),
  updatedAt: timestamp('updated_at').$defaultFn(getNow),
});

// Types
export type Cart = typeof cart.$inferSelect;
export type CartInsert = typeof cart.$inferInsert;
