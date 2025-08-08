import { createRoute } from '@hono/zod-openapi';

import { GenericErrorResponses, createResponseSchema } from '@/lib';
import {
  createFavoriteSchema,
  readFavoriteListSchema,
  readFavoriteSchema,
  updateFavoriteSchema,
} from '@/types/favorite.type';
import { idParamsSchema } from '@/types/generic.type';

export const createFavoriteRoute = createRoute({
  operationId: 'createFavorite',
  tags: ['favorite'],
  method: 'post',
  path: '/favorite',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createFavoriteSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Favorite created successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readFavoriteSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const getFavoriteRoute = createRoute({
  operationId: 'getFavorite',
  tags: ['favorite'],
  method: 'get',
  path: '/favorite/{id}',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Favorite retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readFavoriteSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const updateFavoriteRoute = createRoute({
  operationId: 'updateFavorite',
  tags: ['favorite'],
  method: 'put',
  path: '/favorite/{id}',
  request: {
    params: idParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateFavoriteSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Favorite updated successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readFavoriteSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const deleteFavoriteRoute = createRoute({
  operationId: 'deleteFavorite',
  tags: ['favorite'],
  method: 'delete',
  path: '/favorite/{id}',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Favorite deleted successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readFavoriteSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const listFavoritesRoute = createRoute({
  operationId: 'listFavorites',
  tags: ['favorite'],
  method: 'get',
  path: '/favorite',
  responses: {
    200: {
      description: 'Favorites retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readFavoriteListSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});
