import { eq } from 'drizzle-orm';

import { first } from '@/db/db-helper';
import { Database } from '@/db/drizzle';
import { product, store } from '@/db/schema';
import { createErrorResponse, createSuccessResponse } from '@/lib';
import { IdParams } from '@/types/generic.type';
import { CreateProduct, UpdateProduct } from '@/types/product.type';
import { SessionUser } from '@/types/session.type';

export async function createProduct(
  db: Database,
  user: SessionUser,
  body: CreateProduct,
) {
  const storeRes = await db.query.store.findFirst({
    where: eq(store?.userId, user.id),
  });

  if (!storeRes) {
    return createErrorResponse('Store not found or unauthorized', 404);
  }

  const res = await db
    .insert(product)
    .values({
      ...body,
      storeId: storeRes.id,
    })
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Failed to create product', 500);
  }
  return createSuccessResponse(res, 'Product created successfully', 201);
}

export async function getProduct(db: Database, params: IdParams) {
  const res = await db.query.product.findFirst({
    where: eq(product.id, params.id),
    with: {
      store: true,
      wholesalePrices: true,
    },
  });

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
  const storeRes = await db.query.product.findFirst({
    where: eq(product.id, params.id),
    with: {
      store: true,
    },
  });

  if (!storeRes || storeRes.store.userId !== user.id) {
    return createErrorResponse('Product not found or unauthorized', 404);
  }

  const res = await db
    .update(product)
    .set(body)
    .where(eq(product.id, params.id))
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
  const storeRes = await db.query.product.findFirst({
    where: eq(product.id, params.id),
    with: {
      store: true,
    },
  });

  if (!storeRes || storeRes.store.userId !== user.id) {
    return createErrorResponse('Product not found or unauthorized', 404);
  }

  const res = await db
    .delete(product)
    .where(eq(product.id, params.id))
    .returning()
    .then(first);

  if (!res) {
    return createErrorResponse('Product not found', 404);
  }

  return createSuccessResponse(res, 'Product deleted successfully');
}

export async function listProducts(db: Database) {
  const res = await db.query.product.findMany({
    with: {
      store: true,
      wholesalePrices: true,
    },
  });

  return createSuccessResponse(res, 'Products retrieved successfully');
}
