import { eq } from 'drizzle-orm';

import { first } from '@/db/db-helper';
import { Database } from '@/db/drizzle';
import { wholesalePrice } from '@/db/schema';
import { createErrorResponse, createSuccessResponse } from '@/lib';
import { IdParams } from '@/types/generic.type';
import { SessionUser } from '@/types/session.type';
import {
  CreateWholesalePrice,
  UpdateWholesalePrice,
} from '@/types/wholesale-price.type';

export async function createWholesalePrice(
  db: Database,
  user: SessionUser,
  body: CreateWholesalePrice,
) {
  const res = await db
    .insert(wholesalePrice)
    .values(body)
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Failed to create wholesale price', 500);
  }
  return createSuccessResponse(
    res,
    'Wholesale price created successfully',
    201,
  );
}

export async function getWholesalePrice(db: Database, params: IdParams) {
  const res = await db
    .select()
    .from(wholesalePrice)
    .where(eq(wholesalePrice.id, params.id))
    .then(first);

  if (!res) {
    return createErrorResponse('Wholesale price not found', 404);
  }
  return createSuccessResponse(res, 'Wholesale price retrieved successfully');
}

export async function updateWholesalePrice(
  db: Database,
  user: SessionUser,
  params: IdParams,
  body: UpdateWholesalePrice,
) {
  const res = await db
    .update(wholesalePrice)
    .set(body)
    .where(eq(wholesalePrice.id, params.id))
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse(
      'Wholesale price not found or update failed',
      404,
    );
  }

  return createSuccessResponse(res, 'Wholesale price updated successfully');
}

export async function deleteWholesalePrice(
  db: Database,
  user: SessionUser,
  params: IdParams,
) {
  const res = await db
    .delete(wholesalePrice)
    .where(eq(wholesalePrice.id, params.id))
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Wholesale price not found', 404);
  }

  return createSuccessResponse(res, 'Wholesale price deleted successfully');
}

export async function listWholesalePrices(db: Database) {
  const res = await db.select().from(wholesalePrice);

  if (!res || res.length === 0) {
    return createErrorResponse('No wholesale prices found', 404);
  }

  return createSuccessResponse(res, 'Wholesale prices retrieved successfully');
}
