import { db } from '@/db/drizzle';
import { create200Response, create201Response, createAuthRouter } from '@/lib';
import * as transactionRepository from '@/repositories/transaction.repository';
import {
  createTransactionRoute,
  deleteTransactionRoute,
  getTransactionRoute,
  listTransactionsRoute,
  updateTransactionRoute,
} from '@/routes/transaction.route';

export const protectedTransactionRouter = createAuthRouter();

protectedTransactionRouter.openapi(createTransactionRoute, async (c) => {
  const user = c.var.user || undefined;
  const body = c.req.valid('json');
  const res = await transactionRepository.createTransaction(db, user, body);
  return create201Response(c, res);
});

protectedTransactionRouter.openapi(getTransactionRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const res = await transactionRepository.getTransaction(db, user, params);
  return create200Response(c, res);
});

protectedTransactionRouter.openapi(updateTransactionRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const body = c.req.valid('json');
  const res = await transactionRepository.updateTransaction(
    db,
    user,
    params,
    body,
  );
  return create200Response(c, res);
});

protectedTransactionRouter.openapi(deleteTransactionRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const res = await transactionRepository.deleteTransaction(db, user, params);
  return create200Response(c, res);
});

protectedTransactionRouter.openapi(listTransactionsRoute, async (c) => {
  const user = c.var.user || undefined;
  const res = await transactionRepository.listTransactions(db, user);
  return create200Response(c, res);
});
