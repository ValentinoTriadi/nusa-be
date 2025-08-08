import { createRoute } from '@hono/zod-openapi';

import { GenericErrorResponses, createResponseSchema } from '@/lib';
import {
  createCollaborationSchema,
  readCollaborationListSchema,
  readCollaborationSchema,
  updateCollaborationSchema,
} from '@/types/collaboration.type';
import { idParamsSchema } from '@/types/generic.type';

export const createCollaborationRoute = createRoute({
  operationId: 'createCollaboration',
  tags: ['collaboration'],
  method: 'post',
  path: '/collaboration',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createCollaborationSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Collaboration created successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCollaborationSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const getCollaborationRoute = createRoute({
  operationId: 'getCollaboration',
  tags: ['collaboration'],
  method: 'get',
  path: '/collaboration/:id',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Collaboration retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCollaborationSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const updateCollaborationRoute = createRoute({
  operationId: 'updateCollaboration',
  tags: ['collaboration'],
  method: 'put',
  path: '/collaboration/:id',
  request: {
    params: idParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateCollaborationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Collaboration updated successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCollaborationSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const deleteCollaborationRoute = createRoute({
  operationId: 'deleteCollaboration',
  tags: ['collaboration'],
  method: 'delete',
  path: '/collaboration/:id',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Collaboration deleted successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCollaborationSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const listCollaborationsRoute = createRoute({
  operationId: 'listCollaborations',
  tags: ['collaboration'],
  method: 'get',
  path: '/collaboration',
  responses: {
    200: {
      description: 'Collaborations retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCollaborationListSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});
