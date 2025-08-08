import { and, eq } from 'drizzle-orm';

import { first } from '@/db/db-helper';
import { Database } from '@/db/drizzle';
import { store } from '@/db/schema';
import { createErrorResponse, createSuccessResponse } from '@/lib';
import { IdParams } from '@/types/generic.type';
import { SessionUser } from '@/types/session.type';
import { CreateStore, UpdateStore } from '@/types/store.type';

export async function createStore(
  db: Database,
  user: SessionUser,
  body: CreateStore,
) {
  const res = await db
    .insert(store)
    .values({
      ...body,
      userId: user.id,
    })
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Failed to create store', 500);
  }
  return createSuccessResponse(res, 'Store created successfully', 201);
}

export async function getStore(
  db: Database,
  user: SessionUser,
  params: IdParams,
) {
  const res = await db
    .select()
    .from(store)
    .where(and(eq(store.userId, user.id), eq(store.id, params.id)))
    .then(first);

  if (!res) {
    return createErrorResponse('Store not found', 404);
  }
  return createSuccessResponse(res, 'Store retrieved successfully');
}

export async function getStoreOwned(db: Database, user: SessionUser) {
  const res = await db
    .select()
    .from(store)
    .where(eq(store.userId, user.id))
    .then(first);

  if (!res) {
    return createErrorResponse('Store not found', 404);
  }
  return createSuccessResponse(res, 'Store retrieved successfully');
}

export async function updateStore(
  db: Database,
  user: SessionUser,
  params: IdParams,
  body: UpdateStore,
) {
  const res = await db
    .update(store)
    .set(body)
    .where(and(eq(store.userId, user.id), eq(store.id, params.id)))
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Store not found or update failed', 404);
  }

  return createSuccessResponse(res, 'Store updated successfully');
}

export async function deleteStore(
  db: Database,
  user: SessionUser,
  params: IdParams,
) {
  const res = await db
    .delete(store)
    .where(and(eq(store.userId, user.id), eq(store.id, params.id)))
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Store not found', 404);
  }

  return createSuccessResponse(res, 'Store deleted successfully');
}

export async function listStores(db: Database) {
  const res = await db.select().from(store);

  return createSuccessResponse(res, 'Stores retrieved successfully');
}
