import { and, eq, or } from 'drizzle-orm';

import { first } from '@/db/db-helper';
import { Database } from '@/db/drizzle';
import { transaction } from '@/db/schema';
import { createErrorResponse, createSuccessResponse } from '@/lib';
import { IdParams } from '@/types/generic.type';
import { SessionUser } from '@/types/session.type';
import { CreateTransaction, UpdateTransaction } from '@/types/transaction.type';

export async function createTransaction(
  db: Database,
  user: SessionUser,
  body: CreateTransaction,
) {
  const res = await db
    .insert(transaction)
    .values({
      ...body,
      buyerId: user.id,
    })
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Failed to create transaction', 500);
  }
  return createSuccessResponse(res, 'Transaction created successfully', 201);
}

export async function getTransaction(
  db: Database,
  user: SessionUser,
  params: IdParams,
) {
  const res = await db
    .select()
    .from(transaction)
    .where(
      and(
        or(eq(transaction.buyerId, user.id), eq(transaction.sellerId, user.id)),
        eq(transaction.id, params.id),
      ),
    )
    .then(first);

  if (!res) {
    return createErrorResponse('Transaction not found', 404);
  }
  return createSuccessResponse(res, 'Transaction retrieved successfully');
}

export async function updateTransaction(
  db: Database,
  user: SessionUser,
  params: IdParams,
  body: UpdateTransaction,
) {
  const res = await db
    .update(transaction)
    .set(body)
    .where(
      and(
        or(eq(transaction.buyerId, user.id), eq(transaction.sellerId, user.id)),
        eq(transaction.id, params.id),
      ),
    )
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Transaction not found or update failed', 404);
  }

  return createSuccessResponse(res, 'Transaction updated successfully');
}

export async function deleteTransaction(
  db: Database,
  user: SessionUser,
  params: IdParams,
) {
  const res = await db
    .delete(transaction)
    .where(
      and(
        or(eq(transaction.buyerId, user.id), eq(transaction.sellerId, user.id)),
        eq(transaction.id, params.id),
      ),
    )
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Transaction not found', 404);
  }

  return createSuccessResponse(res, 'Transaction deleted successfully');
}

export async function listTransactions(db: Database, user: SessionUser) {
  const res = await db
    .select()
    .from(transaction)
    .where(
      or(eq(transaction.buyerId, user.id), eq(transaction.sellerId, user.id)),
    );

  if (!res || res.length === 0) {
    return createErrorResponse('No transactions found', 404);
  }

  return createSuccessResponse(res, 'Transactions retrieved successfully');
}
