import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { Users, UserType } from "@/database/schemas/auth";

declare module "next-auth" {
  export interface User extends UserType {}

  export interface Session {
    user: UserType;
  }
}
