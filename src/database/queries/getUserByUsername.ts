import { db } from "@/database/db";
import { users } from "../schemas/users";
import { eq } from "drizzle-orm";
import takeUniqueOrThrow from "@/utils/takeUniqueOrThrow";

export default async function getUserByUsername(username: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .then((res) => res[0] ?? null);

  return user;
}
