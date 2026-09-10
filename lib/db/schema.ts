import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  index,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),

  email: text("email").notNull().unique(),

  emailVerified: boolean("email_verified").default(false).notNull(),

  image: text("image"),

writerCode: text("writer_code").unique(),

role: text("role").default("CUSTOMER").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),

    expiresAt: timestamp("expires_at").notNull(),

    token: text("token").notNull().unique(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),

    ipAddress: text("ip_address"),

    userAgent: text("user_agent"),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),

    accountId: text("account_id").notNull(),

    providerId: text("provider_id").notNull(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    accessToken: text("access_token"),

    refreshToken: text("refresh_token"),

    idToken: text("id_token"),

    accessTokenExpiresAt: timestamp("access_token_expires_at"),

    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),

    scope: text("scope"),

    password: text("password"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),

    identifier: text("identifier").notNull(),

    value: text("value").notNull(),

    expiresAt: timestamp("expires_at").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const orders = pgTable(
  "orders",
  {
    id: text("id").primaryKey(),

    orderNumber: text("order_number").notNull().unique(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    writerId: text("writer_id").references(() => user.id, {
      onDelete: "set null",
    }),

    service: text("service").notNull(),

    title: text("title").notNull(),

    details: text("details"),

    status: text("status").notNull().default("PENDING"),

amount: integer("amount").notNull().default(0),

paymentMethod: text("payment_method").notNull().default("COD"),

paymentStatus: text("payment_status").notNull().default("PENDING"),

createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("orders_userId_idx").on(table.userId),
    index("orders_writerId_idx").on(table.writerId),
    index("orders_status_idx").on(table.status),
  ],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),

  accounts: many(account),

  customerOrders: many(orders, {
    relationName: "customerOrders",
  }),

  writerOrders: many(orders, {
    relationName: "writerOrders",
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const orderRelations = relations(orders, ({ one }) => ({
  customer: one(user, {
    fields: [orders.userId],
    references: [user.id],
    relationName: "customerOrders",
  }),

  writer: one(user, {
    fields: [orders.writerId],
    references: [user.id],
    relationName: "writerOrders",
  }),
}));
export const orderStatusHistory = pgTable(
  "order_status_history",
  {
    id: text("id").primaryKey(),

    orderId: text("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),

    status: text("status").notNull(),

    changedBy: text("changed_by").references(() => user.id, {
      onDelete: "set null",
    }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("order_status_history_orderId_idx").on(table.orderId),
    index("order_status_history_createdAt_idx").on(table.createdAt),
  ],
);

export const orderStatusHistoryRelations = relations(
  orderStatusHistory,
  ({ one }) => ({
    order: one(orders, {
      fields: [orderStatusHistory.orderId],
      references: [orders.id],
    }),

    changedByUser: one(user, {
      fields: [orderStatusHistory.changedBy],
      references: [user.id],
    }),
  }),
);