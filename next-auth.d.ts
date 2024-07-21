import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  export interface User extends DefaultUser {
    username: string | null;
    password: string | null;
    role: "child" | "parent" | "admin" | null;
  }

  export interface Session {
    user: User;
  }
}
