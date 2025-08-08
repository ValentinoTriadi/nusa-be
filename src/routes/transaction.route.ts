import { createRoute } from '@hono/zod-openapi';

import { GenericErrorResponses, createResponseSchema } from '@/lib';
import { idParamsSchema } from '@/types/generic.type';
import {
  createTransactionSchema,
  readTransactionListSchema,
  readTransactionSchema,
  updateTransactionSchema,
} from '@/types/transaction.type';

export const createTransactionRoute = createRoute({
  operationId: 'createTransaction',
  tags: ['transaction'],
  method: 'post',
  path: '/transaction',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createTransactionSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Transaction created successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readTransactionSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const getTransactionRoute = createRoute({
  operationId: 'getTransaction',
  tags: ['transaction'],
  method: 'get',
  path: '/transaction/{id}',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Transaction retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readTransactionSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const updateTransactionRoute = createRoute({
  operationId: 'updateTransaction',
  tags: ['transaction'],
  method: 'put',
  path: '/transaction/{id}',
  request: {
    params: idParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateTransactionSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Transaction updated successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readTransactionSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const deleteTransactionRoute = createRoute({
  operationId: 'deleteTransaction',
  tags: ['transaction'],
  method: 'delete',
  path: '/transaction/{id}',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Transaction deleted successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readTransactionSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const listTransactionsRoute = createRoute({
  operationId: 'listTransactions',
  tags: ['transaction'],
  method: 'get',
  path: '/transaction',
  responses: {
    200: {
      description: 'Transactions retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readTransactionListSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});
