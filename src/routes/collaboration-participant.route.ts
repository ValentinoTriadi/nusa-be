import { createRoute } from '@hono/zod-openapi';

import { GenericErrorResponses, createResponseSchema } from '@/lib';
import {
  createCollaborationParticipantSchema,
  readCollaborationParticipantListSchema,
  readCollaborationParticipantSchema,
  updateCollaborationParticipantSchema,
} from '@/types/collaboration-participant.type';
import { idParamsSchema } from '@/types/generic.type';

export const createCollaborationParticipantRoute = createRoute({
  operationId: 'createCollaborationParticipant',
  tags: ['collaboration-participant'],
  method: 'post',
  path: '/collaboration-participant',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createCollaborationParticipantSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Collaboration participant created successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCollaborationParticipantSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const getCollaborationParticipantRoute = createRoute({
  operationId: 'getCollaborationParticipant',
  tags: ['collaboration-participant'],
  method: 'get',
  path: '/collaboration-participant/:id',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Collaboration participant retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCollaborationParticipantSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const updateCollaborationParticipantRoute = createRoute({
  operationId: 'updateCollaborationParticipant',
  tags: ['collaboration-participant'],
  method: 'put',
  path: '/collaboration-participant/:id',
  request: {
    params: idParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateCollaborationParticipantSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Collaboration participant updated successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCollaborationParticipantSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const deleteCollaborationParticipantRoute = createRoute({
  operationId: 'deleteCollaborationParticipant',
  tags: ['collaboration-participant'],
  method: 'delete',
  path: '/collaboration-participant/:id',
  request: {
    params: idParamsSchema,
  },
  responses: {
    200: {
      description: 'Collaboration participant deleted successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCollaborationParticipantSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});

export const listCollaborationParticipantsRoute = createRoute({
  operationId: 'listCollaborationParticipants',
  tags: ['collaboration-participant'],
  method: 'get',
  path: '/collaboration-participant',
  responses: {
    200: {
      description: 'Collaboration participants retrieved successfully',
      content: {
        'application/json': {
          schema: createResponseSchema(readCollaborationParticipantListSchema),
        },
      },
    },
    ...GenericErrorResponses,
  },
});
