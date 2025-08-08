import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

import { payment } from '@/db/schema';

import { readTransactionSchema } from './transaction.type';

// Create
export const createPaymentSchema = createInsertSchema(payment).omit({
  id: true,
  createdAt: true,
});

// Read
export const readPaymentSchema = createSelectSchema(payment, {
  paidAt: z.union([z.string(), z.date()]).optional(),
  createdAt: z.union([z.string(), z.date()]),
});
export const readPaymentListSchema = z.array(readPaymentSchema);

export const readPaymentWithTransactionSchema = readPaymentSchema.extend({
  transaction: readTransactionSchema,
});
export const readPaymentListWithTransactionSchema = z.array(
  readPaymentWithTransactionSchema,
);

// Update
export const updatePaymentSchema = createPaymentSchema.partial();

// Types
export type CreatePayment = z.infer<typeof createPaymentSchema>;
export type ReadPayment = z.infer<typeof readPaymentSchema>;
export type ReadPaymentList = z.infer<typeof readPaymentListSchema>;
export type UpdatePayment = z.infer<typeof updatePaymentSchema>;
