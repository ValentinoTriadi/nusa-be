import { db } from '@/db/drizzle';
import { create200Response, create201Response, createAuthRouter } from '@/lib';
import * as wholesalePriceRepository from '@/repositories/wholesale-price.repository';
import {
  createWholesalePriceRoute,
  deleteWholesalePriceRoute,
  getWholesalePriceRoute,
  listWholesalePricesRoute,
  updateWholesalePriceRoute,
} from '@/routes/wholesale-price.route';

export const protectedWholesalePriceRouter = createAuthRouter();

protectedWholesalePriceRouter.openapi(createWholesalePriceRoute, async (c) => {
  const user = c.var.user || undefined;
  const body = c.req.valid('json');
  const res = await wholesalePriceRepository.createWholesalePrice(
    db,
    user,
    body,
  );
  return create201Response(c, res);
});

protectedWholesalePriceRouter.openapi(getWholesalePriceRoute, async (c) => {
  const params = c.req.valid('param');
  const res = await wholesalePriceRepository.getWholesalePrice(db, params);
  return create200Response(c, res);
});

protectedWholesalePriceRouter.openapi(updateWholesalePriceRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const body = c.req.valid('json');
  const res = await wholesalePriceRepository.updateWholesalePrice(
    db,
    user,
    params,
    body,
  );
  return create200Response(c, res);
});

protectedWholesalePriceRouter.openapi(deleteWholesalePriceRoute, async (c) => {
  const user = c.var.user || undefined;
  const params = c.req.valid('param');
  const res = await wholesalePriceRepository.deleteWholesalePrice(
    db,
    user,
    params,
  );
  return create200Response(c, res);
});

protectedWholesalePriceRouter.openapi(listWholesalePricesRoute, async (c) => {
  const res = await wholesalePriceRepository.listWholesalePrices(db);
  return create200Response(c, res);
});
