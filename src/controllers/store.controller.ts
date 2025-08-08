// /* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/db/drizzle';
import { create200Response, create201Response, createAuthRouter } from '@/lib';
import {
  createStore,
  deleteStore,
  getStore,
  getStoreOwned,
  listStores,
  updateStore,
} from '@/repositories/store.repository';
import {
  createStoreRoute,
  deleteStoreRoute,
  getStoreOwnedRoute,
  getStoreRoute,
  listStoresRoute,
  updateStoreRoute,
} from '@/routes/store.route';

export const protectedStoreRouter = createAuthRouter();

protectedStoreRouter.openapi(createStoreRoute, async (c) => {
  const user = c.var.user || undefined;
  const body = c.req.valid('json');
  const res = await createStore(db, user, body);
  return create201Response(c, res);
});

protectedStoreRouter.openapi(listStoresRoute, async (c) => {
  const user = c.var.user || undefined;
  const res = await listStores(db, user);
  return create200Response(c, res);
});

protectedStoreRouter.openapi(getStoreOwnedRoute, async (c) => {
  const user = c.var.user || undefined;
  const res = await getStoreOwned(db, user);
  return create200Response(c, res);
});

protectedStoreRouter.openapi(getStoreRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const res = await getStore(db, user, params);
  return create200Response(c, res);
});

protectedStoreRouter.openapi(updateStoreRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const body = c.req.valid('json');
  const res = await updateStore(db, user, params, body);
  return create200Response(c, res);
});

protectedStoreRouter.openapi(deleteStoreRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const res = await deleteStore(db, user, params);
  return create200Response(c, res);
});
