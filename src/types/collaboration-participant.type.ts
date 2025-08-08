import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

import { collaborationParticipant } from '@/db/schema';

import { readCollaborationSchema } from './collaboration.type';
import { readUserSchema } from './user.type';

// Create
export const createCollaborationParticipantSchema = createInsertSchema(
  collaborationParticipant,
).omit({
  id: true,
  userId: true,
  joinedAt: true,
});

// Read
export const readCollaborationParticipantSchema = createSelectSchema(
  collaborationParticipant,
  {
    joinedAt: z.union([z.string(), z.date()]),
  },
);
export const readCollaborationParticipantListSchema = z.array(
  readCollaborationParticipantSchema,
);

export const readCollaborationParticipantWithRelationsSchema =
  readCollaborationParticipantSchema.extend({
    collaboration: readCollaborationSchema,
    user: readUserSchema,
  });
export const readCollaborationParticipantListWithRelationsSchema = z.array(
  readCollaborationParticipantWithRelationsSchema,
);

// Update
export const updateCollaborationParticipantSchema =
  createCollaborationParticipantSchema.partial();

// Types
export type CreateCollaborationParticipant = z.infer<
  typeof createCollaborationParticipantSchema
>;
export type ReadCollaborationParticipant = z.infer<
  typeof readCollaborationParticipantSchema
>;
export type ReadCollaborationParticipantList = z.infer<
  typeof readCollaborationParticipantListSchema
>;
export type UpdateCollaborationParticipant = z.infer<
  typeof updateCollaborationParticipantSchema
>;
