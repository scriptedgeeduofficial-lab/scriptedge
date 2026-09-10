import { relations } from "drizzle-orm/relations";
import { user, orders, account, session, orderStatusHistory } from "./schema";

export const ordersRelations = relations(orders, ({one, many}) => ({
	user_userId: one(user, {
		fields: [orders.userId],
		references: [user.id],
		relationName: "orders_userId_user_id"
	}),
	user_writerId: one(user, {
		fields: [orders.writerId],
		references: [user.id],
		relationName: "orders_writerId_user_id"
	}),
	orderStatusHistories: many(orderStatusHistory),
}));

export const userRelations = relations(user, ({many}) => ({
	orders_userId: many(orders, {
		relationName: "orders_userId_user_id"
	}),
	orders_writerId: many(orders, {
		relationName: "orders_writerId_user_id"
	}),
	accounts: many(account),
	sessions: many(session),
	orderStatusHistories: many(orderStatusHistory),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const orderStatusHistoryRelations = relations(orderStatusHistory, ({one}) => ({
	order: one(orders, {
		fields: [orderStatusHistory.orderId],
		references: [orders.id]
	}),
	user: one(user, {
		fields: [orderStatusHistory.changedBy],
		references: [user.id]
	}),
}));