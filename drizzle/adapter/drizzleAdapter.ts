// TODO
// @ts-nocheck

import type { Adapter, AdapterUser } from "@auth/core/adapters";
import * as schema from "@/database/schemas/auth";
import { and, eq } from "drizzle-orm";
import { PgDatabase } from "drizzle-orm/pg-core";

export function PostgresDrizzleAdapter(
  client: InstanceType<typeof PgDatabase>,
): Adapter {
  const { users, accounts, sessions, verificationTokens } = schema;

  return {
    async createUser(data) {
      return await client
        .insert(users)
        .values(data)
        .returning()
        .then((res) => res[0]);
    },

    async getUser(data) {
      return await client
        .select()
        .from(users)
        .where(eq(users.id, data))
        .then((res) => (res.length === 1 ? res[0] : null));
    },

    async getUserByAccount(account) {
      const dbAccount =
        (await client
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.providerAccountId, account.providerAccountId),
              eq(accounts.provider, account.provider),
            ),
          )
          .leftJoin(users, eq(accounts.userId, users.id))
          .then((res) => res[0])) ?? null;

      if (!dbAccount) {
        return null;
      }

      return dbAccount.users;
    },

    async updateUser(data) {
      if (!data.id) {
        throw new Error("No user id.");
      }

      return await client
        .update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning()
        .then((res) => res[0]);
    },

    async linkAccount(account) {
      await client.insert(accounts).values(account);
    },

    async deleteUser(id) {
      await client
        .delete(users)
        .where(eq(users.id, id))
        .returning()
        .then((res) => (res.length === 1 ? res[0] : null));
    },

    async unlinkAccount(account) {
      const { type, provider, providerAccountId, userId } = await client
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider),
          ),
        )
        .returning()
        .then((res) => (res.length === 1 ? res[0] : null));

      return { provider, type, providerAccountId, userId };
    },

    async createSession(data) {
      return await client
        .insert(sessions)
        .values(data)
        .returning()
        .then((res) => res[0]);
    },

    async getSessionAndUser(data) {
      return await client
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, data))
        .innerJoin(users, eq(users.id, sessions.userId))
        .then((res) => (res.length === 1 ? res[0] : null));
    },

    async updateSession(data) {
      return await client
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .returning()
        .then((res) => res[0]);
    },

    async deleteSession(sessionToken) {
      const session = await client
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .returning()
        .then((res) => (res.length === 1 ? res[0] : null));

      return session;
    },

    async getUserByEmail(data) {
      return await client
        .select()
        .from(users)
        .where(eq(users.email, data))
        .then((res) => (res.length === 1 ? res[0] : null));
    },

    async createVerificationToken(token) {
      return await client
        .insert(verificationTokens)
        .values(token)
        .returning()
        .then((res) => res[0]);
    },

    async useVerificationToken(token) {
      try {
        return await client
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token),
            ),
          )
          .returning()
          .then((res) => (res.length === 1 ? res[0] : null));
      } catch (err) {
        throw new Error("No verification token found.");
      }
    },
  };
}
