import { and, eq } from 'drizzle-orm';

import { first } from '@/db/db-helper';
import { Database } from '@/db/drizzle';
import { cart } from '@/db/schema';
import { createErrorResponse, createSuccessResponse } from '@/lib';
import { CreateCart, UpdateCart } from '@/types/cart.type';
import { IdParams } from '@/types/generic.type';
import { SessionUser } from '@/types/session.type';

export async function createCart(
  db: Database,
  user: SessionUser,
  body: CreateCart,
) {
  const res = await db
    .insert(cart)
    .values({
      ...body,
      userId: user.id,
    })
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Failed to create cart item', 500);
  }
  return createSuccessResponse(res, 'Cart item created successfully', 201);
}

export async function getCart(
  db: Database,
  user: SessionUser,
  params: IdParams,
) {
  const res = await db
    .select()
    .from(cart)
    .where(and(eq(cart.userId, user.id), eq(cart.id, params.id)))
    .then(first);

  if (!res) {
    return createErrorResponse('Cart item not found', 404);
  }
  return createSuccessResponse(res, 'Cart item retrieved successfully');
}

export async function updateCart(
  db: Database,
  user: SessionUser,
  params: IdParams,
  body: UpdateCart,
) {
  const res = await db
    .update(cart)
    .set(body)
    .where(and(eq(cart.userId, user.id), eq(cart.id, params.id)))
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Cart item not found or update failed', 404);
  }

  return createSuccessResponse(res, 'Cart item updated successfully');
}

export async function deleteCart(
  db: Database,
  user: SessionUser,
  params: IdParams,
) {
  const res = await db
    .delete(cart)
    .where(and(eq(cart.userId, user.id), eq(cart.id, params.id)))
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Cart item not found', 404);
  }

  return createSuccessResponse(res, 'Cart item deleted successfully');
}

export async function listCartItems(db: Database, user: SessionUser) {
  const res = await db.select().from(cart).where(eq(cart.userId, user.id));

  return createSuccessResponse(res, 'Cart items retrieved successfully');
}
