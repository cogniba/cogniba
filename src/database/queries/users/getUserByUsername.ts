import { db } from "@/database/db";
import { users, type UserType } from "@/database/schemas/profilesTable";
import { eq } from "drizzle-orm";

export default async function getUserByUsername(
  username: string,
): Promise<UserType | null> {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .then((res) => (res.length === 1 ? res[0] : null));

  return user;
}
