import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { createId, getNow } from '../db-helper';

export const favorite = pgTable('favorite', {
  id: varchar('id').primaryKey().unique().$defaultFn(createId),
  userId: varchar('user_id').notNull(),
  productId: varchar('product_id').notNull(),
  createdAt: timestamp('created_at').$defaultFn(getNow),
});

// Types
export type Favorite = typeof favorite.$inferSelect;
export type FavoriteInsert = typeof favorite.$inferInsert;
