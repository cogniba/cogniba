import { pgTable, foreignKey, pgPolicy, uuid, text, date, timestamp, integer, unique, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const status = pgEnum("status", ['active', 'inactive'])


export const subscriptions = pgTable("subscriptions", {
	userId: uuid("user_id").notNull(),
	subscriptionId: text("subscription_id").notNull(),
	status: status().default('inactive').notNull(),
	lastPaymentDate: date("last_payment_date"),
	id: uuid().primaryKey().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [profiles.userId],
			name: "subscriptions_user_id_profiles_user_id_fk"
		}).onDelete("cascade"),
	pgPolicy("Enable insert for users based on user_id", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`(( SELECT auth.uid() AS uid) = user_id)`  }),
	pgPolicy("Enable update for users based on user_id", { as: "permissive", for: "update", to: ["public"] }),
	pgPolicy("Enable users to view their own data only", { as: "permissive", for: "select", to: ["authenticated"] }),
]);

export const feedback = pgTable("feedback", {
	id: uuid().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	message: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [profiles.userId],
			name: "feedback_user_id_profiles_user_id_fk"
		}).onDelete("cascade"),
	pgPolicy("Enable insert for users based on user_id", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`(( SELECT auth.uid() AS uid) = user_id)`  }),
]);

export const games = pgTable("games", {
	id: uuid().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	level: integer().notNull(),
	newLevel: integer("new_level").notNull(),
	correctHits: integer("correct_hits").notNull(),
	incorrectHits: integer("incorrect_hits").notNull(),
	missedHits: integer("missed_hits").notNull(),
	timePlayed: integer("time_played").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [profiles.userId],
			name: "games_user_id_profiles_user_id_fk"
		}).onDelete("cascade"),
	pgPolicy("Enable insert for users based on user_id", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`(( SELECT auth.uid() AS uid) = user_id)`  }),
	pgPolicy("Enable users to view their own data only", { as: "permissive", for: "select", to: ["authenticated"] }),
]);

export const profiles = pgTable("profiles", {
	userId: uuid("user_id").primaryKey().notNull(),
	email: text().notNull(),
	hasFinishedTutorial: boolean("has_finished_tutorial").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	fullName: text("full_name").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "profiles_user_id_users_id_fk"
		}).onDelete("cascade"),
	unique("profiles_email_unique").on(table.email),
	pgPolicy("Enable insert for users based on user_id", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`(( SELECT auth.uid() AS uid) = user_id)`  }),
	pgPolicy("Enable update for users based on email", { as: "permissive", for: "update", to: ["public"] }),
	pgPolicy("Enable users to view their own data only", { as: "permissive", for: "select", to: ["authenticated"] }),
]);

export const settings = pgTable("settings", {
	userId: uuid("user_id").primaryKey().notNull(),
	showFeedback: boolean("show_feedback").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [profiles.userId],
			name: "settings_user_id_profiles_user_id_fk"
		}).onDelete("cascade"),
	pgPolicy("Enable insert for users based on user_id", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`(( SELECT auth.uid() AS uid) = user_id)`  }),
	pgPolicy("Enable update for users based on user_id", { as: "permissive", for: "update", to: ["public"] }),
	pgPolicy("Enable users to view their own data only", { as: "permissive", for: "select", to: ["authenticated"] }),
]);
