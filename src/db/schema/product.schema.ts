import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { createId, getNow } from '../db-helper';

export const product = pgTable('product', {
  id: varchar('id').primaryKey().unique().$defaultFn(createId),
  name: text('name'),
  description: text('description'),
  price: integer('price'),
  imageUrls: text('image_urls').array(),
  unit: text('unit'),
  stock: integer('stock'),
  tags: text('tags').array(),
  sellerId: varchar('seller_id').notNull(),
  createdAt: timestamp('created_at').$defaultFn(getNow),
});

// Types
export type Product = typeof product.$inferSelect;
export type ProductInsert = typeof product.$inferInsert;
