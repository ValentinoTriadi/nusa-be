import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { createId, getNow } from '../db-helper';

export const collaborationParticipant = pgTable('collaboration_participant', {
  id: varchar('id').primaryKey().unique().$defaultFn(createId),
  collaborationId: varchar('collaboration_id').notNull(),
  userId: varchar('user_id').notNull(),
  contributionQuantity: integer('contribution_quantity'),
  joinedAt: timestamp('joined_at').$defaultFn(getNow),
});

// Types
export type CollaborationParticipant =
  typeof collaborationParticipant.$inferSelect;
export type CollaborationParticipantInsert =
  typeof collaborationParticipant.$inferInsert;
