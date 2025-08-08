import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { createId, getNow } from '../db-helper';

export const payment = pgTable('payment', {
  id: varchar('id').primaryKey().unique().$defaultFn(createId),
  transactionId: varchar('transaction_id').notNull(),
  method: text('method'),
  status: text('status'),
  amount: integer('amount'),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').$defaultFn(getNow),
});

// Types
export type Payment = typeof payment.$inferSelect;
export type PaymentInsert = typeof payment.$inferInsert;
