import { db } from '@/db/drizzle';
import { create200Response, create201Response, createAuthRouter } from '@/lib';
import * as cartRepository from '@/repositories/cart.repository';
import {
  createCartRoute,
  deleteCartRoute,
  getCartRoute,
  listCartItemsRoute,
  updateCartRoute,
} from '@/routes/cart.route';

export const protectedCartRouter = createAuthRouter();

protectedCartRouter.openapi(createCartRoute, async (c) => {
  const user = c.var.user || undefined;
  const body = c.req.valid('json');
  const res = await cartRepository.createCart(db, user, body);
  return create201Response(c, res);
});

protectedCartRouter.openapi(getCartRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const res = await cartRepository.getCart(db, user, params);
  return create200Response(c, res);
});

protectedCartRouter.openapi(updateCartRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const body = c.req.valid('json');
  const res = await cartRepository.updateCart(db, user, params, body);
  return create200Response(c, res);
});

protectedCartRouter.openapi(deleteCartRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const res = await cartRepository.deleteCart(db, user, params);
  return create200Response(c, res);
});

protectedCartRouter.openapi(listCartItemsRoute, async (c) => {
  const user = c.var.user || undefined;
  const res = await cartRepository.listCartItems(db, user);
  return create200Response(c, res);
});
