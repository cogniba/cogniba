import { db } from "@/database/db";
import { users, UserType } from "@/database/schemas/auth";
import { eq } from "drizzle-orm";

export default async function getUserById(
  id: string,
): Promise<UserType | null> {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((res) => (res.length === 1 ? res[0] : null));

  return user;
}
