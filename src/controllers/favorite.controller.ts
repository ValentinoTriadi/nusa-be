import { db } from '@/db/drizzle';
import { create200Response, create201Response, createAuthRouter } from '@/lib';
import * as favoriteRepository from '@/repositories/favorite.repository';
import {
  createFavoriteRoute,
  deleteFavoriteRoute,
  getFavoriteRoute,
  listFavoritesRoute,
  updateFavoriteRoute,
} from '@/routes/favorite.route';

export const protectedFavoriteRouter = createAuthRouter();

protectedFavoriteRouter.openapi(createFavoriteRoute, async (c) => {
  const user = c.var.user || undefined;
  const body = c.req.valid('json');
  const res = await favoriteRepository.createFavorite(db, user, body);
  return create201Response(c, res);
});

protectedFavoriteRouter.openapi(getFavoriteRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const res = await favoriteRepository.getFavorite(db, user, params);
  return create200Response(c, res);
});

protectedFavoriteRouter.openapi(updateFavoriteRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const body = c.req.valid('json');
  const res = await favoriteRepository.updateFavorite(db, user, params, body);
  return create200Response(c, res);
});

protectedFavoriteRouter.openapi(deleteFavoriteRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const res = await favoriteRepository.deleteFavorite(db, user, params);
  return create200Response(c, res);
});

protectedFavoriteRouter.openapi(listFavoritesRoute, async (c) => {
  const user = c.var.user || undefined;
  const res = await favoriteRepository.listFavorites(db, user);
  return create200Response(c, res);
});
