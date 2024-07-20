import { db } from "@/database/db";
import { users } from "../schemas/users";
import { and, eq } from "drizzle-orm";
import takeUniqueOrThrow from "@/utils/takeUniqueOrThrow";
import bcrypt from "bcryptjs";

export default async function getUser(username: string) {
  try {
    const user = await db
      .select()
      .from(users)
      .where(and(eq(users.username, username)))
      .then(takeUniqueOrThrow);

    return user;
  } catch (error) {
    return null;
  }
}
