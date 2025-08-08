import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { createId } from '../db-helper';

export const transactionItem = pgTable('transaction_item', {
  id: varchar('id').primaryKey().unique().$defaultFn(createId),
  transactionId: varchar('transaction_id').notNull(),
  productId: varchar('product_id').notNull(),
  quantity: integer('quantity'),
  unitPrice: integer('unit_price'),
  subtotal: integer('subtotal'),
});

// Types
export type TransactionItem = typeof transactionItem.$inferSelect;
export type TransactionItemInsert = typeof transactionItem.$inferInsert;
