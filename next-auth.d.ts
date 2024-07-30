import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { Users, UserType } from "@/database/schemas/auth";

// declare module "next-auth" {
//   export interface User extends UserType {}

//   export interface Session {
//     user: User;
//   }
// }

declare module "@auth/core/types" {
  export interface User extends UserType {}

  export interface Session {
    user: User;
  }
}

declare module "@auth/core/adapters" {
  // export interface AdapterUser extends UserType {}
  export interface AdapterUser {
    item: string;
  }
}
