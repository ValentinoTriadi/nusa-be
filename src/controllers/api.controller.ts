import { OpenAPIHono } from '@hono/zod-openapi';

import { protectedCartRouter } from './cart.controller';
import { protectedFavoriteRouter } from './favorite.controller';
import { healthRouter, protectedHealthRouter } from './health.controller';
import { protectedProductRouter } from './product.controller';
import { protectedStoreRouter } from './store.controller';
import { protectedTransactionRouter } from './transaction.controller';
import { protectedWholesalePriceRouter } from './wholesale-price.controller';

const unprotectedRouter = new OpenAPIHono();
unprotectedRouter.route('/', healthRouter);

const protectedRouter = new OpenAPIHono();
protectedRouter.route('/', protectedHealthRouter);
protectedRouter.route('/', protectedStoreRouter);
protectedRouter.route('/', protectedProductRouter);
protectedRouter.route('/', protectedWholesalePriceRouter);
protectedRouter.route('/', protectedCartRouter);
protectedRouter.route('/', protectedFavoriteRouter);
protectedRouter.route('/', protectedTransactionRouter);

export const apiRouter = new OpenAPIHono();
apiRouter.route('/', unprotectedRouter);
apiRouter.route('/', protectedRouter);
