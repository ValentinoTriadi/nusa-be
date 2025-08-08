import { createRoute } from '@hono/zod-openapi';

import { GenericErrorResponses, createResponseSchema } from '@/lib';
import { idParamsSchema } from '@/types/generic.type';
import {
  createStoreSchema,
  readStoreListSchema,
  readStoreSchema,
  updateStoreSchema,
} from '@/types/store.type';

export const createStoreRoute = createRoute({
  operationId: 'createStore',
  tags: ['store'],
  method: 'post',
  path: '/store',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createStoreSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Store created successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readStoreSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const getStoreRoute = createRoute({
  operationId: 'getStore',
  tags: ['store'],
  method: 'get',
  path: '/store/:id',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Store retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readStoreSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const getStoreOwnedRoute = createRoute({
  operationId: 'getStoreOwned',
  tags: ['store'],
  method: 'get',
  path: '/store/me',
  responses: {
    200: {
      description: 'Store retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readStoreSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const updateStoreRoute = createRoute({
  operationId: 'updateStore',
  tags: ['store'],
  method: 'put',
  path: '/store/:id',
  request: {
    params: idParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateStoreSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Store updated successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readStoreSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const deleteStoreRoute = createRoute({
  operationId: 'deleteStore',
  tags: ['store'],
  method: 'delete',
  path: '/store/:id',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Store deleted successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readStoreSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const listStoresRoute = createRoute({
  operationId: 'listStores',
  tags: ['store'],
  method: 'get',
  path: '/store',
  responses: {
    200: {
      description: 'Stores retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readStoreListSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});
