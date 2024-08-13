import { db } from "@/database/db";
import { users, type UserType } from "@/database/schemas/auth";
import { eq } from "drizzle-orm";

export default async function getUserByEmail(
  email: string,
): Promise<UserType | null> {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .then((res) => (res.length === 1 ? res[0] : null));

  return user;
}
