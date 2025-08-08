import { relations } from 'drizzle-orm';

import { cart } from './cart.schema';
import { collaborationParticipant } from './collaboration-participant.schema';
import { collaboration } from './collaboration.schema';
import { favorite } from './favorite.schema';
import { payment } from './payment.schema';
import { product } from './product.schema';
import { store } from './store.schema';
import { transactionItem } from './transaction-item.schema';
import { transaction } from './transaction.schema';
import { user } from './user.schema';
import { wholesalePrice } from './wholesale-price.schema';

// User Relations
export const userRelations = relations(user, ({ one, many }) => ({
  store: one(store, {
    fields: [user.id],
    references: [store.userId],
  }),
  products: many(product),
  favoriteProducts: many(favorite),
  buyerTransactions: many(transaction, {
    relationName: 'buyerTransactions',
  }),
  sellerTransactions: many(transaction, {
    relationName: 'sellerTransactions',
  }),
  collaborationsInitiated: many(collaboration),
  collaborationParticipations: many(collaborationParticipant),
  cartItems: many(cart),
}));

// Store Relations
export const storeRelations = relations(store, ({ one }) => ({
  user: one(user, {
    fields: [store.userId],
    references: [user.id],
  }),
}));

// Product Relations
export const productRelations = relations(product, ({ one, many }) => ({
  store: one(store, {
    fields: [product.storeId],
    references: [store.id],
  }),
  wholesalePrices: many(wholesalePrice),
  favorites: many(favorite),
  transactionItems: many(transactionItem),
  collaborations: many(collaboration),
  cartItems: many(cart),
}));

// Wholesale Price Relations
export const wholesalePriceRelations = relations(wholesalePrice, ({ one }) => ({
  product: one(product, {
    fields: [wholesalePrice.productId],
    references: [product.id],
  }),
}));

// Favorite Relations
export const favoriteRelations = relations(favorite, ({ one }) => ({
  user: one(user, {
    fields: [favorite.userId],
    references: [user.id],
  }),
  product: one(product, {
    fields: [favorite.productId],
    references: [product.id],
  }),
}));

// Transaction Relations
export const transactionRelations = relations(transaction, ({ one, many }) => ({
  buyer: one(user, {
    fields: [transaction.buyerId],
    references: [user.id],
    relationName: 'buyerTransactions',
  }),
  seller: one(user, {
    fields: [transaction.sellerId],
    references: [user.id],
    relationName: 'sellerTransactions',
  }),
  items: many(transactionItem),
  payments: many(payment),
}));

// Transaction Item Relations
export const transactionItemRelations = relations(
  transactionItem,
  ({ one }) => ({
    transaction: one(transaction, {
      fields: [transactionItem.transactionId],
      references: [transaction.id],
    }),
    product: one(product, {
      fields: [transactionItem.productId],
      references: [product.id],
    }),
  }),
);

// Collaboration Relations
export const collaborationRelations = relations(
  collaboration,
  ({ one, many }) => ({
    initiator: one(user, {
      fields: [collaboration.initiatorId],
      references: [user.id],
    }),
    product: one(product, {
      fields: [collaboration.productId],
      references: [product.id],
    }),
    participants: many(collaborationParticipant),
  }),
);

// Collaboration Participant Relations
export const collaborationParticipantRelations = relations(
  collaborationParticipant,
  ({ one }) => ({
    collaboration: one(collaboration, {
      fields: [collaborationParticipant.collaborationId],
      references: [collaboration.id],
    }),
    user: one(user, {
      fields: [collaborationParticipant.userId],
      references: [user.id],
    }),
  }),
);

// Cart Relations
export const cartRelations = relations(cart, ({ one }) => ({
  user: one(user, {
    fields: [cart.userId],
    references: [user.id],
  }),
  product: one(product, {
    fields: [cart.productId],
    references: [product.id],
  }),
}));

// Payment Relations
export const paymentRelations = relations(payment, ({ one }) => ({
  transaction: one(transaction, {
    fields: [payment.transactionId],
    references: [transaction.id],
  }),
}));
