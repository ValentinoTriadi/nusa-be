import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { createId, getNow } from '../db-helper';

export const store = pgTable('store', {
  id: varchar('id').primaryKey().unique().$defaultFn(createId),
  userId: varchar('user_id').notNull(),
  storeName: text('store_name'),
  businessId: text('business_id'),
  businessType: text('business_type'),
  businessDescription: text('business_description'),
  tags: text('tags').array(),
  description: text('description'),
  phoneNumber: text('phone_number'),
  address: text('address'),
  city: text('city'),
  province: text('province'),
  postalCode: text('postal_code'),
  createdAt: timestamp('created_at').$defaultFn(getNow),
  updatedAt: timestamp('updated_at').$defaultFn(getNow),
});

// Types
export type Store = typeof store.$inferSelect;
export type StoreInsert = typeof store.$inferInsert;
