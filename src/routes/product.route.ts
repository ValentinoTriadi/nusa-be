import { createRoute } from '@hono/zod-openapi';

import { GenericErrorResponses, createResponseSchema } from '@/lib';
import { idParamsSchema } from '@/types/generic.type';
import {
  createProductSchema,
  readProductListSchema,
  readProductSchema,
  updateProductSchema,
} from '@/types/product.type';

export const createProductRoute = createRoute({
  operationId: 'createProduct',
  tags: ['product'],
  method: 'post',
  path: '/product',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createProductSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Product created successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readProductSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const getProductRoute = createRoute({
  operationId: 'getProduct',
  tags: ['product'],
  method: 'get',
  path: '/product/:id',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Product retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readProductSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const updateProductRoute = createRoute({
  operationId: 'updateProduct',
  tags: ['product'],
  method: 'put',
  path: '/product/:id',
  request: {
    params: idParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateProductSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Product updated successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readProductSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const deleteProductRoute = createRoute({
  operationId: 'deleteProduct',
  tags: ['product'],
  method: 'delete',
  path: '/product/:id',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Product deleted successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readProductSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const listProductsRoute = createRoute({
  operationId: 'listProducts',
  tags: ['product'],
  method: 'get',
  path: '/product',
  responses: {
    200: {
      description: 'Products retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readProductListSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});
