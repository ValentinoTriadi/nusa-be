import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

import { transaction } from '@/db/schema';

import { readUserSchema } from './user.type';

// Create
export const createTransactionSchema = createInsertSchema(transaction).omit({
  id: true,
  buyerId: true,
  createdAt: true,
});

// Read
export const readTransactionSchema = createSelectSchema(transaction, {
  createdAt: z.union([z.string(), z.date()]),
});
export const readTransactionListSchema = z.array(readTransactionSchema);

export const readTransactionWithUsersSchema = readTransactionSchema.extend({
  buyer: readUserSchema,
  seller: readUserSchema,
});
export const readTransactionListWithUsersSchema = z.array(
  readTransactionWithUsersSchema,
);

// Update
export const updateTransactionSchema = createTransactionSchema.partial();

// Types
export type CreateTransaction = z.infer<typeof createTransactionSchema>;
export type ReadTransaction = z.infer<typeof readTransactionSchema>;
export type ReadTransactionList = z.infer<typeof readTransactionListSchema>;
export type UpdateTransaction = z.infer<typeof updateTransactionSchema>;
