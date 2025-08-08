import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { createId, getNow } from '../db-helper';

export const collaboration = pgTable('collaboration', {
  id: varchar('id').primaryKey().unique().$defaultFn(createId),
  name: text('name'),
  description: text('description'),
  initiatorId: varchar('initiator_id').notNull(),
  productId: varchar('product_id').notNull(),
  targetQuantity: integer('target_quantity'),
  currentQuantity: integer('current_quantity'),
  unit: text('unit'),
  status: text('status'),
  deadline: timestamp('deadline'),
  createdAt: timestamp('created_at').$defaultFn(getNow),
});

// Types
export type Collaboration = typeof collaboration.$inferSelect;
export type CollaborationInsert = typeof collaboration.$inferInsert;
