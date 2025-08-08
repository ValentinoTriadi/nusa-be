import { createRoute } from '@hono/zod-openapi';

import { GenericErrorResponses, createResponseSchema } from '@/lib';
import { idParamsSchema } from '@/types/generic.type';
import {
  createWholesalePriceSchema,
  readWholesalePriceListSchema,
  readWholesalePriceSchema,
  updateWholesalePriceSchema,
} from '@/types/wholesale-price.type';

export const createWholesalePriceRoute = createRoute({
  operationId: 'createWholesalePrice',
  tags: ['wholesale-price'],
  method: 'post',
  path: '/wholesale-price',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createWholesalePriceSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Wholesale price created successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readWholesalePriceSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const getWholesalePriceRoute = createRoute({
  operationId: 'getWholesalePrice',
  tags: ['wholesale-price'],
  method: 'get',
  path: '/wholesale-price/:id',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Wholesale price retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readWholesalePriceSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const updateWholesalePriceRoute = createRoute({
  operationId: 'updateWholesalePrice',
  tags: ['wholesale-price'],
  method: 'put',
  path: '/wholesale-price/:id',
  request: {
    params: idParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateWholesalePriceSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Wholesale price updated successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readWholesalePriceSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const deleteWholesalePriceRoute = createRoute({
  operationId: 'deleteWholesalePrice',
  tags: ['wholesale-price'],
  method: 'delete',
  path: '/wholesale-price/:id',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Wholesale price deleted successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readWholesalePriceSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const listWholesalePricesRoute = createRoute({
  operationId: 'listWholesalePrices',
  tags: ['wholesale-price'],
  method: 'get',
  path: '/wholesale-price',
  responses: {
    200: {
      description: 'Wholesale prices retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readWholesalePriceListSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});
