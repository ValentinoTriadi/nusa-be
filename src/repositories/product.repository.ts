import { and, eq } from 'drizzle-orm';

import { first } from '@/db/db-helper';
import { Database } from '@/db/drizzle';
import { product } from '@/db/schema';
import { createErrorResponse, createSuccessResponse } from '@/lib';
import { IdParams } from '@/types/generic.type';
import { CreateProduct, UpdateProduct } from '@/types/product.type';
import { SessionUser } from '@/types/session.type';

export async function createProduct(
  db: Database,
  user: SessionUser,
  body: CreateProduct,
) {
  const res = await db
    .insert(product)
    .values({
      ...body,
      sellerId: user.id,
    })
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Failed to create product', 500);
  }
  return createSuccessResponse(res, 'Product created successfully', 201);
}

export async function getProduct(db: Database, params: IdParams) {
  const res = await db
    .select()
    .from(product)
    .where(eq(product.id, params.id))
    .then(first);

  if (!res) {
    return createErrorResponse('Product not found', 404);
  }
  return createSuccessResponse(res, 'Product retrieved successfully');
}

export async function updateProduct(
  db: Database,
  user: SessionUser,
  params: IdParams,
  body: UpdateProduct,
) {
  const res = await db
    .update(product)
    .set(body)
    .where(and(eq(product.sellerId, user.id), eq(product.id, params.id)))
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Product not found or update failed', 404);
  }

  return createSuccessResponse(res, 'Product updated successfully');
}

export async function deleteProduct(
  db: Database,
  user: SessionUser,
  params: IdParams,
) {
  const res = await db
    .delete(product)
    .where(and(eq(product.sellerId, user.id), eq(product.id, params.id)))
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Product not found', 404);
  }

  return createSuccessResponse(res, 'Product deleted successfully');
}

export async function listProducts(db: Database) {
  const res = await db.select().from(product);

  return createSuccessResponse(res, 'Products retrieved successfully');
}
