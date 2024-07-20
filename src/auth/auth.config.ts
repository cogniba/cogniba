import getUser from "@/database/queries/getUser";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("AAA");
          if (!credentials.username || !credentials.password) {
            throw new Error("Missing credentials");
          }

          console.log("BBB");
          const user = await getUser(
            credentials.username as string,
            credentials.password as string,
          );

          console.log("CCC");
          if (!user) {
            throw new Error("Invalid credentials");
          }

          console.log("DDD");
          return user;
        } catch (error) {
          console.log("EEE");
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
