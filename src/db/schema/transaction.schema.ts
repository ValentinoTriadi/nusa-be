import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { createId, getNow } from '../db-helper';

export const transaction = pgTable('transaction', {
  id: varchar('id').primaryKey().unique().$defaultFn(createId),
  buyerId: varchar('buyer_id').notNull(),
  sellerId: varchar('seller_id').notNull(),
  totalAmount: integer('total_amount'),
  shippingMethod: text('shipping_method'),
  shippingCost: integer('shipping_cost'),
  paymentMethod: text('payment_method'),
  status: text('status'),
  address: text('address'),
  createdAt: timestamp('created_at').$defaultFn(getNow),
});

// Types
export type Transaction = typeof transaction.$inferSelect;
export type TransactionInsert = typeof transaction.$inferInsert;
