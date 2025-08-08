import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';

import { collaboration } from '@/db/schema';

import { readProductSchema } from './product.type';
import { readUserSchema } from './user.type';

// Create
export const createCollaborationSchema = createInsertSchema(collaboration).omit(
  {
    id: true,
    initiatorId: true,
    createdAt: true,
  },
);

// Read
export const readCollaborationSchema = createSelectSchema(collaboration, {
  deadline: z.union([z.string(), z.date()]).optional(),
  createdAt: z.union([z.string(), z.date()]),
});
export const readCollaborationListSchema = z.array(readCollaborationSchema);

export const readCollaborationWithRelationsSchema =
  readCollaborationSchema.extend({
    initiator: readUserSchema,
    product: readProductSchema,
  });
export const readCollaborationListWithRelationsSchema = z.array(
  readCollaborationWithRelationsSchema,
);

// Update
export const updateCollaborationSchema = createCollaborationSchema.partial();

// Types
export type CreateCollaboration = z.infer<typeof createCollaborationSchema>;
export type ReadCollaboration = z.infer<typeof readCollaborationSchema>;
export type ReadCollaborationList = z.infer<typeof readCollaborationListSchema>;
export type UpdateCollaboration = z.infer<typeof updateCollaborationSchema>;
