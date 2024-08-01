import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  timestamp,
  text,
  primaryKey,
  integer,
  pgSchema,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { settings } from "./settings";

export const authSchema = pgSchema("auth");

export const roleEnum = authSchema.enum("role", ["child", "parent", "admin"]);

export const users = authSchema.table("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),

  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),

  name: text("name").notNull(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  role: roleEnum("role").notNull(),

  parentId: text("parentId").references((): AnyPgColumn => users.id, {
    onDelete: "cascade",
  }),
  settingsId: text("settingsId")
    .references((): AnyPgColumn => settings.id, {
      onDelete: "cascade",
    })
    .notNull(),

  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const accounts = authSchema.table(
  "accounts",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = authSchema.table("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = authSchema.table(
  "verificationTokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const authenticators = authSchema.table(
  "authenticators",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export type UserType = InferSelectModel<typeof users>;
