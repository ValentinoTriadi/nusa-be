import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

import { transactionItem } from '@/db/schema';

import { readProductSchema } from './product.type';
import { readTransactionSchema } from './transaction.type';

// Create
export const createTransactionItemSchema = createInsertSchema(
  transactionItem,
).omit({
  id: true,
});

// Read
export const readTransactionItemSchema = createSelectSchema(transactionItem);
export const readTransactionItemListSchema = z.array(readTransactionItemSchema);

export const readTransactionItemWithRelationsSchema =
  readTransactionItemSchema.extend({
    transaction: readTransactionSchema,
    product: readProductSchema,
  });
export const readTransactionItemListWithRelationsSchema = z.array(
  readTransactionItemWithRelationsSchema,
);

// Update
export const updateTransactionItemSchema =
  createTransactionItemSchema.partial();

// Types
export type CreateTransactionItem = z.infer<typeof createTransactionItemSchema>;
export type ReadTransactionItem = z.infer<typeof readTransactionItemSchema>;
export type ReadTransactionItemList = z.infer<
  typeof readTransactionItemListSchema
>;
export type UpdateTransactionItem = z.infer<typeof updateTransactionItemSchema>;
