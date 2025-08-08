import { createRoute } from '@hono/zod-openapi';

import { GenericErrorResponses, createResponseSchema } from '@/lib';
import { idParamsSchema } from '@/types/generic.type';
import {
  createPaymentSchema,
  readPaymentListSchema,
  readPaymentSchema,
  updatePaymentSchema,
} from '@/types/payment.type';

export const createPaymentRoute = createRoute({
  operationId: 'createPayment',
  tags: ['payment'],
  method: 'post',
  path: '/payment',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createPaymentSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Payment created successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readPaymentSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const getPaymentRoute = createRoute({
  operationId: 'getPayment',
  tags: ['payment'],
  method: 'get',
  path: '/payment/{id}',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Payment retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readPaymentSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const updatePaymentRoute = createRoute({
  operationId: 'updatePayment',
  tags: ['payment'],
  method: 'put',
  path: '/payment/{id}',
  request: {
    params: idParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updatePaymentSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Payment updated successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readPaymentSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const deletePaymentRoute = createRoute({
  operationId: 'deletePayment',
  tags: ['payment'],
  method: 'delete',
  path: '/payment/{id}',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Payment deleted successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readPaymentSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const listPaymentsRoute = createRoute({
  operationId: 'listPayments',
  tags: ['payment'],
  method: 'get',
  path: '/payment',
  responses: {
    200: {
      description: 'Payments retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readPaymentListSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});
