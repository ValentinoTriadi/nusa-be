import { createRoute } from '@hono/zod-openapi';

import { GenericErrorResponses, createResponseSchema } from '@/lib';
import { idParamsSchema } from '@/types/generic.type';
import {
  createTransactionItemSchema,
  readTransactionItemListSchema,
  readTransactionItemSchema,
  updateTransactionItemSchema,
} from '@/types/transaction-item.type';

export const createTransactionItemRoute = createRoute({
  operationId: 'createTransactionItem',
  tags: ['transaction-item'],
  method: 'post',
  path: '/transaction-item',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createTransactionItemSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Transaction item created successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readTransactionItemSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const getTransactionItemRoute = createRoute({
  operationId: 'getTransactionItem',
  tags: ['transaction-item'],
  method: 'get',
  path: '/transaction-item/{id}',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Transaction item retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readTransactionItemSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const updateTransactionItemRoute = createRoute({
  operationId: 'updateTransactionItem',
  tags: ['transaction-item'],
  method: 'put',
  path: '/transaction-item/{id}',
  request: {
    params: idParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateTransactionItemSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Transaction item updated successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readTransactionItemSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const deleteTransactionItemRoute = createRoute({
  operationId: 'deleteTransactionItem',
  tags: ['transaction-item'],
  method: 'delete',
  path: '/transaction-item/{id}',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Transaction item deleted successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readTransactionItemSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const listTransactionItemsRoute = createRoute({
  operationId: 'listTransactionItems',
  tags: ['transaction-item'],
  method: 'get',
  path: '/transaction-item',
  responses: {
    200: {
      description: 'Transaction items retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readTransactionItemListSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});
