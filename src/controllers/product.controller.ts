import { db } from '@/db/drizzle';
import { create200Response, create201Response, createAuthRouter } from '@/lib';
import * as productRepository from '@/repositories/product.repository';
import {
  createProductRoute,
  deleteProductRoute,
  getProductRoute,
  listProductsRoute,
  updateProductRoute,
} from '@/routes/product.route';

export const protectedProductRouter = createAuthRouter();

protectedProductRouter.openapi(createProductRoute, async (c) => {
  const user = c.var.user || undefined;
  const body = c.req.valid('json');
  const res = await productRepository.createProduct(db, user, body);
  return create201Response(c, res);
});

protectedProductRouter.openapi(getProductRoute, async (c) => {
  const params = c.req.valid('param');
  const res = await productRepository.getProduct(db, params);
  return create200Response(c, res);
});

protectedProductRouter.openapi(updateProductRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const body = c.req.valid('json');
  const res = await productRepository.updateProduct(db, user, params, body);
  return create200Response(c, res);
});

protectedProductRouter.openapi(deleteProductRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const res = await productRepository.deleteProduct(db, user, params);
  return create200Response(c, res);
});

protectedProductRouter.openapi(listProductsRoute, async (c) => {
  const res = await productRepository.listProducts(db);
  return create200Response(c, res);
});
