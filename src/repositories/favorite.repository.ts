import { and, eq } from 'drizzle-orm';

import { first } from '@/db/db-helper';
import { Database } from '@/db/drizzle';
import { favorite } from '@/db/schema';
import { createErrorResponse, createSuccessResponse } from '@/lib';
import { CreateFavorite, UpdateFavorite } from '@/types/favorite.type';
import { IdParams } from '@/types/generic.type';
import { SessionUser } from '@/types/session.type';

export async function createFavorite(
  db: Database,
  user: SessionUser,
  body: CreateFavorite,
) {
  const res = await db
    .insert(favorite)
    .values({
      ...body,
      userId: user.id,
    })
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Failed to create favorite', 500);
  }
  return createSuccessResponse(res, 'Favorite created successfully', 201);
}

export async function getFavorite(
  db: Database,
  user: SessionUser,
  params: IdParams,
) {
  const res = await db
    .select()
    .from(favorite)
    .where(and(eq(favorite.userId, user.id), eq(favorite.id, params.id)))
    .then(first);

  if (!res) {
    return createErrorResponse('Favorite not found', 404);
  }
  return createSuccessResponse(res, 'Favorite retrieved successfully');
}

export async function updateFavorite(
  db: Database,
  user: SessionUser,
  params: IdParams,
  body: UpdateFavorite,
) {
  const res = await db
    .update(favorite)
    .set(body)
    .where(and(eq(favorite.userId, user.id), eq(favorite.id, params.id)))
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Favorite not found or update failed', 404);
  }

  return createSuccessResponse(res, 'Favorite updated successfully');
}

export async function deleteFavorite(
  db: Database,
  user: SessionUser,
  params: IdParams,
) {
  const res = await db
    .delete(favorite)
    .where(and(eq(favorite.userId, user.id), eq(favorite.id, params.id)))
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Favorite not found', 404);
  }

  return createSuccessResponse(res, 'Favorite deleted successfully');
}

export async function listFavorites(db: Database, user: SessionUser) {
  const res = await db
    .select()
    .from(favorite)
    .where(eq(favorite.userId, user.id));

  if (!res || res.length === 0) {
    return createErrorResponse('No favorites found', 404);
  }

  return createSuccessResponse(res, 'Favorites retrieved successfully');
}
