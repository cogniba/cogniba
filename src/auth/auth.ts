import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import getUserByUsername from "@/database/queries/users/getUserByUsername";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/database/db";

import { SignInSchema } from "@/zod/schemas/SignInSchema";
import { PostgresDrizzleAdapter } from "@/../drizzle/adapter/drizzleAdapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresDrizzleAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const validatedCredentials = SignInSchema.safeParse(credentials);
          if (!validatedCredentials.success) {
            throw new Error("Invalid credentials");
          }

          const { username, password } = validatedCredentials.data;
          const user = await getUserByUsername(username);
          if (!user) {
            throw new Error("Invalid credentials");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            throw new Error("Invalid credentials");
          }

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        if (typeof session.hasFinishedTutorial === "boolean") {
          token.hasFinishedTutorial = session.hasFinishedTutorial;
        }
      }

      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.hasFinishedTutorial = user.hasFinishedTutorial;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as "child" | "parent" | "admin";
      session.user.username = token.username as string;
      session.user.hasFinishedTutorial = token.hasFinishedTutorial as boolean;
      return session;
    },
  },
});
