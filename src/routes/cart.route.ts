import { createRoute } from '@hono/zod-openapi';

import { GenericErrorResponses, createResponseSchema } from '@/lib';
import {
  createCartSchema,
  readCartListSchema,
  readCartSchema,
  updateCartSchema,
} from '@/types/cart.type';
import { idParamsSchema } from '@/types/generic.type';

export const createCartRoute = createRoute({
  operationId: 'createCart',
  tags: ['cart'],
  method: 'post',
  path: '/cart',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createCartSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Cart item created successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCartSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const getCartRoute = createRoute({
  operationId: 'getCart',
  tags: ['cart'],
  method: 'get',
  path: '/cart/:id',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Cart item retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCartSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const updateCartRoute = createRoute({
  operationId: 'updateCart',
  tags: ['cart'],
  method: 'put',
  path: '/cart/:id',
  request: {
    params: idParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateCartSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Cart item updated successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCartSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const deleteCartRoute = createRoute({
  operationId: 'deleteCart',
  tags: ['cart'],
  method: 'delete',
  path: '/cart/:id',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Cart item deleted successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCartSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const listCartItemsRoute = createRoute({
  operationId: 'listCartItems',
  tags: ['cart'],
  method: 'get',
  path: '/cart',
  responses: {
    200: {
      description: 'Cart items retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCartListSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});
