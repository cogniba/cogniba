import { relations } from "drizzle-orm/relations";
import { profiles, subscriptions, feedback, games, usersInAuth, settings } from "./schema";

export const subscriptionsRelations = relations(subscriptions, ({one}) => ({
	profile: one(profiles, {
		fields: [subscriptions.userId],
		references: [profiles.userId]
	}),
}));

export const profilesRelations = relations(profiles, ({one, many}) => ({
	subscriptions: many(subscriptions),
	feedbacks: many(feedback),
	games: many(games),
	usersInAuth: one(usersInAuth, {
		fields: [profiles.userId],
		references: [usersInAuth.id]
	}),
	settings: many(settings),
}));

export const feedbackRelations = relations(feedback, ({one}) => ({
	profile: one(profiles, {
		fields: [feedback.userId],
		references: [profiles.userId]
	}),
}));

export const gamesRelations = relations(games, ({one}) => ({
	profile: one(profiles, {
		fields: [games.userId],
		references: [profiles.userId]
	}),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	profiles: many(profiles),
}));

export const settingsRelations = relations(settings, ({one}) => ({
	profile: one(profiles, {
		fields: [settings.userId],
		references: [profiles.userId]
	}),
}));